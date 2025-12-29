import React from 'react';
import SettingRightSide6Com1 from './setting_right_side6_com1';
import SettingRightSide6Com2 from './setting_right_side6_com2';
import SettingRightSide6Com3 from './setting_right_side6_com3';
export default function Account() {
  return (
    <div className="w-full ml-4 mr-4">
      <div className='h-screen overflow-y-auto rounded-2xl'>
        <SettingRightSide6Com1 />
        <SettingRightSide6Com2 />
        <SettingRightSide6Com3 />
      </div>
    </div>
  )
}