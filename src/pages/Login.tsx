import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Lock, ShieldCheck, ArrowRight, Activity, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      await login(email, password);
    } catch (err) {
      setError('ACCESS DENIED: CREDENTIALS INVALID');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white relative overflow-hidden flex items-center justify-center">
      
      {/* 1. BACKGROUND ATMOSPHERE */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-[1400px] w-full mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* LEFT COLUMN: THE EDITORIAL STATEMENT */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-10"
          >
            <div>
              <span className="text-xs font-black tracking-[0.5em] text-white/30 uppercase block mb-4">
                04. Authorization Required
              </span>
              <h1 className="text-6xl md:text-[7rem] font-black tracking-tighter leading-[0.85] uppercase">
                Accessing <br />
                <span className="text-white/10 italic">The Core.</span>
              </h1>
            </div>

            <div className="space-y-6 max-w-lg">
              <p className="text-xl text-white/50 font-light leading-relaxed">
                Enter the command center. This area is reserved for <span className="text-white font-medium italic">authorized architects</span> only. 
              </p>
              
              {/* System Status Indicators */}
              <div className="flex gap-8 pt-4">
                <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/20">System Status</p>
                    <div className="flex items-center gap-2 text-green-500 font-bold text-xs uppercase">
                        <Activity className="w-3 h-3" /> Operational
                    </div>
                </div>
                <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Encryption</p>
                    <div className="flex items-center gap-2 text-white font-bold text-xs uppercase">
                        <Cpu className="w-3 h-3" /> AES-256
                    </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: THE LIQUID GLASS LOGIN POD */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="backdrop-blur-3xl bg-white/5 border border-white/10 p-10 md:p-14 rounded-[4rem] shadow-[0_30px_100px_rgba(0,0,0,0.5)]">
              
              <div className="flex justify-between items-center mb-12">
                <div className="w-12 h-12 rounded-2xl bg-white text-black flex items-center justify-center -rotate-6">
                    <Lock className="w-6 h-6" />
                </div>
                <div className="text-right">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Entry Point</p>
                    <p className="text-sm font-bold uppercase italic">Gateway v2</p>
                </div>
              </div>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl text-[10px] font-black tracking-widest text-center uppercase"
                >
                  {error}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-10">
                {/* Identification */}
                <div className="space-y-2 group">
                  <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 group-focus-within:text-white transition-colors">
                    Identification
                  </Label>
                  <Input
                    type="email"
                    placeholder="ADMIN@DZIDZOM.COM"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-transparent border-0 border-b border-white/10 rounded-none px-0 py-4 text-xl focus-visible:ring-0 focus-visible:border-white transition-all placeholder:text-white/5"
                  />
                </div>

                {/* Security Key */}
                <div className="space-y-2 group">
                  <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 group-focus-within:text-white transition-colors">
                    Security Key
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="bg-transparent border-0 border-b border-white/10 rounded-none px-0 py-4 text-xl focus-visible:ring-0 focus-visible:border-white transition-all placeholder:text-white/5"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-0 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full py-10 rounded-full bg-white text-black hover:bg-white/90 text-sm font-black uppercase tracking-[0.2em] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-white/10 shadow-xl" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                        Verifying...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                        Initialize Session <ArrowRight className="w-4 h-4" />
                    </span>
                  )}
                </Button>
              </form>

              {/* Sub-actions */}
              <div className="mt-12 flex flex-col gap-4 text-center">
                <button 
                  onClick={() => navigate('/signup')}
                  className="text-[10px] font-black text-white/20 uppercase tracking-widest hover:text-white transition-colors"
                >
                  Request New Access Credentials
                </button>
                <button 
                  onClick={() => navigate('/')}
                  className="text-[10px] font-black text-white/40 uppercase tracking-widest hover:text-white transition-colors flex items-center justify-center gap-2"
                >
                  Return to Base
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Branding */}
      <div className="absolute bottom-10 left-10 hidden md:flex items-center gap-4 opacity-20 pointer-events-none">
        <div className="h-8 w-[1px] bg-white" />
        <div className="text-left font-mono">
            <p className="text-[10px] font-black tracking-widest uppercase">System Core v4.0.12</p>
            <p className="text-[8px]">Encrypted Terminal Access</p>
        </div>
      </div>
    </div>
  );
};

export default Login;