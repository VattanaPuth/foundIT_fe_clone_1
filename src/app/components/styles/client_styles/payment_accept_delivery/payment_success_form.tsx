import React, { useState } from "react";
import { Check, Upload } from "lucide-react";

export default function PaymentSuccessForm() {
  const [showRequirement] = useState(true);
  const [formData, setFormData] = useState({
    question1: "",
    question2: "",
    question3: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const answeredCount = Object.values(formData).filter(
    (v) => v.trim() !== "",
  ).length;

  return (
    <div className="min-h-screen w-full bg-gray-50 p-4 flex items-center justify-center">
      {showRequirement && (
        <div className="w-full max-w-4xl h-screen overflow-y-auto bg-white rounded-2xl shadow-sm">
          {/* Success Header */}
          <div className="text-center pt-12 pb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
              <Check className="w-8 h-8 text-emerald-500" strokeWidth={3} />
            </div>
            <h1 className="text-xl font-semibold text-gray-800 mb-2">
              Payment Successful!
            </h1>
            <p className="text-gray-600 text-sm">
              Help Alex Rivera get started on your project
            </p>
          </div>

          {/* Service Section */}
          <div className="px-6 py-8">
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="text-xs text-gray-500 mb-1">Service</div>
              <div className="text-gray-900 font-medium">
                Complete Brand Identity Design
              </div>
            </div>

            {/* Setup Progress */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Setup Progress
                </span>
                <span className="text-sm text-gray-500">
                  {answeredCount} of 3 answered
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-emerald-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(answeredCount / 3) * 100}%` }}
                />
              </div>
            </div>

            {/* Question 1 */}
            <div className="mb-6">
              <div className="flex items-start gap-2 mb-2">
                <span className="text-sm text-gray-700">1</span>
                <div className="flex-1">
                  <span className="text-sm text-gray-700">
                    What is your brand name and what does your company do?
                  </span>
                  <span className="ml-2 inline-block px-2 py-0.5 bg-red-500 text-white text-xs rounded">
                    Required
                  </span>
                </div>
              </div>
              <textarea
                value={formData.question1}
                onChange={(e) => handleInputChange("question1", e.target.value)}
                placeholder="Type your answer here..."
                className="w-full p-3 border border-gray-200 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-gray-50"
                rows={4}
              />
            </div>

            {/* Question 2 */}
            <div className="mb-6">
              <div className="flex items-start gap-2 mb-2">
                <span className="text-sm text-gray-700">2</span>
                <div className="flex-1">
                  <span className="text-sm text-gray-700">
                    Who is your target audience?
                  </span>
                  <span className="ml-2 inline-block px-2 py-0.5 bg-red-500 text-white text-xs rounded">
                    Required
                  </span>
                </div>
              </div>
              <textarea
                value={formData.question2}
                onChange={(e) => handleInputChange("question2", e.target.value)}
                placeholder="Type your answer here..."
                className="w-full p-3 border border-gray-200 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-gray-50"
                rows={4}
              />
            </div>

            {/* Question 3 */}
            <div className="mb-6">
              <div className="flex items-start gap-2 mb-2">
                <span className="text-sm text-gray-700">3</span>
                <span className="text-sm text-gray-700">
                  Do you have any color preferences or brand guidelines?
                </span>
              </div>
              <textarea
                value={formData.question3}
                onChange={(e) => handleInputChange("question3", e.target.value)}
                placeholder="Type your answer here..."
                className="w-full p-3 border border-gray-200 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-gray-50"
                rows={4}
              />
            </div>

            {/* Attachments */}
            <div className="mb-6">
              <div className="text-sm text-gray-700 mb-2">
                Attachments (Optional)
                <span className="text-gray-400 ml-2">
                  Brand assets, references, etc.
                </span>
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-emerald-400 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <div className="text-sm">
                  <span className="text-emerald-500 font-medium">
                    Click to upload
                  </span>
                  <span className="text-gray-500"> or drag and drop</span>
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  PNG, JPG, PDF, DOC up to 10MB · Max 5 files
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex text-center">
              <p className="w-full bg-emerald-400 hover:bg-emerald-500 text-white font-medium py-3 rounded-lg transition-colors">
                Submit Requirements
              </p>
            </div>

            {/* Footer Note */}
            <p className="text-xs text-gray-500 text-center mt-4">
              Your order countdown begins after submission. You can always add
              more details in the Order Room.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
