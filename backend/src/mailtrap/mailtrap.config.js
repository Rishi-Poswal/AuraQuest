// email.config.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// require('dotenv').config();

const emailConfig = {
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_APP_PASSWORD
    }
};

export const emailTransporter = nodemailer.createTransport(emailConfig);