import React, { useState } from 'react';

// Define the structure of the billing data
interface BillingInfo {
  fullName: string;
  location: string;
  address: string;
  email: string;
  cardNumber: string;
  expiration: string;
  totalSpent: number;
  totalHires: number;
  activeJobs: number;
  rating: string;
  taxID: string;
  currency: string;
  icon?: React.ReactNode;
}

// Fields for dynamic rendering - Add placeholders here for reusability
const userInfoFields = [
  { label: "Full Name", value: "fullName", placeholder: "e.g., Jane Doe" },
  { label: "Location", value: "location", placeholder: "e.g., New York, NY" },
  { label: "Billing Address", value: "address", placeholder: "e.g., 456 Main St, Suite 100" },
  { label: "Billing Contact Email", value: "email", placeholder: "e.g., contact@company.com" },
];

const currencyAndTaxFields = [
  { label: "Tax ID", value: "taxID", placeholder: "e.g., XX-XXX-4567" },
  { label: "Default Currency", value: "currency", placeholder: "e.g., USD - US Dollar" },
];

// Fields for statistics (These will still display 0 initially)
const accountStats = [
  { label: "Total Spent", value: "totalSpent", placeholder: "0" },
  { label: "Total Hires", value: "totalHires", placeholder: "0" },
];

const ClientAndBilling: React.FC = () => {

  const [isFocused, setIsFocused] = useState(false);
  const [isFocused1, setIsFocused1] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
  // State to manage modal visibility
  const [showModal, setShowModal] = useState(false);

  // Function to toggle modal visibility
  const toggleModal = () => setShowModal(!showModal);

  return (
    <div className="w-full ml-4 mr-4">
      <div className="bg-white border h-screen overflow-y-auto rounded-2xl px-8">
        <div className='flex items-center gap-x-3'>
          <svg className='w-9 h-9' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.5 11H4.6C4.03995 11 3.75992 11 3.54601 11.109C3.35785 11.2049 3.20487 11.3578 3.10899 11.546C3 11.7599 3 12.0399 3 12.6V21M16.5 11H19.4C19.9601 11 20.2401 11 20.454 11.109C20.6422 11.2049 20.7951 11.3578 20.891 11.546C21 11.7599 21 12.0399 21 12.6V21M16.5 21V6.2C16.5 5.0799 16.5 4.51984 16.282 4.09202C16.0903 3.71569 15.7843 3.40973 15.408 3.21799C14.9802 3 14.4201 3 13.3 3H10.7C9.57989 3 9.01984 3 8.59202 3.21799C8.21569 3.40973 7.90973 3.71569 7.71799 4.09202C7.5 4.51984 7.5 5.0799 7.5 6.2V21M22 21H2M11 7H13M11 11H13M11 15H13" stroke="#009966" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <p className="text-3xl mt-4">Client & Billing</p>
        </div>
        <p className="text-gray-600 text-2xl">Manage your billing details and payment information</p>

        {/* User Information */}
        <div className="grid grid-cols-2 gap-x-4">
          {userInfoFields.map((field, index) => (
            <div key={index} className={field.value === 'address' || field.value === 'email' ? 'col-span-2' : ''}>
              <label className="block text-xl text-gray-700 mt-4">{field.label}</label>
              <input
                type="text"
                name={field.value}
                placeholder={field.placeholder} 

                className="w-full mt-2 p-3 border border-gray-300 bg-[#F3F3F5] rounded-2xl"
              />
            </div>
          ))}
        </div>
        <div className='w-full h-[2.5px] mt-6 mb-6 bg-slate-200'/>
        <div>
          {/* Payment Methods Section */}
          <div>
            <div className='flex items-center justify-between'>
              <p className="block text-xl mt-2">Payment Methods</p>
              <p className='w-fit px-3 py-2 border-1 border-gray-300 rounded-2xl text-[#00BC7D] active:opacity-30 hover:text-white hover:bg-[#00BC7D] hover:cursor-pointer'  onClick={toggleModal}>+ Add Card</p>
            </div>

            {/* ===================== */}
            {showModal && (
              <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
                <div className="w-full max-w-lg bg-white rounded-xl p-8 shadow-lg">
                  {/* Modal Content */}
                  <div className="text-center mb-8">
                    <div className="text-xl font-semibold text-gray-800 mb-2">Add Payment Method</div>
                    <div className="text-sm text-gray-500">Secured & encrypted</div>
                  </div>

                  {/* Select Payment Method */}
                  <div className="mb-6">
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          {/* Replace with your own SVG if needed */}
                          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.03 20 4 16.97 4 12C4 7.03 7.03 4 12 4C16.97 4 20 7.03 20 12C20 16.97 16.97 20 12 20Z" fill="#99A1AF" />
                        </svg>
                        <span className="text-lg text-gray-800">Card</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-gray-500">Visa, MasterCard, etc.</span>
                      </div>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="mb-4">
                    <div className="flex flex-col mb-4">
                      <input
                        type="text"
                        placeholder="Card Number"
                        className="w-full p-3 border border-gray-300 bg-[#F3F3F5] rounded-lg"
                      />
                    </div>
                    <div className="flex flex-col mb-4">
                      <input
                        type="text"
                        placeholder="Name on card"
                        className="w-full p-3 border border-gray-300 bg-[#F3F3F5] rounded-lg"
                      />
                    </div>
                    <div className="flex justify-between mb-4">
                      <div className="w-1/2 pr-2">
                        <input
                          type="text"
                          placeholder="Expiry (MM/YY)"
                          className="w-full p-3 border border-gray-300 bg-[#F3F3F5] rounded-lg"
                        />
                      </div>
                      <div className="w-1/2 pl-2">
                        <input
                          type="text"
                          placeholder="CVC"
                          className="w-full p-3 border border-gray-300 bg-[#F3F3F5] rounded-lg"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col mb-4">
                      <select
                        className="w-full p-3 border border-gray-300 bg-[#F3F3F5] rounded-lg"
                      >
                        <option value="country">United States</option>
                        {/* Add more countries dynamically */}
                      </select>
                    </div>

                    <div className="flex flex-col mb-4">
                      <input
                        type="text"
                        placeholder="Street Address"
                        className="w-full p-3 border border-gray-300 bg-[#F3F3F5] rounded-lg"
                      />
                    </div>
                    <div className="flex justify-between mb-4">
                      <div className="w-1/2 pr-2">
                        <input
                          type="text"
                          placeholder="City"
                          className="w-full p-3 border border-gray-300 bg-[#F3F3F5] rounded-lg"
                        />
                      </div>
                      <div className="w-1/2 pl-2">
                        <input
                          type="text"
                          placeholder="State"
                          className="w-full p-3 border border-gray-300 bg-[#F3F3F5] rounded-lg"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col mb-4">
                      <input
                        type="text"
                        placeholder="Postal Code"
                        className="w-full p-3 border border-gray-300 bg-[#F3F3F5] rounded-lg"
                      />
                    </div>

                    <div className="flex items-center mb-4">
                      <input type="checkbox" id="savePayment" className="mr-2" />
                      <label htmlFor="savePayment" className="text-gray-600 text-sm">
                        Save for future payments
                      </label>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">No extra fee. Charged in USD.</span>
                      <div>
                        <button
                          onClick={toggleModal}
                          className="py-2 px-4 bg-[#D0FAE5] rounded-2xl text-[#007A55] text-sm"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={toggleModal}
                          className="py-2 px-4 bg-[#00BC7D] text-white rounded-2xl text-sm ml-3"
                        >
                          Save & Continue
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ===================== */}

            {/* Card Number Input  */}
            <div>             
              <div className={`flex items-center w-full px-3 py-3 gap-x-4 rounded-2xl ${
                                  isFocused2 ? 'border-blue-600 border-2' : 'border-gray-200 border-2'
                            } bg-[#F3F3F5]`} 
                    tabIndex={0}
                    onFocus={() => setIsFocused2(true)} 
                    onBlur={() => setIsFocused2(false)} 
                >
                {/* card */}
                <span>
                  <svg className='w-7 h-7' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 10H2M2 8.2L2 15.8C2 16.9201 2 17.4802 2.21799 17.908C2.40973 18.2843 2.71569 18.5903 3.09202 18.782C3.51984 19 4.07989 19 5.2 19L18.8 19C19.9201 19 20.4802 19 20.908 18.782C21.2843 18.5903 21.5903 18.2843 21.782 17.908C22 17.4802 22 16.9201 22 15.8V8.2C22 7.0799 22 6.51984 21.782 6.09202C21.5903 5.7157 21.2843 5.40974 20.908 5.21799C20.4802 5 19.9201 5 18.8 5L5.2 5C4.0799 5 3.51984 5 3.09202 5.21799C2.7157 5.40973 2.40973 5.71569 2.21799 6.09202C2 6.51984 2 7.07989 2 8.2Z" stroke="#99A1AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <div className='w-full flex items-center'>
                  <div className='flex mt-1 flex-col space-x-5'>
                      <p className='text-sm h-2 gap-x-2'>Visa •••• 1234</p>
                      <p className='text-sm text-[#99A1AF] h-2 gap-x-2'>Expired 12/25</p>
                  </div>  
                  <p className='py-2 px-4 bg-[#D0FAE5] rounded-2xl text-[#007A55] mt-3'>Default</p>           
                </div>
                {/* delete */}
                <span>
                  <svg className='w-5 h-5' viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 5V4.2C14 3.0799 14 2.51984 13.782 2.09202C13.5903 1.71569 13.2843 1.40973 12.908 1.21799C12.4802 1 11.9201 1 10.8 1H9.2C8.07989 1 7.51984 1 7.09202 1.21799C6.71569 1.40973 6.40973 1.71569 6.21799 2.09202C6 2.51984 6 3.0799 6 4.2V5M8 10.5V15.5M12 10.5V15.5M1 5H19M17 5V16.2C17 17.8802 17 18.7202 16.673 19.362C16.3854 19.9265 15.9265 20.3854 15.362 20.673C14.7202 21 13.8802 21 12.2 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V5" stroke="#99A1AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-4">
            {currencyAndTaxFields.map((field, index) => (
              <div key={index}>
                <label className="block text-xl mt-4">{field.label}</label>
                <input
                  type="text"
                  name={field.value}
                  placeholder={field.placeholder} 
                  className="w-full mt-2 p-3 border border-gray-300 bg-[#F3F3F5] rounded-2xl"
                />
              </div>
            ))}
          </div>
        </div>
        <div className='w-full h-[1.5px] mt-6 mb-6 bg-slate-200'/>

        {/* Account Statistics */}
        <div>
          <p className='text-xl'>Account Statistics</p>
        </div>
        <div className="col-span-2 grid grid-cols-2 gap-x-4 mt-8">
          {accountStats.map((stat, index) => (
            <div key={index}>
              <label className="block text-xl">{stat.label}</label>
              <input
                type="number"
                name={stat.value}
                placeholder= "0"
                className="w-full mt-2 p-3 border border-gray-300 bg-[#F3F3F5] rounded-2xl"
              />
            </div>
          ))}
        </div>

        {/* Rating (Read-Only) */}
        <div className="grid grid-cols-2 mt-2 gap-x-4">
            
          {/* job */}
          <div>
            <label className="block text-xl mt-4">Active Jobs</label>                
                        <div className={`flex items-center w-full mt-3 px-3 py-3 gap-x-3 rounded-2xl ${
                                isFocused ? 'border-blue-600 border-2' : 'border-gray-200 border-2'
                           } bg-[#F3F3F5]`}
                  tabIndex={0}
                  onFocus={() => setIsFocused(true)} 
                  onBlur={() => setIsFocused(false)} 
              >
              <input type="text" placeholder="0" className='w-full outline-none' />
            </div>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-xl mt-4">Rating</label>                
            <div className={`flex items-center w-full mt-3 px-3 py-3 gap-x-3 rounded-2xl ${
                                isFocused1 ? 'border-blue-600 border-2' : 'border-gray-200 border-2'
                           } bg-[#F3F3F5]`} 
                  tabIndex={0}
                  onFocus={() => setIsFocused1(true)} 
                  onBlur={() => setIsFocused1(false)} 
              >
              <span>
                <svg className='w-6 h-6' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.2827 3.45332C11.5131 2.98638 11.6284 2.75291 11.7848 2.67831C11.9209 2.61341 12.0791 2.61341 12.2152 2.67831C12.3717 2.75291 12.4869 2.98638 12.7174 3.45332L14.9041 7.88328C14.9721 8.02113 15.0061 8.09006 15.0558 8.14358C15.0999 8.19096 15.1527 8.22935 15.2113 8.25662C15.2776 8.28742 15.3536 8.29854 15.5057 8.32077L20.397 9.03571C20.9121 9.11099 21.1696 9.14863 21.2888 9.27444C21.3925 9.38389 21.4412 9.5343 21.4215 9.68377C21.3988 9.85558 21.2124 10.0372 20.8395 10.4004L17.3014 13.8464C17.1912 13.9538 17.136 14.0076 17.1004 14.0715C17.0689 14.128 17.0487 14.1902 17.0409 14.2545C17.0321 14.3271 17.0451 14.403 17.0711 14.5547L17.906 19.4221C17.994 19.9355 18.038 20.1922 17.9553 20.3445C17.8833 20.477 17.7554 20.57 17.6071 20.5975C17.4366 20.6291 17.2061 20.5078 16.7451 20.2654L12.3724 17.9658C12.2361 17.8942 12.168 17.8584 12.0962 17.8443C12.0327 17.8318 11.9673 17.8318 11.9038 17.8443C11.832 17.8584 11.7639 17.8942 11.6277 17.9658L7.25492 20.2654C6.79392 20.5078 6.56341 20.6291 6.39297 20.5975C6.24468 20.57 6.11672 20.477 6.04474 20.3445C5.962 20.1922 6.00603 19.9355 6.09407 19.4221L6.92889 14.5547C6.95491 14.403 6.96793 14.3271 6.95912 14.2545C6.95132 14.1902 6.93111 14.128 6.89961 14.0715C6.86402 14.0076 6.80888 13.9538 6.69859 13.8464L3.16056 10.4004C2.78766 10.0372 2.60121 9.85558 2.57853 9.68377C2.55879 9.5343 2.60755 9.38389 2.71125 9.27444C2.83044 9.14863 3.08797 9.11099 3.60304 9.03571L8.49431 8.32077C8.64642 8.29854 8.72248 8.28742 8.78872 8.25662C8.84736 8.22935 8.90016 8.19096 8.94419 8.14358C8.99391 8.09006 9.02793 8.02113 9.09597 7.88328L11.2827 3.45332Z" stroke="gold" fill="gold" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <input type="text" placeholder="N/A" className='w-full outline-none' />
            </div>
          </div>
        </div>

        {/* Save Changes Button */}
        <div className='mt-5'>
          <p className="w-40 bg-[#00BC7D] text-white py-2 px-4 rounded-md active:opacity-30 cursor-pointer">Save Changes</p>
        </div>

      </div>
    </div>
  );
}

export default ClientAndBilling;