import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Palette, Lightbulb, Users, Award } from "lucide-react";

const About = () => {
  const skills = [
    { name: "Adobe Creative Suite", level: 95 },
    { name: "UI/UX Design", level: 90 },
    { name: "Branding & Identity", level: 88 },
    { name: "Web Design", level: 85 },
    { name: "Print Design", level: 82 },
    { name: "Illustration", level: 78 },
    { name: "Logo Design", level: 90 },
    { name: "Visual Hierarchy", level: 95 },
  ];

  const stats = [
    { icon: Palette, number: "150+", label: "Projects Completed" },
    { icon: Users, number: "50+", label: "Happy Clients" },
    { icon: Award, number: "15+", label: "Awards Won" },
    { icon: Lightbulb, number: "5+", label: "Years Experience" }
  ];

  return (
    <section id="about" className="py-12 sm:py-16 lg:py-20 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left Column - About Text */}
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 bg-gradient-primary bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="space-y-4 sm:space-y-6 text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                I'm a passionate graphic designer with over 5 years of experience creating 
                visual solutions that communicate, inspire, and captivate audiences. My journey 
                began with a love for art and technology, which naturally evolved into a career 
                in design.
              </p>
              <p>
                I specialize in brand identity, web design, and digital illustrations. My approach 
                combines strategic thinking with creative execution, ensuring every project not 
                only looks amazing but also serves its intended purpose effectively.
              </p>
              <p>
                When I'm not designing, you can find me exploring new design trends, 
                experimenting with emerging technologies, or sharing knowledge with the 
                design community.
              </p>
            </div>

            {/* Skills */}
            <div className="mt-8 sm:mt-12">
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-6 text-foreground">Skills & Expertise</h3>
              <div className="space-y-4 sm:space-y-6">
                {skills.map((skill, index) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-1 sm:mb-2">
                      <span className="font-medium text-foreground text-sm sm:text-base">{skill.name}</span>
                      <span className="text-creative-primary font-medium text-sm sm:text-base">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-1.5 sm:h-2" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Stats & Info */}
          <div>
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-12">
              {stats.map((stat, index) => (
                <Card 
                  key={stat.label}
                  className="text-center p-3 sm:p-4 md:p-6 border-0 shadow-soft hover:shadow-card-hover transition-all duration-300 bg-gradient-card backdrop-blur-sm"
                >
                  <CardContent className="p-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-4">
                      <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-8 md:h-8 text-white" />
                    </div>
                    <div className="text-xl sm:text-2xl md:text-3xl font-bold text-creative-primary mb-1 sm:mb-2">{stat.number}</div>
                    <div className="text-muted-foreground text-xs sm:text-sm">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Values */}
            <Card className="border-0 shadow-soft bg-gradient-card backdrop-blur-sm">
              <CardContent className="p-4 sm:p-6 md:p-8">
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 sm:mb-6 text-foreground">My Design Philosophy</h3>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-creative-primary rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1 text-sm sm:text-base">Purpose-Driven Design</h4>
                      <p className="text-muted-foreground text-xs sm:text-sm">Every design decision serves a strategic purpose and user need.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-creative-secondary rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1 text-sm sm:text-base">Continuous Innovation</h4>
                      <p className="text-muted-foreground text-xs sm:text-sm">Staying ahead of trends while maintaining timeless appeal.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-creative-accent rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1 text-sm sm:text-base">Collaborative Approach</h4>
                      <p className="text-muted-foreground text-xs sm:text-sm">Working closely with clients to bring their vision to life.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;