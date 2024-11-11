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
        const data = response.data;

        // Extract the required variables from the response
        setAura(data.aura);
        setRank(data.rank);
        // setTotalChallenges(data.challenges);
        setTotalChallenges(7);
        setTotalDailyChallengesCompleted(data.totalDailyChallengesCompleted);
        setTotalAssignmentsSubmitted(data.totalAssignmentsSubmitted);
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

       <div className='h-full gap-1 flex flex-row mt-3'>
           
           <div className='h-[700px] flex flex-col gap-3 xl:basis-10/12 w-full mr-4 rounded-xl'>
                
                {/* rows */}

                <FirstRow aura={650} rank={50}/>
   
                <SecondRow val1={12} total1={20} val2={2} total2={8} />

                <ThirdRow />

           </div>
           
           {/* right sidebar */}
           <RightProfileBar/>
           
       </div>

    </div>
  )
}

export default Dashboard
