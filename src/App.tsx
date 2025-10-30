import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import UploadPortfolio from "./pages/uploadPortflio";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import PortfolioItems from "./pages/dashboard/PortfolioItems";
import ProtectedRoute from "./components/ProtectedRoute";
import WebPortfolioIndex from "./pages/WebPortfolioIndex";
import DevDashboard from "./pages/dashboard/web/DashboardWeb";
import UploadDevPortfolio from "./pages/dashboard/web/UploadDevPortfolio";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Main portfolio routes */}
            <Route path="/" element={<Index />} />
            <Route path="/portfolio" element={<Index />} />
            <Route path="/about" element={<Index />} />
            <Route path="/contact" element={<Index />} />
            <Route path="/webapps" element={<WebPortfolioIndex />} />

            {/* for dev portfolio  */}
            <Route path="/dev-portfolio" element={<WebPortfolioIndex />} />
            <Route path="/dev-about" element={<WebPortfolioIndex />} />
            <Route path="/dev-contact" element={<WebPortfolioIndex />} />

            {/* Auth routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected Dashboard Routes */}
            <Route element={<ProtectedRoute />}>
              <Route element={<DashboardLayout />}>
                <Route path="/dashboard" element={<DashboardHome />} />
                <Route path="/dashboard/portfolio" element={<PortfolioItems />} />
                <Route path="/dashboard/upload" element={<UploadPortfolio />} />
                <Route path="/dashboard/dev" element={<DevDashboard />} />
                <Route path="/dashboard/upload/dev" element={<UploadDevPortfolio />} />
              </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;