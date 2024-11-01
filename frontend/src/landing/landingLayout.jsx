import React from 'react'
import LeftSideBar from '../home/components/LeftSideBar/LeftSideBar'
import Today from '../home/components/LeftSideBar/Today'
import Upcoming from '../home/components/LeftSideBar/Upcoming'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const landingLayout = () => {
  return (
    <Router>
    <div className="d-flex justify-content-between">
      <LeftSideBar />
     
        <Routes>
          {/* <Route path="/inbox" element={<InboxPage />} /> */}
          <Route path="/today" element={<Today />} />
          <Route path="/upcoming" element={<Upcoming />} />
        </Routes>
   
    </div>
  </Router>
  )
}

export default landingLayout
