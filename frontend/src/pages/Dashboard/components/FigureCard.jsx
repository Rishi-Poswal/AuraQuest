import React from 'react'

function FigureCard({title, value, svg}) {
  return (
    

    <div className='w-full h-full rounded-xl basis-1/2 bg-white p-6 bg-gradient-to-r from-white to-cyan-50   shadow-md mr-4'>
      <div className='flex flex-col justify-center items-center'>
        {/* Title */}
        <div className='flex flex-row'>
          {svg}
          <p className='text-lg font-semibold text-gray-700 tracking-wide ml-1'>{title}</p>
        </div>
    
        {/* Value */}
        <div className=''>
          <p className='text-[48px] font-extrabold text-blue-600'>{value}</p>
        </div>
      </div>
    </div>

  )
}

export default FigureCard
