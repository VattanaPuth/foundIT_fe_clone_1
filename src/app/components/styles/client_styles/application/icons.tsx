// app/components/styles/application/icons.tsx
import React from "react";
import {
  ChevronDown,
  ChevronUp,
  MoreVertical,
  Star,
  Paperclip,
  Eye,
  Settings,
  Pause,
  X,
  MessageSquare,
  AlertCircle,
} from "lucide-react";

const base = "h-4 w-4";

export function IconChevronDown() {
  return <ChevronDown className={base} />;
}
export function IconChevronUp() {
  return <ChevronUp className={base} />;
}
export function IconMore() {
  return <MoreVertical className={base} />;
}
export function IconStar() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_1565_12398)">
        <path
          d="M5.7634 1.14745C5.78531 1.10318 5.81916 1.06591 5.86113 1.03986C5.90309 1.01381 5.9515 1 6.0009 1C6.0503 1 6.09871 1.01381 6.14067 1.03986C6.18264 1.06591 6.21649 1.10318 6.2384 1.14745L7.3934 3.48695C7.46949 3.64093 7.58181 3.77415 7.72071 3.87517C7.85962 3.9762 8.02096 4.042 8.1909 4.06695L10.7739 4.44495C10.8228 4.45204 10.8688 4.47268 10.9066 4.50455C10.9445 4.53641 10.9726 4.57822 10.9879 4.62525C11.0032 4.67228 11.005 4.72265 10.9932 4.77066C10.9814 4.81868 10.9563 4.86242 10.9209 4.89695L9.0529 6.71595C8.92971 6.836 8.83754 6.98419 8.78432 7.14776C8.7311 7.31134 8.71843 7.48539 8.7474 7.65495L9.1884 10.2249C9.19704 10.2739 9.19176 10.3242 9.17315 10.3703C9.15454 10.4163 9.12336 10.4563 9.08317 10.4854C9.04298 10.5146 8.99539 10.5319 8.94583 10.5354C8.89628 10.5388 8.84675 10.5283 8.8029 10.5049L6.4939 9.29095C6.34176 9.21106 6.17249 9.16932 6.00065 9.16932C5.82881 9.16932 5.65954 9.21106 5.5074 9.29095L3.1989 10.5049C3.15507 10.5282 3.1056 10.5386 3.05613 10.5351C3.00665 10.5316 2.95916 10.5142 2.91905 10.4851C2.87894 10.4559 2.84782 10.416 2.82923 10.3701C2.81064 10.3241 2.80533 10.2738 2.8139 10.2249L3.2544 7.65545C3.2835 7.48581 3.27089 7.31165 3.21767 7.14797C3.16445 6.98429 3.0722 6.83602 2.9489 6.71595L1.0809 4.89745C1.0452 4.86296 1.0199 4.81914 1.00788 4.77098C0.995866 4.72282 0.997618 4.67226 1.01294 4.62504C1.02826 4.57783 1.05653 4.53587 1.09454 4.50394C1.13254 4.47201 1.17875 4.4514 1.2279 4.44445L3.8104 4.06695C3.98053 4.0422 4.14209 3.97648 4.28119 3.87544C4.42029 3.77441 4.53275 3.64108 4.6089 3.48695L5.7634 1.14745Z"
          fill="#F0B100"
          strokeWidth="#F0B100"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1565_12398">
          <rect width="12" height="12" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
export function IconPaperclip() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_1565_12162)">
        <path
          d="M9.99935 1.33203H3.99935C3.64573 1.33203 3.30659 1.47251 3.05654 1.72256C2.80649 1.9726 2.66602 2.31174 2.66602 2.66536V13.332C2.66602 13.6857 2.80649 14.0248 3.05654 14.2748C3.30659 14.5249 3.64573 14.6654 3.99935 14.6654H11.9993C12.353 14.6654 12.6921 14.5249 12.9422 14.2748C13.1922 14.0248 13.3327 13.6857 13.3327 13.332V4.66536L9.99935 1.33203Z"
          stroke="#1A1A1A"
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.33398 1.33203V3.9987C9.33398 4.35232 9.47446 4.69146 9.72451 4.94151C9.97456 5.19156 10.3137 5.33203 10.6673 5.33203H13.334"
          stroke="#1A1A1A"
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.66732 6H5.33398"
          stroke="#1A1A1A"
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.6673 8.66797H5.33398"
          stroke="#1A1A1A"
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.6673 11.332H5.33398"
          stroke="#1A1A1A"
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1565_12162">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
export function IconEye() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.3737 8.23029C1.31814 8.08061 1.31814 7.91596 1.3737 7.76629C1.91483 6.45419 2.83338 5.33231 4.01288 4.54289C5.19239 3.75346 6.57973 3.33203 7.99904 3.33203C9.41834 3.33203 10.8057 3.75346 11.9852 4.54289C13.1647 5.33231 14.0832 6.45419 14.6244 7.76629C14.6799 7.91596 14.6799 8.08061 14.6244 8.23029C14.0832 9.54238 13.1647 10.6643 11.9852 11.4537C10.8057 12.2431 9.41834 12.6645 7.99904 12.6645C6.57973 12.6645 5.19239 12.2431 4.01288 11.4537C2.83338 10.6643 1.91483 9.54238 1.3737 8.23029Z"
        stroke="#717182"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z"
        stroke="#717182"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function IconSettings() {
  return <Settings className={base} />;
}
export function IconPause() {
  return <Pause className={base} />;
}
export function Iconx() {
  return  (
  <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M6 6L18 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>

  );
}
export function IconMessage() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_1565_18598)">
        <path
          d="M14.6673 11.3333C14.6673 11.687 14.5268 12.0261 14.2768 12.2761C14.0267 12.5262 13.6876 12.6667 13.334 12.6667H4.55265C4.19906 12.6667 3.85997 12.8073 3.60998 13.0573L2.14198 14.5253C2.07579 14.5915 1.99145 14.6366 1.89964 14.6548C1.80783 14.6731 1.71267 14.6637 1.62619 14.6279C1.53971 14.5921 1.46579 14.5314 1.41377 14.4536C1.36176 14.3758 1.334 14.2843 1.33398 14.1907V3.33333C1.33398 2.97971 1.47446 2.64057 1.72451 2.39052C1.97456 2.14048 2.3137 2 2.66732 2H13.334C13.6876 2 14.0267 2.14048 14.2768 2.39052C14.5268 2.64057 14.6673 2.97971 14.6673 3.33333V11.3333Z"
          stroke="#1A1A1A"
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1565_18598">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
export function IconAlert() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.99935 18.3346C14.6017 18.3346 18.3327 14.6037 18.3327 10.0013C18.3327 5.39893 14.6017 1.66797 9.99935 1.66797C5.39698 1.66797 1.66602 5.39893 1.66602 10.0013C1.66602 14.6037 5.39698 18.3346 9.99935 18.3346Z"
        stroke="#D08700"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 6.66797V10.0013"
        stroke="#D08700"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 13.332H10.0083"
        stroke="#D08700"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconSend() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_1565_18593)">
        <path
          d="M9.69119 14.4577C9.71652 14.5208 9.76055 14.5747 9.81737 14.6121C9.87419 14.6494 9.94109 14.6685 10.0091 14.6668C10.0771 14.665 10.1429 14.6426 10.1977 14.6023C10.2526 14.5621 10.2938 14.506 10.3159 14.4417L14.6492 1.77503C14.6705 1.71596 14.6746 1.65203 14.6609 1.59073C14.6473 1.52943 14.6164 1.47329 14.572 1.42888C14.5276 1.38447 14.4715 1.35363 14.4102 1.33996C14.3489 1.32629 14.2849 1.33036 14.2259 1.3517L1.55919 5.68503C1.49485 5.70709 1.4388 5.74831 1.39857 5.80314C1.35833 5.85798 1.33584 5.92381 1.33409 5.9918C1.33235 6.05979 1.35145 6.12669 1.38883 6.18351C1.4262 6.24034 1.48007 6.28437 1.54319 6.3097L6.82986 8.4297C6.99698 8.49661 7.14882 8.59667 7.27623 8.72385C7.40364 8.85103 7.50398 9.00269 7.57119 9.1697L9.69119 14.4577Z"
          stroke="white"
          stroke-width="1.33333"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M14.5687 1.42969L7.27539 8.72235"
          stroke="white"
          stroke-width="1.33333"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1565_18593">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function IconHired() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_1565_12342)">
        <path
          d="M8.00065 14.6654C11.6825 14.6654 14.6673 11.6806 14.6673 7.9987C14.6673 4.3168 11.6825 1.33203 8.00065 1.33203C4.31875 1.33203 1.33398 4.3168 1.33398 7.9987C1.33398 11.6806 4.31875 14.6654 8.00065 14.6654Z"
          stroke="white"
          stroke-width="1.33333"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M6 8.0013L7.33333 9.33464L10 6.66797"
          stroke="white"
          stroke-width="1.33333"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1565_12342">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>

    
  );
}

export function IconHeart(){
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.33398 6.33369C1.334 5.59182 1.55905 4.86741 1.97941 4.25613C2.39977 3.64485 2.99566 3.17546 3.68839 2.90995C4.38112 2.64445 5.13809 2.59532 5.85933 2.76905C6.58056 2.94278 7.23213 3.33121 7.72798 3.88302C7.76291 3.92036 7.80513 3.95013 7.85203 3.97049C7.89894 3.99084 7.94952 4.00134 8.00065 4.00134C8.05178 4.00134 8.10236 3.99084 8.14927 3.97049C8.19617 3.95013 8.23839 3.92036 8.27332 3.88302C8.76761 3.32762 9.41933 2.93593 10.1417 2.76009C10.8641 2.58424 11.623 2.63258 12.3172 2.89867C13.0115 3.16477 13.6082 3.63599 14.0281 4.24962C14.4479 4.86325 14.6709 5.59019 14.6673 6.33369C14.6673 7.86035 13.6673 9.00035 12.6673 10.0004L9.00598 13.5424C8.88176 13.685 8.7286 13.7996 8.55668 13.8786C8.38476 13.9575 8.19801 13.9989 8.00884 14.0001C7.81967 14.0013 7.63242 13.9622 7.45951 13.8855C7.2866 13.8088 7.132 13.6961 7.00598 13.555L3.33398 10.0004C2.33398 9.00035 1.33398 7.86702 1.33398 6.33369Z" stroke="#1A1A1A" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

  );
}

export function IconShare(){
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_1565_38351)">
<path d="M12 5.33203C13.1046 5.33203 14 4.4366 14 3.33203C14 2.22746 13.1046 1.33203 12 1.33203C10.8954 1.33203 10 2.22746 10 3.33203C10 4.4366 10.8954 5.33203 12 5.33203Z" stroke="#1A1A1A" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4 10C5.10457 10 6 9.10457 6 8C6 6.89543 5.10457 6 4 6C2.89543 6 2 6.89543 2 8C2 9.10457 2.89543 10 4 10Z" stroke="#1A1A1A" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 14.668C13.1046 14.668 14 13.7725 14 12.668C14 11.5634 13.1046 10.668 12 10.668C10.8954 10.668 10 11.5634 10 12.668C10 13.7725 10.8954 14.668 12 14.668Z" stroke="#1A1A1A" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5.72656 9.00781L10.2799 11.6611" stroke="#1A1A1A" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.2732 4.33984L5.72656 6.99318" stroke="#1A1A1A" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_1565_38351">
<rect width="16" height="16" fill="white"/>
</clipPath>
</defs>
</svg>

  );
}

export function IconDownload(){
  return(
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 10V2" stroke="#1A1A1A" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14 10V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V10" stroke="#1A1A1A" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4.66602 6.66797L7.99935 10.0013L11.3327 6.66797" stroke="#1A1A1A" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

  );
}

export function IconBack(){
  return(
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.00065 12.6654L3.33398 7.9987L8.00065 3.33203" stroke="#1A1A1A" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12.6673 8H3.33398" stroke="#1A1A1A" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

  );
}

export function IconChevronLeft(){
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 12L6 8L10 4" stroke="#1A1A1A" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

  );
}

export function IconChevronRight(){
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 12L10 8L6 4" stroke="#1A1A1A" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

  );
}


export function IconHuman(){
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.3327 17.5V15.8333C13.3327 14.9493 12.9815 14.1014 12.3564 13.4763C11.7313 12.8512 10.8834 12.5 9.99935 12.5H4.99935C4.11529 12.5 3.26745 12.8512 2.64233 13.4763C2.01721 14.1014 1.66602 14.9493 1.66602 15.8333V17.5" stroke="#10B981" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13.334 2.60547C14.0488 2.79078 14.6818 3.20819 15.1337 3.79219C15.5856 4.37619 15.8308 5.09371 15.8308 5.83214C15.8308 6.57056 15.5856 7.28808 15.1337 7.87208C14.6818 8.45608 14.0488 8.87349 13.334 9.0588" stroke="#10B981" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M18.334 17.501V15.8344C18.3334 15.0958 18.0876 14.3784 17.6351 13.7946C17.1826 13.2109 16.5491 12.794 15.834 12.6094" stroke="#10B981" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.49935 9.16667C9.3403 9.16667 10.8327 7.67428 10.8327 5.83333C10.8327 3.99238 9.3403 2.5 7.49935 2.5C5.6584 2.5 4.16602 3.99238 4.16602 5.83333C4.16602 7.67428 5.6584 9.16667 7.49935 9.16667Z" stroke="#10B981" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

  );
}

export function IconLightning(){
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_1565_16862)">
<path d="M3.33422 11.6662C3.17653 11.6668 3.02191 11.6226 2.88835 11.5387C2.75479 11.4549 2.64775 11.3349 2.57968 11.1926C2.51161 11.0504 2.4853 10.8917 2.5038 10.7351C2.52231 10.5785 2.58487 10.4304 2.68422 10.3079L10.9342 1.8079C10.9961 1.73647 11.0804 1.6882 11.1734 1.67101C11.2663 1.65382 11.3623 1.66874 11.4457 1.71332C11.529 1.7579 11.5947 1.82948 11.632 1.91632C11.6693 2.00317 11.676 2.10011 11.6509 2.19123L10.0509 7.2079C10.0037 7.33417 9.98786 7.47 10.0047 7.60374C10.0216 7.73748 10.0706 7.86513 10.1476 7.97575C10.2247 8.08638 10.3274 8.17666 10.447 8.23887C10.5665 8.30107 10.6994 8.33334 10.8342 8.3329H16.6676C16.8253 8.33236 16.9799 8.37658 17.1134 8.46042C17.247 8.54425 17.354 8.66427 17.4221 8.80652C17.4902 8.94877 17.5165 9.10741 17.498 9.26402C17.4795 9.42062 17.4169 9.56877 17.3176 9.69123L9.06756 18.1912C9.00567 18.2627 8.92134 18.3109 8.8284 18.3281C8.73547 18.3453 8.63945 18.3304 8.55611 18.2858C8.47278 18.2412 8.40707 18.1697 8.36978 18.0828C8.33248 17.996 8.32582 17.899 8.35089 17.8079L9.95089 12.7912C9.99807 12.665 10.0139 12.5291 9.99706 12.3954C9.98021 12.2617 9.93117 12.134 9.85415 12.0234C9.77712 11.9128 9.67441 11.8225 9.55483 11.7603C9.43524 11.6981 9.30235 11.6658 9.16756 11.6662H3.33422Z" stroke="#10B981" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_1565_16862">
<rect width="20" height="20" fill="white"/>
</clipPath>
</defs>
</svg>

  );
}

export function IconShield(){
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_1565_16823)">
<path d="M16.6673 10.835C16.6673 15.0017 13.7507 17.085 10.284 18.2933C10.1025 18.3549 9.90527 18.3519 9.72565 18.285C6.25065 17.085 3.33398 15.0017 3.33398 10.835V5.00168C3.33398 4.78066 3.42178 4.5687 3.57806 4.41242C3.73434 4.25614 3.9463 4.16834 4.16732 4.16834C5.83398 4.16834 7.91732 3.16834 9.36732 1.90168C9.54386 1.75084 9.76845 1.66797 10.0007 1.66797C10.2329 1.66797 10.4574 1.75084 10.634 1.90168C12.0923 3.17668 14.1673 4.16834 15.834 4.16834C16.055 4.16834 16.267 4.25614 16.4232 4.41242C16.5795 4.5687 16.6673 4.78066 16.6673 5.00168V10.835Z" stroke="#155DFC" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_1565_16823">
<rect width="20" height="20" fill="white"/>
</clipPath>
</defs>
</svg>

  );
}

export function IconSee(){
return (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 2H14V6" stroke="#10B981" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.66602 9.33333L13.9993 2" stroke="#10B981" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 8.66667V12.6667C12 13.0203 11.8595 13.3594 11.6095 13.6095C11.3594 13.8595 11.0203 14 10.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V5.33333C2 4.97971 2.14048 4.64057 2.39052 4.39052C2.64057 4.14048 2.97971 4 3.33333 4H7.33333" stroke="#10B981" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>


);
}

export function IconBell(){
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.84375 14C6.96078 14.2027 7.12909 14.371 7.33178 14.488C7.53446 14.605 7.76438 14.6666 7.99842 14.6666C8.23245 14.6666 8.46237 14.605 8.66505 14.488C8.86774 14.371 9.03605 14.2027 9.15308 14" stroke="#1A1A1A" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2.17418 10.216C2.08709 10.3115 2.02962 10.4302 2.00875 10.5577C1.98788 10.6852 2.00453 10.8161 2.05665 10.9343C2.10878 11.0525 2.19414 11.1531 2.30235 11.2237C2.41056 11.2943 2.53697 11.3319 2.66618 11.332H13.3328C13.462 11.3321 13.5885 11.2946 13.6968 11.2241C13.805 11.1536 13.8905 11.0532 13.9428 10.935C13.995 10.8169 14.0118 10.6861 13.9911 10.5586C13.9704 10.431 13.9131 10.3123 13.8262 10.2167C12.9395 9.3027 11.9995 8.33136 11.9995 5.33203C11.9995 4.27117 11.5781 3.25375 10.8279 2.5036C10.0778 1.75346 9.06038 1.33203 7.99951 1.33203C6.93865 1.33203 5.92123 1.75346 5.17109 2.5036C4.42094 3.25375 3.99951 4.27117 3.99951 5.33203C3.99951 8.33136 3.05885 9.3027 2.17418 10.216Z" stroke="#1A1A1A" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

  );
}