import React, { useState } from 'react';
import { Loader, Lock, Mail, User, GraduationCap, Calendar, GitBranch } from "lucide-react";
import { motion } from "framer-motion";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Input = ({ icon: Icon, ...props }) => (
  <div className="mb-4 relative">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <Icon className="h-5 w-5 text-gray-400" />
    </div>
    <input
      className="w-full pl-10 pr-4 py-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      {...props}
    />
  </div>
);

const PasswordStrengthMeter = ({ password }) => {
  const calculateStrength = () => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const strength = calculateStrength();
  const getColor = () => {
    switch (strength) {
      case 0: return 'bg-red-500';
      case 1: return 'bg-orange-500';
      case 2: return 'bg-yellow-500';
      case 3: return 'bg-blue-500';
      case 4: return 'bg-blue-600';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="mt-2">
      <div className="h-1 w-full bg-gray-700 rounded-full">
        <div
          className={`h-full ${getColor()} rounded-full transition-all duration-300`}
          style={{ width: `${(strength / 4) * 100}%` }}
        />
      </div>
      <p className="text-sm text-gray-400 mt-1">
        Password strength: {['Weak', 'Fair', 'Good', 'Strong', 'Excellent'][strength]}
      </p>
    </div>
  );
};

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [batch, setBatch] = useState("");
  const [branch, setBranch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate()

  const roles = ["Student", "CR", "Professor"];

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Build request payload based on role
      const payload = {
        username: name,
        email,
        password,
        role,
      };

      if (role === "Student" || role === "CR") {
        payload.batch = batch;
        payload.branch = branch;
      }

      // Axios request to backend
      const response = await axios.post("http://localhost:3000/api/auth/signup", payload, {
        withCredentials: true, // If your backend uses cookies for auth
      });

      console.log('Signup response:', response.data);
      
      // Handle successful signup, such as redirecting to a verification page
      if (response.data.success) {
        // alert("Signup successful. Please verify your email.");
        navigate("/EmailVerify")
        // Navigate to login or verification page if necessary
      }
      
      setIsLoading(false);
    } catch (err) {
      console.error("Signup failed:", err.response?.data?.message || err.message);
      setError(err.response?.data?.message || "Failed to sign up. Please try again.");
      setIsLoading(false);
    }
  };

  const showAdditionalFields = role === "Student" || role === "CR";

  return (
    <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="w-full max-w-lg mx-auto bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-8 overflow-y-auto max-h-[80vh]">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">
          Create Account
        </h2>
        <form onSubmit={handleSignUp}>
          <Input
            icon={User}
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            icon={Mail}
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            icon={Lock}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Select Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-gray-700 text-gray-200 border border-gray-600 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select a role</option>
              {roles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          {showAdditionalFields && (
            <>
              <Input
                icon={Calendar}
                type="text"
                placeholder="Batch (e.g., 2024)"
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
              />
              <Input
                icon={GitBranch}
                type="text"
                placeholder="Branch (e.g., Computer Science)"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
              />
            </>
          )}

          {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}
          <PasswordStrengthMeter password={password} />
          <motion.button
            className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader className="animate-spin mx-auto" size={24} />
            ) : (
              "Sign Up"
            )}
          </motion.button>
        </form>
      </div>
      <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
        <p className="text-sm text-gray-400">
          Already have an account?{" "}
          <button 
            onClick={() => {
              console.log('Navigate to login')
              navigate('/signin')
            }} 
            className="text-blue-400 hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </motion.div>
  );
};

export default SignUpPage;
