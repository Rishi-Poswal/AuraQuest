import { Student } from "../../models/student.model.js";

const get_leaderboard = async (req, res) => {
	try {
		const userId = req.user._id;

		const students = await Student.find({})
			.sort({ aura: -1 })
			.populate({
				path: "userId",
				select: "username profilePic", // only fetch username
			})
			.select("aura batch branch userId"); // relevant fields sirf

		const leaderboard = students.map((student, index) => ({
			name: student.userId?.username || "Unknown",
			aura: student.aura,
			batch: student.batch,
			branch: student.branch,
            profilePic:student.userId.profilePic,
			rank: index + 1,
			userId: student.userId?._id
		}));

		const currentUserEntry = leaderboard.find((entry) => String(entry.userId) === String(userId));

		res.status(200).json({
			success: true,
			leaderboard,
			currentUser: currentUserEntry || null
		});
	} catch (err) {
		console.error('Error in leaderboard backend : ',err);
		res.status(500).json({
			success: false,
			message: "Error fetching leaderboard"
		});
	}
};

export {get_leaderboard}