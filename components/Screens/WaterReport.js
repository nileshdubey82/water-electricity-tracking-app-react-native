/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, Platform } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';

const WaterBillDetails = () => {
    const [tableData, setTableData] = useState([]);
    const [randomNumber, setRandomNumber] = React.useState(null);
    useEffect(() => {
        const fetchData = async () => {
            const apiUrl = 'http://192.168.55.179/watero_admin/data.php';

            try {
                const response = await fetch(apiUrl);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setTableData(data);
                console.log(data);
            } catch (error) {
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
                    <h1>Report(WateroElectric)</h1>
                    <table>
                        <tr>
                            <th>Month</th>
                            <th>Usage (L)</th>
                            <th>Provided (L)</th>
                            <th>Cost (₹)</th>
                        </tr>
                        ${tableData.map((row) => (
            `<tr key=${row.month}>
                                <td>${row.month}</td>
                                <td>${row.consumed_water}</td>
                                <td>${row.total_water}</td>
                                <td>${row.cost}</td>
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
            fileName: `water_report_${formattedTimestamp}`, // Adding the formatted date to the filename
            directory: '',
        };
        const file = await RNHTMLtoPDF.convert(options);

        const downloadPath = `${RNFetchBlob.fs.dirs.DownloadDir}/${options.fileName}.pdf`;

        await RNFetchBlob.fs.mv(file.filePath, downloadPath);

        alert(`PDF saved to ${downloadPath}`);
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.heading}>Water Report Details</Text>

            {/* Table View */}
            <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                <Row data={['Month', 'Usage (L)', 'Provided (L)', 'Cost (₹)']} style={styles.tableHeader} textStyle={styles.tableHeaderText} />
                {tableData.map((row, index) => (
                    <Row key={index} data={[row.month, row.consumed_water, row.total_water, row.cost]} style={styles.tableRow} textStyle={styles.tableData} />
                ))}
            </Table>

            {/* Button to generate PDF */}
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
    },
    tableHeaderText: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#fff',
    },
    tableRow: {
        height: 40,
        backgroundColor: '#F1F8FF',
    },
    tableData: {
        textAlign: 'center',
        color: 'black'
    },
    generatePDFButton: {
        marginTop: 20,
        alignItems: 'center',
    },
});

export default WaterBillDetails;
