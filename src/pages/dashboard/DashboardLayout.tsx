// src/layouts/DashboardLayout.tsx
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Image, 
  Upload, 
  LogOut, 
  ExternalLink, 
  Terminal,
  Plus,
  X,
  ChevronUp,
  Menu,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showUploadDrawer, setShowUploadDrawer] = useState(false);
  const [isMobileNavVisible, setIsMobileNavVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const isActive = (path: string) => location.pathname === path;

  // Navigation Config
  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Overview', group: 'System' },
    { path: '/dashboard/portfolio', icon: Image, label: 'Design Lab', group: 'Assets' },
    { path: '/dashboard/dev', icon: Terminal, label: 'Dev Console', group: 'Assets' },
  ];

  const uploadItems = [
    { label: 'Graphic Design', type: 'design', icon: Image, desc: 'Logos, Branding, Art' },
    { label: 'Development', type: 'dev', icon: Terminal, desc: 'Websites, Apps, APIs' }
  ];

  return (
    <div className="flex h-screen bg-[#050505]/90  text-white overflow-hidden font-sans">
      
      {/* 1. DESKTOP ARCHITECTURAL SIDEBAR */}
      <aside className="hidden md:flex flex-col w-72 bg-[#0A0A0A] border-r border-white/5 relative z-20">
        <div className="p-8">
          <Link to="/dashboard" className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-black font-black group-hover:rotate-12 transition-transform">D</div>
            <span className="text-sm font-black uppercase tracking-tighter">Admin Core</span>
          </Link>
        </div>

        <nav className="flex-1 px-6 space-y-8 mt-4">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-6 px-2">Main Terminal</p>
            <div className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-4 px-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                    isActive(item.path) 
                    ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.1)]' 
                    : 'text-white/40 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-6 px-2">Operations</p>
            <div className="space-y-1">
              <Link to="/dashboard/upload" className={`flex items-center gap-4 px-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white hover:bg-white/5 transition-all ${isActive('/dashboard/upload') && 'bg-white/10 text-white'}`}>
                <Upload className="w-4 h-4" /> Upload Work
              </Link>
              <Link to="/dashboard/upload/dev" className={`flex items-center gap-4 px-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white hover:bg-white/5 transition-all ${isActive('/dashboard/upload/dev') && 'bg-white/10 text-white'}`}>
                <Terminal className="w-4 h-4" /> Upload Dev work
              </Link>
              <Link to="/" target="_blank" className="flex items-center gap-4 px-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white transition-all">
                <ExternalLink className="w-4 h-4" /> Preview Site
              </Link>
            </div>
          </div>
        </nav>

        {/* User Profile Area */}
        <div className="p-6 border-t border-white/5 bg-black/20">
          <div className="flex items-center justify-between p-4 rounded-[1.5rem] bg-white/5 border border-white/10">
            <div className="overflow-hidden">
              <p className="text-[10px] font-black uppercase tracking-tighter truncate">{user?.name || 'Operator'}</p>
              <div className="flex items-center gap-1 text-[8px] text-green-500 font-bold uppercase tracking-widest">
                <ShieldCheck className="w-2 h-2" /> Verified
              </div>
            </div>
            <button 
              onClick={logout}
              className="p-2 hover:bg-red-500 hover:text-white rounded-xl transition-all text-white/20"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 relative flex flex-col min-w-0 bg-[#050505]/90 ">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
        
        <header className="h-20 flex items-center justify-between px-8 border-b border-white/5 relative z-10 backdrop-blur-md bg-black/40">
           <div className="flex items-center gap-4">
              <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">
                {location.pathname.replace('/', ' > ').replace('-', ' ')}
              </h2>
           </div>
           <div className="flex items-center gap-4">
              <Button size="sm" variant="outline" className="rounded-full border-white/10 bg-transparent text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black">
                Quick Action <Plus className="ml-2 w-3 h-3" />
              </Button>
           </div>
        </header>

        <div className="flex-1 overflow-auto p-8 relative z-10">
          <Outlet />
        </div>
      </main>

      {/* 3. MOBILE LIQUID GLASS NAV */}
      <nav className={`md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] transition-all duration-500 ${
        isMobileNavVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      }`}>
        <div className="backdrop-blur-2xl bg-white/5 border border-white/10 p-4 rounded-full flex justify-around items-center shadow-2xl">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`p-3 rounded-full transition-all ${
                isActive(item.path) ? 'bg-white text-black' : 'text-white/40'
              }`}
            >
              <item.icon className="w-5 h-5" />
            </Link>
          ))}
          <button 
            onClick={() => setShowUploadDrawer(true)}
            className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/20"
          >
            <Plus className="w-6 h-6" />
          </button>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`p-3 rounded-full transition-all ${isMobileMenuOpen ? 'bg-white text-black' : 'text-white/40'}`}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* 4. MODERN MOBILE DRAWER (Curved) */}
      <AnimatePresence>
        {showUploadDrawer && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowUploadDrawer(false)}
              className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-md md:hidden"
            />
            <motion.div 
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 z-[120] bg-[#111111] rounded-t-[3rem] p-10 border-t border-white/10 md:hidden"
            >
              <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto mb-10" />
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-8 text-center">New Transmission</h3>
              <div className="grid gap-4">
                {uploadItems.map((item) => (
                  <button
                    key={item.type}
                    onClick={() => { navigate(item.type === 'design' ? '/dashboard/upload' : '/dashboard/upload/dev'); setShowUploadDrawer(false); }}
                    className="flex items-center gap-6 p-6 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white hover:text-black transition-all group text-left"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-black uppercase text-sm tracking-widest">{item.label}</p>
                      <p className="text-xs opacity-40">{item.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Toaster />
    </div>
  );
};

export default DashboardLayout;