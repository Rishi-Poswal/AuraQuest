import bcryptjs from 'bcryptjs';
// import { User } from "../../models/user.model.js";
import  User  from "../../models/user.model.js";

import {generateTokenAndSetCookie} from "../../../utils/generateTokenAndSetCookie.js";




export const login = async (req, res) => {
	const { email, password } = req.body;
	try {
		//check if user exists
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ success: false, message: "Invalid credentials" });
		}

		//Validate password
		const isMatch = await bcryptjs.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ success: false, message: "Invalid credentials" });
		}
		
		//generate token and set cookie
		generateTokenAndSetCookie(res, user._id);

		user.lastLogin = new Date();
		await user.save();

		//send success response
		res.status(200).json({
			success: true,
			role: user.role,
			message: "Logged in Successfully",
			user: {
				...user._doc,
				password: undefined,
			},
		});
	} catch (error) {
		console.log("Error in Login ", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

