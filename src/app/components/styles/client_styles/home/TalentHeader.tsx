export default function TalentHeader(){
    return (
        // 1. ADDED: sticky top-0 z-50 to make the header fixed on scroll.
        // 2. MODIFIED: Increased horizontal padding (px-8) for better edge spacing.
        // 3. REMOVED: border-black (used border-gray-200 instead for a softer look).
        <div className="sticky top-0 z-50 flex px-8 py-3 justify-between items-center border-b border-gray-200 bg-white shadow-sm">
            
            <div className="flex w-full items-center gap-x-10"> 
                {/* Logo and Navigation links are now closer */}
                <img className="w-fit h-12" src="/favicon.ico" alt="logo"/>
                
                {/* Search Bar - Adjusted width (w-96) and general sizing */}
                <div className='flex w-96 items-center gap-x-2 h-12 bg-gray-100 p-2 rounded-xl border border-gray-200'>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 19L15.5001 15.5M18 9.5C18 14.1944 14.1944 18 9.5 18C4.80558 18 1 14.1944 1 9.5C1 4.80558 4.80558 1 9.5 1C14.1944 1 18 4.80558 18 9.5Z" stroke="#717182" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {/* Input - Removed excessive padding and adjusted focus ring */}
                    <input 
                        type='text' 
                        className='w-full bg-gray-100 p-1 rounded-xl text-base outline-none border-none focus:ring-0 placeholder-gray-500' 
                        placeholder="Search jobs, talent..."
                    />
                </div>
            </div>
            
            {/* Right-side Icons and Buttons */}
            {/* Removed redundant pt-3 from parent div */}
            <div className="flex items-center space-x-6 text-sm">
                
                {/* Navigation Links Group */}
                <div className="flex items-center space-x-8 text-base font-medium">
                    
                    {/* Jobs Dropdown */}
                    <div className="flex items-center gap-x-1 hover:cursor-pointer hover:text-green-600 transition">
                        <p>Jobs</p>
                        <svg className="w-3 h-3" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>

                    {/* Talents */}
                    <div className="hover:cursor-pointer text-green-600 font-bold active:opacity-70 transition">
                        <p>Talent</p>
                    </div>
                    
                    {/* Message Icon */}
                    <div className="hover:cursor-pointer active:opacity-70">
                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 14" fill="none">
                            <path d="M13.9993 9.99935C13.9993 10.353 13.8589 10.6921 13.6088 10.9422C13.3588 11.1922 13.0196 11.3327 12.666 11.3327H3.88468C3.53109 11.3328 3.19201 11.4733 2.94202 11.7233L1.47402 13.1913C1.40782 13.2575 1.32348 13.3026 1.23167 13.3209C1.13987 13.3391 1.0447 13.3297 0.95822 13.2939C0.871737 13.2581 0.797817 13.1974 0.745806 13.1196C0.693795 13.0418 0.666028 12.9503 0.666016 12.8567V1.99935C0.666016 1.64573 0.806491 1.30659 1.05654 1.05654C1.30659 0.806491 1.64573 0.666016 1.99935 0.666016H12.666C13.0196 0.666016 13.3588 0.806491 13.6088 1.05654C13.8589 1.30659 13.9993 1.64573 13.9993 1.99935V9.99935Z" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>

                    {/* Notification Icon */}
                    <div className="hover:cursor-pointer active:opacity-70">
                        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.33333 20.0909C10.041 20.6562 10.9755 21 12 21C13.0245 21 13.959 20.6562 14.6667 20.0909M4.50763 17.1818C4.08602 17.1818 3.85054 16.5194 4.10557 16.1514C4.69736 15.2975 5.26855 14.0451 5.26855 12.537L5.29296 10.3517C5.29296 6.29145 8.29581 3 12 3C15.7588 3 18.8058 6.33993 18.8058 10.4599L18.7814 12.537C18.7814 14.0555 19.3329 15.3147 19.9006 16.169C20.1458 16.5379 19.9097 17.1818 19.4933 17.1818H4.50763Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                </div>

                {/* Post a Job Button */}
                {/* Adjusted height (h-10) and padding (py-2) for better vertical alignment */}
                <div className="w-40 h-10 px-4 py-2 rounded-lg bg-[#00BC7D] active:opacity-70 hover:opacity-90 hover:cursor-pointer transition">
                    <p className="text-white text-center font-medium">+ Post a Job</p>
                </div>

                {/* User Avatar Placeholder */}
                {/* Adjusted size (w-10 h-10) and centered content */}
                <div className="w-10 h-10 rounded-full bg-[#ECECF0] flex items-center justify-center hover:cursor-pointer active:opacity-70 transition">
                    <svg className="w-5 h-5" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17 19C17 17.6044 17 16.9067 16.8278 16.3389C16.44 15.0605 15.4395 14.06 14.1611 13.6722C13.5933 13.5 12.8956 13.5 11.5 13.5H6.5C5.10444 13.5 4.40665 13.5 3.83886 13.6722C2.56045 14.06 1.56004 15.0605 1.17224 16.3389C1 16.9067 1 17.6044 1 19M13.5 5.5C13.5 7.98528 11.4853 10 9 10C6.51472 10 4.5 7.98528 4.5 5.5C4.5 3.01472 6.51472 1 9 1C11.4853 1 13.5 3.01472 13.5 5.5Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            </div>
        </div>
    )
}