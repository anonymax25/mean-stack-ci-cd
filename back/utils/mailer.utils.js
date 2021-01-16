const nodemailer = require('nodemailer');

class MailerUtils {

    static async sendMailVerification(userEmail, code) {
        const transporter = nodemailer.createTransport({
            host: "email-smtp.eu-west-1.amazonaws.com",
            secure: false,
            port: 587,
            auth: {
                user: "AKIARWBNM4HMCDTT4EMS",
                pass: "BM/D6JlH2p6O0BkMs6OyzhsuCJerLJkBkLXvcfBYp9Qz"
            }
        });
        await transporter.sendMail({
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
        },(err, info) => {
            if(err) {
                console.log(err);
            } else {
                console.log(info.envelope);
            }
        });
    }
}

module.exports = MailerUtils;
