import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function ThirdRow() {
    
    const attendance = [
        {course:"CN", haveLab:true, totalLectureHours: 20, lectureHours:12, totalLabHours:10, labHours:8},
        {course:"DBMS", haveLab:true, totalLectureHours: 26, lectureHours:22, totalLabHours:12, labHours:6},
        {course:"SE", haveLab:false, totalLectureHours: 25, lectureHours:18, totalLabHours:0, labHours:0},
        {course:"ES", haveLab:true, totalLectureHours: 22, lectureHours:16, totalLabHours:14, labHours:10},
        {course:"Crypto", haveLab:false, totalLectureHours: 16, lectureHours:14, totalLabHours:0, labHours:0}
    ]

    const perAttendance = attendance.map((course)=>{
        return {
            course:course.course,
            lecture: (course.lectureHours/course.totalLectureHours)*100,
            lab:(course.labHours/course.totalLabHours)*100
        }
    })


  return (
    <div className='flex flex-col items-center h-60 bg-white drop-shadow-lg rounded-xl p-3 pt-2'>
        
        <div className='font-semibold text-slate-500'>
            Attendance
        </div>

        <ResponsiveContainer width="100%" height={200}>
            <BarChart data={perAttendance} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="course" />
                <YAxis />
                <Tooltip formatter={(value,name,props)=>{
                    if(name=='lab' && Number.isNaN(value)){
                        return `No Lab`;
                    }
                    else{
                        return `${value.toFixed(1)}%`;
                    }
                }}/>
                <Legend />
                
                {/* lecture attendance */}
                <Bar dataKey="lecture"  fill="#50AEF1" />
                
                {/* lab attendance */}
                <Bar dataKey="lab"  fill="#82ca9d" />
            </BarChart>

        </ResponsiveContainer>
    </div>
  )
}

export default ThirdRow
