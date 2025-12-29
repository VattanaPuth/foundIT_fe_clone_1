'use client';
import ClientNavHeader from "@/app/components/styles/global_styles/client/header";
import OrderGigs from "@/app/components/styles/client_styles/order/order_gigs";

const OrdersPage: React.FC = () => {
  return (
    <div className="w-full h-screen bg-[#F9FAFB]">
        <ClientNavHeader />
        <OrderGigs />
    </div>
  )
}
export default OrdersPage;