const express = require('express');

const {
  getAllItemsInPipeline,
  addItemToPipeline,
  deleteItemFromPipeline
} = require('../controllers/google-sheets-pipeline');

const router = express.Router();

router.get('/', getAllItemsInPipeline);
router.post('/', addItemToPipeline);
router.delete('/items/:itemId', deleteItemFromPipeline);

module.exports = router;
