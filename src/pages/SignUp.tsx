import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, UserPlus, Fingerprint, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('https://manga.asfischolar.org/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: name, email, password }),
      });
      
      if (!response.ok) throw new Error('Registration failed');
      
      const data = await response.json();
      localStorage.setItem('user', JSON.stringify(data));   
      navigate('/dashboard');
    } catch (err) {
      setError('REGISTRATION FAILED: UNKNOWN ERROR');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white relative overflow-hidden flex items-center justify-center">
      
      {/* 1. BACKGROUND ATMOSPHERE (Consistent with Login) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[45%] h-[45%] bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[45%] h-[45%] bg-blue-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-[1400px] w-full mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* LEFT COLUMN: EDITORIAL STATEMENT */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-10"
          >
            <div>
              <span className="text-xs font-black tracking-[0.5em] text-white/30 uppercase block mb-4">
                05. Enlist Now
              </span>
              <h1 className="text-6xl md:text-[7.5rem] font-black tracking-tighter leading-[0.85] uppercase">
                Join the <br />
                <span className="text-white/10 italic">Architects.</span>
              </h1>
            </div>

            <div className="space-y-6 max-w-lg">
              <p className="text-xl text-white/50 font-light leading-relaxed">
                Create your identity and begin crafting digital experiences that <span className="text-white font-medium italic">defy convention</span>.
              </p>
              
              {/* System Metadata */}
              <div className="flex gap-8 pt-4">
                <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Registration Status</p>
                    <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase">
                        <Zap className="w-3 h-3" /> Open Access
                    </div>
                </div>
                <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Privacy Level</p>
                    <div className="flex items-center gap-2 text-white font-bold text-xs uppercase">
                        <ShieldCheck className="w-3 h-3" /> High-Security
                    </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: REGISTRATION POD */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="backdrop-blur-3xl bg-white/5 border border-white/10 p-10 md:p-14 rounded-[4rem] shadow-[0_30px_100px_rgba(0,0,0,0.5)]">
              
              <div className="flex justify-between items-center mb-12">
                <div className="w-12 h-12 rounded-2xl bg-white text-black flex items-center justify-center rotate-6 transition-transform hover:rotate-0 cursor-pointer">
                    <UserPlus className="w-6 h-6" />
                </div>
                <div className="text-right">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Registry</p>
                    <p className="text-sm font-bold uppercase italic text-white/80">New Session</p>
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
                {/* Full Identity */}
                <div className="space-y-2 group">
                  <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 group-focus-within:text-white transition-colors">
                    Full Identity
                  </Label>
                  <Input
                    placeholder="OWEN BENSON"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="bg-transparent border-0 border-b border-white/10 rounded-none px-0 py-4 text-xl focus-visible:ring-0 focus-visible:border-white transition-all placeholder:text-white/5"
                  />
                </div>

                {/* Digital Address */}
                <div className="space-y-2 group">
                  <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 group-focus-within:text-white transition-colors">
                    Digital Address
                  </Label>
                  <Input
                    type="email"
                    placeholder="HELLO@DOMAIN.COM"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-transparent border-0 border-b border-white/10 rounded-none px-0 py-4 text-xl focus-visible:ring-0 focus-visible:border-white transition-all placeholder:text-white/5"
                  />
                </div>

                {/* Secret Key */}
                <div className="space-y-2 group">
                  <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 group-focus-within:text-white transition-colors">
                    Secret Key
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
                  disabled={isLoading}
                  className="w-full py-10 rounded-full bg-white text-black hover:bg-white/90 text-sm font-black uppercase tracking-[0.2em] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-white/5 shadow-2xl" 
                >
                  {isLoading ? 'ENLISTING...' : (
                    <span className="flex items-center gap-2">
                        CREATE ACCOUNT <ArrowRight className="w-4 h-4" />
                    </span>
                  )}
                </Button>
              </form>

              {/* Toggle Page */}
              <div className="mt-12 text-center">
                <button 
                  onClick={() => navigate('/login')}
                  className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] hover:text-white transition-colors flex flex-col items-center gap-2 mx-auto"
                >
                  <Fingerprint className="w-6 h-6 mb-2 text-white/10" />
                  Already a member? <span className="text-white border-b border-white/20 pb-1">Login to Core</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative System Marker */}
      <div className="absolute bottom-10 left-10 hidden md:flex items-center gap-4 opacity-10 pointer-events-none">
        <div className="h-8 w-[1px] bg-white" />
        <div className="text-left font-mono text-[8px] uppercase tracking-widest">
            <p>System: Registration_Final</p>
            <p>Protocols: Active_Encrypted</p>
        </div>
      </div>
    </div>
  );
};

export default Signup;