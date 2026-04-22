// src/layouts/DashboardLayout.tsx
import { Outlet } from 'react-router-dom';
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
  Menu
} from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showUploadDrawer, setShowUploadDrawer] = useState(false);
  const [isMobileNavVisible, setIsMobileNavVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Refs to track scroll behavior
  const scrollTimeoutRef = useRef(null);
  const lastScrollDirectionRef = useRef('down');

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
      
      // Handle mobile nav visibility
      if (window.innerWidth < 768) { // md breakpoint
        if (scrollDirection === 'down' && currentScrollY > 100) {
          // Scrolling down - hide nav
          setIsMobileNavVisible(false);
        } else if (scrollDirection === 'up') {
          // Scrolling up - show nav
          setIsMobileNavVisible(true);
        }

        // Always show nav at the top of the page
        if (currentScrollY < 50) {
          setIsMobileNavVisible(true);
        }
      } else {
        // Always visible on desktop
        setIsMobileNavVisible(true);
      }

      setLastScrollY(currentScrollY);
      lastScrollDirectionRef.current = scrollDirection;

      // Clear any existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Auto-show nav when scrolling stops (optional)
      scrollTimeoutRef.current = setTimeout(() => {
        if (window.innerWidth < 768 && lastScrollDirectionRef.current === 'down' && currentScrollY > 100) {
          setIsMobileNavVisible(true);
        }
      }, 1500);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [lastScrollY]);

  const handleUploadSelect = (type: 'design' | 'dev') => {
    setShowUploadDrawer(false);
    setIsMobileMenuOpen(false);
    if (type === 'design') {
      navigate('/dashboard/upload');
    } else {
      navigate('/dashboard/upload/dev');
    }
  };

  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/dashboard/portfolio', icon: Image, label: 'Design' },
    { path: '/dashboard/dev', icon: Terminal, label: 'Dev' },
  ];

  const moreItems = [
    { path: '/dashboard/upload', icon: Upload, label: 'Upload Design', type: 'design' },
    { path: '/dashboard/upload/dev', icon: Terminal, label: 'Upload Dev', type: 'dev' },
    { path: '/', icon: ExternalLink, label: 'Preview Design', external: true },
    { path: '/webapps', icon: ExternalLink, label: 'Preview Dev', external: true },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
          <div className="h-0 flex-1 flex flex-col pt-5 pb-4">
            <div className="flex items-center flex-shrink-0 px-4">
              <h1 className="text-xl font-bold text-creative-primary">Dzidzom Admin</h1>
            </div>
            <nav className="mt-5 flex-1 space-y-1 px-2">
              <Link
                to="/dashboard"
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  isActive('/dashboard') ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-100'
                }`}
              >
                <LayoutDashboard className="mr-3 h-5 w-5" />
                Dashboard
              </Link>
              <Link
                to="/dashboard/portfolio"
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  isActive('/dashboard/portfolio') ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-100'
                }`}
              >
                <Image className="mr-3 h-5 w-5" />
                Portfolio Items
              </Link>
              <Link
                to="/dashboard/upload"
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  isActive('/dashboard/upload') ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-100'
                }`}
              >
                <Upload className="mr-3 h-5 w-5" />
                Upload Design
              </Link>

              <Link
                to="/dashboard/dev"
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  isActive('/dashboard/dev') ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-100'
                }`}
              >
                <Terminal className="mr-3 h-5 w-5" />
                Dev Dashboard
              </Link>
              <Link
                to="/dashboard/upload/dev"
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  isActive('/dashboard/upload/dev') ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-100'
                }`}
              >
                <Upload className="mr-3 h-5 w-5" />
                Upload Dev Project
              </Link>
              <Link
                to="/" target="_blank"
                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-gray-100"
              >
                <ExternalLink className="mr-3 h-5 w-5" />
                Preview Design Portfolio
              </Link>

              <Link
                to="/webapps" target="_blank"
                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-gray-100"
              >
                <ExternalLink className="mr-3 h-5 w-5" />
                Preview Dev Portfolio
              </Link>
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <div className="flex items-center">
              <div>
                <div className="text-sm font-medium text-gray-700">{user?.name}</div>
                <div className="text-xs text-gray-500">{user?.email}</div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="ml-auto"
              onClick={logout}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="flex-1 overflow-auto pb-20 md:pb-0">
          <Outlet />
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className={`md:hidden fixed bottom-0 left-0 right-0 z-[100] transition-transform duration-300 ease-in-out ${
        isMobileNavVisible ? 'translate-y-0' : 'translate-y-full'
      } bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-lg`}>
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex flex-col items-center justify-center w-16 py-1 rounded-lg transition-all duration-200 ${
                    active
                      ? 'text-creative-primary scale-105'
                      : 'text-gray-600 hover:text-creative-primary'
                  }`}
                >
                  <Icon className="w-5 h-5 mb-1" />
                  <span className="text-xs font-medium">{item.label}</span>
                </Link>
              );
            })}
            
            {/* Upload Button */}
            <button
              onClick={() => setShowUploadDrawer(true)}
              className={`flex flex-col items-center justify-center w-16 py-1 rounded-lg transition-all duration-200 ${
                showUploadDrawer
                  ? 'text-creative-primary scale-105'
                  : 'text-gray-600 hover:text-creative-primary'
              }`}
            >
              <Plus className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">Upload</span>
            </button>

            {/* More menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`flex flex-col items-center justify-center w-16 py-1 rounded-lg transition-all duration-200 ${
                isMobileMenuOpen
                  ? 'text-creative-primary scale-105'
                  : 'text-gray-600 hover:text-creative-primary'
              }`}
            >
              <Menu className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">More</span>
            </button>
          </div>
        </div>

        {/* Expanded Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute bottom-full left-0 right-0 mb-2 mx-4 bg-white rounded-lg shadow-xl border border-gray-200 z-[110]">
            <div className="p-4">
              <div className="grid grid-cols-2 gap-2 mb-4">
                {moreItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);

                  if (item.external) {
                    return (
                      <a
                        key={item.path}
                        href={item.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded transition-colors ${
                          active
                            ? 'text-creative-primary font-semibold bg-creative-primary/10'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {item.label}
                      </a>
                    );
                  }

                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded transition-colors ${
                        active
                          ? 'text-creative-primary font-semibold bg-creative-primary/10'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-sm font-medium text-gray-700">{user?.name}</div>
                    <div className="text-xs text-gray-500">{user?.email}</div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={logout}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Upload Selection Drawer */}
      {showUploadDrawer && (
        <div className="fixed inset-0 z-[120] md:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowUploadDrawer(false)}
          />
          
          {/* Drawer */}
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6 animate-in slide-in-from-bottom duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Upload New Item</h3>
              <button
                onClick={() => setShowUploadDrawer(false)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={() => handleUploadSelect('design')}
                className="w-full flex items-center p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3">
                  <Image className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-gray-900">Graphic Design</div>
                  <div className="text-sm text-gray-500">Logos, branding, illustrations</div>
                </div>
              </button>
              
              <button
                onClick={() => handleUploadSelect('dev')}
                className="w-full flex items-center p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mr-3">
                  <Terminal className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-gray-900">Development</div>
                  <div className="text-sm text-gray-500">Websites, apps, APIs</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed right-4 bottom-20 md:bottom-4 p-3 bg-creative-primary text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-[90] ${
          isMobileNavVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <ChevronUp className="w-5 h-5" />
      </button>

      <Toaster />
    </div>
  );
};

export default DashboardLayout;