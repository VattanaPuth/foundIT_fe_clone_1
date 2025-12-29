// File: components/setting_right_side6_com.tsx

import React, { useState } from "react";

interface ProfileFormData {
  displayName: string;
  username: string;
  primaryEmail: string;
  backupEmail: string;
  phoneNumber: string;
  country: string;
  timeZone: string;
  languages: string;
}

const SettingRightSide6Com1: React.FC = () => {
  const [profileData, setProfileData] = useState<ProfileFormData>({
    displayName: "",
    username: "",
    primaryEmail: "",
    backupEmail: "",
    phoneNumber: "",
    country: "",
    timeZone: "",
    languages: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-md px-6 py-3 border border-gray-200">
      <div className="space-y-6">
        <div className="flex flex-col">
          <div className="mb-2">
            <p className="text-2xl">Profile Information</p>
            <div className="-mt-3">
              <p className="text-lg text-gray-500">Update your personal details and contact information</p>
            </div>
          </div>

          {/* Display Name */}
          <div className="">
            <div className="text-lg">Display Name</div>
            <input
              type="text"
              name="displayName"
              value={profileData.displayName}
              onChange={handleChange}
              className="mt-2 px-4 py-2 border border-gray-300 rounded-md w-full"
            />
          </div>

          {/* Username */}
          <div className="mt-3">
            <div className="text-lg">Handle (Username)</div>
            <div className="flex items-center gap-x-2">
              <input
                type="text"
                name="username"
                value={profileData.username}
                onChange={handleChange}
                disabled
                className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-[91%] bg-gray-100 cursor-not-allowed"
              />
              <span className="mt-2 px-4 py-2 border border-gray-300 rounded-md w-[9%] bg-gray-100 cursor-not-allowed">immutable</span>
            </div>
            <div className="mt-1 text-md text-gray-500">Your unique username cannot be changed</div>
          </div>

          <div className="w-full mt-3 h-[0.8px] border border-gray-300"/>

          {/* Primary Email */}
          <div className="mt-3">
            <div className="flex items-center gap-x-2">
              <svg className="w-5 h-5" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 4L9.16492 9.71544C9.82609 10.1783 10.1567 10.4097 10.5163 10.4993C10.8339 10.5785 11.1661 10.5785 11.4837 10.4993C11.8433 10.4097 12.1739 10.1783 12.8351 9.71544L21 4M5.8 17H16.2C17.8802 17 18.7202 17 19.362 16.673C19.9265 16.3854 20.3854 15.9265 20.673 15.362C21 14.7202 21 13.8802 21 12.2V5.8C21 4.11984 21 3.27976 20.673 2.63803C20.3854 2.07354 19.9265 1.6146 19.362 1.32698C18.7202 1 17.8802 1 16.2 1H5.8C4.11984 1 3.27976 1 2.63803 1.32698C2.07354 1.6146 1.6146 2.07354 1.32698 2.63803C1 3.27976 1 4.11984 1 5.8V12.2C1 13.8802 1 14.7202 1.32698 15.362C1.6146 15.9265 2.07354 16.3854 2.63803 16.673C3.27976 17 4.11984 17 5.8 17Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <div className="text-lg">Primary Email</div>
            </div>
            <input
              type="email"
              name="primaryEmail"
              value={profileData.primaryEmail}
              onChange={handleChange}
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
            />
            <div className="mt-1 text-md text-gray-500">Used for login and receipts</div>
          </div>

          {/* Backup Email */}
          <div className="mt-4">
            <div className="text-lg">Backup Email (Recovery)</div>
            <input
              type="email"
              name="backupEmail"
              value={profileData.backupEmail}
              onChange={handleChange}
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
            />
            <div className="mt-1 text-md text-gray-500">Used for account recovery</div>
          </div>

          {/* Phone Number */}
          <div className="mt-4">
            <div className="flex items-center gap-x-2">
              <svg className="w-5 h-5" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.45059 7.29866C7.14659 8.74828 8.09537 10.1069 9.29695 11.3085C10.4985 12.5101 11.8572 13.4589 13.3068 14.1549C13.4315 14.2147 13.4938 14.2447 13.5727 14.2677C13.8531 14.3494 14.1973 14.2907 14.4348 14.1207C14.5016 14.0728 14.5587 14.0157 14.673 13.9014C15.0226 13.5518 15.1975 13.377 15.3732 13.2627C16.0361 12.8317 16.8907 12.8317 17.5536 13.2627C17.7294 13.377 17.9042 13.5518 18.2538 13.9014L18.4486 14.0962C18.9801 14.6277 19.2458 14.8934 19.3902 15.1788C19.6772 15.7463 19.6772 16.4166 19.3902 16.9842C19.2458 17.2695 18.9801 17.5353 18.4486 18.0667L18.291 18.2243C17.7614 18.754 17.4966 19.0188 17.1365 19.221C16.737 19.4455 16.1165 19.6068 15.6583 19.6054C15.2454 19.6042 14.9632 19.5241 14.3987 19.3639C11.3653 18.5029 8.50295 16.8785 6.11497 14.4905C3.72699 12.1025 2.10252 9.24014 1.24155 6.20675C1.08134 5.6423 1.00124 5.36008 1.00001 4.94713C0.998645 4.48891 1.16001 3.86842 1.38443 3.46891C1.58668 3.10888 1.85149 2.84407 2.38111 2.31445L2.53874 2.15681C3.07019 1.62537 3.33591 1.35965 3.62129 1.2153C4.18885 0.928232 4.85912 0.928232 5.42668 1.2153C5.71206 1.35965 5.97778 1.62537 6.50922 2.15681L6.70409 2.35168C7.0537 2.70129 7.2285 2.87609 7.34279 3.05187C7.77378 3.71476 7.77378 4.56934 7.34278 5.23223C7.2285 5.40801 7.0537 5.58281 6.70409 5.93242C6.58978 6.04673 6.53262 6.10388 6.48478 6.1707C6.31477 6.40813 6.25607 6.75239 6.33779 7.03274C6.36079 7.11163 6.39072 7.17397 6.45059 7.29866Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>

              <div className="text-lg">Phone Number</div>
            </div>

            <input
              type="text"
              name="phoneNumber"
              value={profileData.phoneNumber}
              onChange={handleChange}
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
            />
            <div className="mt-1 text-md text-gray-500">We only use your phone for security and critical payout updates.</div>
          </div>

          {/* Country */}
          <div className="flex flex-row justify-between mt-4 space-x-3">
            <div className="w-full">
              <div className="flex items-center gap-x-2">
                <svg className="w-5 h-5" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.51304 20.2C8.51304 20.2 16.0261 13.5217 16.0261 8.51304C16.0261 4.3637 12.6624 1 8.51304 1C4.3637 1 1 4.3637 1 8.51304C1 13.5217 8.51304 20.2 8.51304 20.2Z" stroke="black" stroke-width="2"/>
                  <path d="M10.9134 8.20015C10.9134 9.52563 9.83883 10.6002 8.51335 10.6002C7.18787 10.6002 6.11335 9.52563 6.11335 8.20015C6.11335 6.87467 7.18787 5.80015 8.51335 5.80015C9.83883 5.80015 10.9134 6.87467 10.9134 8.20015Z" stroke="black" stroke-width="2"/>
                </svg>
                <div className="text-lg text-gray-500">Country</div>
              </div>
              <select
                name="country"
                value={profileData.country}
                onChange={handleChange}
                className="mt-1 px-2 py-2 border border-gray-300 rounded-xl w-full"
              >
                <option value="Cambodia">Cambodia</option>
                {/* Add more countries as needed */}
              </select>
            </div>

            {/* Time Zone */}
            <div className="-mt-1 w-full">
              <div className="flex items-center gap-x-2">
                <svg className="w-5 h-5" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 11H21M1 11C1 16.5228 5.47715 21 11 21M1 11C1 5.47715 5.47715 1 11 1M21 11C21 16.5228 16.5228 21 11 21M21 11C21 5.47715 16.5228 1 11 1M11 1C13.5013 3.73835 14.9228 7.29203 15 11C14.9228 14.708 13.5013 18.2616 11 21M11 1C8.49872 3.73835 7.07725 7.29203 7 11C7.07725 14.708 8.49872 18.2616 11 21" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <div className="text-lg text-gray-500">Time Zone</div>
              </div>
              <select
                name="timeZone"
                value={profileData.timeZone}
                onChange={handleChange}
                className="mt-2 px-2 py-2 border border-gray-300 rounded-xl w-full"
              >
                <option value="Pacific Time (PT)">Pacific Time (PT)</option>
                {/* Add more time zones as needed */}
              </select>
            </div>
          </div>


          {/* Languages */}
          <div className="mt-3">
            <div className="text-lg text-gray-500">Languages</div>
            <select
              name="languages"
              value={profileData.languages}
              onChange={handleChange}
              className="mt-2 px-2 py-2 border border-gray-300 rounded-xl w-full"
            >
              <option value="English">English</option>
              {/* Add more languages as needed */}
            </select>
          </div>
        </div>

        {/* Save Changes Button */}
        <div className="mt-6 mb-3 flex justify-end">
          <div className="inline-flex items-center justify-center w-auto h-10 px-6 py-2 text-base font-semibold text-white bg-[#10B981] rounded-md cursor-pointer hover:bg-green-700">
            Save Changes
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingRightSide6Com1;
