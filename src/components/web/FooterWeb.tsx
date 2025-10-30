import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Instagram, Heart, Terminal, ExternalLink } from "lucide-react";

const FooterWeb = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: "https://github.com/Owen-Kz", label: "GitHub" },
    { icon: "Be", href: "https://www.behance.net/wk79", label: "Behance" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/michael-owen-benson-202b5a322", label: "LinkedIn" },
    { icon: Instagram, href: "https://www.instagram.com/owenkz_official/", label: "Instagram" },
    { icon: Mail, href: "mailto:bensonmichaelowen@gmail.com", label: "Email" }
  ];

  const quickLinks = [
    { name: "Home", href: "#" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
    { name: "Web Projects", href: "/webapps" }
  ];

  const services = [
    "Full-Stack Development",
    "Web Applications",
    "Mobile Apps",
    "API Development",
    "Cloud Infrastructure"
  ];

  const scrollToSection = (href: string) => {
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (href.startsWith('#')) {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = href;
    }
  };

  return (
    <footer className="bg-[#0d1117] border-t border-[#30363d] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-[#4E9C7E] to-[#1f6feb] rounded-lg flex items-center justify-center">
                <Terminal className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white font-mono">Dzidzom</h3>
                <p className="text-[#7d8590] font-mono text-xs sm:text-sm">Developer & Engineer</p>
              </div>
            </div>
            <p className="text-[#7d8590] mb-4 sm:mb-6 max-w-md leading-relaxed font-mono text-xs sm:text-sm">
              $ Building scalable solutions with modern technologies. 
              Let's create something remarkable together.
            </p>
            <div className="flex gap-1 sm:gap-2">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-[#161b22] border border-[#30363d] text-[#7d8590] hover:bg-[#4E9C7E] hover:text-black hover:border-[#4E9C7E] transition-all duration-300 hover:scale-110 font-mono"
                  asChild
                >
                  {social.icon === "Be" ? (
                    <a href={social.href} aria-label={social.label} target="_blank" rel="noopener noreferrer">
                      <span className="text-xs font-bold">Be</span>
                    </a>
                  ) : (
                    <a href={social.href} aria-label={social.label} target="_blank" rel="noopener noreferrer">
                      <social.icon className="w-3 h-3 sm:w-4 sm:h-4" />
                    </a>
                  )}
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div className="flex items-center gap-1 sm:gap-2 mb-3 sm:mb-4">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#4E9C7E] rounded-full"></div>
              <h4 className="text-base sm:text-lg font-semibold text-white font-mono">$ navigation</h4>
            </div>
            <div className="space-y-1 sm:space-y-2">
              {quickLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="block text-[#7d8590] hover:text-[#4E9C7E] transition-colors duration-300 font-mono text-xs sm:text-sm text-left w-full py-0.5 sm:py-1 hover:translate-x-1 transition-transform"
                >
                  ./{link.name.toLowerCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <div className="flex items-center gap-1 sm:gap-2 mb-3 sm:mb-4">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#1f6feb] rounded-full"></div>
              <h4 className="text-base sm:text-lg font-semibold text-white font-mono">$ services</h4>
            </div>
            <div className="space-y-1 sm:space-y-2 text-[#7d8590] font-mono text-xs sm:text-sm">
              {services.map((service, index) => (
                <div key={service} className="flex items-center gap-1 sm:gap-2">
                  <span className="text-[#4E9C7E] text-xs">→</span>
                  <span>{service}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
            <div className="text-center md:text-left">
              <h4 className="text-white font-mono text-base sm:text-lg mb-1 sm:mb-2">Ready to start your project?</h4>
              <p className="text-[#7d8590] font-mono text-xs sm:text-sm">
                Get an instant quote using our development cost calculator.
              </p>
            </div>
            <Button 
              onClick={() => scrollToSection('#contact')}
              className="bg-[#4E9C7E] hover:bg-[#5FBB97] text-black font-mono border-0 whitespace-nowrap text-xs sm:text-sm py-2 sm:py-3 px-4 sm:px-6"
            >
              <Terminal className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              get_quote --now
            </Button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#30363d] pt-4 sm:pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-4 text-[#8b949e] font-mono text-xs sm:text-sm flex-wrap justify-center">
              <div className="flex items-center gap-1 sm:gap-2">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#4E9C7E] rounded-full animate-pulse"></div>
                <span>Status: Online</span>
              </div>
              <span className="hidden sm:inline">•</span>
              <span>© {currentYear} Dzidzom</span>
            </div>
            
            <div className="flex items-center gap-3 sm:gap-4">
      
              <Button
                variant="ghost"
                size="sm"
                className="text-[#8b949e] hover:text-[#4E9C7E] font-mono text-xs h-7 sm:h-8"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                $ cd ~
              </Button>
            </div>
          </div>
        </div>

        {/* System Info */}
        <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-[#161b22] border border-[#30363d] rounded font-mono text-xs text-[#8b949e]">
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 justify-center sm:justify-start">
            <span>System: Ubuntu 22.04 LTS</span>
            <span>Shell: zsh 5.8.1</span>
            <span>Terminal: GNOME Terminal</span>
            <span>User: dzidzom</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterWeb;