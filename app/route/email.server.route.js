var express = require('express');
var router = express.Router();
var controller = require('../controller/email.server.controller');

router.get('/', controller.renderForm);
router.post('/', controller.sendEmail);
router.get('/track/:id', controller.emailOpen);

module.exports = router;
