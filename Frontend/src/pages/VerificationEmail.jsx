import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";
import { useAuthStore } from "../Store/AuthStore.js";
import {toast} from "react-hot-toast"

const VerificationEmail = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  //const [isLoading, setLoading] = useState(false);
  const inputRef = useRef([]);
  const navigate = useNavigate();
  const {verifyemail,isLoading,error} = useAuthStore()

  const handleChange = (index, value) => {
    console.log("HandleChange");
    const newCode = [...code];
    console.log("New code value : ", newCode);
    //handle pasted content
    if (value.length > 1) {
      const pasteCode = value.slice(0, 6).split("");
      console.log("New Paste code value : ", pasteCode);
      for (let i = 0; i < 6; i++) {
        newCode[i] = pasteCode[i] || "";
      }
      setCode(newCode);
      const lastfilledindex = newCode.findLastIndex((digit) => digit !== "");
      const focusIndex = lastfilledindex < 5 ? lastfilledindex + 1 : 5;
      inputRef.current[focusIndex].focus();
    } else {
      newCode[index] = value;
      setCode(newCode)
      if(value && index < 5){
        inputRef.current[index+1].focus()
      }
    }
  };
  // const handleKeyDown = (index, e) => {
  //   if (e.key === "backspace" && !code[index] && index < 0) {
  //     inputRef.current[index - 1].focus();
  //   }
  // };
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (code[index]) {
        // Clear the current input value
        const newCode = [...code];
        newCode[index] = "";
        setCode(newCode);
      } else if (index > 0) {
        // Move focus to the previous input if current is empty
        inputRef.current[index - 1].focus();
      }
    }
  };
  
  //   const isLoading=false
  const loadertoggle = () => {
    // if (code.length === 6) {
    //   setLoading(!isLoading);
    // }
  };
    const formHandler = async(e)=>{
       e.preventDefault()
       const verificationCode = code.join("");
       console.log(`Verification code Submitted : ${verificationCode}`)
       try {
        await verifyemail(verificationCode)
        navigate("/")
        toast.success("Email verified Successfully")
      } catch (error) {
        console.log("Error :",error)
      }
    }

  //auto submit when all fields are filed
  useEffect(()=>{
    if(code.every(digit => digit !=="")){
        formHandler(new Event('submit'))
        // setLoading(!isLoading)
    }
  },[code])

  return (
    <motion.div
      className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="p-8"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent text-center font-bold">
          Verify your Email
        </h2>
        <p className="text-white text-center my-3">
          Enter the 6-digit code sent to your email address.
        </p>
        <form onSubmit={formHandler} className="space-y-6">
          <div className="flex justify-between">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRef.current[index] = el;
                }}
                type="text"
                maxLength="6"
                value={digit}
                onChange={(e) => {
                  handleChange(index, e.target.value);
                }}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center font-bold bg-gray-700 text-white border-2 border-gray-400 rounded-lg focus:border-green-500 focus:outline-none transition-all"
              />
            ))}
          </div>
          <p className="text-red-600 font-semibold">{error}</p>
          <motion.button
            className="mt-5 w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
             disabled={isLoading || code.some((digit)=>!digit)}
            //onClick={loadertoggle}
          >
            {isLoading ? (
              <Loader className="h-6 w-6 animate-spin mx-auto" />
            ) : (
              "Verify"
            )}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default VerificationEmail;
