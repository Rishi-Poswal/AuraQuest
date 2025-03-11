import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import axios from 'axios';

function AuraDistribution() {
    const [currUserIdx, setCurrUserIdx] = useState(-1);
    const [hoveredRange, setHoveredRange] = useState('0-100');
    const [hoveredTop, setHoveredTop] = useState(0);
    const [auraDist, setAuraDist] = useState([{}])
    const [currUser, setCurrUser] = useState({})    //{range, top}

    

    // const currAura = 400;  
    // const auraData = [
    //     { range: '< 100', users: 7 },
    //     { range: '100 - 200', users: 10 },
    //     { range: '200 - 300', users: 22 },
    //     { range: '300 - 400', users: 45 },
    //     { range: '400 - 500', users: 100 },
    //     { range: '500 - 600', users: 250 },
    //     { range: '600 - 700', users: 150 },
    //     { range: '700 - 800', users: 75 },
    //     { range: '800 - 900', users: 30 },
    //     { range: '900 - 1000', users: 10 },
    //     { range: '1000+', users: 20 }
    // ];

    const [currAura, setCurrAura] = useState(0)
    const [auraData, setAuraData] = useState([])

    useEffect(()=>{
        const fetchAuraDist = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_SERVER_URI}/api/dashboard/aura-distribution`);
                // const data = response.data;
                console.log(response.data.data);
                
                setCurrAura(response.data.data.currAura);
                setAuraData(response.data.data.auraData);
                
                // console.log(auraData);
                
            } catch (error) {
              console.error('Error fetching dashboard stats:', error);
            }
        };
      
        fetchAuraDist();
    },[])

    useEffect(() => {
        if (auraData.length > 0) {
          populateAuraDist();
        }
    }, [auraData]);

    
   
    const findCurrUserIndex = ()=>{
        const n = auraData.length;
            // Find the current user's index based on their aura value
        for (let i=0; i<n; i++) {
    
            const range = auraData[i].range.split(' - ');
            const min = parseInt(range[0].replace(/[^\d.-]/g, ''), 10); 
            let max;
        
            if (range[1]) {
                max = parseInt(range[1], 10);
            } else if (auraData[i].range.includes('+')) {
                max = Number.MAX_VALUE; // '1000+' case
            } else {
                max = min; // '< 100' case
            }
    
            if (currAura >= min && currAura < max) {
                setCurrUserIdx(i);
                break;
            }
        }

        if (currAura < 100) {
            setCurrUserIdx(0); 
        }
    }

    const populateAuraDist = ()=>{
        const n = auraData.length;
        const usersAhead = new Array(n);
        //Initialize the last index of usersAhead (accumulated users count)
        usersAhead[n - 1] = auraData[n - 1].users;

        //Fill in the usersAhead array
        for (let i = n - 2; i >= 0; i--) {
            usersAhead[i] = auraData[i].users + usersAhead[i + 1];
        }

        const totalUsers = usersAhead[0];

        // Prepare auraDist for chart data
        const updatedAuraDist = auraData.map((data, i) => ({
            range: data.range,
            top: ((usersAhead[i] / totalUsers) * 100).toFixed(2),
            users: data.users
        }));

        setAuraDist(updatedAuraDist);
        findCurrUserIndex(updatedAuraDist);
    }
    

    useEffect(() => {
        if (currUserIdx !== -1 && auraDist.length > 0) {
            setCurrUser({
                range: auraDist[currUserIdx]?.range,
                top: auraDist[currUserIdx]?.top,
            });
        }
    }, [currUserIdx, auraDist]);
    
    useEffect(() => {
        if (currUser.top && currUser.range) {  
            setHoveredTop(currUser.top);
            setHoveredRange(currUser.range);
        }
    }, [currUser]);

    

    

    return (
        <div className='flex flex-col items-center h-40 w-full bg-white rounded-xl'>
            <div className='w-full flex flex-row justify-between pl-5'>
                <div className=' text-slate-400'>
                    {`Top: ${hoveredTop}% `}
                </div>
                <div className=' text-slate-400'>
                    {`Aura : ${hoveredRange}`}
                </div>
            </div>

            <ResponsiveContainer width="100%" height={140}>
                <BarChart data={auraDist} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    {/* <CartesianGrid strokeDasharray="3 3" /> */}
                    {/* <XAxis dataKey="range" /> */}
                    {/* <YAxis /> */}
                    <Tooltip content={({payload})=>{
                        if(payload && payload.length){
                            const {range, users} = payload[0].payload;
                            return (
                                <div className='flex flex-col bg-white shadow-md bg-opacity-50 rounded-lg p-2'>
                                    <div className='text-sm from-neutral-400'>{`Range: ${range}`}</div>
                                    <div className='text-sm from-neutral-400'>{`Users: ${users}`}</div>
                                </div>
                            )
                        }
                        return null;
                    }}/>
                    {/* <Legend /> */}

                    

                    <Bar 
                        dataKey="users" 
                        fill= "#82ca9d"
                        onMouseEnter={(e, index)=>{
                           setHoveredTop(e.payload.top);
                           setHoveredRange(auraData[index].range);
                        }}
                        onMouseLeave={()=>{
                            setHoveredTop(currUser.top);
                            setHoveredRange(currUser.range);
                        }}
                        shape={({ x, y, width, height, index }) => (
                            <>
                                <rect      //to update hoverTop/Rank even if we hover above the curr bar
                                    x={x}
                                    y={0}
                                    width={width}
                                    height={height+y}
                                    fill="transparent"  // Makes it invisible
                                    onMouseEnter={() => {
                                        setHoveredTop(auraDist[index].top); 
                                        setHoveredRange(auraDist[index].range);  
                                    }}
                                />
                                <rect
                                    x={x}
                                    y={y}
                                    width={width}
                                    height={height}
                                    fill={index === currUserIdx ? '#FF6347' : '#82ca9d'}  // Highlight the current user's bar
                                />
                            </>
                        )}

                    />

                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default AuraDistribution;
