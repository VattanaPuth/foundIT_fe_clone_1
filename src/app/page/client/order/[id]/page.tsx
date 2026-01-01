"use client";
import { useState, useEffect } from "react";
import SubHeaderOrderId from "@/app/components/styles/client_styles/order/id/subhead_order_id";
import RightOrderId from "@/app/components/styles/client_styles/order/id/right_order_id";
import LeftOrderId, { sampleFilesData } from "@/app/components/styles/client_styles/order/id/left_order_id";

const OrdersIdPage: React.FC = () => {
  const [orderData, setOrderData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Mock data array - simulate data from backend
  const mockOrdersData = [
    // Single User Order
    {
      orderId: "2",
      projectTitle: "Mobile App Development - iOS & Android",
      teamMembers: [
        {
          id: "user_001",
          name: "Bai Lu",
          avatar: "",
          rating: 5.0,
          reviewCount: 62,
          budget: 15000,
          progress: 45,
          verified: true,
        },
      ],
      status: "Active" as const,
      activeWeek: "Week of Nov 4-10",
      timezone: "CET (UTC+1)",
      // Right panel data
      orderOverview: {
        startDate: "2024-11-04",
        dueDate: "2024-12-15",
        relatedTo: "View job",
      },
      paymentSummary: {
        inEscrow: 10000,
        paymentsReleased: 5000,
        platformFee: 750,
        platformFeePercentage: 5,
        totalContract: 15000,
      },
      quickLinks: [
        {
          id: "1",
          label: "View original job",
          icon: "briefcase" as const,
          onClick: () => console.log("View original job clicked"),
        },
        {
          id: "2",
          label: "Bai Lu's profile",
          icon: "user" as const,
          onClick: () => console.log("Profile clicked"),
        },
      ],
      fixedPrice: 15000,
    },
    // Multiple Users Order
    {
      orderId: "2.5",
      projectTitle: "Full-Stack Web Application - E-Learning Platform",
      teamMembers: [
        {
          id: "user_002",
          name: "James Foste",
          avatar: "",
          rating: 4.9,
          reviewCount: 89,
          budget: 8500,
          progress: 70,
          verified: true,
        },
        {
          id: "user_003",
          name: "Rachel Kim",
          avatar: "",
          rating: 4.8,
          reviewCount: 56,
          budget: 5000,
          progress: 65,
          verified: false,
        },
        {
          id: "user_004",
          name: "David Chen",
          avatar: "",
          rating: 5.0,
          reviewCount: 43,
          budget: 5500,
          progress: 80,
          verified: true,
        },
      ],
      status: "Active" as const,
      dueDate: "Dec 1, 2024",
      timezone: "NDA",
      // Right panel data
      orderOverview: {
        startDate: "2024-10-20",
        dueDate: "2024-12-01",
        relatedTo: "View job",
      },
      paymentSummary: {
        inEscrow: 14000,
        paymentsReleased: 6000,
        platformFee: 1000,
        platformFeePercentage: 5,
        totalContract: 20000,
      },
      quickLinks: [
        {
          id: "1",
          label: "View original job",
          icon: "briefcase" as const,
          onClick: () => console.log("View original job clicked"),
        },
        {
          id: "2",
          label: "James Foste's profile",
          icon: "user" as const,
          onClick: () => console.log("Profile clicked"),
        },
      ],
      fixedPrice: 20000,
    },
  ];

  useEffect(() => {
    // Simulate fetching data
    const fetchData = async () => {
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // This simulates getting data from your backend/API
      const responseFromBackend = mockOrdersData[1]; // Change to [0] or [1] to test
      
      setOrderData(responseFromBackend);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen bg-[#F9FAFB] flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!orderData) {
    return (
      <div className="w-full h-screen bg-[#F9FAFB] flex items-center justify-center">
        <div className="text-gray-600">Order not found</div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#F9FAFB]">
      {/* Header */}
      <SubHeaderOrderId 
        orderId={orderData.orderId}
        projectTitle={orderData.projectTitle}
        teamMembers={orderData.teamMembers}
        status={orderData.status}
        dueDate={orderData.dueDate}
        timezone={orderData.timezone}
        activeWeek={orderData.activeWeek}
        onBackClick={() => console.log("Back clicked")}
        onMessageClick={() => console.log("Message clicked")}
        onReportIssueClick={() => console.log("Report issue clicked")}
      />

      {/* Main Content Area */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left/Main Content - Takes 2 columns on large screens */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="text-gray-600">
                    <LeftOrderId data={sampleFilesData} />
                </div>
              </div>
            </div>

            {/* Right Sidebar - Takes 1 column on large screens */}
            <div className="lg:col-span-1">
              <RightOrderId 
                teamMembers={orderData.teamMembers}
                orderOverview={orderData.orderOverview}
                paymentSummary={orderData.paymentSummary}
                quickLinks={orderData.quickLinks}
                fixedPrice={orderData.fixedPrice}
                onDownloadInvoice={() => console.log("Download invoice clicked")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersIdPage;