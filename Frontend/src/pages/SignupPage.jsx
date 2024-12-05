import React, { useState } from "react";
import { motion } from "framer-motion";
import InputformHandle from "../Components/InputformHandle.jsx";
import { Lock, Mail, User,Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrength from "../Components/PasswordStrength.jsx";
import { useAuthStore } from "../Store/AuthStore.js";
const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[Loading,setLoading]=useState(false)
  const navigate = useNavigate()
//   const isLoading=false

 const {signup,error,isLoading} = useAuthStore()

const loadertoggle = ()=>{
    // setLoading(!isLoading)
}
  const handleSignup = async(e) => {
    console.log("form");
    e.preventDefault()
    try {
      await signup(email,password,name)
      navigate("/verify-email")
    } catch (error) {
      console.log("Error :",error)
    }

    if (name && email && password) {
      setLoading(true);
      // Simulate API call
      // setTimeout(() => {
      //   console.log("Form Submitted:", { name, email, password });
      //   setLoading(false);
      // }, 2000);
    }
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
            required
          />
          <InputformHandle
            icon={Mail}
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <InputformHandle
            icon={Lock}
            type="password"
            placeholder="Set Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="text-red-600 text-center font-semibold mt-2">{error}</p>}
          {/* Password Strength meter */}
          <PasswordStrength password={password}/>
          <motion.button
            className="mt-5 w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            // onClick={loadertoggle}
            
          >
            {isLoading ? <Loader className="h-6 w-6 animate-spin mx-auto"/> : "Sign up"}
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
