import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const VerificationEmail = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRef = useRef([]);
  const navigate = useNavigate();

//   const handleChange = (index,e)=>{

//   }
  const formHandler = (e)=>{
    e.preventDefault()
  }
  const[isLoading,setLoading]=useState(false)
  //   const isLoading=false
  const loadertoggle = ()=>{
      setLoading(!isLoading)
  }

  return (
    <motion.div className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden" 
    initial={{opacity:0,y:-50}}
      animate={{opacity:1,y:0}}
      transition={{duration:.5}}
    >
      <motion.div className="p-8" 
      initial={{opacity:0,y:-50}}
      animate={{opacity:1,y:0}}
      transition={{duration:.5}}
      >
        <h2 className="text-2xl bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent text-center font-bold">
          Verify your Email
        </h2>
        <p className="text-white text-center my-3">Enter the 6-digit code sent to your email address.</p>
        <form onSubmit={formHandler} className="space-y-6">
            <div className="flex justify-between">
                 {code.map((digit,index)=>(
                    <input
                    key={index}
                    ref={(el)=>{inputRef.current[index]=el}}
                    type="text"
                    maxLength='6'
                    value={digit}
                    onChange={(e)=>{handleChange(index,e.target.value)}}
                    onKeyDown={(e)=>handleKeyDown(index,e)}
                    className="w-12 h-12 text-center font-bold bg-gray-700 text-white border-2 border-gray-400 rounded-lg focus:border-green-500 focus:outline-none transition-all"
                    />
                 ))}
            </div>
            <motion.button
            className="mt-5 w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            // disabled={isLoading}
            onClick={loadertoggle}
            
          >
            {isLoading ? <Loader className="h-6 w-6 animate-spin mx-auto"/> : "Sign up"}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default VerificationEmail;
