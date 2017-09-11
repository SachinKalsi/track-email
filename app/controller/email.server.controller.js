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
        .then(() => {
            sendEmail();
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

    function emailSentStatus(error) {
        if (error) {
            email.status = 'failed';
            email.error = error;
            email.save();
            logger.error(error);
            res.json({success: false, error: error});
        } else{
            res.json({success: true, id : email.id});
        }
    }
};

module.exports.emailOpen = function(req, res) {
    if(checkForValidMongoId.test(req.params.id)) {
        Email.findOne({ _id: req.params.id, status: {$ne: 'opened'} }).then((email) => {
            if(email){
                email.openedDate = new Date();
                email.status = 'opened';
                email.save();
                acknowledge(email);
            }
        });
    }
    res.redirect(`/${process.env.IMAGE_NAME}`);
};

function acknowledge(emailDetails) {
    const options = {
        to: process.env.EMAIL,
        subject: `${emailDetails.to} has opened email`,
        html: `${emailDetails.to} has opened email an with the subject line <b>${emailDetails.subject}</b>
        <p>Email Read Time: <b>${emailDetails.openedDate}</b></p>`
    };
    emailUtil.sendEmail(options, function(error) {
        if(error) {
            logger.error(error);
        } else {
            logger.info('ACK email has been sent');
        }
    });
}
