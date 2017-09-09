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
    const imageUrl = process.env.URL + options.id;
    const imageTag = `<img src=${imageUrl} alt="image barlilla" height="1" width="1">`;

    // var mailOptions = {
    //     from: 'sachinkalsi02@gmail.com',
    //     to: 'sachinkalsi15@gmail.com',
    //     subject: 'Email Test',
    //     html: `
    //     <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf66Ol6NAa6sdNhDJT0z1fVfTmjPjxAHkopPwExZ9AqHSqNzHP" alt="image barlilla" height="1" width="1">
    //
    //     <b>JUST TRACK EMAIL</b>
    //     `};

    var mailOptions = {
        from: process.env.EMAIL,
        to: options.to,
        subject: options.subject,
        html: imageTag + html
    };
    transporter.sendMail(mailOptions, callback);
};
