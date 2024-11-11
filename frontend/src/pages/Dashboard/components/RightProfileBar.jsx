// import React from 'react'

// function RightProfileBar() {
//   return (
//     <div className='xl:flex h-[400px] sticky top-0 flex-col drop-shadow-lg p-4 bg-white basis-4/12 hidden rounded-xl'>
                
//         {/* profile-pic and name */}
//         <div className='w-full pb-4'>
//             <div className="w-full flex space-x-6  text-gray-900 rounded-t-xl">
//             	<div className="flex-shrink-0 size-24 mb-0">
//             		<img src="https://winkeyecare.com/wp-content/uploads/2013/03/Empty-Profile-Picture-450x450.jpg" alt="" className="object-cover object-center w-full h-full rounded bg-gray-500" />
//             	</div>
//             	<div className="flex flex-col justify-between">
//             		<div className='flex flex-col'>
//             			<div className="text-xl font-bold text-gray-900">Full Name</div>
//             			<div className="text-lg  text-gray-700 -mt-1">username</div>
//             		</div>
//                     {/* <div className=''><span className='text-gray-500'>Rank</span> 127</div> */}
//             	</div>
//             </div>
//         </div>

//         <button className='w-full rounded-xl p-2 bg-green-700 bg-opacity-50 text-xl text-center font-semibold text-green-800'>
//             Edit Profile
//         </button>
//         <hr class="border-gray-500 my-4" />

//         <div className='flex flex-col w-full justify-start'>
//         <div className='font-semibold text-slate-800'>
//                 {`Batch : 2026 `}
//             </div>
//             <div className='font-semibold text-slate-800'>
//                 {`Section : A `}
//             </div>
//         </div>
//         <div>
//             x
//         </div>

//     </div>
//   )
// }

// export default RightProfileBar

import React from 'react'
import { Mail, Linkedin, MapPin } from 'lucide-react';  // Importing icons from lucide-react

function RightProfileBar() {
  return (
    <div className='xl:flex h-[450px] sticky top-0 flex-col drop-shadow-lg p-4 bg-white basis-4/12 hidden rounded-xl'>
                
        {/* profile-pic and name */}
        <div className='w-full pb-4'>
            <div className="w-full flex space-x-6  text-gray-900 rounded-t-xl">
            	<div className="flex-shrink-0 size-24 mb-0">
            		<img src="https://winkeyecare.com/wp-content/uploads/2013/03/Empty-Profile-Picture-450x450.jpg" alt="" className="object-cover object-center w-full h-full rounded bg-gray-500" />
            	</div>
            	<div className="flex flex-col justify-between">
            		<div className='flex flex-col'>
            			<div className="text-xl font-bold text-gray-900">Full Name</div>
            			<div className="text-lg  text-gray-700 -mt-1">username</div>
            		</div>
                    {/* <div className=''><span className='text-gray-500'>Rank</span> 127</div> */}
            	</div>
            </div>
        </div>

        <button className='w-full rounded-xl p-2 bg-green-700 bg-opacity-50 text-xl text-center font-semibold text-green-800'>
            Edit Profile
        </button>
        <hr className="border-gray-500 my-4" />

        {/* User Details Section */}
        <div className='flex flex-col w-full justify-start space-y-2'>
            {/* Batch and Section */}
            <div className='font-semibold text-slate-800 flex items-center'>
                <MapPin className='text-gray-600 mr-2' size={20} />
                <span>{`Batch : 2026`}</span>
            </div>
            <div className='font-semibold text-slate-800 flex items-center'>
                <MapPin className='text-gray-600 mr-2' size={20} />
                <span>{`Section : A`}</span>
            </div>

            {/* Branch */}
            <div className='font-semibold text-slate-800 flex items-center'>
                <MapPin className='text-gray-600 mr-2' size={20} />
                <span>{`Branch : Computer Science`}</span>
            </div>

            {/* Email */}
            <div className='font-semibold text-slate-800 flex items-center'>
                <Mail className='text-gray-600 mr-2' size={20} />
                <span>{`Email : a@a.com`}</span>
            </div>

            {/* LinkedIn */}
            <div className='font-semibold text-slate-800 flex items-center'>
                <Linkedin className='text-gray-600 mr-2' size={20} />
                <span>{`LinkedIn : @abcdefghij`}</span>
            </div>

            
        </div>
    </div>
  )
}

export default RightProfileBar;

