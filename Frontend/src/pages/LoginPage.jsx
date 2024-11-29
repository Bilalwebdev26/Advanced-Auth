import React, { useState } from "react";
import { motion } from "framer-motion";
import InputformHandle from "../Components/InputformHandle";
import { Lock, User } from "lucide-react";
import { Link } from "react-router-dom";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const[pass,setPass]=useState('')
  const handleLogin = ()=>{

  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-gray-800 shadow-lg overflow-hidden opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl "
    >
      <div className="p-8">
        <h1 className="text-center font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent text-3xl mb-7">Welcome Back</h1>
        <form action="" onSubmit={handleLogin}>
          <InputformHandle
            icon={User}
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputformHandle
          icon={Lock}
          type="password"
          placeholder="Enter Password"
          value={pass}
          onChange={(e)=>{setPass(e.target.value)}}
          />
          <motion.button className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg focus:ring-2 hover:from-green-600 hover:to-emerald-700 duration-300"
          whileHover={{scale:1.02}}
          whileTap={{scale:0.98}}
          type="submit"
          >
            Log In
          </motion.button>
        </form>
      </div>
      <div className="bg-gray-900 flex items-center opacity-50 justify-center py-4 px-8 text-white">
        Don't have An Account?  {"  "}
        <Link to={"/signup"} className="text-green-400 font-bold hover:underline ml-2">
           Sign Up
        </Link>
      </div>
    </motion.div>
  );
};

export default LoginPage;
