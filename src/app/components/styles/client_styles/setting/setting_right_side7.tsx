import React from 'react';
import SettingRightSide7Com1 from './setting_right_side7_com1';
import SettingRightSide7Com2 from './setting_right_side7_com2';
import SettingRightSide7Com3 from './setting_right_side7_com3';
import SettingRightSide7Com4 from './setting_right_side7_com4';
export function Security() {
    return (
    <div className="w-full ml-4 mr-4">
      <div className='h-screen overflow-y-auto space-y-6  rounded-2xl'>
        <SettingRightSide7Com1 />
        <SettingRightSide7Com2 />
        <SettingRightSide7Com3 />
        <SettingRightSide7Com4 />
      </div>
    </div>
    )
}