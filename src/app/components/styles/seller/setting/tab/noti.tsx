"use client";

import React, { useState } from "react";
import Toggle from "@/app/components/styles/seller/setting/toggle";

function Row({
  title,
  sub,
  on,
  setOn,
  iconTone = "orange",
}: {
  title: string;
  sub: string;
  on: boolean;
  setOn: (v: boolean) => void;
  iconTone?: "orange" | "gray";
}) {
  const iconBg = iconTone === "orange" ? "bg-orange-50 border-orange-100 text-orange-600" : "bg-gray-50 border-gray-200 text-gray-500";
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className={"w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 " + iconBg}>
          <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">ICON</div>
        </div>
        <div>
          <div className="text-sm font-medium text-gray-900">{title}</div>
          <div className="text-xs text-gray-500 mt-1">{sub}</div>
        </div>
      </div>
      <Toggle on={on} onChange={setOn} ariaLabel={title} />
    </div>
  );
}

export default function NotiTab() {
  const [order, setOrder] = useState(true);
  const [message, setMessage] = useState(true);
  const [review, setReview] = useState(true);
  const [payment, setPayment] = useState(true);

  const [email, setEmail] = useState(true);
  const [push, setPush] = useState(true);
  const [inapp, setInapp] = useState(true);

  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
            <div className="w-4 h-4 flex items-center justify-center text-orange-600 flex-shrink-0">
              ICON
            </div>
          </div>
          <div>
            <div className="text-lg font-semibold text-gray-900">Notification Settings</div>
            <div className="text-sm text-gray-500 mt-1">Customize how you stay updated on your shop activity</div>
          </div>
        </div>

        <div className="mt-5 border-t border-gray-100" />

        <div className="mt-5">
          <div className="text-sm font-medium text-gray-900">Event Preferences</div>
          <div className="mt-3 space-y-3">
            <Row
              title="Order Notifications"
              sub="Get alerted when a new order is placed or updated"
              on={order}
              setOn={setOrder}
            />
            <Row
              title="Message Notifications"
              sub="Get alerted when a buyer sends a message or inquiry"
              on={message}
              setOn={setMessage}
            />
            <Row
              title="Review Notifications"
              sub="Receive notifications when a buyer leaves feedback"
              on={review}
              setOn={setReview}
            />
            <Row
              title="Payment Notifications"
              sub="Receive alerts when a payout is processed"
              on={payment}
              setOn={setPayment}
            />
          </div>
        </div>

        <div className="mt-6 border-t border-gray-100" />

        <div className="mt-6">
          <div className="text-sm font-medium text-gray-900">Notification Channels</div>
          <div className="mt-3 space-y-3">
            <Row
              title="Email Notifications"
              sub="Receive updates via email"
              on={email}
              setOn={setEmail}
            />
            <Row
              title="Push Notifications"
              sub="Receive push alerts on your devices"
              on={push}
              setOn={setPush}
            />
            <Row
              title="In-App Notifications"
              sub="See notifications within the platform"
              on={inapp}
              setOn={setInapp}
            />
          </div>
        </div>

        <div className="mt-6">
          <div className="h-11 w-fit px-6 rounded-xl bg-orange-500 text-white flex items-center justify-center text-sm font-medium">
            Save Notification Settings
          </div>
        </div>
      </div>
    </div>
  );
}
