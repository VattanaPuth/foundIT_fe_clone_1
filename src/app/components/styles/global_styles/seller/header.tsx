import { useState, useRef, useEffect } from "react";

// Role Switch Modal Component
function RoleSwitchModal({
  isOpen,
  onClose,
  currentRole,
  targetRole,
  onConfirm,
  isLoading,
}: {
  isOpen: boolean;
  onClose: () => void;
  currentRole: string;
  targetRole: string;
  onConfirm: () => void;
  isLoading: boolean;
}) {
  if (!isOpen) return null;

  const roleColors = {
    client: { primary: '#10B981', secondary: '#D1FAE5', text: '#10B981' },
    freelancer: { primary: '#6366F1', secondary: '#E0E7FF', text: '#6366F1' },
    seller: { primary: '#F59E0B', secondary: '#FEF3C7', text: '#F59E0B' }
  };

  const color = roleColors[targetRole as keyof typeof roleColors] || roleColors.client;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        {isLoading ? (
          // Loading State
          <div className="p-12 text-center">
            <div className="mb-6 flex justify-center">
              <div 
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{ backgroundColor: color.secondary }}
              >
                <div 
                  className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin"
                  style={{ borderColor: color.primary, borderTopColor: 'transparent' }}
                />
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Switching to {targetRole.charAt(0).toUpperCase() + targetRole.slice(1)}
            </h2>
            <p className="text-gray-500 mb-4">
              Preparing your {targetRole} workspace...
            </p>
            <div className="flex justify-center gap-2">
              <div 
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: color.primary, animationDelay: '0ms' }}
              />
              <div 
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: color.primary, animationDelay: '200ms' }}
              />
              <div 
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: color.primary, animationDelay: '400ms' }}
              />
            </div>
          </div>
        ) : (
          // Confirmation State
          <div className="p-8">
            <div className="mb-6 flex justify-center">
              <div 
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{ backgroundColor: color.secondary }}
              >
                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
                    stroke={color.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            
            <p className="text-2xl font-semibold text-gray-900 mb-4 text-center">
              Confirm Role Switch
            </p>
            
            <p className="text-gray-600 text-center mb-6">
              Are you sure you want to switch to <span style={{ color: color.text }} className="font-semibold">{targetRole.charAt(0).toUpperCase() + targetRole.slice(1)}</span> mode?
            </p>
            
            <div 
              className="rounded-xl p-4 mb-6"
              style={{ backgroundColor: color.secondary }}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600 text-sm">Current Role:</span>
                <span className="text-gray-900 font-medium">{currentRole.charAt(0).toUpperCase() + currentRole.slice(1)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">Switching To:</span>
                <span className="font-semibold" style={{ color: color.text }}>
                  {targetRole.charAt(0).toUpperCase() + targetRole.slice(1)}
                </span>
              </div>
            </div>
            
            <div className="flex text-center gap-3">
              <p
                onClick={onClose}
                className="flex-1 px-6 py-3 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition"
              >
                Cancel
              </p>
              <p
                onClick={onConfirm}
                className="flex-1 px-6 py-3 rounded-xl text-white font-medium hover:opacity-90 transition"
                style={{ backgroundColor: color.primary }}
              >
                Confirm Switch
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SellerNavHeader() {
    const [isJobsDropdownOpen, setIsJobsDropdownOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const [currentRole, setCurrentRole] = useState('seller');
    const [showRoleModal, setShowRoleModal] = useState(false);
    const [targetRole, setTargetRole] = useState('');
    const [isRoleSwitching, setIsRoleSwitching] = useState(false);
    
    const jobsRef = useRef<HTMLDivElement | null>(null);
    const userRef = useRef<HTMLDivElement | null>(null);

    // Simulate role switch with loading
    const handleRoleSwitch = async () => {
        setIsRoleSwitching(true);
        
        // Simulate API call / data loading
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Update role
        setCurrentRole(targetRole);
        setIsRoleSwitching(false);
        setShowRoleModal(false);
        setIsUserDropdownOpen(false);
        
        // Here you would typically navigate or update the UI based on the new role
        console.log(`Switched to ${targetRole} mode`);
    };

    const initiateRoleSwitch = (role: string) => {
        if (role === currentRole) return;
        setTargetRole(role as "client" | "freelancer" | "seller");
        setShowRoleModal(true);
    };

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Element | null;
        if (jobsRef.current && target && !jobsRef.current.contains(target)) {
            setIsJobsDropdownOpen(false);
        }
        if (userRef.current && target && !userRef.current.contains(target)) {
            setIsUserDropdownOpen(false);
        }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleNavigation = (path: string) => {
        console.log(`Navigating to: ${path}`);
        setIsUserDropdownOpen(false);
        setIsJobsDropdownOpen(false);
    };

    const handleCartClick = () => {
        handleNavigation('/page/client/cart');
    };

    return (
        <>
        <div className="flex p-3 -ml-1 pt-2 pb-2 justify-between items-center bg-white top-0 z-50 sticky shadow-sm">
            {/* Search */}
            <div className="flex w-full items-center gap-x-8 space-x-4">
            <img className="hidden lg:block lg:w-fit lg:h-8 xl:block xl:w-fit xl:h-8" src="/favicon.ico" alt="logo"/>
            <div className='flex w-xs sm:w-sm lg:w-xl xl:w-2xl items-center gap-x-2 h-12 border-t-1 border-b-1 border-[#F3F3F5] bg-gray-100 p-3 rounded-2xl'>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 19L15.5001 15.5M18 9.5C18 14.1944 14.1944 18 9.5 18C4.80558 18 1 14.1944 1 9.5C1 4.80558 4.80558 1 9.5 1C14.1944 1 18 4.80558 18 9.5Z" stroke="#717182" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <input type='text' className='w-full p-3 rounded-xl outline-none border-none focus:ring-0 bg-transparent' placeholder="Search jobs, talent..."/>
            </div>
            </div>

        <div className="flex items-center justify-between space-x-4 pt-3">
          <div className="flex items-center space-x-8 text-xl ml-3 sm:ml-3 lg:ml-3">

            <div className="hover:cursor-pointer active:opacity-30 hidden xl:block lg:block sm:block">
              <p className="w-32">Ready-Made</p>
            </div>

            <div className="hidden xl:block lg:block gap-x-3 hover:cursor-pointer active:opacity-30" onClick={handleCartClick}>
              <svg className="-mt-4 w-[22px] h-[22px]" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1H2.30616C2.55218 1 2.67519 1 2.77418 1.04524C2.86142 1.08511 2.93535 1.14922 2.98715 1.22995C3.04593 1.32154 3.06333 1.44332 3.09812 1.68686L3.57143 5M3.57143 5L4.62332 12.7314C4.75681 13.7125 4.82355 14.2031 5.0581 14.5723C5.26478 14.8977 5.56108 15.1564 5.91135 15.3174C6.30886 15.5 6.80394 15.5 7.79411 15.5H16.352C17.2945 15.5 17.7658 15.5 18.151 15.3304C18.4905 15.1809 18.7818 14.9398 18.9923 14.6342C19.2309 14.2876 19.3191 13.8247 19.4955 12.8988L20.8191 5.94969C20.8812 5.62381 20.9122 5.46087 20.8672 5.3335C20.8278 5.22177 20.7499 5.12768 20.6475 5.06802C20.5308 5 20.365 5 20.0332 5H3.57143ZM9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM17 20C17 20.5523 16.5523 21 16 21C15.4477 21 15 20.5523 15 20C15 19.4477 15.4477 19 16 19C16.5523 19 17 19.4477 17 20Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            
            <div className="hidden xl:block lg:block gap-x-3 hover:cursor-pointer active:opacity-30">
              <svg className="-mt-4 w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 14" fill="none">
                <path d="M13.9993 9.99935C13.9993 10.353 13.8589 10.6921 13.6088 10.9422C13.3588 11.1922 13.0196 11.3327 12.666 11.3327H3.88468C3.53109 11.3328 3.19201 11.4733 2.94202 11.7233L1.47402 13.1913C1.40782 13.2575 1.32348 13.3026 1.23167 13.3209C1.13987 13.3391 1.0447 13.3297 0.95822 13.2939C0.871737 13.2581 0.797817 13.1974 0.745806 13.1196C0.693795 13.0418 0.666028 12.9503 0.666016 12.8567V1.99935C0.666016 1.64573 0.806491 1.30659 1.05654 1.05654C1.30659 0.806491 1.64573 0.666016 1.99935 0.666016H12.666C13.0196 0.666016 13.3588 0.806491 13.6088 1.05654C13.8589 1.30659 13.9993 1.64573 13.9993 1.99935V9.99935Z" stroke="#1A1A1A" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            <div className="hidden xl:block lg:block gap-x-3 hover:cursor-pointer active:opacity-30">
              <svg className="-mt-4 w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.33333 20.0909C10.041 20.6562 10.9755 21 12 21C13.0245 21 13.959 20.6562 14.6667 20.0909M4.50763 17.1818C4.08602 17.1818 3.85054 16.5194 4.10557 16.1514C4.69736 15.2975 5.26855 14.0451 5.26855 12.537L5.29296 10.3517C5.29296 6.29145 8.29581 3 12 3C15.7588 3 18.8058 6.33993 18.8058 10.4599L18.7814 12.537C18.7814 14.0555 19.3329 15.3147 19.9006 16.169C20.1458 16.5379 19.9097 17.1818 19.4933 17.1818H4.50763Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            <div className="min-w-52 h-10 -mt-4 px-4 py-1 rounded-xl bg-[#E17100] active:opacity-30 hover:cursor-pointer hidden sm:block xl:block lg:block">
              <p className="pt-0.5 text-white text-lg">+ Create Products</p>
            </div>

            {/* User Dropdown */}
            {/* ==================== */}
            <div className="relative" ref={userRef}>
              <div
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                className="w-12 h-12 -mt-4 rounded-full bg-[#ECECF0] flex items-center justify-center cursor-pointer active:opacity-70 hover:ring-4 hover:ring-gray-200 transition"
              >
                <svg className="w-6 h-6" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 19C17 17.6044 17 16.9067 16.8278 16.3389C16.44 15.0605 15.4395 14.06 14.1611 13.6722C13.5933 13.5 12.8956 13.5 11.5 13.5H6.5C5.10444 13.5 4.40665 13.5 3.83886 13.6722C2.56045 14.06 1.56004 15.0605 1.17224 16.3389C1 16.9067 1 17.6044 1 19M13.5 5.5C13.5 7.98528 11.4853 10 9 10C6.51472 10 4.5 7.98528 4.5 5.5C4.5 3.01472 6.51472 1 9 1C11.4853 1 13.5 3.01472 13.5 5.5Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              {isUserDropdownOpen && (
                <div className="absolute right-0 top-full mt-3 w-96 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden z-50">
                  {/* Header */}
                  <div className="px-6 pt-3 border-b border-gray-200">
                    <p className="text-2xl text-gray-900">My Account</p>
                  </div>

                  {/* Work Mode Section */}
                  <div className="px-6 py-3">
                    <p className="text-sm text-gray-500 mb-2">Work Mode</p>
                    <div className="space-y-1">
                      <div 
                        onClick={() => initiateRoleSwitch('client')}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition ${
                          currentRole === 'client' ? 'bg-gray-100' : 'hover:bg-gray-50'
                        }`}
                      >
                        <svg className="w-6 h-6" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4.3163 18.4384C4.92462 17.0052 6.34492 16 8 16H14C15.6551 16 17.0754 17.0052 17.6837 18.4384M15 8.5C15 10.7091 13.2091 12.5 11 12.5C8.79086 12.5 7 10.7091 7 8.5C7 6.29086 8.79086 4.5 11 4.5C13.2091 4.5 15 6.29086 15 8.5ZM21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z" stroke="#717182" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="text-gray-900 text-lg flex-1">Client</span>
                        {currentRole === 'client' && (
                          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.6668 5L7.50016 14.1667L3.3335 10" stroke="#00BC7D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                      <div 
                        onClick={() => initiateRoleSwitch('freelancer')}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition ${
                          currentRole === 'freelancer' ? 'bg-indigo-50' : 'hover:bg-gray-50'
                        }`}
                      >
                        <svg className="w-[22px] h-[22px]" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M15 5C15 4.07003 15 3.60504 14.8978 3.22354C14.6204 2.18827 13.8117 1.37962 12.7765 1.10222C12.395 1 11.93 1 11 1C10.07 1 9.60504 1 9.22354 1.10222C8.18827 1.37962 7.37962 2.18827 7.10222 3.22354C7 3.60504 7 4.07003 7 5M11.8 15.5H16.7C16.98 15.5 17.12 15.5 17.227 15.4455C17.3211 15.3976 17.3976 15.3211 17.4455 15.227C17.5 15.12 17.5 14.98 17.5 14.7V12.3C17.5 12.02 17.5 11.88 17.4455 11.773C17.3976 11.6789 17.3211 11.6024 17.227 11.5545C17.12 11.5 16.98 11.5 16.7 11.5H11.8C11.52 11.5 11.38 11.5 11.273 11.5545C11.1789 11.6024 11.1024 11.6789 11.0545 11.773C11 11.88 11 12.02 11 12.3V14.7C11 14.98 11 15.12 11.0545 15.227C11.1024 15.3211 11.1789 15.3976 11.273 15.4455C11.38 15.5 11.52 15.5 11.8 15.5ZM5.8 19H16.2C17.8802 19 18.7202 19 19.362 18.673C19.9265 18.3854 20.3854 17.9265 20.673 17.362C21 16.7202 21 15.8802 21 14.2V9.8C21 8.11984 21 7.27976 20.673 6.63803C20.3854 6.07354 19.9265 5.6146 19.362 5.32698C18.7202 5 17.8802 5 16.2 5H5.8C4.11984 5 3.27976 5 2.63803 5.32698C2.07354 5.6146 1.6146 6.07354 1.32698 6.63803C1 7.27976 1 8.11984 1 9.8V14.2C1 15.8802 1 16.7202 1.32698 17.362C1.6146 17.9265 2.07354 18.3854 2.63803 18.673C3.27976 19 4.11984 19 5.8 19Z" stroke="#717182" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="text-gray-900 text-lg flex-1">Freelancer</span>
                        {currentRole === 'freelancer' && (
                          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.6668 5L7.50016 14.1667L3.3335 10" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Digital Market Section */}
                  <div className="px-6 py-3 border-t border-gray-200">
                    <p className="text-sm text-gray-500 mb-2">Digital Market</p>
                    <div 
                      onClick={() => initiateRoleSwitch('seller')}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition ${
                        currentRole === 'seller' ? 'bg-amber-50' : 'hover:bg-gray-50'
                      }`}
                    >
                      <svg className="w-5 h-5" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.52 1.64049L1.96 3.72049C1.65102 4.13247 1.49652 4.33846 1.50011 4.51088C1.50323 4.66093 1.57358 4.80164 1.69175 4.89416C1.82754 5.00049 2.08503 5.00049 2.6 5.00049H17.4C17.915 5.00049 18.1725 5.00049 18.3083 4.89416C18.4264 4.80164 18.4968 4.66093 18.4999 4.51088C18.5035 4.33846 18.349 4.13247 18.04 3.72049L16.48 1.64049M3.52 1.64049C3.696 1.40582 3.784 1.28849 3.89552 1.20386C3.9943 1.12891 4.10616 1.07298 4.22539 1.03893C4.36 1.00049 4.50667 1.00049 4.8 1.00049H15.2C15.4933 1.00049 15.64 1.00049 15.7746 1.03893C15.8938 1.07298 16.0057 1.12891 16.1045 1.20386C16.216 1.28849 16.304 1.40582 16.48 1.64049M3.52 1.64049L1.64 4.14715C1.40254 4.46377 1.28381 4.62207 1.1995 4.79641C1.12469 4.95111 1.07012 5.1148 1.03715 5.28345C1 5.4735 1 5.67138 1 6.06715L1 17.8005C1 18.9206 1 19.4806 1.21799 19.9085C1.40973 20.2848 1.71569 20.5908 2.09202 20.7825C2.51984 21.0005 3.07989 21.0005 4.2 21.0005L15.8 21.0005C16.9201 21.0005 17.4802 21.0005 17.908 20.7825C18.2843 20.5908 18.5903 20.2848 18.782 19.9085C19 19.4806 19 18.9206 19 17.8005V6.06715C19 5.67139 19 5.4735 18.9628 5.28345C18.9299 5.1148 18.8753 4.95111 18.8005 4.79641"/>
                        <path d="M3.52 1.64049L1.96 3.72049C1.65102 4.13247 1.49652 4.33846 1.50011 4.51088C1.50323 4.66093 1.57358 4.80164 1.69175 4.89416C1.82754 5.00049 2.08503 5.00049 2.6 5.00049H17.4C17.915 5.00049 18.1725 5.00049 18.3083 4.89416C18.4264 4.80164 18.4968 4.66093 18.4999 4.51088C18.5035 4.33846 18.349 4.13247 18.04 3.72049L16.48 1.64049M3.52 1.64049C3.696 1.40582 3.784 1.28849 3.89552 1.20386C3.9943 1.12891 4.10616 1.07298 4.22539 1.03893C4.36 1.00049 4.50667 1.00049 4.8 1.00049H15.2C15.4933 1.00049 15.64 1.00049 15.7746 1.03893C15.8938 1.07298 16.0057 1.12891 16.1045 1.20386C16.216 1.28849 16.304 1.40582 16.48 1.64049M3.52 1.64049L1.64 4.14715C1.40254 4.46377 1.28381 4.62207 1.1995 4.79641C1.12469 4.95111 1.07012 5.1148 1.03715 5.28345C1 5.4735 1 5.67138 1 6.06715L1 17.8005C1 18.9206 1 19.4806 1.21799 19.9085C1.40973 20.2848 1.71569 20.5908 2.09202 20.7825C2.51984 21.0005 3.07989 21.0005 4.2 21.0005L15.8 21.0005C16.9201 21.0005 17.4802 21.0005 17.908 20.7825C18.2843 20.5908 18.5903 20.2848 18.782 19.9085C19 19.4806 19 18.9206 19 17.8005V6.06715C19 5.67139 19 5.4735 18.9628 5.28345C18.9299 5.1148 18.8753 4.95111 18.8005 4.79641C18.7162 4.62207 18.5975 4.46377 18.36 4.14715L16.48 1.64049" stroke="#717182" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="text-gray-900 text-lg flex-1">Seller</span>
                      {currentRole === 'seller' && (
                        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M16.6668 5L7.50016 14.1667L3.3335 10" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                  </div>

                    {/* Main Menu Items */}
                    <div className="px-6 py-3 border-t border-gray-200 space-y-1">
                        <div 
                            onClick={() => handleNavigation('/page/client/profile')}
                            className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg cursor-pointer transition"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17 19C17 17.6044 17 16.9067 16.8278 16.3389C16.44 15.0605 15.4395 14.06 14.1611 13.6722C13.5933 13.5 12.8956 13.5 11.5 13.5H6.5C5.10444 13.5 4.40665 13.5 3.83886 13.6722C2.56045 14.06 1.56004 15.0605 1.17224 16.3389C1 16.9067 1 17.6044 1 19M13.5 5.5C13.5 7.98528 11.4853 10 9 10C6.51472 10 4.5 7.98528 4.5 5.5C4.5 3.01472 6.51472 1 9 1C11.4853 1 13.5 3.01472 13.5 5.5Z" stroke="#717182" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <span className="text-gray-900">Profile</span>
                        </div>

                        <div 
                            onClick={() => handleNavigation('/page/client/dashboard')}
                            className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg cursor-pointer transition"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19.5 6V14.2C19.5 15.8802 19.5 16.7202 19.173 17.362C18.8854 17.9265 18.4265 18.3854 17.862 18.673C17.2202 19 16.3802 19 14.7 19H7.3C5.61984 19 4.77976 19 4.13803 18.673C3.57354 18.3854 3.1146 17.9265 2.82698 17.362C2.5 16.7202 2.5 15.8802 2.5 14.2V6M2.6 1H19.4C19.9601 1 20.2401 1 20.454 1.10899C20.6422 1.20487 20.7951 1.35785 20.891 1.54601C21 1.75992 21 2.03995 21 2.6V4.4C21 4.96005 21 5.24008 20.891 5.45399C20.7951 5.64215 20.6422 5.79513 20.454 5.89101C20.2401 6 19.9601 6 19.4 6H2.6C2.03995 6 1.75992 6 1.54601 5.89101C1.35785 5.79513 1.20487 5.64215 1.10899 5.45399C1 5.24008 1 4.96005 1 4.4V2.6C1 2.03995 1 1.75992 1.10899 1.54601C1.20487 1.35785 1.35785 1.20487 1.54601 1.10899C1.75992 1 2.03995 1 2.6 1ZM8.6 9.5H13.4C13.9601 9.5 14.2401 9.5 14.454 9.60899C14.6422 9.70487 14.7951 9.85785 14.891 10.046C15 10.2599 15 10.5399 15 11.1V11.9C15 12.4601 15 12.7401 14.891 12.954C14.7951 13.1422 14.6422 13.2951 14.454 13.391C14.2401 13.5 13.9601 13.5 13.4 13.5H8.6C8.03995 13.5 7.75992 13.5 7.54601 13.391C7.35785 13.2951 7.20487 13.1422 7.10899 12.954C7 12.7401 7 12.4601 7 11.9V11.1C7 10.5399 7 10.2599 7.10899 10.046C7.20487 9.85785 7.35785 9.70487 7.54601 9.60899C7.75992 9.5 8.03995 9.5 8.6 9.5Z" stroke="#717182" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>

                            <span className="text-gray-900">My Products</span>
                        </div>

                        <div 
                            onClick={() => handleNavigation('/page/client/dashboard')}
                            className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg cursor-pointer transition"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.86621 4.76562C4.33464 4.76571 4.784 4.95197 5.11523 5.2832C5.44647 5.61444 5.63273 6.06379 5.63281 6.53223V10.5322C5.63281 11.0008 5.44655 11.4509 5.11523 11.7822C4.78401 12.1134 4.33457 12.2987 3.86621 12.2988H1.86621C1.39766 12.2988 0.947525 12.1135 0.616211 11.7822C0.284897 11.4509 0.0996094 11.0008 0.0996094 10.5322V6.53223C0.0996956 6.06387 0.285075 5.61442 0.616211 5.2832C0.947525 4.95189 1.39766 4.76562 1.86621 4.76562H3.86621ZM10.5322 8.76562C11.0008 8.76562 11.4509 8.95189 11.7822 9.2832C12.1134 9.61443 12.2987 10.0639 12.2988 10.5322C12.2988 11.0008 12.1135 11.4509 11.7822 11.7822C11.4509 12.1135 11.0008 12.2988 10.5322 12.2988H8.53223C8.06387 12.2987 7.61442 12.1134 7.2832 11.7822C6.95189 11.4509 6.76562 11.0008 6.76562 10.5322C6.76571 10.0638 6.95197 9.61444 7.2832 9.2832C7.61444 8.95197 8.0638 8.76571 8.53223 8.76562H10.5322ZM1.86621 5.63281C1.62752 5.63281 1.39827 5.7277 1.22949 5.89648C1.06089 6.06517 0.965906 6.29373 0.96582 6.53223V10.5322C0.96582 10.7709 1.06071 11.0002 1.22949 11.1689C1.39828 11.3377 1.62752 11.4326 1.86621 11.4326H3.86621C4.10471 11.4325 4.33326 11.3375 4.50195 11.1689C4.67074 11.0002 4.76562 10.7709 4.76562 10.5322V6.53223C4.76554 6.29365 4.67066 6.06519 4.50195 5.89648C4.33325 5.72778 4.10479 5.6329 3.86621 5.63281H1.86621ZM8.53223 9.63281C8.29365 9.6329 8.06519 9.72778 7.89648 9.89648C7.72778 10.0652 7.6329 10.2936 7.63281 10.5322C7.63281 10.7709 7.7277 11.0002 7.89648 11.1689C8.06517 11.3375 8.29373 11.4325 8.53223 11.4326H10.5322C10.7709 11.4326 11.0002 11.3377 11.1689 11.1689C11.3377 11.0002 11.4326 10.7709 11.4326 10.5322C11.4325 10.2937 11.3375 10.0652 11.1689 9.89648C11.0002 9.7277 10.7709 9.63281 10.5322 9.63281H8.53223ZM10.5322 0.0996094C11.0008 0.0996094 11.4509 0.284897 11.7822 0.616211C12.1135 0.947525 12.2988 1.39766 12.2988 1.86621V5.86621C12.2987 6.33457 12.1134 6.78401 11.7822 7.11523C11.4509 7.44655 11.0008 7.63281 10.5322 7.63281H8.53223C8.06379 7.63273 7.61444 7.44647 7.2832 7.11523C6.95197 6.784 6.76571 6.33464 6.76562 5.86621V1.86621C6.76562 1.39766 6.95189 0.947525 7.2832 0.616211C7.61442 0.285075 8.06387 0.0996957 8.53223 0.0996094H10.5322ZM8.53223 0.96582C8.29373 0.965907 8.06517 1.06089 7.89648 1.22949C7.7277 1.39827 7.63281 1.62752 7.63281 1.86621V5.86621C7.6329 6.10479 7.72778 6.33325 7.89648 6.50195C8.06519 6.67066 8.29365 6.76554 8.53223 6.76562H10.5322C10.7709 6.76562 11.0002 6.67074 11.1689 6.50195C11.3375 6.33326 11.4325 6.10471 11.4326 5.86621V1.86621C11.4326 1.62752 11.3377 1.39828 11.1689 1.22949C11.0002 1.06071 10.7709 0.96582 10.5322 0.96582H8.53223ZM3.86621 0.0996094C4.33457 0.0996955 4.78401 0.285075 5.11523 0.616211C5.44655 0.947525 5.63281 1.39766 5.63281 1.86621C5.63273 2.33464 5.44647 2.784 5.11523 3.11523C4.784 3.44647 4.33464 3.63273 3.86621 3.63281H1.86621C1.39766 3.63281 0.947525 3.44655 0.616211 3.11523C0.285075 2.78401 0.0996955 2.33457 0.0996094 1.86621C0.0996094 1.39766 0.284897 0.947525 0.616211 0.616211C0.947525 0.284897 1.39766 0.0996094 1.86621 0.0996094H3.86621ZM1.86621 0.96582C1.62752 0.96582 1.39827 1.06071 1.22949 1.22949C1.06071 1.39827 0.96582 1.62752 0.96582 1.86621C0.965906 2.10471 1.06089 2.33326 1.22949 2.50195C1.39827 2.67074 1.62752 2.76562 1.86621 2.76562H3.86621C4.10479 2.76554 4.33325 2.67066 4.50195 2.50195C4.67066 2.33325 4.76554 2.10479 4.76562 1.86621C4.76562 1.62752 4.67074 1.39827 4.50195 1.22949C4.33326 1.06089 4.10471 0.965906 3.86621 0.96582H1.86621Z" fill="#717182" stroke="#717182" stroke-width="0.2"/>
                            </svg>
                            <span className="text-gray-900">Dashboard</span>
                        </div>
                    </div>

                    {/* Bottom Menu Items */}
                    <div className="px-6 py-3 border-t border-gray-100 space-y-1">
                        <div 
                            onClick={() => handleNavigation('/page/client/settings')}
                            className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg cursor-pointer transition"
                        >
                            <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#717182" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z" stroke="#717182" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span className="text-gray-900">Settings</span>
                        </div>

                        <div 
                            onClick={() => handleNavigation('/page/client/billing')}
                            className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg cursor-pointer transition"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 14 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 15C1 17.2091 2.79086 19 5 19H9C11.2091 19 13 17.2091 13 15C13 12.7909 11.2091 11 9 11H5C2.79086 11 1 9.20914 1 7C1 4.79086 2.79086 3 5 3H9C11.2091 3 13 4.79086 13 7M7 1V21" stroke="#717182" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <span className="text-gray-900">Billing</span>
                        </div>

                        <div 
                            onClick={() => handleNavigation('/page/help')}
                            className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg cursor-pointer transition"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15849 13.7588 7.52152 14.2151 8.06353C14.6713 8.60553 14.9211 9.29152 14.92 10C14.92 12 11.92 13 11.92 13M12 17H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#717182" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span className="text-gray-900">Help</span>
                        </div>
                    </div>

                    {/* Logout */}
                    <div className="px-6 py-3 border-t border-gray-100">
                        <div 
                            onClick={() => handleNavigation('/logout')}
                            className="flex items-center gap-3 px-3 py-2 hover:bg-red-50 rounded-lg cursor-pointer transition"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9M16 17L21 12M21 12L16 7M21 12H9" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                             </svg>
                            <span className="text-red-500 font-medium">Logout</span>
                        </div>
                    </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Role Switch Modal */}
      <RoleSwitchModal
        isOpen={showRoleModal}
        onClose={() => setShowRoleModal(false)}
        currentRole={currentRole}
        targetRole={targetRole}
        onConfirm={handleRoleSwitch}
        isLoading={isRoleSwitching}
      />
    </>
  );
}
