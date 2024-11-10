import {
	PASSWORD_RESET_REQUEST_TEMPLATE,
	PASSWORD_RESET_SUCCESS_TEMPLATE,
	VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplates.js";
import { emailTransporter } from "./mailtrap.config.js";
import nodemailer from 'nodemailer';





// Import the transporter
// import { emailTransporter } from './email.config';

export const sendVerificationEmail = async (email, verificationToken) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            headers: {
                'X-Category': 'Email Verification'
            }
        };

        const response = await emailTransporter.sendMail(mailOptions);
        console.log("Email sent successfully", response);
        return response;

    } catch (error) {
        console.error(`Error sending verification`, error);
        throw new Error(`Error sending verification email: ${error}`);
    }
};

export const sendWelcomeEmail = async (email, name) => {
    if (!email) {
        throw new Error('Email address is required');
    }

    try {
        const mailOptions = {
            from: {
                name: 'AuraQuest Team',
                address: process.env.EMAIL_FROM
            },
            to: {
                name: name || 'User',
                address: email
            },
            subject: 'Welcome to AuraQuest! 🎉',
            text: `Hi ${name || 'there'},\n\nWelcome to AuraQuest! We're excited to have you on board.\n\nBest regards,\nThe AuraQuest Team`,
            html: `
                <h2>Welcome to AuraQuest! 🎉</h2>
                <p>Hi ${name || 'there'},</p>
                <p>Welcome to AuraQuest! We're excited to have you on board.</p>
                <br>
                <p>Best regards,</p>
                <p>The AuraQuest Team</p>
            `
        };

        const response = await emailTransporter.sendMail(mailOptions);

        console.log('Welcome email sent successfully', {
            recipientEmail: email,
            messageId: response.messageId,
            timestamp: new Date().toISOString()
        });

        return response;
    } catch (error) {
        console.error('Failed to send welcome email', {
            recipientEmail: email,
            error: error.message,
            timestamp: new Date().toISOString()
        });

        throw new Error(`Failed to send welcome email to ${email}: ${error.message}`);
    }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
    try {
        const mailOptions = {
            from: {
                name: 'AuraQuest Team',
                address: process.env.EMAIL_FROM
            },
            to: email,
            subject: "Reset your password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            headers: {
                'X-Category': 'Password Reset'
            }
        };

        const response = await emailTransporter.sendMail(mailOptions);
        return response;
    } catch (error) {
        console.error(`Error sending password reset email`, error);
        throw new Error(`Error sending password reset email: ${error}`);
    }
};

export const sendResetSuccessEmail = async (email) => {
    try {
        const mailOptions = {
            from: {
                name: 'AuraQuest Team',
                address: process.env.EMAIL_FROM
            },
            to: email,
            subject: "Password Reset Successful",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            headers: {
                'X-Category': 'Password Reset'
            }
        };

        const response = await emailTransporter.sendMail(mailOptions);
        console.log("Password reset email sent successfully", response);
        return response;
    } catch (error) {
        console.error(`Error sending password reset success email`, error);
        throw new Error(`Error sending password reset success email: ${error}`);
    }
};