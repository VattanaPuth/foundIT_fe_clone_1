// File: components/setting_right_side7_com1.tsx
import React, { useState } from "react";

// Function to determine password strength
const passwordStrengthMeter = (password: string) => {
  const lengthCriteria = password.length >= 8; // Minimum length requirement
  const hasNumber = /[0-9]/.test(password); // Check if it has numbers
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password); // Check for special characters
  const hasUppercase = /[A-Z]/.test(password); // Check for uppercase letters

  // Calculate strength based on criteria
  let strength = 0;
  if (lengthCriteria) strength++;
  if (hasNumber) strength++;
  if (hasSpecialChar) strength++;
  if (hasUppercase) strength++;

  // Determine strength level and percentage based on the number of fulfilled criteria
  const percentage = (strength / 4) * 100; // Max 4 criteria, so max percentage is 100%
  let strengthLabel = "Very Weak";

  if (strength === 1) {
    strengthLabel = "Weak";
  } else if (strength === 2) {
    strengthLabel = "Medium";
  } else if (strength === 3) {
    strengthLabel = "Strong";
  } else if (strength === 4) {
    strengthLabel = "Very Strong";
  }

  return { strengthLabel, percentage };
};

const SettingRightSide7Com1: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState(""); // Keep it blank by default
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStrengthLabel, setPasswordStrengthLabel] = useState<string>("Very Weak");
  const [strengthPercentage, setStrengthPercentage] = useState<number>(0); // Default to 0%

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    const { strengthLabel, percentage } = passwordStrengthMeter(password);
    setNewPassword(password);
    setPasswordStrengthLabel(strengthLabel);
    setStrengthPercentage(percentage);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission (e.g., make an API call to change the password)
    console.log("Password updated!");

    // Example for integrating with the backend:
    // const response = await fetch('/api/change-password', {
    //   method: 'POST',
    //   body: JSON.stringify({ newPassword, confirmPassword }),
    // });
    // const data = await response.json();
    // if (data.success) {
    //   // Handle successful password change
    // } else {
    //   // Handle failure
    // }
  };

  const passwordStrengthClass = {
    "Very Weak": "bg-gray-200", // Default is neutral (gray)
    Weak: "bg-red-500",
    Medium: "bg-yellow-500",
    Strong: "bg-[#10B981]",
    "Very Strong": "bg-[#10B981]",
  };

  return (
    <div className="w-full px-6 py-8 space-y-6 bg-white rounded-2xl shadow-md border border-gray-200">
      <div className="-space-y-3">
        <div>
          <p className="text-2xl">Password</p>  
        </div>
        <div>
          <p className="text-lg text-gray-500">Change your password and ensure it’s strong</p>  
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Current Password (blank by default) */}
        <div className="flex flex-col">
          <div className="text-lg text-gray-500">Current Password</div>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="mt-2 px-4 py-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>

        {/* New Password */}
        <div className="flex flex-col">
          <div className="text-lg text-gray-500">New Password</div>
          <input
            type="password"
            value={newPassword}
            onChange={handleNewPasswordChange}
            className="mt-2 px-4 py-2 border border-gray-300 rounded-md w-full"
            required
          />
          <div className="flex items-center mt-2 gap-x-5">
            <div className="w-[90%] h-2 bg-gray-200 rounded-md">
              <div
                className={`h-2 rounded-md ${passwordStrengthClass[passwordStrengthLabel]}`}
                style={{ width: `${strengthPercentage}%` }} // Dynamic width
              />
            </div>
            <div className="text-sm text-gray-500">{passwordStrengthLabel}</div>
          </div>
        </div>

        {/* Confirm New Password */}
        <div className="flex flex-col">
          <div className="text-lg text-gray-500">Confirm New Password</div>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-2 px-4 py-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>

        {/* Password breach check */}
        <div className="flex items-center gap-x-2 text-sm text-gray-500">
          <input type="checkbox" id="password-check" className="h-4 w-4" />
          <span>
            We’ll check your password against known breaches using{" "}
            <a href="https://haveibeenpwned.com/" className="text-blue-500">haveibeenpwned</a>
          </span>
        </div>

        {/* Submit as clickable div */}
        <div className="mt-4">
          <div
            onClick={handleSubmit}
            className="w-full bg-[#10B981] text-white text-center py-2 rounded-md cursor-pointer hover:opacity-90 active:opacity-30"
          >
            Update Password
          </div>
        </div>
      </form>
    </div>
  );
};

export default SettingRightSide7Com1;
