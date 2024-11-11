import { Student } from "../../models/student.model.js"
import User from "../../models/user.model.js"
import { Stats } from "../../models/stats.model.js";
import protectRoute from "../../middlewares/protectRoute.js";
import { Activity } from "../../models/activity.model.js";


const getStudentStats = async (req, res)=>{
    try{
        // console.log(req.user);
        const user = req.user;

        const student = await Student.findOne({userId: user._id});

        if(!student){
            console.log(`student not found in getStudentStats`);
            return res.status(400).json({ success: false, message:  "student not found with given id" });   
        }

        const stats = await Stats.findOne({studentId:student._id});

        if(stats){
            res.status(200).json({
                success: true,
                data: stats
            });
        }
        else{
            console.log(`no stats found`);
            return res.status(400).json({ success: false, message:  "stats not found" });   
        }
    }
    catch(error){
        console.log('error here in getStudentStats', error);
        res.status(400).json({ success: false, message: error.message });
    }
}

const getStudentAttendance = async (req,res) =>{
    try{
        const user = req.user;
        const student = await Student.findOne({userId: user._id});

        if(!student){
            console.log(`student not found in getStudentAttendance`);
            return res.status(400).json({ success: false, message:  "student not found with given id to get attendance" });   
        }

        res.status(200).json({
            success:true,
            data:student.attendance
        })

    }
    catch(error){
        console.log('error here in getStudentAttendance', error);
        res.status(400).json({ success: false, message: error.message });
    }
}

const getAuraDistribution = async (req,res) =>{
    try{
        const user = req.user;

        const student = await Student.findOne({userId:user._id})
        if(!student){
            console.log(`student not found in getAuraDistribution`);
            return res.status(400).json({ success: false, message:  "student not found with given id" });   
        }

        const currAura=student.aura;
        
        const students = await Student.find({}, { aura: 1, _id: 0 }); 

        const auraData = [
            { range: '< 100', users: 0 },
            { range: '100 - 200', users: 0 },
            { range: '200 - 300', users: 0 },
            { range: '300 - 400', users: 0 },
            { range: '400 - 500', users: 0 },
            { range: '500 - 600', users: 0 },
            { range: '600 - 700', users: 0 },
            { range: '700 - 800', users: 0 },
            { range: '800 - 900', users: 0 },
            { range: '900 - 1000', users: 0 },
            { range: '1000+', users: 0 }
        ];

        students.forEach((doc)=>{
            const aura = doc.aura;
            if(aura<100) auraData[0].users++;
            else if(aura>=100 && aura<200) auraData[1].users++;
            else if(aura>=200 && aura<300) auraData[2].users++;
            else if(aura>=300 && aura<400) auraData[3].users++;
            else if(aura>=400 && aura<500) auraData[4].users++;
            else if(aura>=500 && aura<600) auraData[5].users++;
            else if(aura>=600 && aura<700) auraData[6].users++;
            else if(aura>=700 && aura<800) auraData[7].users++;
            else if(aura>=800 && aura<900) auraData[8].users++;
            else if(aura>=900 && aura<1000) auraData[9].users++;
            else auraData[10].users++;
        })

        res.status(200).json({
            success:true,
            data:{
                currAura,
                auraData
            }
            
        })

    }
    catch(error){
        console.log('error here in getAuraDistribution', error);
        res.status(400).json({ success: false, message: error.message });
    }
}

const getStudentActivity = async (req,res)=>{
    try{
        const user = req.user;
        const activity = await Activity.findOne({userId:user._id});

        const days = activity.days

        if(!days){
            console.log(`days array not found getStudentActivity`);
            return res.status(400).json({success:false, message:"mission failed"})
        }

        res.status(200).json({
            success:true,
            data:days
        })

    }
    catch(error){
        console.log('error here in getStudentActivity', error);
        res.status(400).json({ success: false, message: error.message });
    }
}

export {getStudentStats, getStudentActivity, getStudentAttendance, getAuraDistribution}