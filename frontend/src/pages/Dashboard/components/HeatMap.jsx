import React, { useEffect, useState } from 'react'
import CalendarHeatmap from 'react-calendar-heatmap';
import { Tooltip } from 'react-tooltip'
import 'react-calendar-heatmap/dist/styles.css';
import axios from 'axios';


function HeatMap() {
    const today = new Date();
    const startDate = new Date(today);
    startDate.setMonth(startDate.getMonth() - 4);

    const [values, setValues] = useState([]);

    useEffect(()=>{

        const fetchActivity = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_SERVER_URI}/api/dashboard/studentActivity`);
                const data = response.data.data;
                
                setValues(data);
                console.log(values);
                
            } catch (error) {
              console.error('Error fetching dashboard stats:', error);
            }
        };
      
        fetchActivity();

    },[]);

    // const values = [
    //     { date: '2024-11-06', auraGained: 0 },
    //     { date: '2024-11-07', auraGained: 21 },
    //     { date: '2024-11-08', auraGained: 41 },
    //     { date: '2024-11-09', auraGained: 51 },
    //     { date: '2024-11-10', auraGained: 101 },
    // ];

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
                  if (!value || value.auraGained===0) return 'color-empty'; 
                  if (value.auraGained > 100) return 'color-scale-4'; 
                  if (value.auraGained > 50) return 'color-scale-3'; 
                  if (value.auraGained > 30) return 'color-scale-2';
                  return 'color-scale-1'; 
                }}
                tooltipDataAttrs={(value) => ({
                  'data-tooltip-id': 'heatmap',
                  'data-tooltip-content': value.date
                    ? `Aura +${value.auraGained} (${new Date(value.date).toISOString().split("T")[0]})`
                    : 'Aura +0',
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
