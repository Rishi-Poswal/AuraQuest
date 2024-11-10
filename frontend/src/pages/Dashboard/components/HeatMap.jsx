import React from 'react'
import CalendarHeatmap from 'react-calendar-heatmap';
import { Tooltip } from 'react-tooltip'
import 'react-calendar-heatmap/dist/styles.css';


function HeatMap() {
    const today = new Date();
    const startDate = new Date(today);
    startDate.setMonth(startDate.getMonth() - 4);

    const values = [
        { date: '2024-11-06', count: 0 },
        { date: '2024-11-07', count: 21 },
        { date: '2024-11-08', count: 41 },
        { date: '2024-11-09', count: 51 },
        { date: '2024-11-10', count: 101 },
    ];

  return (
    <div className='w-full h-full flex flex-col items-center'>

        {/* <div className='flex flex-row justify-end'> 
            <div className='text-sm text-slate-500'>
                Activity
            </div>
        </div> */}

        <div className='w-[310px]'>
            <CalendarHeatmap
                startDate={startDate}
                endDate={today}
                values={values}
                classForValue={(value) => {
                  if (!value || value.count===0) return 'color-empty'; 
                  if (value.count > 100) return 'color-scale-4'; 
                  if (value.count > 50) return 'color-scale-3'; 
                  if (value.count > 30) return 'color-scale-2';
                  return 'color-scale-1'; 
                }}
                tooltipDataAttrs={(value) => ({
                  'data-tooltip-id': 'heatmap',
                  'data-tooltip-content': value.date ? `Aura +${value.count} (${value.date})` : 'Aura +0',
                })}
            />
            <Tooltip id="heatmap" />

        </div>

        <div className='flex flex-row justify-center'> 
            <div className='text-md font-semibold text-slate-500'>
                Activity
            </div>
        </div>

    </div>
  )
}

export default HeatMap
