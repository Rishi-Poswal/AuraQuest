import React from 'react'
import Meter from './Meter'
import HeatMap from './HeatMap'

function SecondRow({val1,total1,val2,total2}) {
  return (
    <div className='flex flex-col lg:flex-row bg-white drop-shadow-md rounded-xl p-3'>

        <div className='basis-1/2 h-40 flex pr-5 flex-row justify-around items-center '>
            {/* <FigureCard title={"AURA"} value={aura} svg={<Flame/>}/>
            <FigureCard title={"RANK"} value={rank} svg={<TrendingUp/>}/> */}
            <Meter value={val1} total={total1} title={'Challenges'}/>
            <Meter value={val2} total={total2} title={'Assignments'}/>
        </div>

        <div className="border-l-2 hidden lg:block border-slate-200 h-full"></div>
        <div className='h-5 lg:hidden'></div>

        <hr className="border-gray-500 my-4 lg:hidden" />

        <div className='basis-1/2 h-40 flex flex-col justify-center items-center'>
            <HeatMap/>
        </div>
    </div>
  )
}

export default SecondRow
