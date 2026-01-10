import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface FormData {
  email: string;
  otp: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  email?: string;
  otp?: string;
  password?: string;
  confirmPassword?: string;
}

type Step = 'email' | 'otp' | 'reset';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8085";

export default function ForgotPassword() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<Step>('email');
  const [formData, setFormData] = useState<FormData>({ 
    email: '', 
    otp: '',
    password: '', 
    confirmPassword: '' 
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [canResendOtp, setCanResendOtp] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);

  // Timer effect for OTP resend
  React.useEffect(() => {
    if (currentStep === 'otp' && resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else if (resendTimer === 0) {
      setCanResendOtp(true);
    }
  }, [currentStep, resendTimer]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 8;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleEmailSubmit = async () => {
    const newErrors: FormErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/register/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email }),
      });

      if (response.ok) {
        // Move to OTP verification step
        setCurrentStep('otp');
        setResendTimer(60);
        setCanResendOtp(false);
      } else {
        const data = await response.json().catch(() => ({ message: 'Something went wrong' }));
        setErrors({ email: data.message || 'Email not found' });
      }
    } catch (error) {
      setErrors({ email: 'Network error. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpVerify = () => {
    const newErrors: FormErrors = {};
    
    if (!formData.otp) {
      newErrors.otp = 'OTP is required';
    } else if (formData.otp.length !== 6) {
      newErrors.otp = 'OTP must be 6 digits';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Move to password reset step
    setCurrentStep('reset');
  };

  const handleResendOtp = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/register/resend-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email }),
      });

      if (response.ok) {
        setResendTimer(60);
        setCanResendOtp(false);
        setErrors({});
      } else {
        const data = await response.json().catch(() => ({ message: 'Failed to resend OTP' }));
        setErrors({ otp: data.message || 'Failed to resend OTP' });
      }
    } catch (error) {
      setErrors({ otp: 'Network error. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    const newErrors: FormErrors = {};
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/register/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: formData.email,
          otp: formData.otp,
          newPassword: formData.password 
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        const data = await response.json().catch(() => ({ message: 'Something went wrong' }));
        setErrors({ password: data.message || 'Invalid OTP or password' });
      }
    } catch (error) {
      setErrors({ password: 'Network error. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      if (currentStep === 'email') {
        handleEmailSubmit();
      } else if (currentStep === 'otp') {
        handleOtpVerify();
      } else {
        handlePasswordReset();
      }
    }
  };

  const handleBackToSignIn = () => {
    router.push('/page/(welcome)/sign_in');
  };

  return (
    <div className='w-full h-screen'>
      {/* Logo */}
      <div className='flex justify-center w-full h-9 mt-12 mb-8'>
        <img src="/favicon.ico" alt="logo" />
      </div>

      <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 -mt-36">
        <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xs overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Left Section - Form */}
            <div className="w-full lg:w-1/2 p-6 sm:p-8 md:p-12 lg:p-16">

              {/* heading */}
              <div className="mb-3 text-2xl sm:text-4xl font-semibold text-gray-900">
                Reset your password
              </div>

              {/* Description */}
              <div className="mb-6 text-sm text-gray-600">
                {currentStep === 'email' 
                  ? "Enter your email and we'll send you an OTP to reset your password."
                  : currentStep === 'otp'
                  ? `Enter the 6-digit OTP sent to ${formData.email}`
                  : "Enter your new password below."}
              </div>

              {isSuccess ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <div className="text-green-800 text-sm mb-4">
                    Your password has been successfully reset!
                  </div>
                  <div
                    onClick={handleBackToSignIn}
                    className="w-full bg-[#D92AD0] text-white py-3 px-4 rounded-2xl font-medium text-center cursor-pointer transition-all hover:bg-pink-300"
                  >
                    Back to sign in
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Email Input - Always visible */}
                  <div>
                    <div className="text-lg text-gray-500 font-medium mb-2 mt-14">
                      Email
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        placeholder="your@example.com"
                        disabled={currentStep !== 'email'}
                        className={`w-full pl-10 pr-4 py-3 border ${
                          errors.email ? 'border-red-300' : 'border-gray-300'
                        } rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all ${
                          currentStep !== 'email' ? 'bg-gray-100 cursor-not-allowed' : ''
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <div className="mt-1 text-sm text-red-600">
                        {errors.email}
                      </div>
                    )}
                  </div>

                  {/* OTP Input - Show after email submission */}
                  {currentStep === 'otp' && (
                    <div>
                      <div className="text-lg text-gray-500 font-medium mb-2">
                        OTP Code
                      </div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                          </svg>
                        </div>
                        <input
                          type="text"
                          name="otp"
                          value={formData.otp}
                          onChange={handleInputChange}
                          onKeyPress={handleKeyPress}
                          placeholder="Enter 6-digit OTP"
                          maxLength={6}
                          className={`w-full pl-10 pr-4 py-3 border ${
                            errors.otp ? 'border-red-300' : 'border-gray-300'
                          } rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all`}
                        />
                      </div>
                      {errors.otp && (
                        <div className="mt-1 text-sm text-red-600">
                          {errors.otp}
                        </div>
                      )}
                      <div className="mt-2 flex items-center justify-between text-sm">
                        <span className="text-gray-600">
                          {canResendOtp ? 'Didn\'t receive OTP?' : `Resend in ${resendTimer}s`}
                        </span>
                        {canResendOtp && (
                          <span
                            onClick={handleResendOtp}
                            className="text-[#D92AD0] hover:text-pink-600 cursor-pointer font-medium"
                          >
                            Resend OTP
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Password Fields - Show after OTP verification */}
                  {currentStep === 'reset' && (
                    <>
                      {/* Password Input */}
                      <div>
                        <div className="text-lg text-gray-500 font-medium mb-2">
                          Password
                        </div>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                          </div>
                          <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}
                            placeholder="Enter your password"
                            className={`w-full pl-10 pr-12 py-3 border ${
                              errors.password ? 'border-red-300' : 'border-gray-300'
                            } rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all`}
                          />
                          <div 
                            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              {showPassword ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                              )}
                            </svg>
                          </div>
                        </div>
                        {errors.password && (
                          <div className="mt-1 text-sm text-red-600">
                            {errors.password}
                          </div>
                        )}
                      </div>

                      {/* Confirm Password Input */}
                      <div>
                        <div className="text-lg text-gray-500 font-medium mb-2">
                          Confirm password
                        </div>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                          </div>
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}
                            placeholder="Re-enter your password"
                            className={`w-full pl-10 pr-12 py-3 border ${
                              errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                            } rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all`}
                          />
                          <div 
                            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              {showConfirmPassword ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                              )}
                            </svg>
                          </div>
                        </div>
                        {errors.confirmPassword && (
                          <div className="mt-1 text-sm text-red-600">
                            {errors.confirmPassword}
                          </div>
                        )}
                      </div>
                    </>
                  )}

                  {/* Submit Button */}
                  <div
                    onClick={!isLoading ? (currentStep === 'email' ? handleEmailSubmit : currentStep === 'otp' ? handleOtpVerify : handlePasswordReset) : undefined}
                    className={`w-full bg-[#D92AD0] text-white py-3 px-4 rounded-2xl font-medium text-center cursor-pointer transition-all ${
                      isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-pink-300'
                    }`}
                  >
                    {isLoading ? 'Processing...' : currentStep === 'email' ? 'Send OTP' : currentStep === 'otp' ? 'Verify OTP' : 'Reset password'}
                  </div>
                </div>
              )}

              {/* Back to Sign In */}
              {!isSuccess && (
                <div className="mt-6 text-center">
                  <span
                    onClick={handleBackToSignIn}
                    className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer transition-colors"
                  >
                    Back to sign in
                  </span>
                </div>
              )}

              
            </div>

            {/* Right Section - Features */}
            <div className="w-full lg:w-1/2 bg-gray-50 p-6 sm:p-8 md:p-12 lg:p-16 flex items-center">
              <div className="w-full space-y-12">
                <div>
                  <p className='text-3xl font-bold'>Secure & simple password reset</p>
                </div>
                {/* Feature 1 */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#D92AD0] rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-lg font-semibold text-gray-900 mb-1">
                      Single-use secure links
                    </div>
                    <div className="text-sm text-gray-600">
                      Each reset link works only once and expires after 15 minutes
                    </div>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#D92AD0] rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-lg font-semibold text-gray-900 mb-1">
                      Your data is protected
                    </div>
                    <div className="text-sm text-gray-600">
                      We never reveal if an email exists in our system
                    </div>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#D92AD0] rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-lg font-semibold text-gray-900 mb-1">
                      Quick & easy
                    </div>
                    <div className="text-sm text-gray-600">
                      Back in your account in under a minute
                    </div>
                  </div>
                </div>

                {/* Support Link */}
                <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-600">
                  Need help? Contact{' '}
                  <a href="mailto:support@marketplace.com" className="text-pink-500 hover:text-pink-600 transition-colors">
                    support@marketplace.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}