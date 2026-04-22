import { motion } from "framer-motion";
import { Palette, Lightbulb, Users, Award, ArrowUpRight } from "lucide-react";

const About = () => {
  const skills = [
    { name: "Creative Direction", level: "95%" },
    { name: "UI/UX Architecture", level: "90%" },
    { name: "Brand Identity", level: "88%" },
    { name: "Motion Design", level: "82%" },
  ];

  const stats = [
    { icon: Palette, number: "150+", label: "Masterpieces" },
    { icon: Users, number: "50+", label: "Global Clients" },
    { icon: Award, number: "15+", label: "Industry Awards" },
    { icon: Lightbulb, number: "05+", label: "Years of Craft" }
  ];

  return (
    <section id="about" className="relative py-32 bg-[#050505]/90  text-white overflow-hidden">
      {/* Background Decorative Text (Intimidating Element) */}
      <div className="absolute top-0 right-0 text-[20vw] font-black text-white/[0.02] leading-none select-none pointer-events-none translate-x-1/4">
        ABOUT
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* LEFT SIDE: THE BOLD STATEMENT (Column 1-7) */}
          <div className="lg:col-span-7 space-y-12">
            <div>
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-xs font-black tracking-[0.5em] text-white/30 uppercase block mb-4"
              >
                01. The Mindset
              </motion.span>
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] uppercase">
                I don't just design. <br />
                <span className="text-white/20">I build legacies.</span>
              </h2>
            </div>

            <div className="space-y-8 text-xl md:text-2xl text-white/60 font-light leading-relaxed max-w-2xl">
              <p>
                My approach is <span className="text-white font-medium italic">aggressive and intentional</span>. 
                I strip away the noise to find the core essence of a brand, then amplify it 
                with surgical precision.
              </p>
              <p className="text-lg md:text-xl">
                Based at the intersection of art and logic, I’ve spent over half a decade 
                perfecting the craft of visual storytelling and user experience.
              </p>
            </div>

            {/* MODERN SKILL BARS (Liquid Glass Style) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
              {skills.map((skill) => (
                <div key={skill.name} className="group">
                  <div className="flex justify-between items-end mb-3">
                    <span className="text-xs font-black uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">
                      {skill.name}
                    </span>
                    <span className="text-sm font-bold italic">{skill.level}</span>
                  </div>
                  <div className="h-[2px] w-full bg-white/10 overflow-hidden rounded-full">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: skill.level }}
                      transition={{ duration: 1.5, ease: "circOut" }}
                      className="h-full bg-white group-hover:bg-blue-500 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE: THE STATS & PHILOSOPHY (Column 8-12) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* STATS PODS (Liquid Glass Cards) */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all duration-500 group"
                >
                  <stat.icon className="w-5 h-5 text-white/20 group-hover:text-white mb-6 transition-colors" />
                  <div className="text-4xl font-black tracking-tighter mb-1">{stat.number}</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-white/40">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* PHILOSOPHY CARD (Large Curved Card) */}
            <div className="relative p-10 rounded-[3rem] bg-gradient-to-br from-white/10 to-transparent border border-white/10 overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
                
                <h3 className="text-xl font-black uppercase tracking-widest mb-8 border-b border-white/10 pb-4">
                    The Philosophy
                </h3>
                
                <div className="space-y-8">
                    {[
                        { t: "Radical Simplicity", d: "If it doesn't add value, it's a distraction." },
                        { t: "Timeless Impact", d: "Designed today to look relevant in a decade." },
                        { t: "Fearless Logic", d: "Every pixel is placed with strategic intent." }
                    ].map((item, i) => (
                        <div key={i} className="flex gap-4 group">
                            <span className="text-xs font-black text-white/20 mt-1">0{i+1}</span>
                            <div>
                                <h4 className="font-bold uppercase text-sm group-hover:text-blue-400 transition-colors">{item.t}</h4>
                                <p className="text-sm text-white/50">{item.d}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <button className="mt-10 flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] hover:gap-4 transition-all">
                    Download Portfolio <ArrowUpRight className="w-4 h-4" />
                </button>
            </div>
          </div>

        </div>
      </div>

      {/* SECTION BOTTOM CURVE (The "Scoop") */}
      {/* <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] rotate-180">
        <svg className="relative block w-full h-[80px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5,73.84-4.36,147.54,16.88,218.2,35.26,69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-32.82,80.5-34.83,172.34-48.8,203.1,4.42V120H0Z" fill="#111111"></path>
        </svg>
      </div> */}
    </section>
  );
};

export default About;