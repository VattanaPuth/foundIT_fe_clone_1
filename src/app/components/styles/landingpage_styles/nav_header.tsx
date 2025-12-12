"use client";
import React, { useState } from 'react';

interface MenuItem {
  name: string;
  id: string;
  subcategories: string[]; 
}

interface NavHeaderProps {
  logoSrc?: string;
  logoAlt?: string;
  menuItems?: MenuItem[];
}

const defaultMenuItems: MenuItem[] = [
  { name: 'Hire', id:'#hire', subcategories: [] },
  { name: 'Job', id:'#feature', subcategories: [] },
  { name: 'Sell', id:'#ready', subcategories: [] },
  { name: 'Explore', id:'#', subcategories: [] },
  { name: 'Categories', id:'#', subcategories: [] },
  { name: 'About', id:'#', subcategories: [] },
];

export default function NavHeader({
  logoSrc = 'favicon.ico',
  logoAlt = 'FoundIt Logo',
  menuItems = defaultMenuItems,
}: NavHeaderProps) {
  const [isBurgerOpen, setBurgerOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleScrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start', 
      });
    }
  };

  return (
    <nav className="flex items-center shadow-md -ml-6 p-2 justify-between sm:flex sm:items-center sm:justify-between sm:shadow-md sm:p-3 lg:flex lg:items-center lg:justify-between lg:shadow-md lg:p-3 xl:flex xl:items-center xl:justify-between xl:shadow-md xl:p-3">
      <div className="hidden items-center gap-x-3 pl-4 xl:flex xl:items-center xl:gap-x-3 xl:pl-4">
        <img className="w-fit h-8" src={logoSrc} alt={logoAlt} />
      </div>

      {/* Burger Menu (For Small Screens) */}
      <div className="sm:hidden relative px-4 pt-4">
        <p
          onClick={() => setBurgerOpen(!isBurgerOpen)}
          className="flex items-center justify-center"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_621_6257)">
              <path
                d="M4 0.5H10C10.9283 0.5 11.8185 0.868749 12.4749 1.52513C13.1313 2.1815 13.5 3.07174 13.5 4C13.5 4.26522 13.3946 4.51957 13.2071 4.70711C13.0196 4.89464 12.7652 5 12.5 5H1.5C1.23478 5 0.98043 4.89464 0.792893 4.70711C0.605357 4.51957 0.5 4.26522 0.5 4C0.5 3.07174 0.868749 2.1815 1.52513 1.52513C2.1815 0.868749 3.07174 0.5 4 0.5V0.5Z"
                stroke="#000001"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M0.5 7.5H13.5"
                stroke="#000001"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13 10H7L5.5 11.5L2.5 10H1C0.867392 10 0.740215 10.0527 0.646447 10.1464C0.552678 10.2402 0.5 10.3674 0.5 10.5V10.5C0.5 11.2956 0.81607 12.0587 1.37868 12.6213C1.94129 13.1839 2.70435 13.5 3.5 13.5H10.5C11.2956 13.5 12.0587 13.1839 12.6213 12.6213C13.1839 12.0587 13.5 11.2956 13.5 10.5C13.5 10.3674 13.4473 10.2402 13.3536 10.1464C13.2598 10.0527 13.1326 10 13 10Z"
                stroke="#000001"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_621_6257">
                <rect width="14" height="14" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </p>

        {/* Close Button */}
        {isBurgerOpen && (
            <div
                className={`absolute w-[210px] -mt-12 justify-between list-none rounded-[12px] bg-white shadow-lg py-2 px-4 transition-all duration-300 ease-in-out ${
                    isBurgerOpen ? 'block' : 'hidden'
                }`}
                >
                {menuItems.map((arr, index) => (
                    <li
                    key={`${arr.name}-${index}`}
                    className={`text-gray-700 py-2${arr.id}-${index}`}
                    onClick={() => {
                      setActiveIndex(index);
                      handleScrollToSection(arr.id); 
                      setBurgerOpen(false); 
                    }}
                    
                    >
                    {arr.name}
                    </li>
                ))}
                <p onClick={() => setBurgerOpen(false)} className="absolute top-2 right-2 text-2xl text-gray-700">
                    X
                </p>
            </div>
        )}   
      </div>

      {/* Menu Items for Large Screens */}
      <ul className="hidden items-center gap-x-2 pt-3 hover:cursor-pointer sm:flex sm:items-center sm:gap-x-4 sm:text-sm lg:flex lg:items-center lg:gap-x-8 lg:text-lg xl:flex xl:items-center xl:gap-x-12 xl:text-xl">
        {menuItems.map((arr, index) => {
          const isOpen = activeIndex === index;
          return (
            <li
              key={`${arr.name}-${index}`}
              className={`relative text-gray-700 transition-colors duration-200 
                ${isOpen ? 'text-gray-900 after:w-full' : 
                           'hover:text-gray-900 hover:after:w-full'} 
                           after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#D92AD0] after:transition-[width] after:duration-300 after:ease-out focus:outline-none focus:after:w-full`}
              onClick={() => {
                setActiveIndex(index);
                handleScrollToSection(arr.id);
              }} 
            >
              {arr.name}
            </li>
          );
        })}
      </ul>

      {/* Sign In & Join buttons */}
      <div className="flex items-center gap-x-3 text-sm pr-2 sm:flex sm:items-center sm:gap-x-6 sm:text-sm sm:pr-4 lg:flex lg:items-center lg:gap-x-6 lg:text-sm lg:pr-4 xl:flex xl:items-center xl:gap-x-6 xl:text-lg xl:pr-4">
        <button className="hover:opacity-75">Sign in</button>
        <div className="rounded-2xl bg-[#D92AD0] px-3 py-2 transition-colors">
          <button className="text-white">Join</button>
        </div>
      </div>
    </nav>
  );
}
