/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFetchBlob from 'rn-fetch-blob';
import RNFS from 'react-native-fs';

const WaterUsageBill = ({ route }) => {
    const { month, amount } = route.params;
    const [randomNumber, setRandomNumber] = React.useState(null);
    const handleDownloadPDF = async () => {
        const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Water Usage Bill</title>
        <style>
            body {
                background-color: #F6F6F6;
                margin: 0;
                padding: 0;
            }
    
            h1,
            h2,
            h3,
            h4,
            h5,
            h6 {
                margin: 0;
                padding: 0;
            }
    
            p {
                margin: 0;
                padding: 0;
            }
    
            .container {
                width: 80%;
                margin-right: auto;
                margin-left: auto;
            }
    
            .brand-section {
                background-color: #0d1033;
                padding: 10px 40px;
            }
    
            .logo {
                width: 50%;
            }
    
            .row {
                display: flex;
                flex-wrap: wrap;
            }
    
            .col-6 {
                width: 50%;
                flex: 0 0 auto;
            }
    
            .text-white {
                color: #fff;
            }
    
            .company-details {
                float: right;
                text-align: right;
            }
    
            .body-section {
                padding: 16px;
                border: 1px solid gray;
            }
    
            .heading {
                font-size: 20px;
                margin-bottom: 08px;
            }
    
            .sub-heading {
                color: #262626;
                margin-bottom: 05px;
            }
    
            table {
                background-color: #fff;
                width: 100%;
                border-collapse: collapse;
            }
    
            table thead tr {
                border: 1px solid #111;
                background-color: #f2f2f2;
            }
    
            table td {
                vertical-align: middle !important;
                text-align: center;
            }
    
            table th,
            table td {
                padding-top: 08px;
                padding-bottom: 08px;
            }
    
            .table-bordered {
                box-shadow: 0px 0px 5px 0.5px gray;
            }
    
            .table-bordered td,
            .table-bordered th {
                border: 1px solid #dee2e6;
            }
    
            .text-right {
                text-align: end;
            }
    
            .w-20 {
                width: 20%;
            }
    
            .float-right {
                float: right;
            }
        </style>
    </head>
    
    <body>
    
        <div class="container">
            <div class="brand-section">
                <div class="row">
                    <div class="col-6">
                        <h1 class="text-white">Water Company</h1>
                    </div>
                    <div class="col-6">
                        <div class="company-details">
                            <p class="text-white">Water Company Address</p>
                            <p class="text-white">Contact: 6267751993</p>
                        </div>
                    </div>
                </div>
            </div>
    
            <div class="body-section">
                <div class="row">
                    <div class="col-6">
                        <h2 class="heading">Water Usage Bill</h2>
                        <p class="sub-heading">Bill No.: 001</p>
                        <p class="sub-heading">Bill Date: 20-20-2021</p>
                        <p class="sub-heading">Due Date: 30-20-2021</p>
                    </div>
                    <div class="col-6">
                        <p class="sub-heading">Customer Name: Nilesh Dubey</p>
                        <p class="sub-heading">Address: Durg Chhattisgarh</p>
                        <p class="sub-heading">Account No.: 6267751993</p>
                        <p class="sub-heading">Connection Type: Residential</p>
                    </div>
                </div>
            </div>
    
            <div class="body-section">
                <h3 class="heading">Water Usage Details</h3>
                <br>
                <table class="table-bordered">
                    <thead>
                        <tr>
                            <th>Month</th>
                            <th class="w-20">Units Consumed</th>
                            <th class="w-20">Rate (INR)</th>
                            <th class="w-20">Amount (INR)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>August 2021</td>
                            <td>10</td>
                            <td>5</td>
                            <td>50</td>
                        </tr>
                        <!-- Add more rows for each month -->
                    </tbody>
                </table>
                <br>
                <h3 class="heading text-right">Total Amount: 50 INR</h3>
            </div>
           
        </div>
    
    </body>
    
    </html>
    
    `;

        const currentDate = new Date();
        const formattedTimestamp = `${currentDate.getFullYear()}${(currentDate.getMonth() + 1).toString().padStart(2, '0')}${currentDate.getDate().toString().padStart(2, '0')}${currentDate.getHours().toString().padStart(2, '0')}${currentDate.getMinutes().toString().padStart(2, '0')}${currentDate.getSeconds().toString().padStart(2, '0')}`;
        const options = {
            html: htmlContent,
            fileName: `water_bill_${formattedTimestamp}`, // Adding the formatted date to the filename
            directory: '',
        };
        const file = await RNHTMLtoPDF.convert(options);

        const downloadPath = `${RNFetchBlob.fs.dirs.DownloadDir}/${options.fileName}.pdf`;

        await RNFetchBlob.fs.mv(file.filePath, downloadPath);

        alert(`PDF saved to ${downloadPath}`);
    };

    return (
        <View style={styles.container}>
            <View style={styles.brandSection}>
                <View style={styles.row}>
                    <View style={styles.col6}>
                        <Text style={styles.textWhite}>Water Company</Text>
                    </View>
                    <View style={styles.col6}>
                        <View style={styles.companyDetails}>
                            <Text style={styles.textWhite}>Water Company Address</Text>
                            <Text style={styles.textWhite}>Contact: 6267751993</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.bodySection}>
                <View style={styles.row}>
                    <View style={styles.col6}>
                        <Text style={styles.heading}>Water Usage Bill</Text>
                        <Text style={styles.subHeading}>Bill No.: 001</Text>
                        <Text style={styles.subHeading}>Bill Date: 20-20-2021</Text>
                        <Text style={styles.subHeading}>Due Date: 30-20-2021</Text>
                    </View>
                    <View style={styles.col6}>
                        <Text style={styles.subHeading}>Customer Name: Nilesh Dubey</Text>
                        <Text style={styles.subHeading}>Address: Durg Chhattisgarh</Text>
                        <Text style={styles.subHeading}>Account No.: 6267751993</Text>
                        <Text style={styles.subHeading}>Connection Type: Residential</Text>
                    </View>
                </View>
            </View>

            <View style={styles.bodySection}>
                <Text style={styles.heading}>Water Usage Details</Text>
                <View style={styles.tableContainer}>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableHeader}>Month</Text>
                        <Text style={styles.tableHeader}>Units Consumed</Text>
                        <Text style={styles.tableHeader}>Rate (INR)</Text>
                        <Text style={styles.tableHeader}>Amount (INR)</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={{ color: 'black' }}>August 2021</Text>
                        <Text style={{ color: 'black' }}>10</Text>
                        <Text style={{ color: 'black' }}>5</Text>
                        <Text style={{ color: 'black' }}>50</Text>
                    </View>
                </View>
                <Text style={[styles.heading, styles.textRight]}>Total Amount: {amount} INR</Text>
            </View>
            <View>
                <TouchableOpacity onPress={handleDownloadPDF} style={{
                    backgroundColor: '#1874D2', // Custom background color
                    padding: 10,
                    margin: 10,
                    borderRadius: 10, // Rounded corners
                    alignItems: 'center',
                    borderColor: '#fff', // Border color
                    borderWidth: 2, // Border width
                    shadowColor: '#000', // Shadow color
                    shadowOffset: { width: 0, height: 2 }, // Shadow offset
                    shadowOpacity: 0.3, // Shadow opacity
                    shadowRadius: 4, // Shadow radius
                    elevation: 5, // Android elevation
                }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }}>Download PDF</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6F6F6',
        padding: 10,
    },
    brandSection: {
        backgroundColor: '#0d1033',
        paddingVertical: 10,
        paddingHorizontal: 40,
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
    },
    col6: {
        width: '50%',
    },
    textWhite: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
    },
    companyDetails: {
        float: 'right',
        textAlign: 'right',
    },
    bodySection: {
        padding: 16,
        borderWidth: 1,
        borderColor: 'gray',
        marginVertical: 10,
    },
    heading: {
        fontSize: 20,
        marginBottom: 8,
        fontWeight: 'bold',
        color: 'black',
    },
    subHeading: {
        color: '#262626',
        marginBottom: 5,
    },
    tableContainer: {
        flexDirection: 'column',
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    tableHeader: {
        fontWeight: 'bold',
        color: 'black',
    },
    textRight: {
        textAlign: 'right',
        color: 'black',
    },
});

export default WaterUsageBill;
