var express = require('express');
var path = require('path');
var router = express.Router();
var emailServerRoute = require('./email.server.route');

router.use('/', emailServerRoute);

router.get('*', function(req, res){
    res.sendFile(path.resolve(__dirname + '/../../public/404.html'));
});

module.exports = router;
