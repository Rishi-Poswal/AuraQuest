import React from 'react';
import { Flame , TrendingUp} from 'lucide-react';

import FigureCard from './figureCard.jsx';
import AuraDistribution from './AuraDistribution.jsx';

function FirstRow({aura, rank}) {
  return (
    <div className='flex flex-col lg:flex-row bg-white drop-shadow-md rounded-xl p-3'>

        <div className='basis-1/2 h-40 flex flex-row  '>
            <FigureCard title={"AURA"} value={aura} svg={<Flame/>}/>
            <FigureCard title={"RANK"} value={rank} svg={<TrendingUp/>}/>
        </div>
         
        <div className="border-l-2 hidden lg:block border-slate-200 h-full"></div>
        <div className='h-5 lg:hidden'></div>

        <div className='basis-1/2 h-40 flex flex-row  '>
            <AuraDistribution/>
        </div>
    </div>
  )
}

export default FirstRow
