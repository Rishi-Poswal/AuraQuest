// src/controllers/AuthControl/signup.js
import bcryptjs from 'bcryptjs';
import crypto from "crypto";
// import { User } from "../../models/user.model.js";
import  User  from "../../models/user.model.js";
import { Student } from '../../models/student.model.js';
import { Stats } from '../../models/stats.model.js';
import { Activity } from '../../models/activity.model.js';

import {generateTokenAndSetCookie} from "../../../utils/generateTokenAndSetCookie.js";

import {sendVerificationEmail, sendWelcomeEmail,sendPasswordResetEmail,
	sendResetSuccessEmail,
} from "../../mailtrap/emails.js"


// <-- Signup endpoint -->
export const signup = async (req, res) => {
    const { username, email, password, role, branch, batch } = req.body;
    try {
        if (!username || !email || !password || !role ) {
            throw new Error("All fields are required");
        }

        // Check for branch and batch if role is 'Student' or 'CR'
        if ((role === 'Student' || role === 'CR') && (!branch || !batch)) {
            throw new Error("Branch and batch are required for Student or CR roles");
        }

        const userAlreadyExists = await User.findOne({ $or: [{ email }, { username }] });
        if (userAlreadyExists) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        const userData = {
            username,
            email,
            password: hashedPassword,
            role,
           
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
        };

        const user = new User(userData);

        await user.save();

        const activityData = {
            userId:user._id
        }
        
        // Add branch and batch if role is Student or CR
        if (role === 'Student' || role === 'CR') {
            const studentData = {
                userId:user._id,
                isCR: role==='CR',
                branch,
                batch
            }
            
            const student = new Student(studentData);
            await student.save();

            activityData.studentId = student._id;
            
            const stats = new Stats({
                studentId: student._id,
            });

            await stats.save();
            
        }

        const activity = new Activity(activityData);
        await activity.save();

        // Generate and set JWT token
        generateTokenAndSetCookie(res, user._id);

        // Send verification email
        await sendVerificationEmail(user.email, verificationToken);

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
               
            },
        });
    } catch (error) {
        console.log('error here in signup',error);
        
        res.status(400).json({ success: false, message: error.message });
    }
};


// <-- verify email end point -->
export const verifyEmail = async (req, res) => {
    const { code } = req.body;
    try {
        // Add better error logging
        console.log(`Attempting to verify email with code: ${code}`);

        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: new Date() }, // Use new Date() for proper comparison
        });

        if (!user) {
            // Add detailed error logging
            console.log('Verification failed. User not found or token expired.');
            const expiredUser = await User.findOne({ verificationToken: code });
            if (expiredUser) {
                console.log('Token found but expired at:', expiredUser.verificationTokenExpiresAt);
            }
            
            return res.status(400).json({ 
                success: false, 
                message: "Invalid or expired verification code" 
            });
        }

        // Update user verification status
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();

        // Send welcome email with proper error handling
        try {
            await sendWelcomeEmail(user.email, user.firstName); // Use firstName instead of name
        } catch (emailError) {
            console.error('Welcome email failed but verification succeeded:', emailError);
            // Continue with verification success response even if welcome email fails
        }

        res.status(200).json({
            success: true,
            message: "Email verified successfully",
            user: {
                ...user.toObject(),
                password: undefined,
            },
        });
    } catch (error) {
        console.error("Error in verifyEmail:", error);
        res.status(500).json({ 
            success: false, 
            message: "Server error during verification",
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};


// <-- forgot password endpoint -->

export const forgotPassword = async (req, res) => {
	const { email } = req.body;
	try {
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({ success: false, message: "User not found" });
		}

		// Generate reset token
		const resetToken = crypto.randomBytes(20).toString("hex");
		const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

		user.resetPasswordToken = resetToken;
		user.resetPasswordExpiresAt = resetTokenExpiresAt;

		await user.save();

		// send email
		await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URI}/reset-password/${resetToken}`);

		res.status(200).json({ success: true, message: "Password reset link sent to your email" });
	} catch (error) {
		console.log("Error in forgotPassword ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};

// <-- reset password endpoint -->
export const resetPassword = async (req, res) => {
	try {
		const { token } = req.params;
		const { password } = req.body;

		const user = await User.findOne({
			resetPasswordToken: token,
			resetPasswordExpiresAt: { $gt: Date.now() },
		});

		if (!user) {
			return res.status(400).json({ success: false, message: "Invalid or expired reset token" });
		}

		// update password
		const hashedPassword = await bcryptjs.hash(password, 10);

		user.password = hashedPassword;
		user.resetPasswordToken = undefined;
		user.resetPasswordExpiresAt = undefined;
		await user.save();

		await sendResetSuccessEmail(user.email);

		res.status(200).json({ success: true, message: "Password reset successful" });
	} catch (error) {
		console.log("Error in resetPassword ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};

export const checkAuth = async (req, res) => {
	try {
		const user = await User.findById(req.userId).select("-password");
		if (!user) {
			return res.status(400).json({ success: false, message: "User not found" });
		}

		res.status(200).json({ success: true, user });
	} catch (error) {
		console.log("Error in checkAuth ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};

