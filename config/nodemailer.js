import nodemailer from "nodemailer";
import * as dotenv from "dotenv";
dotenv.config();

const subject = "Nuevo usuario registrado!"

const transporter  = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: (process.env.SMTP_SECURE === "true") ? true : false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
        }
    });

export const sendMail = async (text, html) => {
    let info = await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: process.env.ADMIN_MAIL,
        subject,
        text: text,
        html: html,
    });
    return info;
};