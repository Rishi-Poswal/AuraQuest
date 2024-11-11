import React from 'react'
import RightProfileBar from './components/RightProfileBar.jsx'
import FirstRow from './components/FirstRow.jsx'
import SecondRow from './components/SecondRow.jsx'
import ThirdRow from './components/ThirdRow.jsx'


function Dashboard() {


  return (
    <div className=' inset-y-0 '>

       <div className='h-full gap-1 flex flex-row mt-3'>
           
           <div className='h-[700px] flex flex-col gap-3 xl:basis-10/12 w-full mr-4 rounded-xl'>
                
                {/* rows */}

                <FirstRow aura={1235} rank={254}/>
   
                <SecondRow val1={12} total1={200} val2={20} total2={30} />

                <ThirdRow />

           </div>
           
           {/* right sidebar */}
           <RightProfileBar/>
           
       </div>

    </div>
  )
}

export default Dashboard
