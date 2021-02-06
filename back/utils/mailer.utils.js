const nodemailer = require('nodemailer');

class MailerUtils {
    static async sendMailVerification(userEmail, code, isPwdReset) {
        let message;

        const transporter = nodemailer.createTransport({
            host: process.env.AWS_SMTP_HOST,
            secure: false,
            port: process.env.AWS_SMTP_PORT,
            auth: {
                user: process.env.AWS_SMTP_USERNAME,
                pass: process.env.AWS_SMTP_PASSWORD
            }
        });

        if(isPwdReset === false) {
            message = {
                from: process.env.AWS_SMTP_ADDRESS,
                to: userEmail,
                subject: "Todo List App - Account Verification",
                text: `
                Welcome to Todo List App !
                You created a account in our application.
                Enter the following code in your profile.
                ${code}
              
                Do not reply to this e-mail address, the messages won't be replied to.
                Sincerely yours,
                The Todo List App Team.
             `
            }
        }else {
            message = {
                from: process.env.AWS_SMTP_ADDRESS,
                to: userEmail,
                subject: "Todo List App - Reset Password",
                text: `
                If you don't request a new password for Todo List App, please ignore this e-mail.
                
                You have requested a new password, and here it is the verification code:
                ${code}
                
                Do not reply to this e-mail address, the messages won't be replied to.
                Sincerely yours,
                The TodoList App Team.
             `
            };
        }
        await transporter.sendMail(message,(err, info) => {
            if(err) {
                console.log(err);
            } else {
                console.log(info.envelope);
            }
        });
    }
}

module.exports = MailerUtils;
