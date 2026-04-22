import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, ArrowUpRight, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formElement = e.currentTarget as HTMLFormElement;
    const data = new FormData(formElement);
    
    try {
      const response = await fetch('https://formspree.io/f/xnnnkknq', {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        toast({ title: "MISSION ACCOMPLISHED", description: "Your message has been intercepted. I'll be in touch." });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        toast({ title: "TRANSMISSION ERROR", description: "Something went wrong. Try again.", variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: "CONNECTION LOST", description: "Check your internet and try again.", variant: 'destructive' });
    }
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: "bensonmichaelowen@gmail.com", href: "mailto:bensonmichaelowen@gmail.com" },
    { icon: Phone, label: "Phone", value: "+234(0)-9027-315-223", href: "tel:+2349027315223" },
    { icon: MapPin, label: "Base", value: "Lagos, Nigeria", href: "#" }
  ];

  return (
    <section id="contact" className="py-32 bg-[#050505] text-white overflow-hidden relative">
      {/* Decorative Background Text */}
      <div className="absolute bottom-10 left-10 text-[15vw] font-black text-white/[0.02] leading-none select-none pointer-events-none uppercase">
        Connect
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        {/* 1. INTIMIDATING HEADER */}
        <div className="mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-xs font-black tracking-[0.5em] text-white/30 uppercase block mb-4"
          >
            03. The Partnership
          </motion.span>
          <h2 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] uppercase">
            Start a <br />
            <span className="text-white/10 italic">Revolution.</span>
          </h2>
          <p className="mt-8 text-xl md:text-2xl text-white/50 font-light max-w-xl">
            Have a project that needs a bold perspective? Let's build something that <span className="text-white font-medium italic">lasts forever</span>.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* 2. CONTACT INFO (Liquid Glass Pods) */}
          <div className="lg:col-span-4 space-y-4">
            {contactInfo.map((info, index) => (
              <a 
                key={index} 
                href={info.href}
                className="group block p-8 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all duration-500"
              >
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                    <info.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-1">{info.label}</p>
                    <p className="text-sm font-bold truncate max-w-[200px]">{info.value}</p>
                  </div>
                </div>
              </a>
            ))}

            {/* CALL TO ACTION POD */}
            <div className="p-10 rounded-[3rem] bg-white text-black mt-8 group cursor-pointer overflow-hidden relative"
                 onClick={() => window.open("https://calendly.com/bensonmichaelowen/30min", "_blank")}>
                <div className="relative z-10">
                    <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">Book a Session</h3>
                    <p className="text-sm font-medium opacity-70 mb-6">30-minute strategy call to discuss your vision.</p>
                    <div className="flex items-center gap-2 font-black text-xs uppercase tracking-widest">
                        Schedule <ArrowUpRight className="w-4 h-4" />
                    </div>
                </div>
                <Globe className="absolute -right-4 -bottom-4 w-32 h-32 text-black/5 rotate-12" />
            </div>
          </div>

          {/* 3. THE FORM (Editorial Style) */}
          <div className="lg:col-span-8">
            <div className="p-8 md:p-16 rounded-[4rem] bg-white/5 border border-white/10 backdrop-blur-3xl">
              <form action="https://formspree.io/f/xnnnkknq" method="POST" onSubmit={handleSubmit} className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="group relative">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 group-focus-within:text-white transition-colors">Your Name</label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="bg-transparent border-0 border-b border-white/10 rounded-none px-0 py-4 text-xl focus-visible:ring-0 focus-visible:border-white transition-all placeholder:text-white/5"
                      placeholder="OWEN BENSON"
                    />
                  </div>
                  <div className="group relative">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 group-focus-within:text-white transition-colors">Email Address</label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="bg-transparent border-0 border-b border-white/10 rounded-none px-0 py-4 text-xl focus-visible:ring-0 focus-visible:border-white transition-all placeholder:text-white/5"
                      placeholder="HELLO@DOMAIN.COM"
                    />
                  </div>
                </div>

                <div className="group relative">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 group-focus-within:text-white transition-colors">The Subject</label>
                  <Input
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="bg-transparent border-0 border-b border-white/10 rounded-none px-0 py-4 text-xl focus-visible:ring-0 focus-visible:border-white transition-all placeholder:text-white/5"
                    placeholder="BRANDING / WEB / ILLUSTRATION"
                  />
                </div>

                <div className="group relative">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 group-focus-within:text-white transition-colors">The Message</label>
                  <Textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="bg-transparent border-0 border-b border-white/10 rounded-none px-0 py-4 text-xl focus-visible:ring-0 focus-visible:border-white transition-all resize-none placeholder:text-white/5"
                    placeholder="TELL ME ABOUT THE VISION..."
                  />
                </div>

                <Button 
                  type="submit" 
                  className="group w-full py-10 rounded-full bg-white text-black hover:bg-white/90 text-lg font-black uppercase tracking-[0.2em] transition-all"
                >
                  SEND MESSAGE
                  <Send className="ml-4 w-5 h-5 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                </Button>
              </form>

              <div className="mt-12 flex justify-center">
                <a href="https://forms.gle/8CTfPFa5czUdZ26f6" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-xs font-bold text-white/40 hover:text-white transition-colors group">
                  OR SUBMIT A DETAILED DESIGN BRIEF 
                  <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;