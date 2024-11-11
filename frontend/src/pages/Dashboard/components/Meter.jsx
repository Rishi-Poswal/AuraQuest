import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


function Meter({value, total, title}) {
    const percentage = (value / total) * 100;

  return (
    <div className='size-32 flex flex-col justify-center items-center '>
      
      <div className='p-2 flex flex-col justify-center items-center shadow-md rounded-full' >
        <CircularProgressbar
            value={percentage}
            text={`${value} / ${total}`}
            styles={buildStyles({
              pathColor: `rgba(31, 156, 253 , ${percentage / 100 + 0.2})`,       // Color of the progress path
              textColor: '#333',      // Color of the text inside
              trailColor: '#ddd',      // Color of the trail path
              strokeLinecap: 'round',  // Rounded ends of the progress path
            })}
        />

      </div>

      <div className=' w-full flex flex-col justify-center items-center '>
           <div className='text-md font-semibold text-slate-500'>{title}</div>
      </div>

    </div>
  )
}

export default Meter
