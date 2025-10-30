import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Instagram, Heart, } from "lucide-react";
import { Navigate } from "react-router-dom";

const Footer = () => {
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

  const scrollToSection = (href: string) => {
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (href.startsWith('#')) {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: 'smooth' });
    }else{
      window.location.href = href;
    }
  };

  return (
    <footer className="bg-foreground text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4 text-white bg-clip-text text-transparent">
              Benson Michael Owen
            </h3>
            <p className="text-white/80 mb-6 max-w-md leading-relaxed">
              Crafting visual experiences that inspire and engage. Let's work together to bring your ideas to life.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  variant="ghost"
                  size="icon"
                  className="text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 hover:scale-110"
                  asChild
                >
                  {
                    social.icon === "Be" ? (
                      <a href={social.href} aria-label={social.label}>
                        Be
                      </a>
                    ) : (
                      <a href={social.href} aria-label={social.label}>
                        <social.icon className="w-5 h-5" />
                      </a>
                    )
                  }

                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Quick Links</h4>
            <div className="space-y-3">
              {quickLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="block text-white/80 hover:text-white/60transition-colors duration-300"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Services</h4>
            <div className="space-y-3 text-white/80">
              <div>Brand Identity</div>
              <div>Web Design</div>
              <div>UI/UX Design</div>
              <div>Print Design</div>
              <div>Illustration</div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-white/60 text-sm">
              © {currentYear} Dzidzom. All rights reserved.
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;