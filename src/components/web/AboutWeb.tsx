import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Code, Cpu, Database, Server, Terminal, GitBranch, Cloud, Shield } from "lucide-react";

const AboutWeb = () => {
  const skills = [
    { name: "TypeScript/JavaScript", level: 95, icon: Code },
    { name: "React & Next.js", level: 90, icon: Cpu },
    { name: "Node.js & Backend", level: 88, icon: Server },
    { name: "Database Design", level: 85, icon: Database },
    { name: "Cloud Infrastructure", level: 82, icon: Cloud },
    { name: "Git & Version Control", level: 95, icon: GitBranch },
    { name: "API Development", level: 90, icon: Terminal },
    { name: "Security Best Practices", level: 85, icon: Shield },
  ];

  const stats = [
    { icon: Code, number: "50+", label: "Projects Deployed" },
    { icon: GitBranch, number: "100+", label: "GitHub Contributions" },
    { icon: Server, number: "25k+", label: "Lines of Code" },
    { icon: Database, number: "3+", label: "Years Experience" }
  ];

  const technologies = [
    { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue.js", "Java"] },
    { category: "Backend", items: ["Node.js", "Python", "Express", "FastAPI", "GraphQL", "PHP", "Java"] },
    { category: "Database", items: ["MongoDB", "PostgreSQL", "Redis", "Firebase", "MariaDB"] },
    { category: "Tools", items: ["Git", "Docker", "AWS", "Vercel", "Figma", "Flutter", "Android Studio"] }
  ];

  return (
    <section id="dev-about" className="py-12 sm:py-16 lg:py-20 bg-[#0d1117] border-t border-[#30363d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
          {/* Left Column - About Text */}
          <div>
            <div className="font-mono text-xs sm:text-sm text-[#7d8590] mb-2 flex items-center gap-2">
              <Terminal className="w-3 h-3 sm:w-4 sm:h-4 text-[#238636]" />
              <span>$ whoami</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-white font-mono">
              About Me
            </h2>
            <div className="space-y-4 sm:space-y-6 text-sm sm:text-base md:text-lg text-[#7d8590] leading-relaxed font-mono">
              <p>
                I'm a passionate full-stack developer with over 5 years of experience building 
                scalable web applications and digital solutions. My journey began with curiosity 
                about how things work, which evolved into a love for creating with code.
              </p>
              <p>
                I specialize in modern JavaScript ecosystems, cloud infrastructure, and 
                creating seamless user experiences. My approach combines clean architecture 
                with practical solutions, ensuring every project is maintainable, scalable, 
                and delivers real value.
              </p>
              <p>
                When I'm not coding, you can find me contributing to open-source projects, 
                exploring new technologies, or sharing knowledge with the developer community.
              </p>
            </div>

            {/* Skills with GitHub-style progress */}
            <div className="mt-8 sm:mt-12">
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-6 sm:mb-8 text-white font-mono">Skills & Expertise</h3>
              <div className="space-y-4 sm:space-y-6">
                {skills.map((skill, index) => (
                  <div key={skill.name}>
                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <skill.icon className="w-3 h-3 sm:w-4 sm:h-4 text-[#238636]" />
                        <span className="font-medium text-white font-mono text-xs sm:text-sm">{skill.name}</span>
                      </div>
                      <span className="text-[#238636] font-mono text-xs sm:text-sm bg-[#238636]/10 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-[#161b22] rounded-full h-1.5 sm:h-2 border border-[#30363d]">
                      <div 
                        className="bg-gradient-to-r from-[#238636] to-[#1f6feb] h-1.5 sm:h-2 rounded-full transition-all duration-1000 ease-out hover:from-[#2ea043] hover:to-[#388bfd]"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Stats & Info */}
          <div>
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-8 sm:mb-12">
              {stats.map((stat, index) => (
                <Card 
                  key={stat.label}
                  className="text-center p-3 sm:p-4 md:p-6 border border-[#30363d] bg-[#161b22] hover:border-[#238636] transition-all duration-300"
                >
                  <CardContent className="p-0">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-[#0d1117] border border-[#30363d] rounded-lg flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-4 hover:border-[#238636] transition-colors">
                      <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#7d8590] hover:text-[#238636]" />
                    </div>
                    <div className="text-lg sm:text-xl md:text-2xl font-bold text-white font-mono mb-1">{stat.number}</div>
                    <div className="text-[#7d8590] text-xs sm:text-sm font-mono">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Technology Stack */}
            <Card className="border border-[#30363d] bg-[#161b22] mb-4 sm:mb-6">
              <CardContent className="p-4 sm:p-5 md:p-6">
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <Code className="w-4 h-4 sm:w-5 sm:h-5 text-[#238636]" />
                  <h3 className="text-lg sm:text-xl font-semibold text-white font-mono">Tech Stack</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {technologies.map((tech) => (
                    <div key={tech.category}>
                      <h4 className="text-[#7d8590] text-xs sm:text-sm font-mono mb-1 sm:mb-2">{tech.category}</h4>
                      <div className="flex flex-wrap gap-1">
                        {tech.items.map((item) => (
                          <span 
                            key={item}
                            className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-[#0d1117] border border-[#30363d] text-[#7d8590] text-xs font-mono rounded hover:border-[#238636] hover:text-white transition-colors cursor-default"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Development Philosophy */}
            <Card className="border border-[#30363d] bg-[#161b22]">
              <CardContent className="p-4 sm:p-5 md:p-6">
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <Terminal className="w-4 h-4 sm:w-5 sm:h-5 text-[#238636]" />
                  <h3 className="text-lg sm:text-xl font-semibold text-white font-mono">Development Principles</h3>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#238636] rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-white mb-1 font-mono text-xs sm:text-sm">Clean Code & Best Practices</h4>
                      <p className="text-[#7d8590] text-xs sm:text-sm font-mono">Writing maintainable, scalable code with comprehensive documentation.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#1f6feb] rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-white mb-1 font-mono text-xs sm:text-sm">Performance First</h4>
                      <p className="text-[#7d8590] text-xs sm:text-sm font-mono">Optimizing for speed, efficiency, and optimal user experience.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#da3633] rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-white mb-1 font-mono text-xs sm:text-sm">Security Minded</h4>
                      <p className="text-[#7d8590] text-xs sm:text-sm font-mono">Building with security best practices and data protection in mind.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#e3b341] rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-white mb-1 font-mono text-xs sm:text-sm">Continuous Learning</h4>
                      <p className="text-[#7d8590] text-xs sm:text-sm font-mono">Staying updated with emerging technologies and industry trends.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Current Focus */}
        <div className="mt-12 sm:mt-16">
          <Card className="border border-[#30363d] bg-[#161b22]">
            <CardContent className="p-4 sm:p-5 md:p-6">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#238636] rounded-full animate-pulse"></div>
                <h3 className="text-lg sm:text-xl font-semibold text-white font-mono">Currently Exploring</h3>
              </div>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {["AI/ML Integration", "Web3 Technologies", "Edge Computing", "Real-time Applications", "Microservices Architecture"].map((tech) => (
                  <span 
                    key={tech}
                    className="px-2 sm:px-3 py-1 sm:py-2 bg-[#238636]/10 border border-[#238636]/30 text-[#238636] text-xs sm:text-sm font-mono rounded-lg hover:bg-[#238636]/20 transition-colors cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutWeb;