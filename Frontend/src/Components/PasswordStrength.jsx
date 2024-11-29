import { Check, X } from "lucide-react";
import React from "react";

const PasswordCriteria = ({ password }) => {
  const criteria = [
    { label: "At least 6 characters", met: password.length >= 6 },
    { label: "Contain UpperCase letter", met: /[A-Z]/.test(password) },
    { label: "contain lowercase Letter", met: /[a-z]/.test(password) },
    { label: "Contain Numbers", met: /\d/.test(password) },
    {
      label: "At least One Special Character",
      met: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    },
  ];
  return (
    <div className="space-y-1 mt-2">
      {criteria.map((item, index) => (
        <div className="flex text-xs items-center" key={index}>
          {item.met ? (
            <Check className="size-4 text-green-500 mr-2" />
          ) : (
            <X className="text-red-600 size-4 mr-2" />
          )}
          <span className={item.met ? "text-green-400" : "text-red-600"}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

const PasswordStrength = ({ password }) => {
  const getString = (pass) => {
    let strength = 0;
    if (pass.length >= 6) strength++;
    if (pass.match(/[a-z]/ && pass.match(/[A-Z]/))) strength++;
    if (pass.match(/\d/)) strength++;
    if (pass.match(/[!@#$%^&*(),.?":{}|<>]/)) strength++;
    return strength;
  };
  const strength = getString(password);

  const getColor = (strength) => {
    if (strength === 0) return "bg-red-500";
    if (strength === 1) return "bg-red-300";
    if (strength === 2) return "bg-yellow-500";
    if (strength === 3) return "bg-yellow-300";
    if (strength === 4) return "bg-green-400";
  };

  const getStrengthTest = (strength) => {
    if (strength === 0) return "Very Weak";
    if (strength === 1) return "Weak";
    if (strength === 2) return "Fair";
    if (strength === 3) return "Good";
    if (strength === 4) return "Strong";
  };
  return (
    <div className="mt-2">
      <div className="flex items-center mb-1 justify-between">
        <span className="text-xs text-gray-400">Password Strength</span>
        <span className="text-xs text-gray-400">
          {getStrengthTest(strength)}
        </span>
      </div>
      <div className="flex space-x-1 my-2">
        {[...Array(4)].map((item, index) => (
          <div
            className={`h-1 w-1/4 rounded-full transition-colors duration-300 ${
              index < strength ? getColor(strength) : "bg-gray-600"
            }`} key={index}
          />
        ))}
      </div>
      <PasswordCriteria password={password}/>
    </div>
  );
};

export default PasswordStrength;
