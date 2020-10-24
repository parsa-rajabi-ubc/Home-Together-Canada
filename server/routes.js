
let mw = require('./middleware')
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

/* GET users listing. */
router.get('/user/', mw.isAuth, function(req, res, next) {
    res.status(200).json({title: req.msg});
});



module.exports = router;
