const express = require('express');

const router = express.Router();

const db = require('./db');

router.get('/employees', function (req, res, next) {
    var sql = 'SELECT * FROM employee';
    db.query(sql, function(err, data, fields) {
        if (err) throw err;
        res.render('employees', { title: 'Employees', userData: data});
    });
});

module.exports = router;