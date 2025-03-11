import React from 'react'
import RightProfileBar from './components/RightProfileBar.jsx'
import FirstRow from './components/FirstRow.jsx'
import SecondRow from './components/SecondRow.jsx'
import ThirdRow from './components/ThirdRow.jsx'
import { useState, useEffect } from 'react'
import axios from 'axios'


function Dashboard() {
  const [aura, setAura] = useState(null);
  const [rank, setRank] = useState(null);
  const [totalDailyChallengesCompleted, setTotalDailyChallengesCompleted] = useState(null);
  const [totalChallenges, setTotalChallenges] = useState(null);
  const [totalAssignmentsSubmitted, setTotalAssignmentsSubmitted] = useState(null);
  const [totalAssignments, setTotalAssignments] = useState(null);
   
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URI}/api/dashboard/getStats`);
        const res = response.data.data;

        // console.log(res);

        // Extract the required variables from the response
        setAura(res.aura);
        setRank(res.currentRank);
        // setTotalChallenges(data.challenges);
        setTotalChallenges(7);
        setTotalDailyChallengesCompleted(res.totalDailyChallengesCompleted);
        setTotalAssignmentsSubmitted(res.totalAssignmentsSubmitted);
        // setTotalAssignments(data.totalAssignments);
        setTotalAssignments(5);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      }
    };

    fetchStats();
  }, []);


  return (
    <div className=' inset-y-0 '>


       {aura !== null && rank !== null ? (
          <div className='h-full gap-1 flex flex-row mt-3'>
            <div className='h-[700px] flex flex-col gap-3 xl:basis-10/12 w-full mr-4 rounded-xl'>
              
              <FirstRow aura={aura} rank={rank} />
              
              <SecondRow val1={totalDailyChallengesCompleted} total1={20} val2={totalAssignmentsSubmitted} total2={8} />
              
              <ThirdRow />

            </div>

            <RightProfileBar />
          </div>
        ) : (
          <div>Loading Dashboard...</div> 
        )}

    </div>
  )
}

export default Dashboard
