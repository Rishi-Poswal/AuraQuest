import { Student } from "../../models/student.model.js"
import User from "../../models/user.model.js"
import { Stats } from "../../models/stats.model.js";
import protectRoute from "../../middlewares/protectRoute.js";


const getStudentStats = async (req, res)=>{
    try{
        // console.log(req.user);
        const user = req.user;

        const student = await Student.findOne({userId: user._id});

        const stats = await Stats.findOne({studentId:student._id});

        if(stats){
            res.status(200).json({
                success: true,
                data: stats
            });
        }
        else{
            console.log(`no student found`);
        }
    }
    catch(error){
        console.log('error here in getStudentStats', error);
        res.status(400).json({ success: false, message: error.message });
    }
}

const getStudentAttendance = async (req,res) =>{
    try{
        
    }
    catch(error){
        
    }
}

const getAuraDistribution = async (req,res) =>{

}

const getStudentActivity = async (req,res)=>{

}

export {getStudentStats, getStudentActivity, getStudentAttendance, getAuraDistribution}