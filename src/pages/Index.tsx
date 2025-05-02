
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Onboarding from '../components/sections/Onboarding';
import PlanCustomization from '../components/sections/PlanCustomization';
import Dashboard from '../components/sections/Dashboard';
import SupportTransparency from '../components/sections/SupportTransparency';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-10">
        <Onboarding />
        <PlanCustomization />
        <Dashboard />
        <SupportTransparency />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
