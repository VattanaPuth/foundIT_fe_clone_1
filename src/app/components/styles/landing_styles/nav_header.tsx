"use client";
import React, { useState } from 'react';
interface MenuItem {
  name: string;
  subcategories: string[];
}

interface NavHeaderProps {
    logoSrc?: string;
    logoAlt?: string;
    menuItems?: MenuItem[];
}

const defaultMenuItems: MenuItem[] = [
        { name: 'Hire', subcategories: ['Freelancers', 'Contractors', 'Full-Time'] },
        { name: 'Buy', subcategories: ['Electronics', 'Clothing', 'Furniture'] },
        { name: 'Sell', subcategories: ['Post Item', 'Auction', 'Bulk Sales'] },
        { name: 'Explore', subcategories: [] },
        { name: 'Categories', subcategories: ['Home', 'Fashion', 'Tech', 'Books'] },
        { name: 'About', subcategories: ['Our Story', 'Team', 'Contact'] },
    ];

export default function NavHeader (
    { 
        logoSrc = 'favicon.ico',
        logoAlt = 'FoundIt Logo',
        menuItems = defaultMenuItems,
    }:NavHeaderProps){

    const [activeIndex] = useState<number | null>(null);
    
    return (
        <nav className='flex items-center justify-between shadow-md p-3'>
            <div className='flex items-center gap-x-3 pl-4'>
                <img className="w-fit h-12" src= {logoSrc} alt= {logoAlt}/>
            </div>

            <div className='pt-3 relative'>
                <ul className='flex items-center gap-x-12 text-2xl hover:cursor-pointer'>
                    {menuItems.map((arr, index) => {
                        const isOpen = activeIndex === index;
                        return (                           
                            <li key={`${arr.name}-${index}`} 
                                className={`relative text-gray-700 
                                            transition-colors duration-200" 
                                            ${isOpen ? "text-gray-900 after:w-full" : "hover:text-gray-900 hover:after:w-full"}
                                            after:content-[''] after:absolute after:left-0 after:bottom-0
                                            after:h-[2px] after:w-0 after:bg-emerald-500
                                            after:transition-[width] after:duration-300 after:ease-out
                                            focus:outline-none focus:after:w-full
                                        `}>                                
                                {arr.name}
                            </li>
                        )
                    })}
                </ul>
            </div>
            
            <div className='flex items-center gap-x-6 text-xl pr-4'>
                <button className="hover:opacity-75">
                    Sign in
                </button>
                <div className='rounded-2xl bg-[#00A63E] px-3 py-2 hover:bg-[#008530] transition-colors'>
                    <button className='text-white'>Join</button>
                </div>
            </div>
        </nav>
    )
}