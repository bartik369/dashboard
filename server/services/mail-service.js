import nodemailer from "nodemailer";
import dotenv from 'dotenv';


class MailService {
    constructor() {
        dotenv.config();
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            // service: process.env.SMTP_SERVICE,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        });
    }

    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: "Activation account" + process.env.API_URL,
            text: "",
            html: `
            <div>
                <h1>Activate your account, please</h1>
                <a href="${link}">${link} </a>
            </div>
            `
        })
    }

    async sendResetPasswordMail(to, link) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: "Reset password",
            text: "",
            html: `
            <div>
                <h1>Reset my password</h1>
                <a href="${link}">${link} </a>
            </div>
            `
        })
    }

};

export default new MailService()