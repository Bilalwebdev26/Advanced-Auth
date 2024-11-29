import React, { useState } from "react";
import { motion } from "framer-motion";
import InputformHandle from "../Components/InputformHandle.jsx";
import { Lock, Mail, User } from "lucide-react";
import { Link } from "react-router-dom";
import PasswordStrength from "../Components/PasswordStrength.jsx";
const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSignup = () => {
    console.log("form");
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-gray-800 opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-4">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 text-transparent mb-6 text-center bg-clip-text">
          Create Account
        </h2>
        <form action="" onSubmit={handleSignup}>
          {/* create component */}
          <InputformHandle
            icon={User}
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <InputformHandle
            icon={Mail}
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputformHandle
            icon={Lock}
            type="password"
            placeholder="Set Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* Password Strength meter */}
          <PasswordStrength password={password}/>
          <motion.button
            className="mt-5 w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
          >
            Sign Up
          </motion.button>
        </form>
      </div>
      <div className="py-4 px-8 bg-gray-900 opacity-50 flex justify-center items-center text-white">
        <p>Already Have an Account? {" "}
            <Link to={"/login"} className="text-green-400 font-bold hover:underline">
             Log In
            </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default SignupPage;
