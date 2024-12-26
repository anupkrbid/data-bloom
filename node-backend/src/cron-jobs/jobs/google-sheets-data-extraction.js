const { isMainThread, parentPort } = require('worker_threads');
const { google } = require('googleapis');
const { GoogleSheetsReader } = require('./google-sheets-reader');
const path = require('path');

const { GoogleSheetsPipeline } = require('../../sequelize/models');

console.log('Data extraction running, isMainThread', isMainThread);

(async () => {
  const pipelineItemIds = await GoogleSheetsPipeline.findAll({
    attributes: ['itemId']
  }).then((data) => data.map((d) => d.itemId));

  console.log(pipelineItemIds);

  const base64EncodedServiceAccount =
    process.env.BASE64_ENCODED_GOOGLE_SERVICE_ACCOUNT;
  const decodedServiceAccount = Buffer.from(
    base64EncodedServiceAccount,
    'base64'
  ).toString('utf-8');
  const credentials = JSON.parse(decodedServiceAccount);

  console.log(credentials);

  if (!credentials) {
    throw new Error(
      'GOOGLE_SHEETS_CREDENTIALS environment variable is not set'
    );
  }

  const reader = new GoogleSheetsReader(credentials);
  await reader.initialize();

  const spreadsheetId = [pipelineItemIds[0]];

  // // Read all sheets
  const allSheetsData = await reader.readSheet(spreadsheetId);
  console.log('All sheets data:', allSheetsData);

  console.log('extractedData', JSON.parse(extractedData));

  res.send('Successfully submitted! Thank you!');

  // signal to parent that the job is done
  if (parentPort) {
    parentPort.postMessage('done');
  } else {
    process.exit(0);
  }
})();

// function cancel() {
//   // do cleanup here
//   // (if you're using @ladjs/graceful, the max time this can run by default is 5s)

//   // send a message to the parent that we're ready to terminate
//   // (you could do `process.exit(0)` or `process.exit(1)` instead if desired
//   // but this is a bit of a cleaner approach for worker termination
//   if (parentPort) {
//     parentPort.postMessage('cancelled');
//   } else {
//     process.exit(0);
//   }
// }
