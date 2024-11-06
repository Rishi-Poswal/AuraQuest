// import React from 'react'

// function SignUp() {
//   return (
//     <div>
//        signup
//     </div>
//   )
// }

// export default SignUp

// import { motion } from "framer-motion";
// import Input from "../components/Input";
// import { Loader, Lock, Mail, User, GraduationCap, Calendar, GitBranch } from "lucide-react";
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
// import { useAuthStore } from "../store/authStore";

// const SignUp = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("");
//   const [batch, setBatch] = useState("");
//   const [branch, setBranch] = useState("");
  
//   const navigate = useNavigate();
//   const { signup, error, isLoading } = useAuthStore();

//   const roles = ["Student", "CR", "Professor"];

//   const handleSignUp = async (e) => {
//     e.preventDefault();
//     try {
//       // Include role, batch, and branch in signup
//       await signup(email, password, name, role, batch, branch);
//       navigate("/verify-email");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const showAdditionalFields = role === "Student" || role === "CR";

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
//     >
//       <div className="p-8">
//         <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
//           Create Account
//         </h2>
//         <form onSubmit={handleSignUp}>
//           <Input
//             icon={User}
//             type="text"
//             placeholder="Full Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//           <Input
//             icon={Mail}
//             type="email"
//             placeholder="Email Address"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <Input
//             icon={Lock}
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           <div className="mb-4">
//             <label className="block text-gray-300 text-sm font-medium mb-2">
//               Select Role
//             </label>
//             <select
//               value={role}
//               onChange={(e) => setRole(e.target.value)}
//               className="w-full bg-gray-700 text-gray-200 border border-gray-600 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
//             >
//               <option value="">Select a role</option>
//               {roles.map((r) => (
//                 <option key={r} value={r}>
//                   {r}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {showAdditionalFields && (
//             <>
//               <Input
//                 icon={Calendar}
//                 type="text"
//                 placeholder="Batch (e.g., 2024)"
//                 value={batch}
//                 onChange={(e) => setBatch(e.target.value)}
//               />
//               <Input
//                 icon={GitBranch}
//                 type="text"
//                 placeholder="Branch (e.g., Computer Science)"
//                 value={branch}
//                 onChange={(e) => setBranch(e.target.value)}
//               />
//             </>
//           )}

//           {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}
//           <PasswordStrengthMeter password={password} />
//           <motion.button
//             className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             type="submit"
//             disabled={isLoading}
//           >
//             {isLoading ? (
//               <Loader className="animate-spin mx-auto" size={24} />
//             ) : (
//               "Sign Up"
//             )}
//           </motion.button>
//         </form>
//       </div>
//       <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
//         <p className="text-sm text-gray-400">
//           Already have an account?{" "}
//           <Link to={"/login"} className="text-green-400 hover:underline">
//             Login
//           </Link>
//         </p>
//       </div>
//     </motion.div>
//   );
// };

// export default SignUp