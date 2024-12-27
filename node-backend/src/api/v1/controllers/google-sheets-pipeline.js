const { sequelize } = require('../../../sequelize/config');
const { GoogleSheetsPipeline } = require('../../../sequelize/models');
const { redisClient } = require('../../../redis');
const { ResponseError } = require('../../../utils');

exports.getAllItemsInPipeline = async (req, res, next) => {
  try {
    const result = [];
    for await (const key of redisClient.scanIterator()) {
      result.push(JSON.parse(await redisClient.get(key)));
    }

    res.status(201).json({
      status: true,
      message: 'Latest Pipeline Data',
      data: [...result]
    });
  } catch (err) {
    next(new ResponseError(err.message));
  }
};

exports.addItemToPipeline = async (req, res, next) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const { itemId } = req.body;

      const newItemInPipeline = await GoogleSheetsPipeline.create(
        { itemId },
        { transaction: t }
      );

      // todo: manually start a worker theread

      // add task to cronjob that will run immediately
      // await cronJobs.add({
      //   name: `google-sheets-data-extraction-${itemId}`,
      //   worker: {
      //     workerData: {
      //       itemId: itemId
      //     }
      //   }
      // });

      return newItemInPipeline;
    });

    res.status(202).json({
      status: true,
      message: 'Item added to pipeline',
      data: {
        item: result.itemId
      }
    });
  } catch (err) {
    next(new ResponseError(err.message));
  }
};

exports.deleteItemFromPipeline = async (req, res, next) => {
  try {
    await GoogleSheetsPipeline.destroy({
      where: { itemId: req.params.itemId }
    });

    await redisClient.del(req.params.itemId);

    res.status(204).json({
      status: true,
      message: 'Item removed from pipeline',
      data: {
        itemId: req.params.itemId
      }
    });
  } catch (err) {
    next(new ResponseError(err.message));
  }
};
