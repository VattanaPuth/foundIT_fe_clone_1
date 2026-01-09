"use client";

import React, { useState } from "react";
import Toggle from "@/app/components/styles/seller/setting/toggle";

export default function SecurityTab() {
  const [auth, setAuth] = useState(true);
  const [sms, setSms] = useState(false);
  const [alert, setAlert] = useState(true);

  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <div className="text-lg font-semibold text-gray-900">Password</div>
        <div className="text-sm text-gray-500 mt-1">Change your password and ensure it is strong</div>

        <div className="mt-5 space-y-4">
          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-900">Current Password</div>
            <input
              placeholder=""
              className="w-full h-11 px-3 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-800 outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-500"
            />
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-900">New Password</div>
            <input
              placeholder=""
              className="w-full h-11 px-3 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-800 outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-500"
            />
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-900">Confirm New Password</div>
            <input
              placeholder=""
              className="w-full h-11 px-3 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-800 outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-500"
            />
          </div>

          <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 flex items-center gap-3">
            <div className="w-4 h-4 flex items-center justify-center text-gray-500 flex-shrink-0">i</div>
            <div className="text-sm text-gray-600">
              We will check your password against known breaches using have i been pwned .
            </div>
          </div>

          <div className="flex justify-end">
            <div className="h-11 px-6 rounded-xl bg-orange-500 text-white flex items-center justify-center text-sm font-medium">
              Update Password
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <div className="text-lg font-semibold text-gray-900">Two-Factor Authentication (2FA)</div>
        <div className="text-sm text-gray-500 mt-1">Add an extra layer of security to your account</div>

        <div className="mt-5 space-y-3">
          <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 flex items-center gap-3">
            <div className="w-4 h-4 flex items-center justify-center text-gray-500 flex-shrink-0">ICON</div>
            <div className="text-sm text-gray-600">2FA is required for payouts and team admin actions</div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center flex-shrink-0">
                <div className="w-4 h-4 flex items-center justify-center text-gray-500 flex-shrink-0">ICON</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900 flex items-center gap-2">
                  Authenticator App
                  <span className="px-2 py-0.5 rounded-full text-[11px] bg-gray-100 text-gray-600 border border-gray-200">
                    Active
                  </span>
                </div>
                <div className="text-xs text-gray-500 mt-1">Use an app like Google Authenticator or Authy</div>
              </div>
            </div>
            <Toggle on={auth} onChange={setAuth} ariaLabel="Authenticator App" />
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center flex-shrink-0">
                <div className="w-4 h-4 flex items-center justify-center text-gray-500 flex-shrink-0">ICON</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">SMS Backup</div>
                <div className="text-xs text-gray-500 mt-1">Receive codes via text message as a backup</div>
              </div>
            </div>
            <Toggle on={sms} onChange={setSms} ariaLabel="SMS Backup" />
          </div>

          <div className="pt-3">
            <div className="text-sm font-medium text-gray-900">Login Alerts</div>
            <div className="text-sm text-gray-500 mt-1">Get notified of new login attempts</div>

            <div className="mt-3 flex justify-end">
              <Toggle on={alert} onChange={setAlert} ariaLabel="Login Alerts" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
