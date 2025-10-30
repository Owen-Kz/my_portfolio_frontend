import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, ExternalLink, Terminal, Calendar, Calculator, Maximize2, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContactWeb = () => {
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const { toast } = useToast();

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "bensonmichaelowen@gmail.com",
      href: "mailto:bensonmichaelowen@gmail.com"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+234(0)-9027-315-223",
      href: "tel:+2349027315223"
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Lagos, Nigeria",
      href: "#"
    }
  ];

  const openQuoteCalculator = () => {
    window.open("https://dev-cost-calculator.vercel.app/", "_blank");
  };

  const handleGetQuoteClick = () => {
    setShowQuoteModal(true);
  };

  return (
    <section id="dev-contact" className="py-20 bg-[#0d1117]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Terminal className="w-8 h-8 text-[#4E9C7E]" />
            <h2 className="text-2xl md:text-3xl font-bold text-white font-mono">
              $ get_quote --project
            </h2>
          </div>
          <p className="text-lg text-[#7d8590] max-w-3xl mx-auto font-mono leading-relaxed">
                Ready to start your project? Get an instant estimate for your development needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-6 animate-slide-up">
            {contactInfo.map((info, index) => (
              <Card 
                key={info.title}
                className="border border-[#30363d] bg-[#161b22] hover:border-[#4E9C7E] transition-all duration-300 animate-scale-in group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#21262d] border border-[#30363d] rounded-lg flex items-center justify-center group-hover:border-[#4E9C7E] transition-colors">
                      <info.icon className="w-5 h-5 text-[#4E9C7E]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white font-mono text-sm mb-1">{info.title}</h3>
                      <a 
                        href={info.href}
                        className="text-[#7d8590] hover:text-[#4E9C7E] transition-colors text-sm font-mono"
                      >
                        {info.value}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Schedule Call Section */}
            <Card className="border border-[#30363d] bg-[#161b22]">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-[#4E9C7E] rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-6 h-6 text-black" />
                </div>
                <h3 className="text-xl font-bold text-white font-mono mb-3">Schedule a Call</h3>
                <p className="text-[#7d8590] mb-4 font-mono text-sm leading-relaxed">
                  Let's discuss your project requirements and timeline.
                </p>
                <Button 
                  className="w-full bg-[#4E9C7E] hover:bg-[#5FBB97] text-black font-mono border-0"
                  onClick={() => window.open("https://calendly.com/bensonmichaelowen/30min", "_blank")}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Meeting
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Get Quote Section */}
          <div className="lg:col-span-2">
            <Card className="border border-[#30363d] bg-[#161b22] animate-slide-up">
              {/* Terminal Header */}
              <div className="flex items-center gap-3 p-4 bg-[#21262d] border-b border-[#30363d]">
                <div className="flex gap-2">
                              <div className="w-3 h-3 bg-[#E95420] rounded-full"></div>
                  <div className="w-3 h-3 bg-[#38B44A] rounded-full"></div>
                  <div className="w-3 h-3 bg-[#EDD64D] rounded-full"></div>
                </div>
                <CardTitle className="text-white font-mono text-sm">project_quote.sh</CardTitle>
              </div>
              
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-[#21262d] border border-[#30363d] rounded-2xl flex items-center justify-center mx-auto mb-6 group hover:border-[#4E9C7E] transition-colors">
                  <Calculator className="w-10 h-10 text-[#4E9C7E] group-hover:scale-110 transition-transform" />
                </div>
                
                <h3 className="text-2xl font-bold text-white font-mono mb-4">
                  Get Project Quote
                </h3>
                
                <p className="text-[#7d8590] mb-8 font-mono leading-relaxed">
                  Use our interactive calculator to get an instant estimate for your web or mobile application. 
                  Customize features, timeline, and complexity to see real-time pricing.
                </p>

                <div className="space-y-4">
                  <Button 
                    onClick={handleGetQuoteClick}
                    className="w-full bg-[#4E9C7E] hover:bg-[#5FBB97] text-black font-mono py-6 text-lg border-0 transition-all duration-300 hover:scale-105"
                    size="lg"
                  >
                    <Calculator className="w-5 h-5 mr-3" />
                    Launch Quote Calculator
                  </Button>
                  
                  <div className="text-[#8b949e] font-mono text-sm">
                    Takes 2-3 minutes • No commitment required
                  </div>
                </div>

                {/* Features List */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#4E9C7E] rounded-full"></div>
                    <span className="text-[#7d8590] font-mono text-sm">Real-time pricing</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#4E9C7E] rounded-full"></div>
                    <span className="text-[#7d8590] font-mono text-sm">Feature customization</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#4E9C7E] rounded-full"></div>
                    <span className="text-[#7d8590] font-mono text-sm">Timeline estimates</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#4E9C7E] rounded-full"></div>
                    <span className="text-[#7d8590] font-mono text-sm">Detailed breakdown</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Status Info */}
            <Card className="mt-6 border border-[#30363d] bg-[#161b22]">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#4E9C7E] rounded-full animate-pulse"></div>
                  <div className="text-[#7d8590] font-mono text-sm">
                    Status: <span className="text-[#4E9C7E]">Available for new projects</span>
                  </div>
                </div>
                <div className="mt-2 text-[#8b949e] font-mono text-xs">
                  Response time: Typically within 24 hours for quote requests
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Quote Calculator Modal */}
      {showQuoteModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-[#161b22] border border-[#30363d] rounded-lg shadow-2xl">
            {/* Terminal Header */}
            <div className="flex items-center justify-between p-4 bg-[#21262d] border-b border-[#30363d]">
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-[#4E9C7E] rounded-full"></div>
                  <div className="w-3 h-3 bg-[#1f6feb] rounded-full"></div>
                  <div className="w-3 h-3 bg-[#da3633] rounded-full"></div>
                </div>
                <span className="text-white font-mono text-sm">dev_cost_calculator --preview</span>
              </div>
              
              <div className="flex gap-2">
                <Button
                  onClick={openQuoteCalculator}
                  size="sm"
                  className="bg-[#21262d] border border-[#30363d] text-[#7d8590] hover:bg-[#30363d] hover:text-white font-mono text-xs"
                >
                  <Maximize2 className="w-3 h-3 mr-1" />
                  Maximize
                </Button>
                <Button
                  onClick={() => setShowQuoteModal(false)}
                  size="sm"
                  className="bg-[#21262d] border border-[#30363d] text-[#7d8590] hover:bg-[#30363d] hover:text-white font-mono text-xs"
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            </div>

            {/* Calculator Preview */}
            <div className="p-6">
              <div className="aspect-video bg-[#21262d] border border-[#30363d] rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Calculator className="w-16 h-16 text-[#4E9C7E] mx-auto mb-4" />
                  <h3 className="text-white font-mono text-xl mb-2">Development Cost Calculator</h3>
                  <p className="text-[#7d8590] font-mono text-sm mb-6 max-w-md">
                    Interactive tool to estimate your project costs based on features, 
                    complexity, and timeline requirements.
                  </p>
                  
                  <div className="flex gap-4 justify-center">
                    <Button
                      onClick={openQuoteCalculator}
                      className="bg-[#4E9C7E] hover:bg-[#5FBB97] text-black font-mono"
                    >
                      <Maximize2 className="w-4 h-4 mr-2" />
                      Open Full Calculator
                    </Button>
                    
                    <Button
                      onClick={() => setShowQuoteModal(false)}
                      variant="outline"
                      className="bg-[#21262d] border border-[#30363d] text-[#7d8590] hover:bg-[#30363d] hover:text-white font-mono"
                    >
                      Close Preview
                    </Button>
                  </div>
                </div>
              </div>

              {/* Quick Features */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-[#21262d] border border-[#30363d] rounded-lg">
                  <div className="w-8 h-8 bg-[#4E9C7E] rounded-lg flex items-center justify-center mx-auto mb-2">
                    <span className="text-black font-mono text-xs">$</span>
                  </div>
                  <h4 className="text-white font-mono text-sm mb-1">Real-time Pricing</h4>
                  <p className="text-[#8b949e] font-mono text-xs">See costs update as you select features</p>
                </div>
                
                <div className="text-center p-4 bg-[#21262d] border border-[#30363d] rounded-lg">
                  <div className="w-8 h-8 bg-[#1f6feb] rounded-lg flex items-center justify-center mx-auto mb-2">
                    <span className="text-white font-mono text-xs">⚡</span>
                  </div>
                  <h4 className="text-white font-mono text-sm mb-1">Instant Results</h4>
                  <p className="text-[#8b949e] font-mono text-xs">Get estimates in under 3 minutes</p>
                </div>
                
                <div className="text-center p-4 bg-[#21262d] border border-[#30363d] rounded-lg">
                  <div className="w-8 h-8 bg-[#4E9C7E] rounded-lg flex items-center justify-center mx-auto mb-2">
                    <span className="text-black font-mono text-xs">📊</span>
                  </div>
                  <h4 className="text-white font-mono text-sm mb-1">Detailed Breakdown</h4>
                  <p className="text-[#8b949e] font-mono text-xs">Understand what you're paying for</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ContactWeb;