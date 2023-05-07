import nodemailer from "nodemailer";
import dotenv from "dotenv";
import * as mailConstants from "../utils/constants.js";

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
            `,
        });
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
            `,
        });
    }
    async sendRoleRequestingMail(to, role, displayname) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: `${mailConstants.subjectRoleRequest}`,
            text: "",
            html: `
            <div>
                <h1>${mailConstants.greetingsName} ${displayname}</h1>
                <span>${mailConstants.bodyRoleRequestPart1} ${role} ${mailConstants.bodyRoleRequestPart2}</span>
            </div>
            `,
        });
    }
    async sendApproveRoleMail(to, role, displayname) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: `${mailConstants.subjectRoleRequest}`,
            text: "",
            html: `
                <div>
                <h1>${mailConstants.greetingsName} ${displayname}</h1>
                <span>${mailConstants.bodyRoleRespondApprove} ${role}</span>
                </div>
                `,
        });
    }

    async sendRejectRoleMail(to, role, displayname) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: `${mailConstants.subjectRoleRequest}`,
            text: "",
            html: `
            <div>
            <h1>${mailConstants.greetingsName} ${displayname}</h1>
            <span>${mailConstants.bodyRoleRespondReject} ${role}</span>
            </div>
            `,
        });
    }
}

export default new MailService();