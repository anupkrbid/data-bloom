const Bree = require('bree');
const path = require('path');

const bree = new Bree({
  outputWorkerMetadata: false,
  root: path.resolve(__dirname, 'jobs'),
  jobs: [
    {
      name: 'google-sheets-data-extraction.worker',
      interval: '1h'
    }
  ],
  errorHandler: (error, workerMetadata) => {
    // workerMetadata will be populated with extended worker information only if
    // Bree instance is initialized with parameter `workerMetadata: true`
    if (workerMetadata.threadId) {
      console.info(
        `There was an error while running a worker ${workerMetadata.name} with thread ID: ${workerMetadata.threadId}`
      );
    } else {
      console.info(
        `There was an error while running a worker ${workerMetadata.name}`
      );
    }

    console.error(error);
  }
});

bree.on('worker created', (name) => {
  console.log('worker created', name);
});

bree.on('worker deleted', (name) => {
  console.log('worker deleted', name);
});

module.exports = {
  cronJobs: bree
};
