import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';


import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import { SignIn, SignUp, About, Dashboard } from './pages';
import Today from './home/components/LeftSideBar/Today';
import Upcoming from './home/components/LeftSideBar/Upcoming';
import EmailVerificationPage from './pages/EmailVerification/EmailVerificationPage';
import { requestNotificationPermission } from './utility/FCM/allowNotification.js';
import Leaderboard from './home/components/Dashboard/Leaderboard.jsx'
import ScheduleCalendar from '../src/home/components/Calendar/ScheduleCalendar.jsx'

const App = () => {
  useEffect(() => {
    requestNotificationPermission();
  }, []);

  return (
    <Routes>
      <Route 
        path="/"
        element={
          <MainLayout>
            <Today />
          </MainLayout>
        }
      />
      <Route
        path="/today"
        element={
          <MainLayout>
            <Today />
          </MainLayout>
        }
      />
      <Route
        path="/upcoming"
        element={
          <MainLayout>
            <Upcoming />
          </MainLayout>
        }
      />
      <Route
        path="/signup"
        element={
          <AuthLayout>
            <SignUp />
           </AuthLayout>
        }
      />
      <Route
        path="/signin"
        element={
          <AuthLayout>
            <SignIn />
          </AuthLayout>
        }
      />
       <Route
        path="/EmailVerify"
        element={
          <AuthLayout>
            <EmailVerificationPage />
          </AuthLayout>
              }
      />
      <Route
        path="/about"
        element={
          <MainLayout>
            <About />
          </MainLayout>
        }
      />
      <Route
        path="/dashboard"
        element={
          <MainLayout>
            <Dashboard />
          </MainLayout>
        }
      />
      <Route
        path="/leaderboard"
        element={
          <MainLayout>
            <Leaderboard />
          </MainLayout>
        }
      />
      <Route
        path="/calendar"
        element={
          <MainLayout>
            <ScheduleCalendar />
          </MainLayout>
        }
      />
    </Routes>
  );
};

export default App;