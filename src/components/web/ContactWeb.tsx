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
    <section id="dev-contact" className="py-12 sm:py-16 lg:py-20 bg-[#0d1117]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <Terminal className="w-6 h-6 sm:w-8 sm:h-8 text-[#4E9C7E]" />
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white font-mono">
              $ get_quote --project
            </h2>
          </div>
          <p className="text-sm sm:text-base md:text-lg text-[#7d8590] max-w-3xl mx-auto font-mono leading-relaxed px-2">
            Ready to start your project? Get an instant estimate for your development needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Contact Info */}
          <div className="space-y-4 sm:space-y-6">
            {contactInfo.map((info, index) => (
              <Card 
                key={info.title}
                className="border border-[#30363d] bg-[#161b22] hover:border-[#4E9C7E] transition-all duration-300 group"
              >
                <CardContent className="p-3 sm:p-4 md:p-5">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-[#21262d] border border-[#30363d] rounded-lg flex items-center justify-center group-hover:border-[#4E9C7E] transition-colors">
                      <info.icon className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#4E9C7E]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white font-mono text-xs sm:text-sm mb-1 truncate">{info.title}</h3>
                      <a 
                        href={info.href}
                        className="text-[#7d8590] hover:text-[#4E9C7E] transition-colors text-xs sm:text-sm font-mono break-words"
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
              <CardContent className="p-4 sm:p-5 md:p-6 text-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-[#4E9C7E] rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-black" />
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-white font-mono mb-2 sm:mb-3">Schedule a Call</h3>
                <p className="text-[#7d8590] mb-3 sm:mb-4 font-mono text-xs sm:text-sm leading-relaxed">
                  Let's discuss your project requirements and timeline.
                </p>
                <Button 
                  className="w-full bg-[#4E9C7E] hover:bg-[#5FBB97] text-black font-mono border-0 text-xs sm:text-sm py-2 sm:py-3"
                  onClick={() => window.open("https://calendly.com/bensonmichaelowen/30min", "_blank")}
                >
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  Book Meeting
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Get Quote Section */}
          <div className="lg:col-span-2">
            <Card className="border border-[#30363d] bg-[#161b22]">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-[#21262d] border-b border-[#30363d]">
                <div className="flex gap-1 sm:gap-2">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#E95420] rounded-full"></div>
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#38B44A] rounded-full"></div>
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#EDD64D] rounded-full"></div>
                </div>
                <CardTitle className="text-white font-mono text-xs sm:text-sm">project_quote.sh</CardTitle>
              </div>
              
              <CardContent className="p-4 sm:p-6 md:p-8 text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-[#21262d] border border-[#30363d] rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group hover:border-[#4E9C7E] transition-colors">
                  <Calculator className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#4E9C7E] group-hover:scale-110 transition-transform" />
                </div>
                
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white font-mono mb-3 sm:mb-4">
                  Get Project Quote
                </h3>
                
                <p className="text-[#7d8590] mb-6 sm:mb-8 font-mono text-xs sm:text-sm leading-relaxed">
                  Use our interactive calculator to get an instant estimate for your web or mobile application. 
                  Customize features, timeline, and complexity to see real-time pricing.
                </p>

                <div className="space-y-3 sm:space-y-4">
                  <Button 
                    onClick={handleGetQuoteClick}
                    className="w-full bg-[#4E9C7E] hover:bg-[#5FBB97] text-black font-mono py-3 sm:py-4 md:py-6 text-sm sm:text-base md:text-lg border-0 transition-all duration-300 hover:scale-105"
                    size="lg"
                  >
                    <Calculator className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                    Launch Quote Calculator
                  </Button>
                  
                  <div className="text-[#8b949e] font-mono text-xs sm:text-sm">
                    Takes 2-3 minutes • No commitment required
                  </div>
                </div>

                {/* Features List */}
                <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4 text-left">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#4E9C7E] rounded-full flex-shrink-0"></div>
                    <span className="text-[#7d8590] font-mono text-xs sm:text-sm">Real-time pricing</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#4E9C7E] rounded-full flex-shrink-0"></div>
                    <span className="text-[#7d8590] font-mono text-xs sm:text-sm">Feature customization</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#4E9C7E] rounded-full flex-shrink-0"></div>
                    <span className="text-[#7d8590] font-mono text-xs sm:text-sm">Timeline estimates</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#4E9C7E] rounded-full flex-shrink-0"></div>
                    <span className="text-[#7d8590] font-mono text-xs sm:text-sm">Detailed breakdown</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Status Info */}
            <Card className="mt-4 sm:mt-6 border border-[#30363d] bg-[#161b22]">
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#4E9C7E] rounded-full animate-pulse flex-shrink-0"></div>
                  <div className="text-[#7d8590] font-mono text-xs sm:text-sm">
                    Status: <span className="text-[#4E9C7E]">Available for new projects</span>
                  </div>
                </div>
                <div className="mt-1 sm:mt-2 text-[#8b949e] font-mono text-xs">
                  Response time: Typically within 24 hours for quote requests
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Quote Calculator Modal */}
      {showQuoteModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-2 sm:p-4">
          <div className="relative max-w-4xl w-full bg-[#161b22] border border-[#30363d] rounded-lg shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Terminal Header */}
            <div className="flex items-center justify-between p-3 sm:p-4 bg-[#21262d] border-b border-[#30363d]">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex gap-1 sm:gap-2">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#4E9C7E] rounded-full"></div>
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#1f6feb] rounded-full"></div>
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#da3633] rounded-full"></div>
                </div>
                <span className="text-white font-mono text-xs sm:text-sm">dev_cost_calculator --preview</span>
              </div>
              
              <div className="flex gap-1 sm:gap-2">
                <Button
                  onClick={openQuoteCalculator}
                  size="sm"
                  className="bg-[#21262d] border border-[#30363d] text-[#7d8590] hover:bg-[#30363d] hover:text-white font-mono text-xs h-8"
                >
                  <Maximize2 className="w-3 h-3 mr-1" />
                  <span className="hidden sm:inline">Maximize</span>
                </Button>
                <Button
                  onClick={() => setShowQuoteModal(false)}
                  size="sm"
                  className="bg-[#21262d] border border-[#30363d] text-[#7d8590] hover:bg-[#30363d] hover:text-white font-mono text-xs h-8"
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            </div>

            {/* Calculator Preview */}
            <div className="p-3 sm:p-4 md:p-6">
              <div className="aspect-video bg-[#21262d] border border-[#30363d] rounded-lg flex items-center justify-center p-4">
                <div className="text-center">
                  <Calculator className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-[#4E9C7E] mx-auto mb-3 sm:mb-4" />
                  <h3 className="text-white font-mono text-base sm:text-lg md:text-xl mb-2">Development Cost Calculator</h3>
                  <p className="text-[#7d8590] font-mono text-xs sm:text-sm mb-4 sm:mb-6 max-w-md">
                    Interactive tool to estimate your project costs based on features, 
                    complexity, and timeline requirements.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center">
                    <Button
                      onClick={openQuoteCalculator}
                      className="bg-[#4E9C7E] hover:bg-[#5FBB97] text-black font-mono text-xs sm:text-sm"
                    >
                      <Maximize2 className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                      Open Full Calculator
                    </Button>
                    
                    <Button
                      onClick={() => setShowQuoteModal(false)}
                      variant="outline"
                      className="bg-[#21262d] border border-[#30363d] text-[#7d8590] hover:bg-[#30363d] hover:text-white font-mono text-xs sm:text-sm"
                    >
                      Close Preview
                    </Button>
                  </div>
                </div>
              </div>

              {/* Quick Features */}
              <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
                <div className="text-center p-3 sm:p-4 bg-[#21262d] border border-[#30363d] rounded-lg">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#4E9C7E] rounded-lg flex items-center justify-center mx-auto mb-2">
                    <span className="text-black font-mono text-xs">$</span>
                  </div>
                  <h4 className="text-white font-mono text-xs sm:text-sm mb-1">Real-time Pricing</h4>
                  <p className="text-[#8b949e] font-mono text-xs">See costs update as you select features</p>
                </div>
                
                <div className="text-center p-3 sm:p-4 bg-[#21262d] border border-[#30363d] rounded-lg">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#1f6feb] rounded-lg flex items-center justify-center mx-auto mb-2">
                    <span className="text-white font-mono text-xs">⚡</span>
                  </div>
                  <h4 className="text-white font-mono text-xs sm:text-sm mb-1">Instant Results</h4>
                  <p className="text-[#8b949e] font-mono text-xs">Get estimates in under 3 minutes</p>
                </div>
                
                <div className="text-center p-3 sm:p-4 bg-[#21262d] border border-[#30363d] rounded-lg">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#4E9C7E] rounded-lg flex items-center justify-center mx-auto mb-2">
                    <span className="text-black font-mono text-xs">📊</span>
                  </div>
                  <h4 className="text-white font-mono text-xs sm:text-sm mb-1">Detailed Breakdown</h4>
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