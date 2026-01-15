'use client';
import FreelancerHomepagePage from "@/app/components/styles/freelancer_styles/homepage/page";
import FreelancerFooter from "@/app/components/styles/global_styles/freelancer/footer";
import FreelancerNavHeader from "@/app/components/styles/global_styles/freelancer/header";


const FreelancerHomePage: React.FC = () => {
  return (
    <div className="w-full h-screen bg-[#F9FAFB]">
        <FreelancerNavHeader />
        <FreelancerHomepagePage/>
        <FreelancerFooter/>
    </div>
  )
}
export default FreelancerHomePage;