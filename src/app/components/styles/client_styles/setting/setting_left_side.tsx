import React from 'react';

interface SidebarItem {
  name: string;
  id: string;
  icon?: React.ReactNode;
}

interface LeftSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const sidebarItems1: SidebarItem[] = [
  { 
    name: 'Client & Billing', 
    id: 'client-billing',
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.5 11H4.6C4.03995 11 3.75992 11 3.54601 11.109C3.35785 11.2049 3.20487 11.3578 3.10899 11.546C3 11.7599 3 12.0399 3 12.6V21M16.5 11H19.4C19.9601 11 20.2401 11 20.454 11.109C20.6422 11.2049 20.7951 11.3578 20.891 11.546C21 11.7599 21 12.0399 21 12.6V21M16.5 21V6.2C16.5 5.0799 16.5 4.51984 16.282 4.09202C16.0903 3.71569 15.7843 3.40973 15.408 3.21799C14.9802 3 14.4201 3 13.3 3H10.7C9.57989 3 9.01984 3 8.59202 3.21799C8.21569 3.40973 7.90973 3.71569 7.71799 4.09202C7.5 4.51984 7.5 5.0799 7.5 6.2V21M22 21H2M11 7H13M11 11H13M11 15H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ) 
  },
  { 
    name: 'Hiring Preferences', 
    id: 'hiring-preferences',
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 21V7C8 6.07003 8 5.60504 8.10222 5.22354C8.37962 4.18827 9.18827 3.37962 10.2235 3.10222C10.605 3 11.07 3 12 3C12.93 3 13.395 3 13.7765 3.10222C14.8117 3.37962 15.6204 4.18827 15.8978 5.22354C16 5.60504 16 6.07003 16 7V21M5.2 21H18.8C19.9201 21 20.4802 21 20.908 20.782C21.2843 20.5903 21.5903 20.2843 21.782 19.908C22 19.4802 22 18.9201 22 17.8V10.2C22 9.07989 22 8.51984 21.782 8.09202C21.5903 7.71569 21.2843 7.40973 20.908 7.21799C20.4802 7 19.9201 7 18.8 7H5.2C4.07989 7 3.51984 7 3.09202 7.21799C2.71569 7.40973 2.40973 7.71569 2.21799 8.09202C2 8.51984 2 9.07989 2 10.2V17.8C2 18.9201 2 19.4802 2.21799 19.908C2.40973 20.2843 2.71569 20.5903 3.09202 20.782C3.51984 21 4.0799 21 5.2 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )  
  },
  { 
    name: 'Contracts & Compliance', 
    id: 'contracts-compliance',
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 2.26953V6.40007C14 6.96012 14 7.24015 14.109 7.45406C14.2049 7.64222 14.3578 7.7952 14.546 7.89108C14.7599 8.00007 15.0399 8.00007 15.6 8.00007H19.7305M16 13H8M16 17H8M10 9H8M14 2H8.8C7.11984 2 6.27976 2 5.63803 2.32698C5.07354 2.6146 4.6146 3.07354 4.32698 3.63803C4 4.27976 4 5.11984 4 6.8V17.2C4 18.8802 4 19.7202 4.32698 20.362C4.6146 20.9265 5.07354 21.3854 5.63803 21.673C6.27976 22 7.11984 22 8.8 22H15.2C16.8802 22 17.7202 22 18.362 21.673C18.9265 21.3854 19.3854 20.9265 19.673 20.362C20 19.7202 20 18.8802 20 17.2V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ) 
  },
  { 
    name: 'Invoices & Receipts', 
    id: 'invoices-receipts',
    icon: (
      <svg className="w-6 h-6 ml-1" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.6 5.8H13M4.6 10.6H13M2.56 1H15.04C15.9016 1 16.6 1.80589 16.6 2.8V19L14 17.2L11.4 19L8.8 17.2L6.2 19L3.6 17.2L1 19V2.8C1 1.80589 1.69844 1 2.56 1Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )  
  },
  { 
    name: 'Notifications', 
    id: 'notifications',
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.9998 21H9.99977M17.9998 8C17.9998 6.4087 17.3676 4.88258 16.2424 3.75736C15.1172 2.63214 13.5911 2 11.9998 2C10.4085 2 8.88235 2.63214 7.75713 3.75736C6.63192 4.88258 5.99977 6.4087 5.99977 8C5.99977 11.0902 5.22024 13.206 4.34944 14.6054C3.6149 15.7859 3.24763 16.3761 3.2611 16.5408C3.27601 16.7231 3.31463 16.7926 3.46155 16.9016C3.59423 17 4.19237 17 5.38863 17H18.6109C19.8072 17 20.4053 17 20.538 16.9016C20.6849 16.7926 20.7235 16.7231 20.7384 16.5408C20.7519 16.3761 20.3846 15.7859 19.6501 14.6054C18.7793 13.206 17.9998 11.0902 17.9998 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )  
  },
];

const sidebarItems2: SidebarItem[] = [
  { 
    name: 'Account', 
    id: 'account',
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 21C20 19.6044 20 18.9067 19.8278 18.3389C19.44 17.0605 18.4395 16.06 17.1611 15.6722C16.5933 15.5 15.8956 15.5 14.5 15.5H9.5C8.10444 15.5 7.40665 15.5 6.83886 15.6722C5.56045 16.06 4.56004 17.0605 4.17224 18.3389C4 18.9067 4 19.6044 4 21M16.5 7.5C16.5 9.98528 14.4853 12 12 12C9.51472 12 7.5 9.98528 7.5 7.5C7.5 5.01472 9.51472 3 12 3C14.4853 3 16.5 5.01472 16.5 7.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ) 
  },
  { 
    name: 'Security', 
    id: 'security',
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 11V8C17 5.23858 14.7614 3 12 3C9.23858 3 7 5.23858 7 8V11M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V15.8C21 14.1198 21 13.2798 20.673 12.638C20.3854 12.0735 19.9265 11.6146 19.362 11.327C18.7202 11 17.8802 11 16.2 11H7.8C6.11984 11 5.27976 11 4.63803 11.327C4.07354 11.6146 3.6146 12.0735 3.32698 12.638C3 13.2798 3 14.1198 3 15.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )  
  },
  { 
    name: 'Privacy', 
    id: 'privacy',
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.42012 12.7132C2.28394 12.4975 2.21584 12.3897 2.17772 12.2234C2.14909 12.0985 2.14909 11.9015 2.17772 11.7766C2.21584 11.6103 2.28394 11.5025 2.42012 11.2868C3.54553 9.50484 6.8954 5 12.0004 5C17.1054 5 20.4553 9.50484 21.5807 11.2868C21.7169 11.5025 21.785 11.6103 21.8231 11.7766C21.8517 11.9015 21.8517 12.0985 21.8231 12.2234C21.785 12.3897 21.7169 12.4975 21.5807 12.7132C20.4553 14.4952 17.1054 19 12.0004 19C6.8954 19 3.54553 14.4952 2.42012 12.7132Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12.0004 15C13.6573 15 15.0004 13.6569 15.0004 12C15.0004 10.3431 13.6573 9 12.0004 9C10.3435 9 9.0004 10.3431 9.0004 12C9.0004 13.6569 10.3435 15 12.0004 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )  
  },
  { 
    name: 'Connected Apps', 
    id: 'connected-apps',
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L15.6 5.6C18 -0.7 24.7 6 18.4 8.4L22 12L18.4 15.6C16 9.3 9.3 16 15.6 18.4L12 22L8.4 18.4C6 24.7 -0.7 18 5.6 15.6L2 12L5.6 8.4C8 14.7 14.7 8 8.4 5.6L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )  
  }
];

const LeftSidebar: React.FC<LeftSidebarProps> = ({ activeSection, onSectionChange }) => {
  const handleSidebarItemClick = (id: string) => {
    onSectionChange(id);
  };

  return (
    <div className="index-50 w-80 ml-6 h-screen space-y-6 bg-white rounded-2xl p-2 border border-gray-200">
      <div className='flex items-center px-3 py-1 gap-x-4 bg-[#EFF6FF] border-2 rounded-2xl border-[#BEDBFF] active:opacity-30 cursor-pointer'>
        <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 15" fill="none">
          <path d="M11.3346 8.00063C11.3346 11.334 9.0013 13.0006 6.22797 13.9673C6.08274 14.0165 5.92499 14.0142 5.7813 13.9606C3.0013 13.0006 0.667969 11.334 0.667969 8.00063V3.33396C0.667969 3.15715 0.738207 2.98758 0.863231 2.86255C0.988255 2.73753 1.15782 2.66729 1.33464 2.66729C2.66797 2.66729 4.33464 1.86729 5.49464 0.853959C5.63587 0.733291 5.81554 0.666992 6.0013 0.666992C6.18707 0.666992 6.36673 0.733291 6.50797 0.853959C7.67464 1.87396 9.33464 2.66729 10.668 2.66729C10.8448 2.66729 11.0143 2.73753 11.1394 2.86255C11.2644 2.98758 11.3346 3.15715 11.3346 3.33396V8.00063Z" stroke="#1447E6" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <div className='mt-3 flex items-center'>
          <p className='text-[#155DFC]'>Identity Verification </p>
          <p className='text-white px-4 ml-2 rounded-2xl py-1 bg-[#1447E6]'>action required</p>
        </div>
      </div>
      
      <div className='w-full h-[0.8px] bg-gray-500'/>
      
      <div>
        <div className="text-gray-600 flex flex-col gap-y-6">
          {sidebarItems1.map((item, index) => (
            <p 
              key={index} 
              onClick={() => handleSidebarItemClick(item.id)} 
              className={`flex items-center gap-x-3 px-3 cursor-pointer transition-colors ${
                activeSection === item.id 
                  ? 'text-[#10B981] font-semibold bg-[#ECFDF5] rounded-lg py-2' 
                  : 'hover:text-blue-500'
              }`}
            >
              {item.icon}
              {item.name}
            </p>
          ))}
        </div>
      </div>
      
      <div className='w-full h-[1.2px] bg-gray-500'/>
      
      <div>
        <div className="text-gray-600 mt-8 flex flex-col gap-y-6">
          {sidebarItems2.map((item, index) => (
            <p
              key={index}
              onClick={() => handleSidebarItemClick(item.id)}
              className={`flex items-center gap-x-3 px-3 cursor-pointer transition-colors ${
                activeSection === item.id 
                  ? 'text-[#10B981] font-semibold bg-[#ECFDF5] rounded-lg py-2' 
                  : 'hover:text-blue-500'
              }`}
            >
              {item.icon}
              {item.name}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;