import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import QuickScan from "./pages/QuickScan.tsx";
import Home from "./pages/Home.tsx";
import SOSActivated from "./pages/SOSActivated.tsx";
import Steps from "./pages/Steps.tsx";
import Checkup from "./pages/Checkup.tsx";
import EmergencyDial from "./pages/EmergencyDial.tsx";
import FirstAidGuide from "./pages/FirstAidGuide.tsx";
import MedicalKit from "./pages/MedicalKit.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="mx-auto max-w-md min-h-screen bg-background shadow-sm">
          <Routes>
            <Route path="/" element={<QuickScan />} />
            <Route path="/home" element={<Home />} />
            <Route path="/sos" element={<SOSActivated />} />
            <Route path="/emergency" element={<EmergencyDial />} />
            <Route path="/steps/:slug" element={<Steps />} />
            <Route path="/checkup" element={<Checkup />} />
            <Route path="/first-aid-guide" element={<FirstAidGuide />} />
            <Route path="/medical-kit" element={<MedicalKit />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
