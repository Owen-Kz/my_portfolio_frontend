import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Home, Folder, User, Mail, Globe } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileNavVisible, setIsMobileNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  // Refs to track scroll behavior
  const scrollTimeoutRef = useRef(null);
  const lastScrollDirectionRef = useRef('down');

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
      
      // Update scrolled state for styling
      setIsScrolled(currentScrollY > 50);

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

  const navItems = [
    { name: 'Home', href: '/', id: 'home', icon: Home },
    { name: 'Portfolio', href: '/portfolio', id: 'portfolio', icon: Folder },
    { name: 'About', href: '/about', id: 'about', icon: User },
    { name: 'Contact', href: '/contact', id: 'contact', icon: Mail },
    { name: 'Web Projects', href: '/webapps', id: 'web-projects', icon: Globe }
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = (href: string, id: string, e: React.MouseEvent) => {
    e.preventDefault();
    
    // Special handling for webapps route
    if (href === '/webapps') {
      navigate('/webapps');
      setIsMobileMenuOpen(false);
      return;
    }

    if (location.pathname !== '/') {
      // If we're not on the home page, navigate first then scroll
      if (href === '/') {
        navigate('/');
        // Wait for navigation then scroll
        setTimeout(() => {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        navigate(href);
      }
    } else {
      // If we're on the home page, just scroll for same-page sections
      if (href === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        scrollToSection(id);
      }
    }
    
    setIsMobileMenuOpen(false);
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation then scroll to contact
      setTimeout(() => {
        const contactElement = document.getElementById('contact');
        if (contactElement) {
          contactElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      scrollToSection('contact');
    }
  };

  return (
    <>
      {/* Desktop Navigation - Top */}
      <nav className={`hidden md:block fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-soft' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link 
              to="/" 
              className="text-xl sm:text-2xl font-bold"
              onClick={handleLogoClick}
            >
              <span className={`transition-colors duration-300 ${
                isScrolled ? 'text-creative-primary' : 'text-white'
              }`}>
                Dzidzom
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="flex space-x-4 sm:space-x-6 lg:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={(e) => handleNavClick(item.href, item.id, e)}
                  className={`font-medium transition-colors duration-300 hover:text-accent text-sm sm:text-base ${
                    isScrolled ? 'text-foreground' : 'text-white'
                  } ${
                    location.pathname === item.href ? 'text-creative-primary font-semibold' : ''
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Contact Button */}
            <Button 
              onClick={handleContactClick}
              className={`transition-all duration-300 text-xs sm:text-sm px-3 sm:px-4 py-2 h-9 sm:h-10 ${
                isScrolled 
                  ? 'bg-creative-primary text-white hover:bg-creative-primary/90' 
                  : 'bg-white text-creative-primary hover:bg-white/90'
              }`}
            >
              Get In Touch
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation Bar */}
      <nav className={`md:hidden fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out ${
        isMobileNavVisible ? 'translate-y-0' : 'translate-y-full'
      } ${
        isScrolled ? 'bg-white/95 backdrop-blur-md border-t border-gray-200' : 'bg-white/95 backdrop-blur-md border-t border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 sm:py-3">
          <div className="flex justify-between items-center">
            {navItems.slice(0, 3).map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={(e) => handleNavClick(item.href, item.id, e)}
                  className={`flex flex-col items-center justify-center w-14 sm:w-16 py-1 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'text-creative-primary scale-105'
                      : 'text-foreground hover:text-creative-primary'
                  }`}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 mb-0.5 sm:mb-1" />
                  <span className="text-xs font-medium">{item.name}</span>
                </Link>
              );
            })}
            
            {/* More menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`flex flex-col items-center justify-center w-14 sm:w-16 py-1 rounded-lg transition-all duration-200 ${
                isMobileMenuOpen
                  ? 'text-creative-primary scale-105'
                  : 'text-foreground hover:text-creative-primary'
              }`}
            >
              <Menu className="w-4 h-4 sm:w-5 sm:h-5 mb-0.5 sm:mb-1" />
              <span className="text-xs font-medium">More</span>
            </button>
          </div>
        </div>

        {/* Expanded Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute bottom-full left-0 right-0 mb-2 mx-2 sm:mx-4 bg-white rounded-lg shadow-soft border border-gray-200">
            <div className="p-3 sm:p-4">
              <div className="grid grid-cols-2 gap-1 sm:gap-2 mb-3 sm:mb-4">
                {navItems.slice(3).map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.href;

                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={(e) => handleNavClick(item.href, item.id, e)}
                      className={`flex items-center gap-1 sm:gap-2 w-full text-left px-2 sm:px-3 py-1.5 sm:py-2 rounded transition-colors text-sm ${
                        isActive
                          ? 'text-creative-primary font-semibold bg-creative-primary/10'
                          : 'text-foreground hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
              
              <div className="border-t border-gray-200 pt-3 sm:pt-4">
                <Button
                  onClick={handleContactClick}
                  className="w-full bg-creative-primary text-white hover:bg-creative-primary/90 font-medium text-sm py-2 h-9 sm:h-10"
                >
                  <Mail className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Get In Touch
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Top Bar (Logo only) */}
      <div className={`md:hidden fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md border-b border-gray-200' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex justify-between items-center">
            <Link 
              to="/" 
              className="text-lg sm:text-xl font-bold"
              onClick={handleLogoClick}
            >
              <span className={`transition-colors duration-300 ${
                isScrolled ? 'text-creative-primary' : 'text-white'
              }`}>
                Dzidzom
              </span>
            </Link>

            {/* Mobile status indicator */}
            <div className="flex items-center gap-2">
              <span className={`text-xs sm:text-sm font-medium transition-colors duration-300 ${
                isScrolled ? 'text-foreground' : 'text-white'
              }`}>
                {location.pathname === '/' ? 'home' : location.pathname.replace('/', '')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom padding for mobile to prevent content from being hidden behind navbar */}
      <div className="md:hidden pb-16 sm:pb-20"></div>
    </>
  );
};

export default Navigation;