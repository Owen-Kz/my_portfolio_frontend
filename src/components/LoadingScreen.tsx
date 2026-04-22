import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 20); // Adjust speed here
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-[500] bg-[#050505]/90  flex flex-col items-center justify-center text-white"
    >
      <div className="relative">
        {/* Background Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black text-white/[0.02] select-none">
          SYSTEM
        </div>

        {/* Counter */}
        <div className="relative z-10 flex flex-col items-center">
          <motion.span 
            className="text-8xl md:text-[12rem] font-black tracking-tighter italic"
          >
            {progress}%
          </motion.span>
          
          <div className="mt-4 flex items-center gap-4">
            <div className="h-[2px] w-48 bg-white/10 overflow-hidden rounded-full relative">
              <motion.div 
                className="h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">
              Initializing
            </span>
          </div>
        </div>
      </div>

      {/* Decorative Text */}
      <div className="absolute bottom-10 left-10 overflow-hidden">
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-[10px] font-mono text-white/20 uppercase tracking-widest"
        >
          &copy; DZIDZOM_CORE_v2.0.4 // BENSON_MICHAEL_OWEN
        </motion.p>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;