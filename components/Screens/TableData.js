/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Loader from './Loader';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
const WaterTankDetails = () => {
    const [tankData, setTankData] = useState([]);
    const [loading, setLoading] = React.useState(false);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const apiUrl = 'https://sihfinal.000webhostapp.com/SIHFINALPAGE/app_api/getDataMonitor.php';

            try {
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setTankData(data);
                console.log(data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error(`Error fetching water tank data: ${error}`);
            }
        };

        fetchData();
    }, []);


    const generatePDF = async () => {
        const htmlContent = `
            <html>
                <head>
                    <style>
                        table {
                            width: 100%;
                            border-collapse: collapse;
                        }
                        th, td {
                            border: 1px solid #ddd;
                            padding: 8px;
                            text-align: center;
                        }
                    </style>
                </head>
                <body>
                    <h1>Your Usage Details</h1>
                    <table>
                        <tr>
                            <th>ID</th>
                            <th>Watt</th>
                            <th>Amp</th>
                            <th>Volt</th>
                            <th>Water Level</th>
                            <th>Temperature</th>
                            <th>Date</th>
                            <th>Time</th>
                        </tr>
                        ${tankData.map((row, index) => (
            `<tr key=${index}>
                                <td>${row.ID}</td>
                                <td>${row.watt}</td>
                                <td>${row.amp}</td>
                                <td>${row.volt}</td>
                                <td>${row.lavel}</td>
                                <td>${row.temp}</td>
                                <td>${row.date}</td>
                                <td>${row.time}</td>
                            </tr>`
        )).join('')}
                    </table>
                </body>
            </html>
        `;

        
        const currentDate = new Date();
        const formattedTimestamp = `${currentDate.getFullYear()}${(currentDate.getMonth() + 1).toString().padStart(2, '0')}${currentDate.getDate().toString().padStart(2, '0')}${currentDate.getHours().toString().padStart(2, '0')}${currentDate.getMinutes().toString().padStart(2, '0')}${currentDate.getSeconds().toString().padStart(2, '0')}`;
        const options = {
            html: htmlContent,
            fileName: `app_details_${formattedTimestamp}`, // Adding the formatted date to the filename
            directory: '',
        };
        const file = await RNHTMLtoPDF.convert(options);

        const downloadPath = `${RNFetchBlob.fs.dirs.DownloadDir}/${options.fileName}.pdf`;

        await RNFetchBlob.fs.mv(file.filePath, downloadPath);

        alert(`PDF saved to ${downloadPath}`);
    };

    return (
        <ScrollView style={styles.outerScrollView}>
            {/* First ScrollView (Vertical Scroll) */}
            <Loader loading={loading} />
                <Text style={styles.heading}>Full Details</Text>
            <ScrollView horizontal={true}>
                

                {/* Table View */}
                <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                    <Row data={['ID', 'Watt', 'Amp', 'Volt', 'Water Level', 'Temperature', 'Date', 'Time']} style={styles.tableHeader} textStyle={styles.tableHeaderText} />
                    {tankData.map((row, index) => (
                        <Row key={index} data={[row.ID, row.watt, row.amp, row.volt, row.lavel, row.temp, row.date, row.time]} style={styles.tableRow} textStyle={styles.tableData} />
                    ))}
                </Table>

                {/* Button to generate PDF */}
                
            </ScrollView>
            <View style={styles.generatePDFButton}>
                    <Button title="Generate PDF" onPress={generatePDF} />
                </View>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: 'black',
    },
    tableHeader: {
        height: 40,
        backgroundColor: '#537791',
        color: 'black',
        width:500,
    },
    tableHeaderText: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#fff',
        
    },
    tableRow: {
        height: 40,
        backgroundColor: '#F1F8FF',
        color: 'black',
        width:500,
    },
    tableData: {
        textAlign: 'center',
        color: 'black',
    },
    generatePDFButton: {
        marginTop: 20,
        marginBottom: 20,
        alignItems: 'center',
    },
});

export default WaterTankDetails;
