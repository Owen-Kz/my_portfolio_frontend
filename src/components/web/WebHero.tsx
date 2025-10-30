import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail, Terminal, Code, Cpu, Zap } from "lucide-react";

const WebHero = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const phrases = ['Software Engineer', 'Problem Solver', 'Tech Innovator', 'Open Source Enthusiast'];
  const cursor = '▊';

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const handleTyping = () => {
      const currentPhrase = phrases[currentPhraseIndex];

      if (isDeleting) {
        setDisplayText(currentPhrase.substring(0, displayText.length - 1));
        setTypingSpeed(75);
      } else {
        setDisplayText(currentPhrase.substring(0, displayText.length + 1));
        setTypingSpeed(130);
      }

      if (!isDeleting && displayText === currentPhrase) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && displayText === '') {
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
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#0d1117]">
      {/* GitHub-inspired background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]"></div>

      {/* Animated background elements */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#4E9C7E] rounded-full animate-pulse"></div>
      <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-[#1f6feb] rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-1/4 left-1/2 w-1.5 h-1.5 bg-[#da3633] rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>

      {/* Floating code elements */}
      <div className="absolute top-20 left-10 opacity-10">
        <Code className="w-6 h-6 md:w-8 md:h-8" />
      </div>
      <div className="absolute top-40 right-20 opacity-10">
        <Terminal className="w-5 h-5 md:w-6 md:h-6" />
      </div>
      <div className="absolute bottom-32 left-32 opacity-10">
        <Cpu className="w-6 h-6 md:w-7 md:h-7" />
      </div>
      <div className="absolute bottom-20 right-16 opacity-10">
        <Zap className="w-4 h-4 md:w-5 md:h-5" />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="animate-fade-in">
          {/* Terminal-style intro */}
          <div className="font-mono text-xs sm:text-sm text-[#7d8590] mb-6 sm:mb-8 flex items-center justify-center gap-2">
            <span className="text-[#4E9C7E]">~</span>
            <span>$ cat introduction.txt</span>
          </div>

          {/* Main heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 text-white font-mono tracking-tight leading-tight sm:leading-normal">
            Hello World,
            <br />
            I'm <span className="bg-gradient-to-r from-[#5FBB97] to-[#5FBB97] bg-clip-text text-transparent">Owen</span>
          </h1>

          {/* Typing animation */}
          <div className="flex items-center justify-center gap-2 mb-6 sm:mb-8">
            <span className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#7d8590] font-mono">
              &gt;{" "}
              <span className="text-white">{displayText}</span>
              <span className="text-[#ffff] animate-pulse">{cursor}</span>
            </span>
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#7d8590] mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed font-mono px-2">
            Crafting digital experiences with clean code, modern technologies,
            and a passion for innovation. Specializing in full-stack development
            and open-source contributions.
          </p>

          {/* Tech stack badges */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 px-2">
            {['TypeScript', 'React', 'Node.js', 'Python', 'Next.js', 'MongoDB', 'PHP', 'SQL', 'Java'].map((tech) => (
              <span
                key={tech}
                className="px-2 sm:px-3 py-1 sm:py-1.5 bg-[#161b22] border border-[#30363d] text-[#7d8590] text-xs sm:text-sm font-mono rounded-md hover:border-[#4E9C7E] hover:text-white transition-all cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-2">
            <Button
              onClick={scrollToPortfolio}
              size="lg"
              className="bg-[#4E9C7E] hover:bg-[#5FBB97] text-black font-mono px-6 sm:px-8 py-4 sm:py-6 text-sm sm:text-lg border border-[#4E9C7E] hover:scale-105 transition-all duration-300 shadow-lg w-full sm:w-auto"
            >
              <Terminal className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
              View Projects
              <ArrowDown className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="bg-transparent border-[#30363d] text-[#7d8590] hover:text-white hover:border-white hover:bg-[#161b22] font-mono px-6 sm:px-8 py-4 sm:py-6 text-sm sm:text-lg transition-all duration-300 w-full sm:w-auto"
              onClick={() => window.open('https://github.com/Owen-Kz', '_blank')}
            >
              <Github className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
              GitHub
            </Button>
          </div>

          {/* Stats bar */}
          <div className="mt-12 sm:mt-16 flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8 text-[#7d8590] text-xs sm:text-sm font-mono px-2">
            <div className="text-center">
              <div className="text-white text-base sm:text-lg font-semibold">80+</div>
              <div>Projects</div>
            </div>
            <div className="text-center">
              <div className="text-white text-base sm:text-lg font-semibold">5+</div>
              <div>Years</div>
            </div>
            <div className="text-center">
              <div className="text-white text-base sm:text-lg font-semibold">100%</div>
              <div>Passion</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 text-[#7d8590] animate-bounce">
        <ArrowDown className="w-5 h-5 sm:w-6 sm:h-6" />
      </div>
    </section>
  );
};

export default WebHero;