import {
	PASSWORD_RESET_REQUEST_TEMPLATE,
	PASSWORD_RESET_SUCCESS_TEMPLATE,
	VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplates.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
	const recipient = [{ email }];

	try {
		const response = await mailtrapClient.send({
			from: sender,
			to: recipient,
			subject: "Verify your email",
			html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
			category: "Email Verification",
		});

		console.log("Email sent successfully", response);
	} catch (error) {
		console.error(`Error sending verification`, error);

		throw new Error(`Error sending verification email: ${error}`);
	}
};
export const sendWelcomeEmail = async (email, name) => {
    if (!email) {
        throw new Error('Email address is required');
    }

    const sender = {
        email: 'hello@demomailtrap.com',
        name: 'AuraQuest Team'
    };

    // Fix: Use the passed email parameter and properly quote the name
    const recipient = [{
        email: email,
        name: name || 'User'  // Use the passed name or default to 'User'
    }];

    const emailContent = {
        from: sender,
        to: recipient,
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

    try {
        const response = await mailtrapClient.send(emailContent);
        
        // Log successful email delivery with relevant info
        console.log('Welcome email sent successfully', {
            recipientEmail: email,
            messageId: response.messageId,
            timestamp: new Date().toISOString()
        });

        return response;
    } catch (error) {
        // Log detailed error information
        console.error('Failed to send welcome email', {
            recipientEmail: email,
            error: error.message,
            timestamp: new Date().toISOString()
        });

        // Throw a more specific error
        throw new Error(`Failed to send welcome email to ${email}: ${error.message}`);
    }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
	const recipient = [{ email }];

	try {
		const response = await mailtrapClient.send({
			from: sender,
			to: recipient,
			subject: "Reset your password",
			html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
			category: "Password Reset",
		});
	} catch (error) {
		console.error(`Error sending password reset email`, error);

		throw new Error(`Error sending password reset email: ${error}`);
	}
};

export const sendResetSuccessEmail = async (email) => {
	const recipient = [{ email }];

	try {
		const response = await mailtrapClient.send({
			from: sender,
			to: recipient,
			subject: "Password Reset Successful",
			html: PASSWORD_RESET_SUCCESS_TEMPLATE,
			category: "Password Reset",
		});

		console.log("Password reset email sent successfully", response);
	} catch (error) {
		console.error(`Error sending password reset success email`, error);

		throw new Error(`Error sending password reset success email: ${error}`);
	}
};