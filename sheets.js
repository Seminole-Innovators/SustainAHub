const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const { GoogleAuth } = require('google-auth-library');

// Path to your service account credentials file
const CREDENTIALS_PATH = 'credentials.json';
const SPREADSHEET_ID = '168SG3XFFuA4laHlhLX4Woj-v2nn-d3mKwNa4t8PzMHA';

// Authenticate using the service account credentials
async function authenticate() {
    const auth = new GoogleAuth({
        keyFile: CREDENTIALS_PATH,
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    return auth.getClient();
}

// Get data from Google Sheets
async function getSheetData() {
    const authClient = await authenticate();
    const sheets = google.sheets({ version: 'v4', auth: authClient });

    try {
        // Read the sheet's data
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range: 'Sheet1', // Sheet name or range
        });

        const rows = response.data.values;

        if (rows.length) {
            const header = rows[0]; // First row is the header
            const data = rows.slice(1).map(row => {
                let record = {};
                row.forEach((cell, index) => {
                    record[header[index]] = cell;
                });
                return record;
            });

            // Save the data to a JSON file
            fs.writeFileSync('data.json', JSON.stringify(data, null, 4));
            console.log('Data has been saved to data.json');
        } else {
            console.log('No data found.');
        }
    } catch (err) {
        console.error('Error reading sheet data: ', err);
    }
}

getSheetData();
