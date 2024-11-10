import React from 'react';
import Navbar from '../home/components/Navbar/Navbar';
import LeftSideBar from '../home/components/LeftSideBar/LeftSideBar';

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="pt-16">
        <LeftSideBar />
        <div className="ml-64 p-6">{children}</div>
      </div>
    </>
  );
};

export default MainLayout;