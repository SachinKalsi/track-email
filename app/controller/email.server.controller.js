const Email = require('../model/email.server.model');
const logger = require('../../config/logger');
const emailUtil = require('../../util/send_email');
const checkForValidMongoId = new RegExp('^[0-9a-fA-F]{24}$');

module.exports.renderForm = function(req, res) {
    res.send('API Details');
};

module.exports.sendEmail = function(req, res) {
    const email = new Email(req.body);
    email.save()
        .then(savedEmail => {
            sendEmail();
            res.json({success: true, id : savedEmail.id});
        })
        .catch(e => res.json({success: false, error: e.message}));

    function sendEmail() {
        emailUtil.sendEmail({
            id: email._id,
            to: email.to,
            subject: email.subject,
            html: email.html || ''
        }, emailSentStatus );
    }

    function emailSentStatus(error, info) {
        if (error) {
            email.status = 'failed';
            email.error = error;
            email.save();
            logger.error(error);
        }
    }
};

module.exports.emailOpen = function(req, res) {
    checkForValidMongoId.test(req.params.id) && Email.findOneAndUpdate({_id: req.params.id, openedDate: null}, {$set: {openedDate: new Date(), status: 'opened'}}).then(()=>{});
    res.redirect(`/${process.env.IMAGE_NAME}`);
};
