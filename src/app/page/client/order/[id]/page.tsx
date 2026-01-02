// app/orders/[id]/page.tsx
"use client";
import { useState, useEffect } from "react";
import SubHeaderOrderId from "@/app/components/styles/client_styles/order/id/subhead_order_id";
import RightOrderId from "@/app/components/styles/client_styles/order/id/right_order_id";
import LeftOrderId from "@/app/components/styles/client_styles/order/id/left_order_id";

const OrdersIdPage: React.FC = () => {
  const [orderData, setOrderData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);

  const mockOrdersData = [
    {
      orderId: "2.5",
      projectTitle: "Full-Stack Web Application - E-Learning Platform",
      teamMembers: [
        { id: "user_002", name: "James Foster", rating: 4.9, reviewCount: 89, budget: 8500, progress: 70, isVerified: true },
        { id: "user_003", name: "Rachel Kim", rating: 4.8, reviewCount: 56, budget: 5000, progress: 65, isVerified: false },
        { id: "user_004", name: "David Chen", rating: 5.0, reviewCount: 43, budget: 5500, progress: 80, isVerified: true },
      ],
      status: "Active" as const,
      deadline: "Dec 1, 2024",
      nda: true,
      orderOverview: { type: "Fixed Price", startDate: "Oct 20, 2024", dueDate: "Dec 1, 2024", relatedJobTitle: "View job" },
      paymentSummary: { inEscrow: 14000, paymentsReleased: 6000, platformFee: 1000, platformFeePercentage: 5, totalContract: 20000 },
      quickLinks: [
        { id: "1", label: "View original job", icon: "job" as const },
        { id: "2", label: "James Foster's profile", icon: "profile" as const },
      ],
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 500));
      const data = mockOrdersData[0];
      setOrderData(data);
      setSelectedMemberId(data.teamMembers[0].id); // Default to first member
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;
  if (!orderData || !selectedMemberId) return <div>Order not found</div>;

  return (
    <div className="w-full min-h-screen bg-[#F9FAFB]">
      <SubHeaderOrderId
        orderId={orderData.orderId}
        projectTitle={orderData.projectTitle}
        teamMembers={orderData.teamMembers}
        status={orderData.status}
        deadline={orderData.deadline}
        nda={orderData.nda}
        selectedMemberId={selectedMemberId}
        onMemberSelect={setSelectedMemberId}
        onBackClick={() => console.log("Back")}
      />

      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <LeftOrderId selectedMemberId={selectedMemberId} />
          </div>
          <div className="lg:col-span-1">
            <RightOrderId
              teamMembers={orderData.teamMembers}
              orderOverview={orderData.orderOverview}
              paymentSummary={orderData.paymentSummary}
              quickLinks={orderData.quickLinks}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersIdPage;