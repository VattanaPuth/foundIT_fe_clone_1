import React from 'react';
import NavHeader from './components/styles/landing_styles/nav_header';
import Search from './components/styles/landing_styles/search_header';
import HeroSection from './components/styles/landing_styles/hero_sec';
import OneLineContent from './components/styles/landing_styles/aline_con';
import ChooseYourPlat from './components/styles/landing_styles/choose_platform';
import PopularCategories from './components/styles/landing_styles/pop_categories';
import CommunityPage from './components/styles/landing_styles/community_learn';
import TrustByCreator from './components/styles/landing_styles/trust_by_creator';
import ChoosePlan from './components/styles/landing_styles/choose_plan';
import ActionTrio from './components/styles/landing_styles/trio_action';
import Footer from './components/styles/landing_styles/footer';
import FeaturedServices from './components/styles/landing_styles/feature_service';
import ReadyToUseProducts from './components/styles/landing_styles/ready_to_use_product';
import Inspiration from './components/styles/landing_styles/inspiration';
// import HireTalent from './components/styles/landing_styles/hire_talent';
export default function LandingPage() {
    return (
        <div className="w-full overflow-hidden">
            <NavHeader/>
            <Search/>
            <HeroSection/>
            <OneLineContent/>
            <ChooseYourPlat/>
            <PopularCategories/>
            <FeaturedServices />
            <ReadyToUseProducts/>
            <Inspiration/>
            {/* <HireTalent/> */}
            <CommunityPage/>
            <TrustByCreator/>
            <ChoosePlan/>
            <ActionTrio/>
            <Footer/>
        </div>
    )
}