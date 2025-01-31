import User from "../models/user.model.js";

export const checkAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);

        if (user.role !== "admin") {
            return res.status(403).json({ message: "Admin access required" });
        }

        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};
