import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { verifyEmail, clearError } from "../../redux/authSlice"; 
import toast from "react-hot-toast";

const EmailVerificationPage = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get auth state from Redux store
  const { error, isLoading, isAuthenticated } = useSelector((state) => state.auth);

  // Clear any existing errors when component mounts
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  // Show error toast when error occurs
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleChange = (index, value) => {
    const newCode = [...code];

    // Handle pasted content
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);

      // Focus on the last non-empty input or the first empty one
      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRefs.current[focusIndex]?.focus();
    } else {
      // Only accept numbers
      if (/^\d*$/.test(value)) {
        newCode[index] = value;
        setCode(newCode);

        // Move focus to the next input field if value is entered
        if (value && index < 5) {
          inputRefs.current[index + 1]?.focus();
        }
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      // Clear current field and move to previous
      const newCode = [...code];
      newCode[index - 1] = "";
      setCode(newCode);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }
    
    const verificationCode = code.join("");
    
    try {
      await dispatch(verifyEmail(verificationCode)).unwrap();
      toast.success("Email verified successfully");
      navigate("/");
    } catch (error) {
      // Error is handled by the error effect above
      setCode(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    }
  };

  // Auto submit when all fields are filled
  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleSubmit();
    }
  }, [code]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleResendCode = async () => {
    // Implement resend code functionality if available in your API
    toast.info("Please check your email for a new verification code");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-900 bg-opacity-60 backdrop-blur-lg rounded-2xl shadow-xl p-6 sm:p-10 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-teal-400 text-transparent bg-clip-text">
          Verify Your Email
        </h2>
        <p className="text-center text-gray-400 mb-6">
          Enter the 6-digit code sent to your email address.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between gap-2">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                pattern="\d*"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                disabled={isLoading}
                className="w-12 h-12 text-center text-2xl font-bold bg-gray-800 text-white border-2 border-gray-700 rounded-lg focus:border-teal-400 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                autoComplete="off"
              />
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isLoading || code.some((digit) => !digit)}
            className="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-blue-600 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Verifying...
              </span>
            ) : (
              "Verify Email"
            )}
          </motion.button>

          <div className="text-center">
            <button
              type="button"
              onClick={handleResendCode}
              disabled={isLoading}
              className="text-sm text-gray-400 hover:text-teal-400 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Didn't receive the code? Click to resend
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default EmailVerificationPage;

// import React from 'react'

// const EmailVerificationPage = () => {
//   return (
//     <div>EmailVerificationPage</div>
//   )
// }

// export default EmailVerificationPage