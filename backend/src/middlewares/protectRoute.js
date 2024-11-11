import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const protectRoute = async (req, res, next) => {
	try {
        
		const token = req.cookies.token;
		if (!token) return res.status(401).json({ message: "Unauthorized", succcess:false });

		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		

		const user = await User.findById(decoded.userId).select("-password");
		
		if (!user) {        
            return res.status(401).json({message: "Invalid Access Token", succcess:false})
        }
		req.user = user;

		// console.log(req.user);

		next();
	} catch (err) {
		res.status(500).json({ message: err.message , succcess:false});
		console.log("Error in protectRoute: ", err.message);
	}
};

export default protectRoute;

// import jwt from "jsonwebtoken";

// export const protectRoute = (req, res, next) => {
// 	const token = req.cookies.token;
// 	if (!token) return res.status(401).json({ success: false, message: "Unauthorized - no token provided" });
// 	try {
// 		const decoded = jwt.verify(token, process.env.JWT_SECRET);

// 		if (!decoded) return res.status(401).json({ success: false, message: "Unauthorized - invalid token" });

// 		req.userId = decoded.userId;
// 		next();
// 	} catch (error) {
// 		console.log("Error in verifyToken ", error);
// 		return res.status(500).json({ success: false, message: "Server error" });
// 	}
// };

// export default protectRoute;