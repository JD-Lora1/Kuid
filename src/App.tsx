import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React from 'react';

// Auth context
import { AuthProvider } from "./contexts/AuthContext";
import { AuthGuard, NewUserGuard, OnboardingGuard } from "./components/AuthGuard";

// Public pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

// Dashboard pages
import Dashboard from "./pages/dashboard/Dashboard";
import Profile from "./pages/dashboard/Profile";
import Notifications from "./pages/dashboard/Notifications";
import ConnectedDevices from "./pages/dashboard/ConnectedDevices";
import InsuranceSettings from "./pages/dashboard/InsuranceSettings";

// Existing content pages
import RealStories from "./pages/RealStories";
import Rewards from "./pages/Rewards";

// Onboarding pages
import ConfigureInsurance from "./pages/onboarding/ConfigureInsurance";
import SelectModules from "./pages/onboarding/SelectModules";
import ConnectDevices from "./pages/onboarding/ConnectDevices";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            <TooltipProvider>
              <Routes>
                {/* Public routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Navigate to="/login" replace />} />
                
                {/* Protected routes for new users (onboarding) */}
                <Route path="/onboarding/configure-insurance" element={
                  <OnboardingGuard>
                    <ConfigureInsurance />
                  </OnboardingGuard>
                } />
                <Route path="/onboarding/select-modules" element={
                  <OnboardingGuard>
                    <SelectModules />
                  </OnboardingGuard>
                } />
                <Route path="/onboarding/connect-devices" element={
                  <OnboardingGuard>
                    <ConnectDevices />
                  </OnboardingGuard>
                } />
                
                {/* Protected routes for authenticated users */}
                <Route path="/dashboard" element={
                  <NewUserGuard>
                    <Dashboard />
                  </NewUserGuard>
                } />
                <Route path="/profile" element={
                  <AuthGuard>
                    <Profile />
                  </AuthGuard>
                } />
                <Route path="/notifications" element={
                  <AuthGuard>
                    <Notifications />
                  </AuthGuard>
                } />
                <Route path="/connected-devices" element={
                  <AuthGuard>
                    <ConnectedDevices />
                  </AuthGuard>
                } />
                <Route path="/insurance-settings" element={
                  <AuthGuard>
                    <InsuranceSettings />
                  </AuthGuard>
                } />
                <Route path="/rewards" element={
                  <AuthGuard>
                    <Rewards />
                  </AuthGuard>
                } />
                <Route path="/real-stories" element={
                  <AuthGuard>
                    <RealStories />
                  </AuthGuard>
                } />
                
                {/* Fallback route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Toaster />
              <Sonner />
            </TooltipProvider>
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
