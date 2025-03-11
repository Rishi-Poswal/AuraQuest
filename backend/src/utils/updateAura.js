import { Activity } from "../models/activity.model.js";
import { Stats } from "../models/stats.model.js";
import { Student } from "../models/student.model.js";


const updateAura = async (userId, incAura) =>{
    try{
        const student = await Student.findOne({ userId });
        if (!student) return res.status(404).json({ message: 'Student not found' });

        const student_stat = await Stats.findOneAndUpdate(
          { studentId: student._id },
          { $inc: { aura: incAura } },
          { new: true, upsert: true } // `upsert: true` ensures the stat document is created if it doesn't exist
        );

        if (!student_stat) {
            throw new Error("Student stat not found.");
        }
    
        student.aura += incAura;
        await student.save();

        const today = new Date();
        today.setUTCHours(0, 0, 0, 0);

        let activity = await Activity.findOne({ studentId: student._id, userId });

        if(!activity){
            activity = new Activity({
                studentId:student._id,
                userId,
                days:[{date:today, auraGained:incAura}]
            })
        }else {
            // Check for today's entry exists
            const todayEntry = activity.days.find(day =>
                day.date.toISOString().split("T")[0] === today.toISOString().split("T")[0]
            );

            if (todayEntry) {
                todayEntry.auraGained += incAura; 
            } else {
                activity.days.push({ date: today, auraGained: incAura }); // Add new date entry
            }
        }

        await activity.save();

    }catch(error){
        console.error("Error updating aura :", error);
        throw error;
    }
};

export {updateAura};