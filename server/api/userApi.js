var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');

//使用连接池链接数据库
var pool = mysql.createPool(models.mysql);

var jsonWrite = function(res, ret) {
    if (typeof ret === 'undefined') {
        res.json({
            code: '1',
            msg: '操作失败'
        });
    } else {
        // 发送一个json的响应。这个方法和将一个对象或者一个数组作为参数传递给res.send()方法的效果相同。
        res.json(ret);
    }
};

//Vue_blog接口

// 查询用户接口
router.use('/getUser', (req, res) => {
    var sql = '';
    // console.log('req       '+req.query.type);
    let params = req.query
    let type=params.type
    if(type==='0'){
        // console.log('req0       '+req.query.type);
        sql = $sql.user.getUserList0;
    }else{
        // console.log('req1       '+req.query.type);
        sql = $sql.user.getUserList1;
    }
    pool.query(sql, [1,type,params.user_name,params.skill_name,params.position], function(error, results, fields) {
        // pool.query(sql, ['','',''], function(error, results, fields) {
            if (error) throw error;
            // console.log(results);
            if (results) {
                res.send(results);
                // console.log('result......'+results)
                // jsonWrite(res, results);
            }
        })
});

router.use('/getSkill', (req, res) => {
    var sql = $sql.skills.getSkillsList;
    // var params = req.body;
    // console.log(params);
    pool.query(sql, function(error, results, fields) {
    // pool.query(sql, ['','',''], function(error, results, fields) {
        if (error) throw error;
        // console.log(results);
        if (results) {
            // res.send(results);
            // console.log('result......'+results)
            // jsonWrite(res, results);
        }
    })
});
router.use('/getJobs', (req, res) => {
    var sql = $sql.jobs.getJobsList;
    // var params = req.body;
    // console.log(params);
    pool.query(sql, function(error, results, fields) {
    // pool.query(sql, ['','',''], function(error, results, fields) {
        if (error) throw error;
        // console.log(results);
        if (results) {
            res.send(results);
            // console.log('result......'+results)
            // jsonWrite(res, results);
        }
    })
});
module.exports = router;