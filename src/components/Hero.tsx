import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Linkedin, Instagram, Twitter } from "lucide-react";

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const phrases = ['DZIDZOM', 'OWEN', 'BENSON'];
    const scrollToPortfolio = () => {
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
  };
    const scrollToArchive = () => {
    document.getElementById('portfolio-grid')?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const handleTyping = () => {
      const currentPhrase = phrases[currentPhraseIndex];
      if (isDeleting) {
        setDisplayText(currentPhrase.substring(0, displayText.length - 1));
        setTypingSpeed(50);
      } else {
        setDisplayText(currentPhrase.substring(0, displayText.length + 1));
        setTypingSpeed(120);
      }

      if (!isDeleting && displayText === currentPhrase) {
        setTimeout(() => setIsDeleting(true), 2500);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
      }
    };
    timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, currentPhraseIndex, isDeleting, typingSpeed]);

  return (
    <div className="relative min-h-screen w-full bg-[#050505]/90 text-white selection:bg-white selection:text-black overflow-hidden">
      
      {/* 1. LIQUID GLASS NAVBAR */}
      {/* <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-4xl">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 px-8 py-4 rounded-full flex items-center justify-between shadow-2xl">
          <span className="font-black text-xl tracking-tighter">DB.</span>
          <div className="hidden md:flex gap-8 text-sm font-medium uppercase tracking-widest text-white/60">
            <a href="#" className="hover:text-white transition-colors">Work</a>
            <a href="#" className="hover:text-white transition-colors">About</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
          <div className="flex gap-4">
            <Instagram className="w-4 h-4 text-white/40 hover:text-white cursor-pointer transition-all" />
            <Github className="w-4 h-4 text-white/40 hover:text-white cursor-pointer transition-all" />
          </div>
        </div>
      </nav> */}

      {/* 2. BACKGROUND ELEMENTS (Abstract Curves) */}
      {/* <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px]"></div>
      </div> */}

      {/* 3. MAIN CONTENT */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 pt-20">
        <div className="text-center space-y-8">
          <p className="text-xs md:text-sm font-bold tracking-[0.5em] uppercase text-white/40 animate-fade-in">
            Creative Developer & Designer
          </p>
          
          <h1 className="text-7xl md:text-[12rem] font-black leading-none tracking-tighter">
            {displayText}
            <span className="inline-block w-2 h-[0.8em] bg-white ml-2 animate-pulse align-middle"></span>
          </h1>

          <p className="text-lg md:text-2xl text-white/60 max-w-2xl mx-auto font-light leading-relaxed">
            Crafting digital experiences that are <span className="text-white font-medium italic">impossible to ignore</span>.
          </p>

          <div className="pt-10 flex flex-col md:flex-row gap-6 justify-center items-center">
            <Button 
            onClick={() => scrollToPortfolio()}
              className="bg-white text-black hover:bg-white/90 rounded-full px-10 py-8 text-lg font-bold transition-transform hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
              WALK WITH ME
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            
            <button onClick={() => scrollToArchive()} className="text-white/50 hover:text-white font-bold tracking-widest text-sm underline underline-offset-8 decoration-white/20 hover:decoration-white transition-all">
                VIEW ARCHIVES
            </button>
          </div>
        </div>
      </section>

      {/* 4. MODERN CURVED SECTION TRANSITION */}
      {/* <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg className="relative block w-full h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5,73.84-4.36,147.54,16.88,218.2,35.26,69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-32.82,80.5-34.83,172.34-48.8,203.1,4.42V120H0Z" fill="#111111"></path>
        </svg>
      </div> */}

      {/* 5. FLOATING INDICATOR */}
      <div className="absolute bottom-12 right-12 hidden lg:block">
        <div className="flex items-center gap-4 rotate-90 origin-right">
            <span className="text-[10px] tracking-[0.3em] font-bold text-white/30 uppercase">Scroll to explore</span>
            <div className="w-12 h-[1px] bg-white/20"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;