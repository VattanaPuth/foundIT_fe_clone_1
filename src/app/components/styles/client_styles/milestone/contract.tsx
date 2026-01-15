"use client";

import React, { useState, useCallback } from "react";

// Types for backend integration
interface Freelancer {
  id: string;
  name: string;
  title: string;
  rating: number;
  reviewCount: number;
  avatarUrl?: string;
}

interface Milestone {
  id: string;
  title: string;
  amount: number;
  dueDate?: string;
}

interface HourlyTerms {
  hourlyRate: number;
  weeklyHoursCap: string;
  expectedDuration: string;
  timezoneOverlap?: string;
}

interface ProjectDetails {
  title: string;
  contractType: "fixed" | "hourly";
  startDate: "asap" | "date";
  selectedDate?: string;
  communicationCadence: string;
}

interface PaymentDetails {
  fundingOption: "first_milestone" | "full_project";
  paymentMethodId?: string;
  timesheetPolicy?: string;
  budgetAlerts?: boolean;
}

interface ToolAccess {
  github: boolean;
  figma: boolean;
  slack: boolean;
}

interface LegalCompliance {
  includeNDA: boolean;
}

interface HireFormData {
  projectDetails: ProjectDetails;
  milestones: Milestone[];
  hourlyTerms: HourlyTerms;
  expectedDelivery?: string;
  revisionsPolicy: string;
  toolAccess: ToolAccess;
  legalCompliance: LegalCompliance;
  paymentDetails: PaymentDetails;
  welcomeMessage: string;
  inviteToSlack: boolean;
  inviteToFigma: boolean;
}

interface PaymentMethod {
  id: string;
  last4: string;
  expiry: string;
  isDefault: boolean;
}

interface ContractPageProps {
  freelancer?: Freelancer;
  platformFeePercent?: number;
  onSubmit?: (data: HireFormData) => Promise<void>;
  onSaveDraft?: (data: HireFormData) => Promise<void>;
  onCancel?: () => void;
  initialData?: Partial<HireFormData>;
  paymentMethods?: PaymentMethod[];
}

// SVG Icons
const CheckIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const StarIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const ArrowLeftIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const ArrowRightIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const PlusIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const GripIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <circle cx="9" cy="6" r="1.5" />
    <circle cx="15" cy="6" r="1.5" />
    <circle cx="9" cy="12" r="1.5" />
    <circle cx="15" cy="12" r="1.5" />
    <circle cx="9" cy="18" r="1.5" />
    <circle cx="15" cy="18" r="1.5" />
  </svg>
);

const MailIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const GithubIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const FigmaIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
    <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
    <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z" />
    <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" />
    <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" />
  </svg>
);

const SlackIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" />
  </svg>
);

const CreditCardIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </svg>
);

const LockIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const InfoIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

const CloseIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ChevronDownIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const DefaultAvatar = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="50" fill="#e5e7eb" />
    <circle cx="50" cy="40" r="18" fill="#9ca3af" />
    <ellipse cx="50" cy="85" rx="30" ry="25" fill="#9ca3af" />
  </svg>
);

const ShieldIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const DocumentIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

// Checkbox Component
const Checkbox = ({ checked, onChange, id, children }: { checked: boolean; onChange: (checked: boolean) => void; id: string; children: React.ReactNode }) => (
  <div
    role="checkbox"
    aria-checked={checked}
    tabIndex={0}
    onClick={() => onChange(!checked)}
    onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onChange(!checked); } }}
    className="flex items-center gap-2 cursor-pointer group"
  >
    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${checked ? "bg-emerald-500 border-emerald-500" : "border-gray-300 group-hover:border-gray-400"}`}>
      {checked && <CheckIcon className="w-3 h-3 text-white" />}
    </div>
    <span className="text-sm text-gray-700">{children}</span>
  </div>
);

// Add Payment Method Modal
interface AddPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (paymentMethod: PaymentMethod) => void;
}

const AddPaymentMethodModal = ({ isOpen, onClose, onSave }: AddPaymentModalProps) => {
  const [cardNumber, setCardNumber] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [country, setCountry] = useState("United States");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [makeDefault, setMakeDefault] = useState(false);
  const [saveForFuture, setSaveForFuture] = useState(true);

  const resetForm = () => {
    setCardNumber("");
    setNameOnCard("");
    setExpiry("");
    setCvc("");
    setCountry("United States");
    setStreetAddress("");
    setCity("");
    setState("");
    setPostalCode("");
    setMakeDefault(false);
    setSaveForFuture(true);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSave = () => {
    const last4 = cardNumber.replace(/\s/g, "").slice(-4) || "0000";
    onSave({
      id: `card-${Date.now()}`,
      last4,
      expiry: expiry || "12/25",
      isDefault: makeDefault,
    });
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div>
            <span className="text-lg font-semibold text-gray-900 block">Add payment method</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <LockIcon className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-xs text-gray-500">Secured & encrypted</span>
            </div>
          </div>
          <div role="button" tabIndex={0} onClick={handleClose} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleClose(); } }} className="p-1.5 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors">
            <CloseIcon className="w-5 h-5 text-gray-500" />
          </div>
        </div>

        <div className="p-4 space-y-4">
          <div>
            <span className="text-sm font-medium text-gray-700 block mb-2">Select payment method</span>
            <div className="border-2 border-emerald-500 rounded-lg p-3 bg-emerald-50">
              <div className="flex items-center gap-2">
                <CreditCardIcon className="w-5 h-5 text-gray-700" />
                <div>
                  <span className="text-sm font-medium text-gray-900 block">Card</span>
                  <span className="text-xs text-gray-500">Visa, Mastercard...</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 mt-2">
              <ShieldIcon className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-xs text-gray-500">We never store your full card number (PCI-DSS)</span>
            </div>
          </div>

          <div>
            <span className="text-sm font-medium text-gray-700 block mb-1.5">Card number</span>
            <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} placeholder="1234 5678 9012 3456" className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
          </div>

          <div>
            <span className="text-sm font-medium text-gray-700 block mb-1.5">Name on card</span>
            <input type="text" value={nameOnCard} onChange={(e) => setNameOnCard(e.target.value)} placeholder="John Doe" className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <span className="text-sm font-medium text-gray-700 block mb-1.5">Expiry</span>
              <input type="text" value={expiry} onChange={(e) => setExpiry(e.target.value)} placeholder="MM/YY" className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
            </div>
            <div>
              <span className="text-sm font-medium text-gray-700 block mb-1.5">CVC</span>
              <input type="text" value={cvc} onChange={(e) => setCvc(e.target.value)} placeholder="123" className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
            </div>
          </div>

          <div>
            <span className="text-sm font-medium text-gray-700 block mb-2">Billing address</span>
            <div className="space-y-3">
              <div>
                <span className="text-xs text-gray-500 block mb-1">Country</span>
                <div className="relative">
                  <select value={country} onChange={(e) => setCountry(e.target.value)} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent cursor-pointer">
                    <option>United States</option>
                    <option>Canada</option>
                    <option>United Kingdom</option>
                    <option>Australia</option>
                  </select>
                  <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div>
                <span className="text-xs text-gray-500 block mb-1">Street address</span>
                <input type="text" value={streetAddress} onChange={(e) => setStreetAddress(e.target.value)} placeholder="123 Main St" className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-xs text-gray-500 block mb-1">City</span>
                  <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="San Francisco" className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
                </div>
                <div>
                  <span className="text-xs text-gray-500 block mb-1">State</span>
                  <input type="text" value={state} onChange={(e) => setState(e.target.value)} placeholder="CA" className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
                </div>
              </div>
              <div>
                <span className="text-xs text-gray-500 block mb-1">Postal code</span>
                <input type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} placeholder="94105" className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 flex items-center gap-2">
            <InfoIcon className="w-4 h-4 text-blue-500 flex-shrink-0" />
            <span className="text-sm text-blue-700">No extra fee. Charged in USD.</span>
          </div>

          <div className="space-y-2">
            <Checkbox id="make-default" checked={makeDefault} onChange={setMakeDefault}>Make this my default payment method</Checkbox>
            <Checkbox id="save-future" checked={saveForFuture} onChange={setSaveForFuture}>Save for future payments</Checkbox>
          </div>

          <div className="flex items-center justify-center gap-4 text-xs text-gray-400 pt-2">
            <div className="flex items-center gap-1"><ShieldIcon className="w-3.5 h-3.5" />PCI-DSS</div>
            <div className="flex items-center gap-1"><LockIcon className="w-3.5 h-3.5" />256-bit SSL</div>
            <div className="flex items-center gap-1"><CheckIcon className="w-3.5 h-3.5" />Tokenized by Stripe</div>
          </div>
        </div>

        <div className="flex gap-3 p-4 border-t border-gray-200">
          <div role="button" tabIndex={0} onClick={handleClose} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleClose(); } }} className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 border border-gray-300 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors text-center">Cancel</div>
          <div role="button" tabIndex={0} onClick={handleSave} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleSave(); } }} className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg cursor-pointer transition-colors text-center">Save & Continue</div>
        </div>
      </div>
    </div>
  );
};

// Send Offer Confirmation Modal
interface SendOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  freelancer: Freelancer;
  data: HireFormData;
}

const SendOfferModal = ({ isOpen, onClose, onConfirm, freelancer, data }: SendOfferModalProps) => {
  const [personalMessage, setPersonalMessage] = useState(data.welcomeMessage || `Hi ${freelancer.name.split(" ")[0]},\n\nI'm excited to work with you on this project. I've attached a contract offer with all the details.\n\nLooking forward to collaborating!\n\nBest regards`);
  
  const isHourly = data.projectDetails.contractType === "hourly";
  const totalAmount = isHourly 
    ? data.hourlyTerms.hourlyRate * parseInt(data.hourlyTerms.weeklyHoursCap || "20") * 8 
    : data.milestones.reduce((sum, m) => sum + m.amount, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            {freelancer.avatarUrl ? (
              <img src={freelancer.avatarUrl} alt={freelancer.name} className="w-10 h-10 rounded-full object-cover" />
            ) : (
              <DefaultAvatar className="w-10 h-10 rounded-full" />
            )}
            <div>
              <span className="text-base font-semibold text-gray-900 block">Send offer to {freelancer.name}</span>
              <span className="text-sm text-gray-500">{freelancer.title}</span>
            </div>
          </div>
          <div role="button" tabIndex={0} onClick={onClose} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClose(); } }} className="p-1.5 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors">
            <CloseIcon className="w-5 h-5 text-gray-500" />
          </div>
        </div>

        <div className="p-4 space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <DocumentIcon className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="flex-1">
                <span className="text-sm font-medium text-gray-900 block">{data.projectDetails.title}</span>
                <div className="flex justify-between items-center mt-2 text-sm">
                  <span className="text-gray-500">Type:</span>
                  <span className="text-gray-900">{isHourly ? "Hourly" : "Fixed Price"}</span>
                </div>
                <div className="flex justify-between items-center mt-1 text-sm">
                  <span className="text-gray-500">Total Budget:</span>
                  <span className="text-gray-900">${totalAmount.toFixed(0)}</span>
                </div>
                {!isHourly && (
                  <div className="flex justify-between items-center mt-1 text-sm">
                    <span className="text-gray-500">Milestones:</span>
                    <span className="text-gray-900">{data.milestones.length}</span>
                  </div>
                )}
                {isHourly && (
                  <div className="flex justify-between items-center mt-1 text-sm">
                    <span className="text-gray-500">Weekly Hours:</span>
                    <span className="text-gray-900">{data.hourlyTerms.weeklyHoursCap} hrs</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <span className="text-sm font-medium text-gray-700 block mb-2">Add a personal message (optional)</span>
            <textarea 
              value={personalMessage} 
              onChange={(e) => setPersonalMessage(e.target.value)} 
              rows={6} 
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent" 
            />
            <span className="text-xs text-gray-500 mt-1 block">Your message will be sent along with the contract offer</span>
          </div>
        </div>

        <div className="flex gap-3 p-4 border-t border-gray-200">
          <div role="button" tabIndex={0} onClick={onClose} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClose(); } }} className="px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors">Cancel</div>
          <div role="button" tabIndex={0} onClick={onConfirm} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onConfirm(); } }} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg cursor-pointer transition-colors">
            <MailIcon className="w-4 h-4" />Send Offer & Message
          </div>
        </div>
      </div>
    </div>
  );
};

// Toggle Switch Component
const ToggleSwitch = ({ enabled, onChange, id }: { enabled: boolean; onChange: (value: boolean) => void; id: string }) => (
  <div
    role="switch"
    aria-checked={enabled}
    tabIndex={0}
    id={id}
    onClick={() => onChange(!enabled)}
    onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onChange(!enabled); } }}
    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${enabled ? "bg-emerald-500" : "bg-gray-200"}`}
  >
    <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${enabled ? "translate-x-5" : "translate-x-0"}`} />
  </div>
);

// Radio Button Component
const RadioButton = ({ checked, onChange, name, value, children }: { checked: boolean; onChange: (value: string) => void; name: string; value: string; children: React.ReactNode }) => (
  <div
    role="radio"
    aria-checked={checked}
    tabIndex={0}
    onClick={() => onChange(value)}
    onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onChange(value); } }}
    className="flex items-center gap-3 cursor-pointer group"
  >
    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${checked ? "border-emerald-500 bg-emerald-500" : "border-gray-300 group-hover:border-gray-400"}`}>
      {checked && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
    </div>
    <span className="text-sm text-gray-700">{children}</span>
  </div>
);

// Step indicator
const StepIndicator = ({ steps, currentStep }: { steps: string[]; currentStep: number }) => (
  <div className="flex items-center justify-center w-full px-4 py-4 sm:px-8">
    {steps.map((step, index) => (
      <React.Fragment key={step}>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium transition-colors ${index < currentStep ? "bg-emerald-500 text-white" : index === currentStep ? "bg-emerald-500 text-white" : "bg-gray-100 text-gray-400"}`}>
            {index < currentStep ? <CheckIcon className="w-3 h-3 sm:w-4 sm:h-4" /> : index + 1}
          </div>
          <span className={`hidden sm:block text-xs sm:text-sm font-medium transition-colors ${index <= currentStep ? "text-gray-900" : "text-gray-400"}`}>{step}</span>
        </div>
        {index < steps.length - 1 && <div className={`flex-1 h-0.5 mx-2 sm:mx-4 transition-colors ${index < currentStep ? "bg-emerald-500" : "bg-gray-200"}`} />}
      </React.Fragment>
    ))}
  </div>
);

// Offer Summary Sidebar
const OfferSummary = ({ freelancer, projectTitle, contractType, milestones, hourlyTerms, platformFeePercent, fundNow }: { freelancer: Freelancer; projectTitle: string; contractType: string; milestones: Milestone[]; hourlyTerms: HourlyTerms; platformFeePercent: number; fundNow: number }) => {
  const isHourly = contractType === "hourly";
  const weeklyHours = parseInt(hourlyTerms.weeklyHoursCap) || 20;
  const estWeekly = isHourly ? hourlyTerms.hourlyRate * weeklyHours : 0;
  
  // For hourly: calculate based on duration (e.g., "1-3 months" = ~4 weeks avg per month * 2 months avg = 8 weeks)
  const getDurationWeeks = (duration: string): number => {
    switch (duration) {
      case "1-3 months": return 8;
      case "3-6 months": return 18;
      case "6-12 months": return 36;
      case "12+ months": return 52;
      default: return 8;
    }
  };
  
  const durationWeeks = getDurationWeeks(hourlyTerms.expectedDuration);
  const totalHourlyEstimate = isHourly ? estWeekly * durationWeeks : 0;
  // Use 5% fee for hourly, platformFeePercent for fixed
  const effectiveFeePercent = isHourly ? 5 : platformFeePercent;
  const platformFee = isHourly ? (totalHourlyEstimate * effectiveFeePercent) / 100 : (fundNow * effectiveFeePercent) / 100;
  const freelancerReceives = isHourly ? totalHourlyEstimate - platformFee : fundNow - platformFee;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 sticky top-4">
      <span className="text-base sm:text-lg font-semibold text-gray-900 block mb-4">Offer Summary</span>
      <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
        {freelancer.avatarUrl ? (
          <img src={freelancer.avatarUrl} alt={freelancer.name} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover" />
        ) : (
          <DefaultAvatar className="w-10 h-10 sm:w-12 sm:h-12 rounded-full" />
        )}
        <div>
          <span className="font-medium text-gray-900 text-sm sm:text-base block">{freelancer.name}</span>
          <span className="text-xs sm:text-sm text-gray-500 block">{freelancer.title}</span>
          <div className="flex items-center gap-1 mt-0.5">
            <StarIcon className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400" />
            <span className="text-xs sm:text-sm text-gray-600">{freelancer.rating} ({freelancer.reviewCount})</span>
          </div>
        </div>
      </div>
      <div className="py-4 space-y-3">
        <div>
          <span className="text-xs text-gray-500 block">Project</span>
          <span className="text-sm font-medium text-gray-900 block">{projectTitle || "Untitled Project"}</span>
        </div>
        <div>
          <span className="text-xs text-gray-500 block">Type</span>
          <span className={`inline-block mt-1 px-2 py-0.5 text-xs font-medium rounded ${isHourly ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"}`}>{isHourly ? "Hourly" : "Fixed Price"}</span>
        </div>
      </div>
      <div className="py-4 border-t border-gray-100 space-y-2">
        <span className="text-xs text-gray-500 block">Cost Breakdown</span>
        {isHourly ? (
          <>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Hourly rate</span>
              <span className="text-gray-900">${hourlyTerms.hourlyRate}/hr</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Weekly cap</span>
              <span className="text-gray-900">{weeklyHours} hrs</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Est. weekly</span>
              <span className="text-gray-900">${estWeekly.toFixed(0)}</span>
            </div>
          </>
        ) : (
          <>
            {milestones.map((milestone, index) => (
              <div key={milestone.id} className="flex justify-between items-center text-sm">
                <span className="text-gray-600">{milestones.length > 1 ? `Milestone ${index + 1}` : "1 milestone"}</span>
                <span className="text-gray-900">${milestone.amount.toFixed(2)}</span>
              </div>
            ))}
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Fund now</span>
              <span className="text-gray-900">${fundNow.toFixed(2)}</span>
            </div>
          </>
        )}
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Platform fee ({effectiveFeePercent}%)</span>
          <span className="text-red-500">-${platformFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
          <span className="font-medium text-gray-900">Freelancer receives</span>
          <span className="text-lg sm:text-xl font-semibold text-gray-900">${freelancerReceives.toFixed(2)}</span>
        </div>
      </div>
      <div className="pt-4 border-t border-gray-100">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">{isHourly ? "Start Duration" : "Start"}</span>
          <span className="text-gray-900">{isHourly ? hourlyTerms.expectedDuration || "1-3 Months" : "ASAP"}</span>
        </div>
      </div>
    </div>
  );
};

// Step 1: Scope & Terms
const ScopeAndTerms = ({ data, onChange }: { data: HireFormData; onChange: (data: Partial<HireFormData>) => void }) => {
  const isHourly = data.projectDetails.contractType === "hourly";

  const handleAddMilestone = () => {
    const newMilestone: Milestone = { id: `milestone-${Date.now()}`, title: "", amount: 0 };
    onChange({ milestones: [...data.milestones, newMilestone] });
  };

  const handleMilestoneChange = (id: string, field: keyof Milestone, value: string | number) => {
    const updatedMilestones = data.milestones.map((m) => m.id === id ? { ...m, [field]: value } : m);
    onChange({ milestones: updatedMilestones });
  };

  const handleRemoveMilestone = (id: string) => {
    if (data.milestones.length > 1) {
      onChange({ milestones: data.milestones.filter((m) => m.id !== id) });
    }
  };

  const handleHourlyChange = (field: keyof HourlyTerms, value: string | number) => {
    onChange({ hourlyTerms: { ...data.hourlyTerms, [field]: value } });
  };

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xl sm:text-2xl font-semibold text-gray-900 block">Scope & Terms</span>
        <span className="text-sm text-gray-500 mt-1 block">Define the project details and working terms</span>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
        <span className="text-base font-semibold text-gray-900 block mb-4">Project Details</span>
        <div className="space-y-4">
          <div>
            <span className="text-sm font-medium text-gray-700 block mb-1.5">Project Title</span>
            <input type="text" value={data.projectDetails.title} onChange={(e) => onChange({ projectDetails: { ...data.projectDetails, title: e.target.value } })} placeholder="Build a React Web Application" className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-shadow" />
          </div>
          <div>
            <span className="text-sm font-medium text-gray-700 block mb-2">Contract Type</span>
            <div className="flex gap-6">
              <RadioButton name="contractType" value="fixed" checked={data.projectDetails.contractType === "fixed"} onChange={(v) => onChange({ projectDetails: { ...data.projectDetails, contractType: v as "fixed" | "hourly" } })}>Fixed Price</RadioButton>
              <RadioButton name="contractType" value="hourly" checked={data.projectDetails.contractType === "hourly"} onChange={(v) => onChange({ projectDetails: { ...data.projectDetails, contractType: v as "fixed" | "hourly" } })}>Hourly</RadioButton>
            </div>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-700 block mb-2">Start Date</span>
            <div className="space-y-2">
              <RadioButton name="startDate" value="asap" checked={data.projectDetails.startDate === "asap"} onChange={(v) => onChange({ projectDetails: { ...data.projectDetails, startDate: v as "asap" | "date" } })}>As soon as possible</RadioButton>
              <RadioButton name="startDate" value="date" checked={data.projectDetails.startDate === "date"} onChange={(v) => onChange({ projectDetails: { ...data.projectDetails, startDate: v as "asap" | "date" } })}>Pick a date</RadioButton>
            </div>
            {data.projectDetails.startDate === "date" && (
              <input type="date" value={data.projectDetails.selectedDate || ""} onChange={(e) => onChange({ projectDetails: { ...data.projectDetails, selectedDate: e.target.value } })} className="mt-2 w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
            )}
          </div>
          <div>
            <span className="text-sm font-medium text-gray-700 block mb-1.5">Communication Cadence</span>
            <div className="relative">
              <select value={data.projectDetails.communicationCadence} onChange={(e) => onChange({ projectDetails: { ...data.projectDetails, communicationCadence: e.target.value } })} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent cursor-pointer">
                <option value="weekly">Weekly report</option>
                <option value="daily">Daily standup</option>
                <option value="biweekly">Bi-weekly check-in</option>
                <option value="asneeded">As needed</option>
              </select>
              <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {isHourly ? (
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
          <span className="text-base font-semibold text-gray-900 block mb-4">Hourly Terms</span>
          <div className="space-y-4">
            <div>
              <span className="text-sm font-medium text-gray-700 block mb-1.5">Hourly Rate ($)</span>
              <input type="number" value={data.hourlyTerms.hourlyRate || ""} onChange={(e) => handleHourlyChange("hourlyRate", parseFloat(e.target.value) || 0)} placeholder="50" className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
            </div>
            <div>
              <span className="text-sm font-medium text-gray-700 block mb-1.5">Weekly Hours Cap</span>
              <div className="relative">
                <select value={data.hourlyTerms.weeklyHoursCap} onChange={(e) => handleHourlyChange("weeklyHoursCap", e.target.value)} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent cursor-pointer">
                  <option value="10">10 hours/week</option>
                  <option value="20">20 hours/week</option>
                  <option value="30">30 hours/week</option>
                  <option value="40">40 hours/week</option>
                </select>
                <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-700 block mb-1.5">Expected Duration</span>
              <div className="relative">
                <select value={data.hourlyTerms.expectedDuration} onChange={(e) => handleHourlyChange("expectedDuration", e.target.value)} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent cursor-pointer">
                  <option value="1-3 months">1-3 months</option>
                  <option value="3-6 months">3-6 months</option>
                  <option value="6-12 months">6-12 months</option>
                  <option value="12+ months">12+ months</option>
                </select>
                <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-700 block mb-1.5">Time-zone Overlap (Optional)</span>
              <input type="text" value={data.hourlyTerms.timezoneOverlap || ""} onChange={(e) => handleHourlyChange("timezoneOverlap", e.target.value)} placeholder="e.g., 9 AM - 1 PM EST" className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-base font-semibold text-gray-900 block">Milestones</span>
              <div role="button" tabIndex={0} onClick={handleAddMilestone} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleAddMilestone(); } }} className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 cursor-pointer transition-colors">
                <PlusIcon className="w-4 h-4" />Add Milestone
              </div>
            </div>
            <div className="space-y-4">
              {data.milestones.map((milestone, index) => (
                <div key={milestone.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start gap-2 mb-3">
                    <GripIcon className="w-5 h-5 text-gray-400 mt-1 cursor-grab flex-shrink-0" />
                    <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">Milestone {index + 1}</span>
                    {data.milestones.length > 1 && (
                      <div role="button" tabIndex={0} onClick={() => handleRemoveMilestone(milestone.id)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleRemoveMilestone(milestone.id); } }} className="ml-auto text-gray-400 hover:text-red-500 cursor-pointer transition-colors">
                        <CloseIcon className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm font-medium text-gray-700 block mb-1">Title</span>
                      <input type="text" value={milestone.title} onChange={(e) => handleMilestoneChange(milestone.id, "title", e.target.value)} placeholder="Project Setup & Architecture" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <span className="text-sm font-medium text-gray-700 block mb-1">Amount ($)</span>
                        <input type="number" value={milestone.amount || ""} onChange={(e) => handleMilestoneChange(milestone.id, "amount", parseFloat(e.target.value) || 0)} placeholder="300" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-700 block mb-1">Due Date</span>
                        <input type="date" value={milestone.dueDate || ""} onChange={(e) => handleMilestoneChange(milestone.id, "dueDate", e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 space-y-4">
            <div>
              <span className="text-sm font-medium text-gray-700 block mb-1.5">Expected Delivery</span>
              <input type="date" value={data.expectedDelivery || ""} onChange={(e) => onChange({ expectedDelivery: e.target.value })} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
            </div>
            <div>
              <span className="text-sm font-medium text-gray-700 block mb-1.5">Revisions Policy</span>
              <div className="relative">
                <select value={data.revisionsPolicy} onChange={(e) => onChange({ revisionsPolicy: e.target.value })} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent cursor-pointer">
                  <option value="standard">Standard (2 rounds included)</option>
                  <option value="unlimited">Unlimited revisions</option>
                  <option value="none">No revisions</option>
                  <option value="custom">Custom</option>
                </select>
                <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </>
      )}

      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
        <span className="text-base font-semibold text-gray-900 block mb-1">Access & Tools</span>
        <span className="text-sm text-gray-500 block mb-4">Select tools the freelancer will need access to</span>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3"><GithubIcon className="w-5 h-5 text-gray-700" /><span className="text-sm text-gray-700">GitHub</span></div>
            <ToggleSwitch id="github-access" enabled={data.toolAccess.github} onChange={(e) => onChange({ toolAccess: { ...data.toolAccess, github: e } })} />
          </div>
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3"><FigmaIcon className="w-5 h-5 text-gray-700" /><span className="text-sm text-gray-700">Figma</span></div>
            <ToggleSwitch id="figma-access" enabled={data.toolAccess.figma} onChange={(e) => onChange({ toolAccess: { ...data.toolAccess, figma: e } })} />
          </div>
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3"><SlackIcon className="w-5 h-5 text-gray-700" /><span className="text-sm text-gray-700">Slack</span></div>
            <ToggleSwitch id="slack-access" enabled={data.toolAccess.slack} onChange={(e) => onChange({ toolAccess: { ...data.toolAccess, slack: e } })} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
        <span className="text-base font-semibold text-gray-900 block mb-4">Legal & Compliance</span>
        <div className="flex items-center justify-between">
          <div className="flex items-start gap-3">
            <LockIcon className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
            <div>
              <span className="text-sm font-medium text-gray-700 block">Include NDA (Non-Disclosure Agreement)</span>
              <span className="text-xs text-gray-500 block mt-0.5">Protect confidential information</span>
            </div>
          </div>
          <ToggleSwitch id="nda-toggle" enabled={data.legalCompliance.includeNDA} onChange={(e) => onChange({ legalCompliance: { ...data.legalCompliance, includeNDA: e } })} />
        </div>
      </div>
    </div>
  );
};

// Step 2: Payments & Protections
const PaymentsAndProtections = ({ data, onChange, paymentMethods = [], onAddPaymentMethod }: { data: HireFormData; onChange: (data: Partial<HireFormData>) => void; paymentMethods: PaymentMethod[]; onAddPaymentMethod?: (method: PaymentMethod) => void }) => {
  const [showAddPaymentModal, setShowAddPaymentModal] = useState(false);
  const isHourly = data.projectDetails.contractType === "hourly";
  const firstMilestoneAmount = data.milestones[0]?.amount || 0;
  const totalAmount = data.milestones.reduce((sum, m) => sum + m.amount, 0);
  const currentFundAmount = data.paymentDetails.fundingOption === "first_milestone" ? firstMilestoneAmount : totalAmount;
  
  // Hourly calculations
  const weeklyHours = parseInt(data.hourlyTerms.weeklyHoursCap) || 20;
  const weeklyEstimate = data.hourlyTerms.hourlyRate * weeklyHours;

  const handleAddPaymentMethod = (method: PaymentMethod) => {
    onAddPaymentMethod?.(method);
    onChange({ paymentDetails: { ...data.paymentDetails, paymentMethodId: method.id } });
  };

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xl sm:text-2xl font-semibold text-gray-900 block">Payments & Protections</span>
        <span className="text-sm text-gray-500 mt-1 block">Set up payment terms and budget controls</span>
      </div>

      {isHourly ? (
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
          <span className="text-base font-semibold text-gray-900 block mb-4">Billing Terms</span>
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mb-4 flex items-start gap-2">
            <InfoIcon className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-blue-700">Hourly contracts are billed weekly. You will review and approve timesheets each week.</span>
          </div>
          <div className="space-y-4">
            <div>
              <span className="text-sm font-medium text-gray-700 block mb-1.5">Timesheet Policy</span>
              <div className="relative">
                <select value={data.paymentDetails.timesheetPolicy || "screenshots"} onChange={(e) => onChange({ paymentDetails: { ...data.paymentDetails, timesheetPolicy: e.target.value } })} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent cursor-pointer">
                  <option value="screenshots">Time tracker with screenshots</option>
                  <option value="manual">Manual time entry</option>
                  <option value="tasks">Task-based tracking</option>
                </select>
                <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-gray-700 block">Budget Alerts</span>
                <span className="text-xs text-gray-500">Get notified when spending reaches 80% of weekly cap</span>
              </div>
              <ToggleSwitch id="budget-alerts" enabled={data.paymentDetails.budgetAlerts || false} onChange={(e) => onChange({ paymentDetails: { ...data.paymentDetails, budgetAlerts: e } })} />
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-100 space-y-2">
            <div className="flex justify-between text-sm"><span className="text-gray-600">Weekly estimate</span><span className="text-gray-900">{weeklyHours} hrs × ${data.hourlyTerms.hourlyRate} = ${weeklyEstimate.toFixed(0)}</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-600">Platform fee (5%)</span><span className="text-red-500">-${(weeklyEstimate * 0.05).toFixed(2)}</span></div>
            <div className="flex justify-between font-medium pt-2 border-t border-gray-100"><span className="text-gray-900">Freelancer receives (weekly)</span><span className="text-gray-900">${(weeklyEstimate * 0.95).toFixed(2)}</span></div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
          <span className="text-base font-semibold text-gray-900 block mb-2">Escrow Funding</span>
          <span className="text-sm text-gray-500 block mb-4">Funds are held in escrow and released when you approve milestones</span>
          <div className="space-y-3">
            <span className="text-sm font-medium text-gray-700 block">What to fund now</span>
            <RadioButton name="funding" value="first_milestone" checked={data.paymentDetails.fundingOption === "first_milestone"} onChange={(v) => onChange({ paymentDetails: { ...data.paymentDetails, fundingOption: v as "first_milestone" | "full_project" } })}>
              First milestone only (${firstMilestoneAmount.toFixed(2)}) — Recommended
            </RadioButton>
            <RadioButton name="funding" value="full_project" checked={data.paymentDetails.fundingOption === "full_project"} onChange={(v) => onChange({ paymentDetails: { ...data.paymentDetails, fundingOption: v as "first_milestone" | "full_project" } })}>
              Full project amount (${totalAmount.toFixed(2)})
            </RadioButton>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-100 space-y-2">
            <div className="flex justify-between text-sm"><span className="text-gray-600">Amount to fund</span><span className="text-gray-900">${currentFundAmount.toFixed(2)}</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-600">Platform fee (10%)</span><span className="text-red-500">-${(currentFundAmount * 0.10).toFixed(2)}</span></div>
            <div className="flex justify-between font-medium pt-2 border-t border-gray-100"><span className="text-gray-900">Freelancer receives</span><span className="text-gray-900">${(currentFundAmount * 0.90).toFixed(2)}</span></div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
        <span className="text-base font-semibold text-gray-900 block mb-4">Payment Method</span>
        <div className="space-y-3">
          {paymentMethods.length > 0 ? paymentMethods.map((method) => (
            <div key={method.id} role="radio" aria-checked={data.paymentDetails.paymentMethodId === method.id} tabIndex={0} onClick={() => onChange({ paymentDetails: { ...data.paymentDetails, paymentMethodId: method.id } })} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onChange({ paymentDetails: { ...data.paymentDetails, paymentMethodId: method.id } }); } }} className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${data.paymentDetails.paymentMethodId === method.id ? "border-emerald-500 bg-emerald-50" : "border-gray-200 hover:border-gray-300"}`}>
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${data.paymentDetails.paymentMethodId === method.id ? "border-emerald-500 bg-emerald-500" : "border-gray-300"}`}>
                {data.paymentDetails.paymentMethodId === method.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
              </div>
              <CreditCardIcon className="w-5 h-5 text-gray-400" />
              <div className="flex-1">
                <span className="text-sm text-gray-900 block">•••• {method.last4}</span>
                <span className="text-xs text-gray-500 block">Expires {method.expiry}</span>
              </div>
              {method.isDefault && <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">Default</span>}
            </div>
          )) : <div className="text-sm text-gray-500 text-center py-4">No payment methods saved</div>}
          <div role="button" tabIndex={0} onClick={() => setShowAddPaymentModal(true)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setShowAddPaymentModal(true); } }} className="flex items-center justify-center gap-2 p-3 border border-dashed border-gray-300 rounded-lg text-sm text-gray-600 hover:border-gray-400 hover:text-gray-700 cursor-pointer transition-colors">
            <PlusIcon className="w-4 h-4" />Add New Payment Method
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
        <span className="text-base font-semibold text-gray-900 block mb-4">Policies & Compliance</span>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <InfoIcon className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
            <div>
              <span className="text-sm text-gray-700 block">Tax information: Depending on your location, VAT or sales tax may apply.</span>
              <span role="link" tabIndex={0} className="text-sm text-emerald-600 hover:text-emerald-700 cursor-pointer">Learn more about taxes</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <LockIcon className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
            <div>
              <span className="text-sm text-gray-700 block">Cancellation policy: Either party can end the contract with 7 days notice. Completed milestones are non-refundable.</span>
              <span role="link" tabIndex={0} className="text-sm text-emerald-600 hover:text-emerald-700 cursor-pointer">View full terms</span>
            </div>
          </div>
        </div>
      </div>

      <AddPaymentMethodModal isOpen={showAddPaymentModal} onClose={() => setShowAddPaymentModal(false)} onSave={handleAddPaymentMethod} />
    </div>
  );
};

// Step 3: Review & Send
const ReviewAndSend = ({ data, onChange, freelancer }: { data: HireFormData; onChange: (data: Partial<HireFormData>) => void; freelancer: Freelancer }) => {
  const isHourly = data.projectDetails.contractType === "hourly";
  const totalAmount = data.milestones.reduce((sum, m) => sum + m.amount, 0);
  const weeklyHours = parseInt(data.hourlyTerms.weeklyHoursCap) || 20;
  
  // Calculate total hourly estimate based on duration
  const getDurationWeeks = (duration: string): number => {
    switch (duration) {
      case "1-3 months": return 8;
      case "3-6 months": return 18;
      case "6-12 months": return 36;
      case "12+ months": return 52;
      default: return 8;
    }
  };
  const totalHourlyEstimate = data.hourlyTerms.hourlyRate * weeklyHours * getDurationWeeks(data.hourlyTerms.expectedDuration);

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xl sm:text-2xl font-semibold text-gray-900 block">Review & Send</span>
        <span className="text-sm text-gray-500 mt-1 block">Review the offer details and send to {freelancer.name.split(" ")[0]}</span>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
        <span className="text-base font-semibold text-gray-900 block mb-4">Offer Summary</span>
        <div className="grid grid-cols-2 gap-4 sm:gap-6">
          <div><span className="text-xs text-gray-500 block">Contract Type</span><span className="text-sm font-medium text-gray-900 block mt-0.5">{isHourly ? "Hourly" : "Fixed Price"}</span></div>
          <div><span className="text-xs text-gray-500 block">Total Amount</span><span className="text-sm font-medium text-gray-900 block mt-0.5">${isHourly ? totalHourlyEstimate.toFixed(0) : totalAmount.toFixed(2)}</span></div>
          <div><span className="text-xs text-gray-500 block">Start Date</span><span className="text-sm font-medium text-gray-900 block mt-0.5">{data.projectDetails.startDate === "asap" ? "ASAP" : data.projectDetails.selectedDate || "Not set"}</span></div>
          {isHourly ? (
            <div><span className="text-xs text-gray-500 block">Weekly Hours</span><span className="text-sm font-medium text-gray-900 block mt-0.5">{weeklyHours} hours</span></div>
          ) : (
            <div><span className="text-xs text-gray-500 block">Milestones</span><span className="text-sm font-medium text-gray-900 block mt-0.5">{data.milestones.length}</span></div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
        <span className="text-base font-semibold text-gray-900 block mb-4">Welcome Message</span>
        <textarea value={data.welcomeMessage} onChange={(e) => onChange({ welcomeMessage: e.target.value })} placeholder="Write a welcome message..." rows={4} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
        <span className="text-base font-semibold text-gray-900 block mb-1">Invite to Tools (Optional)</span>
        <span className="text-sm text-gray-500 block mb-4">Send automatic invitations when {freelancer.name.split(" ")[0]} accepts</span>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3"><SlackIcon className="w-5 h-5 text-gray-700" /><span className="text-sm text-gray-700">Send Slack invite on acceptance</span></div>
            <ToggleSwitch id="invite-slack" enabled={data.inviteToSlack} onChange={(e) => onChange({ inviteToSlack: e })} />
          </div>
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3"><FigmaIcon className="w-5 h-5 text-gray-700" /><span className="text-sm text-gray-700">Send Figma invite on acceptance</span></div>
            <ToggleSwitch id="invite-figma" enabled={data.inviteToFigma} onChange={(e) => onChange({ inviteToFigma: e })} />
          </div>
        </div>
      </div>
    </div>
  );
};

// Main ContractPage Component
export default function ContractPage({
  freelancer = { id: "1", name: "Bai Lu", title: "Senior React Developer", rating: 4.9, reviewCount: 127 },
  platformFeePercent = 10,
  onSubmit,
  onSaveDraft,
  onCancel,
  initialData,
  paymentMethods = [{ id: "1", last4: "1234", expiry: "12/25", isDefault: true }],
}: ContractPageProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [showSendOfferModal, setShowSendOfferModal] = useState(false);
  const [localPaymentMethods, setLocalPaymentMethods] = useState<PaymentMethod[]>(paymentMethods);

  const [formData, setFormData] = useState<HireFormData>({
    projectDetails: {
      title: initialData?.projectDetails?.title || "Build a React Web Application",
      contractType: initialData?.projectDetails?.contractType || "fixed",
      startDate: initialData?.projectDetails?.startDate || "asap",
      communicationCadence: initialData?.projectDetails?.communicationCadence || "weekly",
    },
    milestones: initialData?.milestones || [{ id: "milestone-1", title: "Project Setup & Architecture", amount: 300 }],
    hourlyTerms: initialData?.hourlyTerms || { hourlyRate: 50, weeklyHoursCap: "20", expectedDuration: "1-3 months", timezoneOverlap: "" },
    revisionsPolicy: initialData?.revisionsPolicy || "standard",
    toolAccess: initialData?.toolAccess || { github: false, figma: false, slack: false },
    legalCompliance: initialData?.legalCompliance || { includeNDA: false },
    paymentDetails: initialData?.paymentDetails || { fundingOption: "first_milestone", paymentMethodId: paymentMethods[0]?.id, timesheetPolicy: "screenshots", budgetAlerts: true },
    welcomeMessage: initialData?.welcomeMessage || "",
    inviteToSlack: initialData?.inviteToSlack || false,
    inviteToFigma: initialData?.inviteToFigma || false,
  });

  const steps = ["Scope & Terms", "Payments & Protections", "Review & Send"];

  const handleDataChange = useCallback((updates: Partial<HireFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  }, []);

  const handleNext = () => { if (currentStep < steps.length - 1) setCurrentStep((p) => p + 1); };
  const handleBack = () => { if (currentStep > 0) setCurrentStep((p) => p - 1); };

  const handleSendOfferClick = () => {
    setShowSendOfferModal(true);
  };

  const handleConfirmSendOffer = async () => {
    setShowSendOfferModal(false);
    if (onSubmit) {
      setIsSubmitting(true);
      try { await onSubmit(formData); } finally { setIsSubmitting(false); }
    }
  };

  const handleAddPaymentMethod = (method: PaymentMethod) => {
    setLocalPaymentMethods((prev) => [...prev, method]);
  };

  const handleSaveDraft = async () => { if (onSaveDraft) await onSaveDraft(formData); };
  const handleClose = () => { setIsModalOpen(false); onCancel?.(); };

  const fundNow = formData.paymentDetails.fundingOption === "first_milestone" ? formData.milestones[0]?.amount || 0 : formData.milestones.reduce((sum, m) => sum + m.amount, 0);

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-sm">
      <div className="min-h-screen flex items-start justify-center p-0 sm:p-4 md:p-8">
        {/* header */}
        <div className="bg-gray-50 w-full h-screen overflow-y-auto sm:max-w-5xl sm:rounded-xl shadow-2xl sm:my-4">

          {/* top */}
          <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 sticky top-0 z-10">
            <div className="flex items-center justify-between">
              <span className="text-lg sm:text-xl font-semibold text-gray-900">Hire {freelancer.name}</span>
              <div role="button" tabIndex={0} onClick={handleClose} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleClose(); } }} className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors">
                <CloseIcon className="w-5 h-5 text-gray-500" />
              </div>
            </div>
            <StepIndicator steps={steps} currentStep={currentStep} />
          </div>

          {/* content */}
          <div className="flex flex-col lg:flex-row">
            <div className="flex-1 p-4 sm:p-6">
              {currentStep === 0 && <ScopeAndTerms data={formData} onChange={handleDataChange} />}
              {currentStep === 1 && <PaymentsAndProtections data={formData} onChange={handleDataChange} paymentMethods={localPaymentMethods} onAddPaymentMethod={handleAddPaymentMethod} />}
              {currentStep === 2 && <ReviewAndSend data={formData} onChange={handleDataChange} freelancer={freelancer} />}
            </div>
            <div className="w-full lg:w-80 xl:w-96 bg-gray-50 border-t lg:border-t-0 lg:border-l border-gray-200 p-4  sm:p-6 ">
              <OfferSummary 
                freelancer={freelancer} 
                projectTitle={formData.projectDetails.title} 
                contractType={formData.projectDetails.contractType} 
                milestones={formData.milestones} 
                hourlyTerms={formData.hourlyTerms} 
                platformFeePercent={platformFeePercent} 
                fundNow={fundNow} />
            </div>
          </div>

          {/* bottom */}
          <div className="bg-white border-t border-gray-200 px-4 sm:px-6 py-4 rounded-b-xl sticky bottom-0 z-10">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 order-2 sm:order-1">
                {currentStep > 0 && (
                  <div role="button" tabIndex={0} onClick={handleBack} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleBack(); } }} className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors">
                    <ArrowLeftIcon className="w-4 h-4" />Back
                  </div>
                )}
                <div role="button" tabIndex={0} onClick={handleClose} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleClose(); } }} className="px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors">Cancel</div>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto order-1 sm:order-2">
                <div role="button" tabIndex={0} onClick={handleSaveDraft} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleSaveDraft(); } }} className="flex-1 sm:flex-none px-4 py-2.5 text-sm font-medium text-gray-700 border border-gray-300 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors text-center">Save Draft</div>
                {currentStep < steps.length - 1 ? (
                  <div role="button" tabIndex={0} onClick={handleNext} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleNext(); } }} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg cursor-pointer transition-colors">
                    Next<ArrowRightIcon className="w-4 h-4" />
                  </div>
                ) : (
                  <div role="button" tabIndex={0} onClick={handleSendOfferClick} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleSendOfferClick(); } }} className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-white rounded-lg cursor-pointer transition-colors ${isSubmitting ? "bg-emerald-400 cursor-not-allowed" : "bg-emerald-500 hover:bg-emerald-600"}`}>
                    <MailIcon className="w-4 h-4" />{isSubmitting ? "Sending..." : "Send Offer"}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <SendOfferModal isOpen={showSendOfferModal} onClose={() => setShowSendOfferModal(false)} onConfirm={handleConfirmSendOffer} freelancer={freelancer} data={formData} />
    </div>
  );
}