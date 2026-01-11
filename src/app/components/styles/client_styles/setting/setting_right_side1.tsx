import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";

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
  {
    label: "Billing Address",
    value: "address",
    placeholder: "e.g., 456 Main St, Suite 100",
  },
  {
    label: "Billing Contact Email",
    value: "email",
    placeholder: "e.g., contact@company.com",
  },
];

const currencyAndTaxFields = [
  { label: "Tax ID", value: "taxID", placeholder: "e.g., XX-XXX-4567" },
  {
    label: "Default Currency",
    value: "currency",
    placeholder: "e.g., USD - US Dollar",
  },
];

// Fields for statistics (These will still display 0 initially)
const accountStats = [
  { label: "Total Spent", value: "totalSpent", placeholder: "0" },
  { label: "Total Hires", value: "totalHires", placeholder: "0" },
];

const ClientAndBilling: React.FC = () => {
  const router = useRouter();
  const { user } = useAuth();

  // Form state
  const [fullName, setFullName] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [taxID, setTaxID] = useState("");
  const [currency, setCurrency] = useState("USD - US Dollar");

  const [isFocused, setIsFocused] = useState(false);
  const [isFocused1, setIsFocused1] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
  // State to manage modal visibility
  const [showModal, setShowModal] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("");

  // Load user data from AuthContext and localStorage
  useEffect(() => {
    if (user) {
      setFullName(user.username || "");
      setEmail(user.email || "");
    }

    // Load data from localStorage (from verification steps)
    const step1Data = localStorage.getItem("verifyStep1Data");
    const step3Data = localStorage.getItem("verifyStep3Data");

    if (step1Data) {
      const data = JSON.parse(step1Data);
      if (data.fullName) setFullName(data.fullName);
      if (data.phone) {
        // You could add phone field if needed
      }
    }

    if (step3Data) {
      const data = JSON.parse(step3Data);
      if (data.country) setLocation(data.country);

      // Build full address from step-3 data
      const addressParts = [];
      if (data.address1) addressParts.push(data.address1);
      if (data.address2) addressParts.push(data.address2);
      if (data.city) addressParts.push(data.city);
      if (data.stateProvince) addressParts.push(data.stateProvince);
      if (data.postalCode) addressParts.push(data.postalCode);

      if (addressParts.length > 0) {
        setAddress(addressParts.join(", "));
      }
    }
  }, [user]);

  // Function to toggle modal visibility
  const toggleModal = () => setShowModal(!showModal);

  // Handle save changes
  const handleSaveChanges = () => {
    // Save data to localStorage or backend
    const billingData = {
      fullName,
      location,
      address,
      email,
      taxID,
      currency,
    };
    localStorage.setItem("billingData", JSON.stringify(billingData));

    // Navigate to client home
    router.push("/page/client/home");
  };

  const paymentMethods = [
    {
      id: "card",
      name: "Card",
      subtitle: "Visa, Mastercard",
      icon: (
        <svg
          width="22"
          height="16"
          viewBox="0 0 22 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 6H1M1 4.2L1 11.8C1 12.9201 1 13.4802 1.21799 13.908C1.40973 14.2843 1.71569 14.5903 2.09202 14.782C2.51984 15 3.07989 15 4.2 15L17.8 15C18.9201 15 19.4802 15 19.908 14.782C20.2843 14.5903 20.5903 14.2843 20.782 13.908C21 13.4802 21 12.9201 21 11.8V4.2C21 3.0799 21 2.51984 20.782 2.09202C20.5903 1.7157 20.2843 1.40974 19.908 1.21799C19.4802 1 18.9201 1 17.8 1L4.2 1C3.0799 1 2.51984 1 2.09202 1.21799C1.7157 1.40973 1.40973 1.71569 1.21799 2.09202C1 2.51984 1 3.07989 1 4.2Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: "bank",
      name: "Bank Account",
      subtitle: "ACH / SEPA",
      icon: (
        <svg
          width="20"
          height="21"
          viewBox="0 0 20 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 19.9104H19M4 16.9104V8.91038M8 16.9104V8.91038M12 16.9104V8.91038M16 16.9104V8.91038M18 5.91038L10.424 1.17538C10.2702 1.07924 10.1933 1.03117 10.1108 1.01243C10.0379 0.995857 9.96214 0.995857 9.88921 1.01243C9.80673 1.03117 9.72982 1.07924 9.576 1.17538L2 5.91038H18Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: "paypal",
      name: "PayPal",
      subtitle: "Fast checkout",
      icon: (
        <svg
          width="22"
          height="20"
          viewBox="0 0 22 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.36 1H2.49333C1.66859 1 1.00178 1.88664 1.00101 2.8C1 4 1.66859 5.18667 2.49333 5.18667H18.0667C19.2449 5.18667 20.2 4.94179 20.2 6.12V16.36C20.2 17.7738 19.0538 18.92 17.64 18.92H3.56C2.14615 18.92 1 17.7738 1 16.36V3.4M15.0967 11.2233L15.08 11.24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: "apple",
      name: "Apple / Google Pay",
      subtitle: "Device wallet",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M10 5.44033V2.50033C10 2.27931 10.0878 2.06735 10.2441 1.91107C10.4004 1.75479 10.6123 1.66699 10.8333 1.66699"
            stroke="currentColor"
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15.1978 17.5002C17.2305 15.2015 18.3467 12.2354 18.3337 9.16688C18.3337 8.20168 18.0543 7.25711 17.5292 6.4472C17.0042 5.63729 16.256 4.99665 15.3749 4.60262C14.4938 4.20859 13.5174 4.078 12.5637 4.22663C11.61 4.37526 10.7198 4.79675 10.0003 5.44022C9.28092 4.79675 8.39064 4.37526 7.43695 4.22663C6.48326 4.078 5.50693 4.20859 4.62582 4.60262C3.74471 4.99665 2.99648 5.63729 2.47145 6.4472C1.94642 7.25711 1.66703 8.20168 1.66701 9.16688C1.66175 12.234 2.77689 15.1974 4.80284 17.5002C5.17593 17.9176 5.67832 18.1977 6.22952 18.2956C6.78072 18.3935 7.34883 18.3036 7.84284 18.0402C8.50681 17.686 9.24779 17.5007 10.0003 17.5007C10.7529 17.5007 11.4939 17.686 12.1578 18.0402C12.6519 18.3036 13.22 18.3935 13.7712 18.2956C14.3224 18.1977 14.8248 17.9176 15.1978 17.5002Z"
            stroke="currentColor"
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="w-full ml-4 mr-4">
      <div className="bg-white border h-screen overflow-y-auto rounded-2xl px-8">
        <div className="flex items-center gap-x-3">
          <svg
            className="w-9 h-9"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.5 11H4.6C4.03995 11 3.75992 11 3.54601 11.109C3.35785 11.2049 3.20487 11.3578 3.10899 11.546C3 11.7599 3 12.0399 3 12.6V21M16.5 11H19.4C19.9601 11 20.2401 11 20.454 11.109C20.6422 11.2049 20.7951 11.3578 20.891 11.546C21 11.7599 21 12.0399 21 12.6V21M16.5 21V6.2C16.5 5.0799 16.5 4.51984 16.282 4.09202C16.0903 3.71569 15.7843 3.40973 15.408 3.21799C14.9802 3 14.4201 3 13.3 3H10.7C9.57989 3 9.01984 3 8.59202 3.21799C8.21569 3.40973 7.90973 3.71569 7.71799 4.09202C7.5 4.51984 7.5 5.0799 7.5 6.2V21M22 21H2M11 7H13M11 11H13M11 15H13"
              stroke="#009966"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="text-3xl mt-4">Client & Billing</p>
        </div>
        <p className="text-gray-600 text-2xl">
          Manage your billing details and payment information
        </p>

        {/* User Information */}
        <div className="grid grid-cols-2 gap-x-4">
          {userInfoFields.map((field, index) => (
            <div
              key={index}
              className={
                field.value === "address" || field.value === "email"
                  ? "col-span-2"
                  : ""
              }
            >
              <label className="block text-xl text-gray-700 mt-4">
                {field.label}
              </label>
              <input
                type="text"
                name={field.value}
                placeholder={field.placeholder}
                value={
                  field.value === "fullName"
                    ? fullName
                    : field.value === "location"
                    ? location
                    : field.value === "address"
                    ? address
                    : field.value === "email"
                    ? email
                    : ""
                }
                onChange={(e) => {
                  if (field.value === "fullName") setFullName(e.target.value);
                  else if (field.value === "location")
                    setLocation(e.target.value);
                  else if (field.value === "address")
                    setAddress(e.target.value);
                  else if (field.value === "email") setEmail(e.target.value);
                }}
                className="w-full mt-2 p-3 border border-gray-300 bg-[#F3F3F5] rounded-2xl"
              />
            </div>
          ))}
        </div>
        <div className="w-full h-[2.5px] mt-6 mb-6 bg-slate-200" />
        <div>
          {/* Payment Methods Section */}
          <div>
            <div className="flex items-center justify-between">
              <p className="block text-xl mt-2">Payment Methods</p>
              <p
                className="w-fit px-3 py-2 border-1 border-gray-300 rounded-2xl text-[#00BC7D] active:opacity-30 hover:text-white hover:bg-[#00BC7D] hover:cursor-pointer"
                onClick={toggleModal}
              >
                + Add Card
              </p>
            </div>

            {/* ===================== */}
            {/* Improved Modal */}
            {showModal && (
              <div className="fixed h-screen inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
                <div className="w-full mt-3 h-screen overflow-y-auto max-w-md bg-white rounded-xl shadow-2xl relative">
                  {/* Close Button */}
                  <p
                    onClick={toggleModal}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 hover:cursor-pointer active:opacity-30"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18 6L6 18M6 6L18 18"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </p>

                  {/* Modal Header */}
                  <div className="text-center pt-6 pb-4 px-6 border-b border-gray-100">
                    <p className="text-2xl text-gray-900 mb-1">
                      Add payment method
                    </p>
                    <p className="text-sm text-gray-500 flex items-center justify-center gap-1">
                      <svg
                        className="w-3 h-3"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15 9V6C15 3.23858 12.7614 1 10 1C7.23858 1 5 3.23858 5 6V9M5.8 19H14.2C15.8802 19 16.7202 19 17.362 18.673C17.9265 18.3854 18.3854 17.9265 18.673 17.362C19 16.7202 19 15.8802 19 14.2V13.8C19 12.1198 19 11.2798 18.673 10.638C18.3854 10.0735 17.9265 9.6146 17.362 9.32698C16.7202 9 15.8802 9 14.2 9H5.8C4.11984 9 3.27976 9 2.63803 9.32698C2.07354 9.6146 1.6146 10.0735 1.32698 10.638C1 11.2798 1 12.1198 1 13.8V14.2C1 15.8802 1 16.7202 1.32698 17.362C1.6146 17.9265 2.07354 18.3854 2.63803 18.673C3.27976 19 4.11984 19 5.8 19Z"
                          stroke="#717182"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      Secured & encrypted
                    </p>
                  </div>

                  {/* Modal Content */}
                  <div className="p-6">
                    {/* Select Payment Method */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Select payment method
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {paymentMethods.map((method) => (
                          <div
                            key={method.id}
                            onClick={() => setSelectedMethod(method.id)}
                            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                              selectedMethod === method.id
                                ? "border-gray-900 bg-gray-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <div className="flex flex-col items-start">
                              <div
                                className={`mb-2 ${
                                  selectedMethod === method.id
                                    ? "text-gray-900"
                                    : "text-gray-400"
                                }`}
                              >
                                {method.icon}
                              </div>
                              <div className="text-sm font-medium text-gray-900">
                                {method.name}
                              </div>
                              <div className="text-xs text-gray-500">
                                {method.subtitle}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Notice */}
                    <div className="mb-6 px-3 pt-3 bg-blue-50 rounded-lg flex items-start gap-2">
                      <svg
                        width="18"
                        height="22"
                        viewBox="0 0 18 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.30201 20.218C8.5234 20.3471 8.6341 20.4117 8.79032 20.4452C8.91156 20.4712 9.08844 20.4712 9.20968 20.4452C9.3659 20.4117 9.4766 20.3471 9.69799 20.218C11.646 19.0815 17 15.5115 17 10.6031V6.80309C17 5.7292 17 5.19225 16.8345 4.8111C16.6662 4.4237 16.4986 4.21761 16.1536 3.974C15.8141 3.73432 15.1486 3.59592 13.8177 3.31912C12.3508 3.01403 11.2243 2.46313 10.1944 1.66641C9.70051 1.28436 9.45357 1.09334 9.26034 1.04123C9.05644 0.986256 8.94356 0.986256 8.73966 1.04123C8.54643 1.09334 8.29949 1.28436 7.80562 1.66641C6.77572 2.46313 5.6492 3.01403 4.1823 3.31912C2.85137 3.59592 2.18591 3.73432 1.84645 3.974C1.50142 4.21761 1.33379 4.4237 1.16554 4.8111C1 5.19225 1 5.7292 1 6.80309V10.6031C1 15.5115 6.35396 19.0815 8.30201 20.218Z"
                          stroke="black"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      <p className="text-sm text-gray-700">
                        We never store your full card number (PCI-DSS)
                      </p>
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Card number
                        </label>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Name on card
                        </label>
                        <input
                          type="text"
                          placeholder="John Doe"
                          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Expiry
                          </label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            CVC
                          </label>
                          <input
                            type="text"
                            placeholder="123"
                            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Billing address
                        </label>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">
                              Country
                            </label>
                            <select className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent">
                              <option>United States</option>
                              <option>Canada</option>
                              <option>United Kingdom</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs text-gray-600 mb-1">
                              Street address
                            </label>
                            <input
                              type="text"
                              placeholder="123 Main St"
                              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs text-gray-600 mb-1">
                                City
                              </label>
                              <input
                                type="text"
                                placeholder="San Francisco"
                                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                              />
                            </div>
                            <div>
                              <label className="block text-xs text-gray-600 mb-1">
                                State
                              </label>
                              <input
                                type="text"
                                placeholder="CA"
                                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs text-gray-600 mb-1">
                              Postal code
                            </label>
                            <input
                              type="text"
                              placeholder="94105"
                              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx="6" cy="6" r="5" stroke="currentColor" />
                          <path
                            d="M6 3V6L8 8"
                            stroke="currentColor"
                            strokeLinecap="round"
                          />
                        </svg>
                        <p className="mt-3">No extra fee. Charged in USD</p>
                      </div>

                      {/* Checkboxes */}
                      <div className="-space-y-3">
                        <label className="cursor-pointer">
                          <div className="flex items-center gap-x-2">
                            <input
                              type="checkbox"
                              className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                            />
                            <div>
                              <p className="pt-3 text-sm text-gray-700">
                                Make this my default payment method
                              </p>
                            </div>
                          </div>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <div className="flex items-center gap-x-2">
                            <input
                              type="checkbox"
                              className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                            />
                            <div>
                              <p className="pt-3 text-sm text-gray-700">
                                Save for future payments
                              </p>
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className=" pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-x-6 text-xs text-gray-400">
                          <span>PCI-DSS</span>
                          <span>256-bit SSL</span>
                          <span>Tokenized by Stripe</span>
                        </div>
                      </div>

                      <div className="flex gap-x-3">
                        <p
                          onClick={toggleModal}
                          className="flex-1 py-2.5 border border-gray-300 rounded-lg text-gray-700 text-center font-medium hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </p>
                        <p
                          onClick={toggleModal}
                          className="flex-1 py-2.5 bg-[#10B981] text-white rounded-lg font-medium text-center hover:bg-[#059669] transition-colors"
                        >
                          Save & Continue
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* ===================== */}

            {/* Card Number Input  */}
            <div>
              <div
                className={`flex items-center w-full px-3 py-3 gap-x-4 rounded-2xl ${
                  isFocused2
                    ? "border-blue-600 border-2"
                    : "border-gray-200 border-2"
                } bg-[#F3F3F5]`}
                tabIndex={0}
                onFocus={() => setIsFocused2(true)}
                onBlur={() => setIsFocused2(false)}
              >
                {/* card */}
                <span>
                  <svg
                    className="w-7 h-7"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22 10H2M2 8.2L2 15.8C2 16.9201 2 17.4802 2.21799 17.908C2.40973 18.2843 2.71569 18.5903 3.09202 18.782C3.51984 19 4.07989 19 5.2 19L18.8 19C19.9201 19 20.4802 19 20.908 18.782C21.2843 18.5903 21.5903 18.2843 21.782 17.908C22 17.4802 22 16.9201 22 15.8V8.2C22 7.0799 22 6.51984 21.782 6.09202C21.5903 5.7157 21.2843 5.40974 20.908 5.21799C20.4802 5 19.9201 5 18.8 5L5.2 5C4.0799 5 3.51984 5 3.09202 5.21799C2.7157 5.40973 2.40973 5.71569 2.21799 6.09202C2 6.51984 2 7.07989 2 8.2Z"
                      stroke="#99A1AF"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <div className="w-full flex items-center">
                  <div className="flex mt-1 flex-col space-x-5">
                    <p className="text-sm h-2 gap-x-2">Visa •••• 1234</p>
                    <p className="text-sm text-[#99A1AF] h-2 gap-x-2">
                      Expired 12/25
                    </p>
                  </div>
                  <p className="py-2 px-4 bg-[#D0FAE5] rounded-2xl text-[#007A55] mt-3">
                    Default
                  </p>
                </div>
                {/* delete */}
                <span>
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 20 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14 5V4.2C14 3.0799 14 2.51984 13.782 2.09202C13.5903 1.71569 13.2843 1.40973 12.908 1.21799C12.4802 1 11.9201 1 10.8 1H9.2C8.07989 1 7.51984 1 7.09202 1.21799C6.71569 1.40973 6.40973 1.71569 6.21799 2.09202C6 2.51984 6 3.0799 6 4.2V5M8 10.5V15.5M12 10.5V15.5M1 5H19M17 5V16.2C17 17.8802 17 18.7202 16.673 19.362C16.3854 19.9265 15.9265 20.3854 15.362 20.673C14.7202 21 13.8802 21 12.2 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V5"
                      stroke="#99A1AF"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
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
                  value={field.value === "taxID" ? taxID : currency}
                  onChange={(e) => {
                    if (field.value === "taxID") setTaxID(e.target.value);
                    else if (field.value === "currency")
                      setCurrency(e.target.value);
                  }}
                  className="w-full mt-2 p-3 border border-gray-300 bg-[#F3F3F5] rounded-2xl"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="w-full h-[1.5px] mt-6 mb-6 bg-slate-200" />

        {/* Account Statistics */}
        <div>
          <p className="text-xl">Account Statistics</p>
        </div>
        <div className="col-span-2 grid grid-cols-2 gap-x-4 mt-8">
          {accountStats.map((stat, index) => (
            <div key={index}>
              <label className="block text-xl">{stat.label}</label>
              <input
                type="number"
                name={stat.value}
                placeholder="0"
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
            <div
              className={`flex items-center w-full mt-3 px-3 py-3 gap-x-3 rounded-2xl ${
                isFocused
                  ? "border-blue-600 border-2"
                  : "border-gray-200 border-2"
              } bg-[#F3F3F5]`}
              tabIndex={0}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            >
              <input
                type="text"
                placeholder="0"
                className="w-full outline-none"
              />
            </div>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-xl mt-4">Rating</label>
            <div
              className={`flex items-center w-full mt-3 px-3 py-3 gap-x-3 rounded-2xl ${
                isFocused1
                  ? "border-blue-600 border-2"
                  : "border-gray-200 border-2"
              } bg-[#F3F3F5]`}
              tabIndex={0}
              onFocus={() => setIsFocused1(true)}
              onBlur={() => setIsFocused1(false)}
            >
              <span>
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.2827 3.45332C11.5131 2.98638 11.6284 2.75291 11.7848 2.67831C11.9209 2.61341 12.0791 2.61341 12.2152 2.67831C12.3717 2.75291 12.4869 2.98638 12.7174 3.45332L14.9041 7.88328C14.9721 8.02113 15.0061 8.09006 15.0558 8.14358C15.0999 8.19096 15.1527 8.22935 15.2113 8.25662C15.2776 8.28742 15.3536 8.29854 15.5057 8.32077L20.397 9.03571C20.9121 9.11099 21.1696 9.14863 21.2888 9.27444C21.3925 9.38389 21.4412 9.5343 21.4215 9.68377C21.3988 9.85558 21.2124 10.0372 20.8395 10.4004L17.3014 13.8464C17.1912 13.9538 17.136 14.0076 17.1004 14.0715C17.0689 14.128 17.0487 14.1902 17.0409 14.2545C17.0321 14.3271 17.0451 14.403 17.0711 14.5547L17.906 19.4221C17.994 19.9355 18.038 20.1922 17.9553 20.3445C17.8833 20.477 17.7554 20.57 17.6071 20.5975C17.4366 20.6291 17.2061 20.5078 16.7451 20.2654L12.3724 17.9658C12.2361 17.8942 12.168 17.8584 12.0962 17.8443C12.0327 17.8318 11.9673 17.8318 11.9038 17.8443C11.832 17.8584 11.7639 17.8942 11.6277 17.9658L7.25492 20.2654C6.79392 20.5078 6.56341 20.6291 6.39297 20.5975C6.24468 20.57 6.11672 20.477 6.04474 20.3445C5.962 20.1922 6.00603 19.9355 6.09407 19.4221L6.92889 14.5547C6.95491 14.403 6.96793 14.3271 6.95912 14.2545C6.95132 14.1902 6.93111 14.128 6.89961 14.0715C6.86402 14.0076 6.80888 13.9538 6.69859 13.8464L3.16056 10.4004C2.78766 10.0372 2.60121 9.85558 2.57853 9.68377C2.55879 9.5343 2.60755 9.38389 2.71125 9.27444C2.83044 9.14863 3.08797 9.11099 3.60304 9.03571L8.49431 8.32077C8.64642 8.29854 8.72248 8.28742 8.78872 8.25662C8.84736 8.22935 8.90016 8.19096 8.94419 8.14358C8.99391 8.09006 9.02793 8.02113 9.09597 7.88328L11.2827 3.45332Z"
                    stroke="gold"
                    fill="gold"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <input
                type="text"
                placeholder="N/A"
                className="w-full outline-none"
              />
            </div>
          </div>
        </div>

        {/* Save Changes Button */}
        <div className="mt-5">
          <p
            onClick={handleSaveChanges}
            className="w-40 text-center bg-[#00BC7D] text-white py-2 px-4 rounded-md active:opacity-30 hover:bg-[#00A56C] cursor-pointer"
          >
            Save Changes
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClientAndBilling;
