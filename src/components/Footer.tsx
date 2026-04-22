import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Instagram, ArrowUpRight, Globe } from "lucide-react";

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
    } else {
      window.location.href = href;
    }
  };

  return (
    <footer className="relative bg-[#050505]/90  pt-32 pb-12 overflow-hidden">
      
      {/* 1. SECTION TOP CURVE (The Scoop) */}
      {/* <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
        <svg className="relative block w-full h-[80px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5,73.84-4.36,147.54,16.88,218.2,35.26,69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-32.82,80.5-34.83,172.34-48.8,203.1,4.42V120H0Z" fill="#111111"></path>
        </svg>
      </div> */}

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        {/* 2. GIANT TYPOGRAPHIC WATERMARK */}
        <div className="flex flex-col items-center justify-center mb-24 pointer-events-none">
          <h2 className="text-[18vw] font-black text-white/[0.03] tracking-tighter leading-none select-none uppercase">
            DZIDZOM
          </h2>
        </div>

        {/* 3. MAIN FOOTER GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 border-b border-white/5 pb-20">
          
          {/* Brand & Mission */}
          <div className="md:col-span-5 space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black font-black">D</div>
              <span className="text-xl font-black uppercase tracking-tighter text-white">Benson Michael Owen</span>
            </div>
            <p className="text-2xl font-light text-white/50 leading-tight max-w-sm">
              We create digital monuments that are <span className="text-white italic">impossible to forget.</span>
            </p>
            
            {/* SOCIAL DOCK (Liquid Glass) */}
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/40 hover:bg-white hover:text-black hover:scale-110 transition-all duration-500"
                >
                  {social.icon === "Be" ? (
                    <span className="text-xs font-black">Be</span>
                  ) : (
                    //@ts-ignore
                    <social.icon className="w-4 h-4" />
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Links Grid */}
          <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-8">Navigation</h4>
              <ul className="space-y-4">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-sm font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-8">Specialties</h4>
              <ul className="space-y-4 text-sm font-bold uppercase tracking-widest text-white/60">
                <li className="hover:text-white transition-colors">Brand Assets</li>
                <li className="hover:text-white transition-colors">Interactive UI</li>
                <li className="hover:text-white transition-colors">Visual Systems</li>
                <li className="hover:text-white transition-colors">Art Direction</li>
              </ul>
            </div>

            <div className="col-span-2 md:col-span-1">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-8">Status</h4>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">Available for hire</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4. BOTTOM BAR */}
        <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">
            © {currentYear} DZIDZOM DESIGN STUDIO. All rights reserved.
          </div>
          
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-white/20">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>

          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white group"
          >
            Back to Top <ArrowUpRight className="w-3 h-3 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>

      {/* Decorative Blur Background */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]" />
    </footer>
  );
};

export default Footer;