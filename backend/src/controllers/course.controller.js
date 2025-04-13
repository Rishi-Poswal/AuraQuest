import { get } from "mongoose";
import { Course } from "../models/course.model.js";
import { Student } from "../models/student.model.js";
import { Assignment } from "../models/assignment.model.js";
import { Chapter } from "../models/chapter.model.js";

// Add Course (Only Admins)
export const addCourse = async (req, res) => {
    try {
        // if (req.user.role !== "admin") {
        //     return res.status(403).json({ message: "Access denied. Only admins can add courses." });
        // }
        console.log(req.body)

        
        const {
            uploadedBy,
            title,
            code,
            description,
            credits,
            branch,
            semester,
            faculties = [],
            announcements = [],
            chapters = [],
            assignments = []
        } = req.body;

    
        // Validate required fields
        if (!title || !code  || !description || credits==null || !branch || semester==null) {
            return res.status(400).json({ message: "All required fields must be provided." });
        }
     
        // Create the new course
        const newCourse = new Course({
            uploadedBy,
            title,
            code,
            description,
            credits,
            branch,
            semester,
            faculties,
            Announcements: announcements,
            chapters,
            assignments
        });
       
        // Save the new course to the database
        await newCourse.save();
        // Return a success response
        res.status(201).json({ message: "Course added successfully", course: newCourse });
    } catch (error) {
        // Return an error response in case of failure
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


export const getCourse = async (req, res) => {

    const user = req.user;
    const userId = user._id;
    const role = user.role;
    try {
        let courses = [];

        if (role === "admin") {
            // Admin: return all courses
            courses = await Course.find()
                .populate("uploadedBy", "username email");
                // faculties are just strings, already included
        } 
        
        else if (role === "Student") {
            // Get student info
            const student = await Student.findOne({ userId });
            if (!student) {
                return res.status(404).json({ message: "Student not found" });
            }

            // Get courses matching student's branch and semester
            courses = await Course.find({
                branch: student.branch,
                semester: student.semester
            }).populate("uploadedBy", "username email");
        } 
        
        else {
            return res.status(403).json({ message: "Unauthorized role." });
        }

        // No need to do anything special for faculties (they're already in the schema as strings)
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const getCourseByCode = async (req, res) => {
    try {
      const { code } = req.params;
  
      if (!code) {
        return res.status(400).json({ message: "Course code is required." });
      }
  
      const course = await Course.findOne({ code: code.toUpperCase() }) // Ensure case consistency
        .populate("uploadedBy", "username email")
        .populate("chapters")
        .populate("assignments");
  
      if (!course) {
        return res.status(404).json({ message: "Course not found." });
      }
  
      res.status(200).json(course);
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  };