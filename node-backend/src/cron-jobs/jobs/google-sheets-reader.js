const { google } = require('googleapis');

class GoogleSheetsReader {
  constructor(credentials) {
    this.credentials = credentials;
    this.auth = null;
    this.sheets = null;
  }

  async initialize() {
    try {
      // Create auth client using credentials
      this.auth = new google.auth.GoogleAuth({
        credentials: this.credentials,
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
      });

      // Initialize the sheets API client
      this.sheets = google.sheets({ version: 'v4', auth: this.auth });
    } catch (error) {
      throw new Error(`Failed to initialize: ${error.message}`);
    }
  }

  async getSheetMetadata(spreadsheetId) {
    try {
      // Fetch the spreadsheet metadata to get all sheet names and their properties
      const response = await this.sheets.spreadsheets.get({
        spreadsheetId
      });

      return {
        fileName: response.data.properties.title,
        sheets: response.data.sheets.map((sheet) => ({
          sheetId: sheet.properties.sheetId,
          title: sheet.properties.title,
          gridProperties: sheet.properties.gridProperties
        }))
      };
    } catch (error) {
      throw new Error(`Failed to get sheet metadata: ${error.message}`);
    }
  }

  async getSheetDimensions(spreadsheetId, sheetNo) {
    try {
      // Get the data range for the specified sheet
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId,
        range: sheetNo
      });

      const values = response.data.values || [];
      const rowCount = values.length;
      const colCount = values.reduce(
        (max, row) => Math.max(max, row.length),
        0
      );

      return {
        rowCount,
        colCount,
        lastColumn: this.columnNumberToLetter(colCount)
      };
    } catch (error) {
      throw new Error(`Failed to get sheet dimensions: ${error.message}`);
    }
  }

  columnNumberToLetter(columnNumber) {
    let letter = '';
    while (columnNumber > 0) {
      const remainder = (columnNumber - 1) % 26;
      letter = String.fromCharCode(65 + remainder) + letter;
      columnNumber = Math.floor((columnNumber - 1) / 26);
    }
    return letter;
  }

  async readSheet(spreadsheetId, sheetNo = null) {
    try {
      // If no sheet title is provided, get all sheets
      const metadata = await this.getSheetMetadata(spreadsheetId);
      const sheets = metadata.sheets;

      if (sheets.length === 0) {
        throw new Error('No sheets found in the spreadsheet');
      }

      // If no specific sheet is requested, process all sheets
      const sheetsToProcess = sheetNo
        ? [sheets.find((s) => s.title === sheetNo)]
        : sheets;

      if (sheetNo && !sheetsToProcess[0]) {
        throw new Error(`Sheet "${sheetNo}" not found`);
      }

      const result = {
        spreadsheetId,
        fileName: metadata.fileName, // Add this line
        sheets: {}
      };

      // Process each sheet
      for (const sheet of sheetsToProcess) {
        // Get the dimensions of the sheet
        const dimensions = await this.getSheetDimensions(
          spreadsheetId,
          sheet.title
        );

        // Construct the range string (e.g., "Sheet1!A1:Z100")
        const range = `${sheet.title}!A1:${dimensions.lastColumn}${dimensions.rowCount}`;

        // Fetch the data for this range
        const response = await this.sheets.spreadsheets.values.get({
          spreadsheetId,
          range
        });

        const values = response.data.values || [];
        if (values.length === 0) {
          result.sheets[sheet.title] = [];
          continue;
        }

        // Get headers and data rows
        const [headers, ...rows] = values;

        // Transform data into objects
        const jsonData = rows.map((row) => {
          const obj = {};
          headers.forEach((header, index) => {
            const cleanHeader = header.trim().replace(/\s+/g, '_');
            obj[cleanHeader] = row[index] || null;
          });
          return obj;
        });

        result.sheets[sheet.title] = jsonData;
      }

      // If a specific sheet was requested, return just that sheet's data
      return result;
    } catch (error) {
      throw new Error(`Failed to read sheet: ${error.message}`);
    }
  }
}

module.exports = { GoogleSheetsReader };
