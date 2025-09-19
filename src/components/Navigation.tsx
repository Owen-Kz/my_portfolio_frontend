import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/', id: 'home' },
    { name: 'Portfolio', href: '/portfolio', id: 'portfolio' },
    { name: 'About', href: '/about', id: 'about' },
    { name: 'Contact', href: '/contact', id: 'contact' }
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
    if (location.pathname !== '/') {
      // If we're not on the home page, navigate first then scroll
      window.location.href = `/${href === '/' ? '' : `#${id}`}`;
    } else {
      // If we're on the home page, just scroll
      scrollToSection(id);
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-soft' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-bold"
            onClick={(e) => {
              e.preventDefault();
              if (location.pathname !== '/') {
                window.location.href = '/';
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            <span className={`transition-colors duration-300 ${
              isScrolled ? 'text-creative-primary' : 'text-white'
            }`}>
              Dzidzom
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={(e) => handleNavClick(item.href, item.id, e)}
                className={`font-medium transition-colors duration-300 hover:text-accent ${
                  isScrolled ? 'text-foreground' : 'text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Contact Button */}
          <Button 
            onClick={() => scrollToSection('contact')}
            className={`hidden md:block transition-all duration-300 ${
              isScrolled 
                ? 'bg-creative-primary text-white hover:bg-creative-primary/90' 
                : 'bg-white text-creative-primary hover:bg-white/90'
            }`}
          >
            Get In Touch
          </Button>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className={`md:hidden ${isScrolled ? 'text-foreground' : 'text-white'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 bg-white rounded-lg shadow-soft">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={(e) => handleNavClick(item.href, item.id, e)}
                className="block w-full text-left px-4 py-2 text-foreground hover:bg-secondary transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <div className="px-4 pt-2">
              <Button 
                onClick={() => scrollToSection('contact')}
                className="w-full bg-creative-primary text-white hover:bg-creative-primary/90"
              >
                Get In Touch
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;