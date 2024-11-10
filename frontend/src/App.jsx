import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';


import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import { SignIn, SignUp, About } from './pages';
import Today from './home/components/LeftSideBar/Today';
import Upcoming from './home/components/LeftSideBar/Upcoming';
import EmailVerificationPage from './pages/EmailVerification/EmailVerificationPage';
import { requestNotificationPermission } from './utility/FCM/allowNotification.js';

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
    </Routes>
  );
};

export default App;