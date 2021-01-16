const nodemailer = require('nodemailer');

class MailerUtils {

    static async sendMailVerification(userEmail, code, isPwdReset) {
        let message;

        const transporter = nodemailer.createTransport({
            host: "email-smtp.eu-west-1.amazonaws.com",
            secure: false,
            port: 587,
            auth: {
                user: "AKIARWBNM4HMCDTT4EMS",
                pass: "BM/D6JlH2p6O0BkMs6OyzhsuCJerLJkBkLXvcfBYp9Qz"
            }
        });

        if(isPwdReset == false) {
            message = {
                from: "julien1105@outlook.fr",
                to: userEmail,
                subject: "TodoList App - Account Verification",
                text: `
                Welcome to TodoList App
                You create a account in our application.
                Enter the following code in your profile.
                ${code}
              
                Do not reply to this email address, the messages won't be replied to.
                Sincerly yours,
                The TodoList App Team.
             `
            }
        }else {
            message = {
                from: "julien1105@outlook.fr",
                to: userEmail,
                subject: "TodoList App - Account Verification",
                text: `
                If you have no connection to Move up please ignore this e-mail.
                You have requested a new password, and here it is:
                ${code}
                
                We recommend that you use this password temporarily and change it as you wish, when logged in.
                Do not reply to this email address, the messages won't be replied to.
                Sincerly yours,
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
