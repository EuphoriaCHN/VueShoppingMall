/**
 * 一级路由：/goods
 * @type {createApplication}
 */

const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Goods = require('../models/goods');

const databaseConf = require('../config/mongodb.config');

mongoose.connect(databaseConf.getConnectionURL());

mongoose.connection.on('connected', function () {
  console.log('connect db successful!');
});

mongoose.connection.on('error', function () {
  console.error('connect db fail');
});

mongoose.connection.on('disconnected', function () {
  console.error('disconnect db');
});

/* GET home page. */
router.get('/', function (req, res, next) {
  let sort = parseInt(req.query['sort']);
  let page = parseInt(req.query['page']);
  let pageSize = parseInt(req.query['pageSize']);
  let priceChecked = req.query['priceChecked'];
  let skip = (page - 1) * pageSize;

  let params = {};

  let minPrice, maxPrice;
  if (priceChecked !== 'all') {
    switch (priceChecked) {
      case '0':
        minPrice = 0;
        maxPrice = 100;
        break;
      case '1':
        minPrice = 100;
        maxPrice = 500;
        break;
      case '2':
        minPrice = 500;
        maxPrice = 1000;
        break;
      case '3':
        minPrice = 1000;
        maxPrice = 5000;
        break;
    }
    params.salePrice = {
      $gt: minPrice,
      $lt: maxPrice
    };
  }

  let goodsModel = Goods.find(params).skip(skip).limit(pageSize);
  goodsModel.sort({'salePrice': sort});
  goodsModel.exec({}, function (err, doc) {
    if (err) {
      res.json({status: "500", message: err.message});
    }
    res.json({
      status: "200", message: '', result: {
        count: doc.length,
        list: doc
      }
    });
  });
});

module.exports = router;
