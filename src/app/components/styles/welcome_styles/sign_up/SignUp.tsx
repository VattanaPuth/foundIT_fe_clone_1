"use client";
import React, { useState } from 'react';

export default function SignUp() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    // Add your Google OAuth integration here
    console.log('Google Sign Up clicked');
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleAppleSignUp = async () => {
    setIsLoading(true);
    // Add your Apple OAuth integration here
    console.log('Apple Sign Up clicked');
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    if (!agreeTerms) {
      alert('Please agree to Terms & Privacy');
      return;
    }
    
    setIsLoading(true);
    // Add your email/password registration here
    console.log('Email Sign Up:', { fullName, email, password, rememberMe, agreeTerms });
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleSignInRedirect = () => {
    // Add your navigation to sign in page here
    console.log('Navigate to sign in page');
    window.location.href = '/sign-in'; // Replace with your actual route
  };

  return (
    <div className='w-full h-screen'>
      <div className='flex justify-center w-full h-9 mt-12 mb-8'>
        <img src="/favicon.ico" alt="logo" />
      </div>

      <div className="w-7xl mx-auto h-[85%] bg-gray-50 flex flex-col lg:flex-row">

        {/* Left Section - Form */}
        <div className="w-full h-screen lg:w-1/2 flex items-center justify-center p-6 sm:p-8 lg:p-12 bg-white">
          <div className="w-full -mt-40">

            {/* Welcome Text */}
            <div className="mb-8">
              <div className="text-3xl sm:text-3xl font-bold text-gray-900 mb-2">Welcome back</div>
              <div className="text-sm sm:text-base text-gray-600">Sign in to continue</div>
            </div>

            {/* Social Sign Up Buttons */}
            <div className="space-y-3 mb-6">
              <div
                onClick={handleGoogleSignUp}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="text-sm sm:text-base text-gray-700 font-medium">Continue with Google</span>
              </div>

              <div
                onClick={handleAppleSignUp}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
                <span className="text-sm sm:text-base text-gray-700 font-medium">Continue with Apple</span>
              </div>
            </div>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">or use email</span>
              </div>
            </div>

            {/* Email/Password Form */}
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-700 mb-2">Full name</div>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your name"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                />
              </div>

              <div>
                <div className="text-sm text-gray-700 mb-2">Email</div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                />
              </div>

              <div>
                <div className="text-sm text-gray-700 mb-2">Password</div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base pr-12"
                  />
                  <div
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-700 mb-2">Confirm password</div>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter your password"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base pr-12"
                  />
                  <div
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>

              {/* Remember Me & Terms */}
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 cursor-pointer"
                  />
                  <div className="ml-2 text-sm text-gray-700 cursor-pointer" onClick={() => setRememberMe(!rememberMe)}>
                    Remember me
                  </div>
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="w-4 h-4 mt-0.5 text-purple-600 border-gray-300 rounded focus:ring-purple-500 cursor-pointer"
                  />
                  <div className="ml-2 text-sm text-gray-700">
                    I agree to{' '}
                    <span className="text-purple-600 hover:text-purple-700 cursor-pointer">Terms</span>
                    {' '}&{' '}
                    <span className="text-purple-600 hover:text-purple-700 cursor-pointer">Privacy</span>
                  </div>
                </div>
              </div>

              {/* Sign Up Button */}
              <div
                onClick={!isLoading ? handleEmailSignUp as any : undefined}
                className={`w-full bg-[#D92AD0] text-white py-3 rounded-lg transition-all text-center font-medium text-sm sm:text-base ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#C01FB8] cursor-pointer'
                }`}
              >
                {isLoading ? 'Signing up...' : 'Sign in'}
              </div>
            </div>

            {/* Sign In Link */}
            <div className="mt-6 text-center text-sm">
              <span className="text-gray-600">New here?</span>
              <span
                onClick={handleSignInRedirect}
                className="text-purple-600 hover:text-purple-700 cursor-pointer ml-1 font-medium"
              >
                Create account
              </span>
            </div>
          </div>
        </div>

        <div className='w-[1.1px] h-[90%] my-auto bg-gray-200'></div>

        {/* Right Section - Illustration */}
        <div className="w-full lg:w-1/2 bg-white flex items-center justify-center min-h-[300px]">
          <div className="w-full">
            <div className='flex w-full h-full items-center justify-center'>
              <img src="/landing.png" alt="logo" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}