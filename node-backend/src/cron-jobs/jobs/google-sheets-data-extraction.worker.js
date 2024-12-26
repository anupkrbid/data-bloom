const { isMainThread, parentPort, workerData } = require('worker_threads');
const { GoogleSheetsReader } = require('./google-sheets-reader');
const {
  redisClient,
  connectRedisClient,
  disconnectRedisClient
} = require('../../redis');

const { GoogleSheetsPipeline } = require('../../sequelize/models');
const { isDefinedAndNotNull } = require('../../utils');

if (!isMainThread) {
  process.on('uncaughtException', (err, origin) => {
    console.log('Google Sheets Data Extraction Worker: uncaughtException', err);

    cancel();
  });

  process.on('unhandledRejection', (reason, promise) => {
    console.log(
      '========================== unhandledRejection ========================= unhandledRejection =========================\n',
      err
    );
    cancel();
  });

  console.log('Google Sheets Data Extraction Worker Running on Worker Thread');
  (async () => {
    let spreadsheetIds = [];

    console.log('workerData', workerData.itemId);

    if (isDefinedAndNotNull(workerData.itemId)) {
      spreadsheetIds.push(workerData.itemId);
    } else {
      spreadsheetIds = await GoogleSheetsPipeline.findAll({
        attributes: ['itemId']
      }).then((data) => data.map((d) => d.itemId));
    }

    if (!process.env.BASE64_ENCODED_GOOGLE_SERVICE_ACCOUNT) {
      throw new Error(
        'BASE64_ENCODED_GOOGLE_SERVICE_ACCOUNT environment variable is not set'
      );
    }

    const decodedServiceAccount = Buffer.from(
      process.env.BASE64_ENCODED_GOOGLE_SERVICE_ACCOUNT,
      'base64'
    ).toString('utf-8');
    const credentials = JSON.parse(decodedServiceAccount);

    const reader = new GoogleSheetsReader(credentials);
    await reader.initialize();

    console.log('spreadsheetIds', spreadsheetIds);

    if (!redisClient.isOpen) {
      console.error('Redis client is closed. Reconnecting...');
      await connectRedisClient();
    }

    for await (const spreadsheetId of spreadsheetIds) {
      const data = await reader.readSheet(spreadsheetId);

      await redisClient.set(spreadsheetId, JSON.stringify(data));
    }

    await disconnectRedisClient();

    console.log('Data Added to Redis');

    // signal to parent that the job is done
    if (parentPort) {
      parentPort.postMessage('done');
    } else {
      process.exit(0);
    }
  })();
} else {
  console.log('Google Sheets Data Extraction Worker Running on Main Thread');
}
function cancel() {
  // do cleanup here
  // (if you're using @ladjs/graceful, the max time this can run by default is 5s)

  // send a message to the parent that we're ready to terminate
  // (you could do `process.exit(0)` or `process.exit(1)` instead if desired
  // but this is a bit of a cleaner approach for worker termination
  if (parentPort) {
    parentPort.postMessage('cancelled');
  } else {
    process.exit(0);
  }
}
