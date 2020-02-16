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
  Goods.find({}, function (err, doc) {
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
