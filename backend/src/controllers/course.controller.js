import { Course } from "../models/course.model.js";

// Add Course (Only Admins)
export const addCourse = async (req, res) => {
    try {
        // if (req.user.role !== "admin") {
        //     return res.status(403).json({ message: "Access denied. Only admins can add courses." });
        // }

        const {uploadedBy, title, description, credits, branch, semester, faculties } = req.body;

        if (!title || !description || !credits || !branch || !semester) {
            return res.status(400).json({ message: "All required fields must be provided." });
        }

        const newCourse = new Course({
            uploadedBy, // Admin adding the course
            title,
            description,
            credits,
            branch,
            semester,
            faculties
        });

        await newCourse.save();
        res.status(201).json({ message: "Course added successfully", course: newCourse });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
