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
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./redux/authSlice";
import { useLocation } from "react-router-dom";
import AdminDashboard from './pages/Admin/AdminDashboard.jsx';
import { Courses, CourseView } from './pages';

const App = () => {
  useEffect(() => {
    requestNotificationPermission();
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated, isCheckingAuth } = useSelector((state) => state.auth);

  useEffect(() => {
    if (location.pathname === "/signup") {
      return;
    }
    const initializeAuth = async () => {
     
      try {
        // Dispatch the thunk and wait for the result
        const resultAction = await dispatch(checkAuth());
  
        // Check if the action was fulfilled
        if (checkAuth.fulfilled.match(resultAction)) {
          console.log("Session validated");
        } else {
          console.log("Session expired or invalid");
          navigate("/signin"); // Redirect to login if session is invalid
        }
      } catch (err) {
        console.error("Error during authentication check", err);
        navigate("/signin"); // Redirect on error
      }
    };
  
    initializeAuth();
  }, [dispatch, navigate]);

  if (isCheckingAuth) {
    return <div>Loading...</div>; // Show loading while checking auth
  }
  
  // const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  // const navigate = useNavigate();

  const AdminRoute = ({ element }) => {
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    return isAuthenticated && user?.role === "admin" ? (
     {element}
    ) : (
      <Navigate to="/signin" />
    );
  };
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
        path="/courses"
        element={
          isAuthenticated ? (
            <MainLayout>
              <Courses />
            </MainLayout>
          ) : (
            <Navigate to="/signin" />
          )
        }
      />
         <Route
        path="/courses/view/:code"
        element={
          isAuthenticated ? (
            <MainLayout>
              <CourseView/>
            </MainLayout>
          ) : (
            <Navigate to="/signin" />
          )
        }
      />

      <Route
        path="/today"
        element={
          isAuthenticated ? (
            <MainLayout>
              <Today />
            </MainLayout>
          ) : (
            <Navigate to="/signup" />
          )
        }
      />
      <Route
        path="/upcoming"
        element={
          isAuthenticated ? (
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
          isAuthenticated ? (
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
          isAuthenticated ? (
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
          isAuthenticated ? (
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
          isAuthenticated ? (
            <MainLayout>
              <ScheduleCalendar />
            </MainLayout>
          ) : (
            <Navigate to="/signin" />
          )
        }
      />
       {/* Admin Route */}
       <Route path="/admin" element={<AdminDashboard />}  />
    </Routes>
  );
};

export default App;