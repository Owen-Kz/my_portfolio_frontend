import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Home, Folder, User, Mail, Globe, ArrowUpRight } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Work', href: '/portfolio', id: 'portfolio', icon: Folder },
    { name: 'About', href: '/about', id: 'about', icon: User },
    { name: 'Apps', href: '/webapps', id: 'web-projects', icon: Globe }
  ];

  const handleNavClick = (href: string, id: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate(href);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate(href);
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* --- DESKTOP NAVIGATION (Floating Liquid Dock) --- */}
      <div className="fixed top-0 left-0 right-0 z-[100] flex justify-center p-6 pointer-events-none">
        <nav className={`
          pointer-events-auto
          transition-all duration-500 ease-in-out
          flex items-center justify-between
          px-8 py-3 rounded-full
          border border-white/10
          backdrop-blur-xl bg-black/20
          ${isScrolled ? 'w-[95%] max-w-4xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]' : 'w-full max-w-7xl'}
        `}>
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center group-hover:rotate-45 transition-transform duration-500">
                <div className="w-2 h-2 bg-black rounded-full" />
            </div>
            <span className="text-xl font-black tracking-tighter text-white uppercase">
              Dzidzom.
            </span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={(e) => handleNavClick(item.href, item.id, e)}
                className={`text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:text-white ${
                  location.pathname === item.href ? 'text-white' : 'text-white/40'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-4">
            <Button 
              onClick={() => navigate('/contact')}
              className="hidden md:flex bg-white text-black hover:bg-white/90 rounded-full px-6 font-bold text-xs tracking-widest uppercase transition-transform hover:scale-105"
            >
              Contact <ArrowUpRight className="ml-1 w-3 h-3" />
            </Button>
            
            {/* Mobile Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white p-2"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </nav>
      </div>

      {/* --- MOBILE OVERLAY MENU (Curved Liquid Glass) --- */}
      <div className={`
        fixed inset-0 z-[90] md:hidden transition-all duration-700 ease-in-out
        ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
      `}>
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-2xl" onClick={() => setIsMobileMenuOpen(false)} />
        
        {/* Menu Content */}
        <div className={`
          absolute bottom-10 left-1/2 -translate-x-1/2 w-[90%] 
          bg-white/5 border border-white/10 rounded-[3rem] p-10
          transition-all duration-500 delay-100 transform
          ${isMobileMenuOpen ? 'translate-y-0 scale-100' : 'translate-y-20 scale-90'}
        `}>
          <div className="flex flex-col gap-8 text-center">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={(e) => handleNavClick(item.href, item.id, e)}
                className="text-4xl font-black text-white/40 hover:text-white transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <div className="h-[1px] w-full bg-white/10 my-4" />
            <Button 
              onClick={() => navigate('/contact')}
              className="bg-white text-black w-full py-8 rounded-full text-lg font-black uppercase tracking-widest"
            >
              Let's Talk
            </Button>
          </div>
        </div>
      </div>

      {/* Modern Top Progress Bar (Optional) */}
      <div 
        className="fixed top-0 left-0 h-[2px] bg-white z-[110] transition-all duration-300"
        style={{ width: `${isScrolled ? '100%' : '0%'}` }}
      />
    </>
  );
};

export default Navigation;