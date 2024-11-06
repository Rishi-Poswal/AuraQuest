import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './home/components/Navbar/Navbar';
import LeftSideBar from './home/components/LeftSideBar/LeftSideBar';
import Today from './home/components/LeftSideBar/Today';
import Upcoming from './home/components/LeftSideBar/Upcoming';
import { SignIn, SignUp, About } from './pages';
import { requestNotificationPermission } from './utility/FCM/allowNotification.js';

const App = () => {
  
  useEffect(()=>{
      requestNotificationPermission();
  });

  return (
    <>
    
      <Navbar />
      <div className="pt-16"> 
       
        
        <LeftSideBar />
       

        {/* Main content area - pushed to the right of sidebar */}
        <div className="ml-64 p-6">
          <Routes>
            {/* <Route path="/" element={<Today />} /> */}
            <Route path="/today" element={<Today />} />
            <Route path="/upcoming" element={<Upcoming />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;