import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen w-full bg-[#050505]/90  text-white flex items-center justify-center overflow-hidden selection:bg-white selection:text-black">
      
      {/* 1. BACKGROUND AURAS (Atmospheric depth) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-white/[0.03] rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-600/5 rounded-full blur-[100px] animate-pulse"></div>
      </div>

      <div className="relative z-10 text-center space-y-8 max-w-4xl px-6">
        
        {/* 2. SUB-HEADER WITH MASSIVE TRACKING */}
        <span className="text-xs font-black tracking-[0.5em] text-white/30 uppercase block">
          Error Status
        </span>
        
        {/* 3. INTIMIDATING MASSIVE FONT */}
        <h1 className="text-[12rem] md:text-[22rem] font-black leading-none tracking-tighter text-white">
          404
        </h1>

        {/* 4. EDITORIAL DESCRIPTION */}
        <div className="space-y-4">
          <p className="text-xl md:text-2xl text-white/60 font-light max-w-2xl mx-auto leading-relaxed">
            The coordinates <span className="text-white font-medium italic">"{location.pathname}"</span> do not exist in this reality.
          </p>
        </div>

        {/* 5. LIQUID GLASS ACTION BUTTON */}
        <div className="pt-8 flex justify-center">
          <Button 
            asChild
            className="bg-white text-black hover:bg-white/90 rounded-full px-10 py-8 text-lg font-bold transition-transform hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
          >
            <Link to="/" className="flex items-center gap-2">
              RETURN TO BASE
              <Home className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>

      {/* 6. FLOATING SYSTEM INDICATOR */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden lg:block">
        <div className="flex items-center gap-4">
          <div className="w-12 h-[1px] bg-white/10"></div>
          <span className="text-[10px] tracking-[0.4em] font-black text-white/20 uppercase">The Void</span>
          <div className="w-12 h-[1px] bg-white/10"></div>
        </div>
      </div>
      
    </div>
  );
};

export default NotFound;