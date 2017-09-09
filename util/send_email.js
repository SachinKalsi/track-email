const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

module.exports.sendEmail = function(options, callback){
    const html = options.html || '';
    const imageUrl = process.env.URL + 'track/' + options.id;
    const imageTag = `<img src=${imageUrl} height="1" width="1">`;

    var mailOptions = {
        from: process.env.EMAIL,
        to: options.to,
        subject: options.subject,
        html: imageTag + html
    };
    transporter.sendMail(mailOptions, callback);
};
