import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail, Instagram } from "lucide-react";

const Hero = () => {
    const [displayText, setDisplayText] = useState('');
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const phrases = ['DZIDZOM', 'Owen', 'Benson'];
  const cursor = '|';

    useEffect(() => {
    let timer: NodeJS.Timeout;
    
    const handleTyping = () => {
      const currentPhrase = phrases[currentPhraseIndex];
      
      if (isDeleting) {
        // Deleting text
        setDisplayText(currentPhrase.substring(0, displayText.length - 1));
        setTypingSpeed(75); // Faster when deleting
      } else {
        // Typing text
        setDisplayText(currentPhrase.substring(0, displayText.length + 1));
        setTypingSpeed(130); // Normal speed when typing
      }

      // Check if we've finished typing or deleting
      if (!isDeleting && displayText === currentPhrase) {
        // Pause at end of phrase
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayText === '') {
        // Switch to next phrase
        setIsDeleting(false);
        setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
      }
    };

    timer = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, currentPhraseIndex, isDeleting, typingSpeed]);



  const scrollToPortfolio = () => {
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-hero">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
      <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          {displayText}
          <span className="animate-blink">{cursor}</span>
          </h1>
             {/* <span className="block bg-gradient-to-r from-creative-accent to-white bg-clip-text text-transparent">
              benson m
            </span> */}
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Let's go on a journey.
          </p>
          
          {/* Social Links */}
          {/* <div className="flex justify-center gap-6 mb-12">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 hover:scale-110 transition-all duration-300">
              <Github className="w-6 h-6" />
            </Button> */}
       
            {/* <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 hover:scale-110 transition-all duration-300"> */}
              {/* <Mail className="w-6 h-6" /> */}
              {/* <Instagram className="w-6 h-6" />

            </Button>
          </div> */}
          
          {/* CTA Button */}
          <Button 
            onClick={scrollToPortfolio}
            size="lg" 
            className="bg-white text-creative-primary hover:bg-white/90 hover:scale-105 transition-all duration-300 shadow-creative font-semibold px-8 py-6 text-lg"
          >
            Walk with me
            <ArrowDown className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;