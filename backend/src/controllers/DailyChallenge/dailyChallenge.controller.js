import { Groq } from "groq-sdk";
import {Challenge} from "../../models/dailyChallenge.js";
import { DailySubmission } from "../../models/dailySubmission.js";
import cron from "node-cron";
import { updateAura } from "../../utils/updateAura.js";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

//Generate daily challenge
const gen_daily_challenge = async (req,res) =>{
    try{
        const { topic, difficulty } = req.body;
        const prompt = `Generate a ${difficulty} difficulty coding challenge on ${topic}. Provide a well-structured question with input/output examples.`;

        const response = await groq.chat.completions.create({
            model: "qwen-2.5-32b",
            messages: [
              { role: "system", content: "You are an expert coding problem generator." },
              { role: "user", content: prompt }
            ],
            temperature: 0.7
        }); 

        const challengeData = response.choices[0].message.content;
        const todayDateString = new Date().toISOString().slice(0,10);  //yyyy-mm-dd 

        const newChallenge = new Challenge({
            topic,
            difficulty,
            content: challengeData,
            status: "pending", // Needs admin approval
            date: todayDateString,
            createdAt: new Date()
        });

        await newChallenge.save();
        res.json({ success:true, message: "Challenge generated and pending admin approval.", newChallenge });
    }
    catch(err){
        console.error("Error generating challenge:", err);
        res.status(500).json({success:false, error: "Failed to generate challenge" });
    }

}

const approve_challenge = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // 'approved' or 'rejected'

    const challenge = await Challenge.findById(id);
    if (!challenge) return res.status(404).json({ error: "Challenge not found" });

    const today = new Date().toISOString().slice(0, 10);

    if (status === "approved") {
      // Set all other today's challenges to pending
      await Challenge.updateMany(
        { date: today, _id: { $ne: id } },
        { $set: { status: "pending" } }
      );

      challenge.status = "approved";
    } else if (status === "rejected") {
      // Only reject the current challenge
      challenge.status = "rejected";
    } else {
      return res.status(400).json({ error: "Invalid status value" });
    }

    await challenge.save();

    res.json({
      success: true,
      message: `Challenge ${status}`,
      challenge,
    });
  } catch (err) {
    console.error("Error approving/rejecting challenge:", err);
    res
      .status(500)
      .json({ success: false, error: "Failed to approve/reject challenge" });
  }
};


const get_daily_challenge = async (req,res) =>{
    try{
        // const userId = req.user._id;

        const today = new Date().toISOString().slice(0, 10); 
        const challenge = await Challenge.findOne({
            date: today,
            status: "approved"
        });

        if(!challenge){
            return res.json({success:false, message:"No Daily Challenge set yet."});
        }

        res.json({success:true, dailyChallenge:challenge});
    }
    catch(err){
        console.error("Error in getting daily challenge:", err);
        res.status(500).json({success:false, error: "Failed to fetch daily challenge" });
    }

}

const get_all_daily_challenges = async (req,res) =>{
    try{
        // const userId = req.user._id;

        const today = new Date().toISOString().slice(0,10); // "2025-03-29"

        const challenges = await Challenge.find({
          date: { $lte: today },
          status: "approved"
        });


        if(!challenges){
            return res.json({success:false, message:"No Challenges found"});
        }

        res.json({success:true, challenges});
    }
    catch(err){
        console.error("Error in fetching all daily challenges :", err);
        res.status(500).json({success:false, error: "Failed to fetch all challenges" });
    }

}

const delete_rejected_challenges = async (req,res) =>{
    try{
        const result = await Challenge.deleteMany({ status: "pending" });
        res.json({ message: "Deleted rejected challenges", deletedCount: result.deletedCount });
    }
    catch(err){
        console.error("Error deleting rejected challenges: ", err);

    }
}

//a cron job to run every Sunday at midnight (00:00) to delete rejected challenges from db
cron.schedule('0 0 * * 0', () => {
    console.log('deleting rejected challenges...');
    delete_rejected_challenges();

});

//submissions---------------------------------------------------------------------------

const submit_solution = async (req, res) => {
    try {
      const userId = req.user._id; // assuming auth middleware adds this
      const { solution, challengeId, date } = req.body;
  
      if (!solution || !challengeId || !date) {
        return res.status(400).json({ success: false, message: "solution, challengeId and date are required." });
      }
  
      const challenge = await Challenge.findOne({ _id: challengeId, status: "approved" });
      if (!challenge) {
        return res.status(404).json({ success: false, message: "No approved challenge found with provided ID." });
      }
  
      // Prevent duplicate submission
      const alreadySubmitted = await DailySubmission.findOne({ userId, challengeId });
      if (alreadySubmitted) {
        await DailySubmission.deleteOne({ _id: alreadySubmitted._id });
      }

      let status="pending";
      if(true){    //a check function for later
        status="accepted";
      }
  
      const newSubmission = new DailySubmission({
        userId,
        challengeId,
        solution,
        date,
        status
      });
      
      if(!alreadySubmitted){
        await updateAura(userId, challenge.score || 50);
      }
      
      await newSubmission.save();
      res.status(201).json({ success: true, message: "Submission received.", submission: newSubmission });
  
    } catch (err) {
      console.error("Error submitting solution:", err);
      res.status(500).json({ success: false, message: "Failed to submit solution." });
    }
  };

  const check_submission_status = async (req, res) => {
    try {
      const userId = req.user._id;
      const { challengeId } = req.params; 
  
      if (!challengeId) {
        return res.status(400).json({ success: false, message: "challengeId is required." });
      }
  
      const submission = await DailySubmission.findOne({ userId, challengeId });
  
      if (!submission) {
        return res.json({ success: true, submitted: false, message: "No submission found." });
      }
  
      return res.json({
        success: true,
        submitted: true,
        submission: {
          solution: submission.solution,
          status: submission.status,
          date: submission.date,
          submittedAt: submission.submittedAt,
        },
      });
  
    } catch (err) {
      console.error("Error checking submission status:", err);
      res.status(500).json({ success: false, message: "Failed to check submission status." });
    }
  };
  
  
  




export {gen_daily_challenge, approve_challenge, get_daily_challenge, get_all_daily_challenges, submit_solution, check_submission_status}