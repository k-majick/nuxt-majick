const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const emailTo = process.env.EMAIL;
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectUrl = process.env.REDIRECT_URL;
const refreshToken = process.env.REFRESH_TOKEN;

const {
    google
} = require('googleapis');
const OAuth2 = google.auth.OAuth2
const oauth2Client = new OAuth2(
    clientId,
    clientSecret,
    redirectUrl
)

oauth2Client.setCredentials({
    refresh_token: refreshToken
})
const accessToken = oauth2Client.getAccessToken();

router.post('/send-email', function(req, res, next) {
    sendEmail(req.fields)
    res.status(201).json({
        status: 'success'
    });
});

const sendEmail = (data) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: emailTo,
            clientId: clientId,
            clientSecret: clientSecret,
            refreshToken: refreshToken,
            accessToken: accessToken
        }
    });

    const mailOptions = {
        from: `${data.name} <${data.email}>`,
        to: emailTo,
        subject: `Message from <${data.email}>`,
        generateTextFromHTML: true,
        html: data.message
    };

    transporter.sendMail(mailOptions, (error, res) => {
        error ? console.log(error) : console.log('Message %s sent: %s', res.messageId, res.response);
        smtpTransport.close();
    });
}

module.exports = router;
