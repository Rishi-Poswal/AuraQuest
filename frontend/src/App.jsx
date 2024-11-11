import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';


import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import { SignIn, SignUp, About, Dashboard } from './pages';
import Today from './home/components/LeftSideBar/Today';
import Upcoming from './home/components/LeftSideBar/Upcoming';
import EmailVerificationPage from './pages/EmailVerification/EmailVerificationPage';
import { requestNotificationPermission } from './utility/FCM/allowNotification.js';
import Leaderboard from './home/components/Dashboard/Leaderboard.jsx'
import ScheduleCalendar from '../src/home/components/Calendar/ScheduleCalendar.jsx'
import { useSelector } from 'react-redux';

const App = () => {
  useEffect(() => {
    requestNotificationPermission();
  }, []);
  
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  return (
    <Routes>
      <Route 
        path="/"
        element={
          <AuthLayout>
            <SignIn />
          </AuthLayout>
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
        path="/today"
        element={
          isLoggedIn ? (
            <MainLayout>
              <Today />
            </MainLayout>
          ) : (
            <Navigate to="/signin" />
          )
        }
      />
      <Route
        path="/upcoming"
        element={
          isLoggedIn ? (
            <MainLayout>
              <Upcoming />
            </MainLayout>
          ) : (
            <Navigate to="/signin" />
          )
        }
      />
      
      <Route
        path="/about"
        element={
          isLoggedIn ? (
            <MainLayout>
              <About />
            </MainLayout>
          ) : (
            <Navigate to="/signin" />
          )
        }
      />
      <Route
        path="/dashboard"
        element={
          isLoggedIn ? (
            <MainLayout>
              <Dashboard />
            </MainLayout>
          ) : (
            <Navigate to="/signin" />
          )
        }
      />
      <Route
        path="/leaderboard"
        element={
          isLoggedIn ? (
            <MainLayout>
              <Leaderboard />
            </MainLayout>
          ) : (
            <Navigate to="/signin" />
          )
        }
      />
      <Route
        path="/calendar"
        element={
          isLoggedIn ? (
            <MainLayout>
              <ScheduleCalendar />
            </MainLayout>
          ) : (
            <Navigate to="/signin" />
          )
        }
      />
    </Routes>
  );
};

export default App;