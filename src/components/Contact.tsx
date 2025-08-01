import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    fetch('https://formspree.io/f/xnnnkknq', {
      method: 'POST',
      body: data,
      headers: {
          'Accept': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        toast({
          title: "Message Sent!",
          description: "Thank you for your message. I'll get back to you soon!",
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        response.json().then(data => {
          if (Object.hasOwn(data, 'errors')) {
            const errors = data['errors'].map((error: any) => error['message']).join(', ');
            toast({
              title: "Submission Error",
              description: `There were errors with your submission: ${errors}`,
              variant: 'destructive'
            });
          } else {
            toast({
              title: "Submission Error",
              description: "Oops! There was a problem submitting your form",
              variant: 'destructive'
            });
          }
        })
      }
    }).catch(error => {
      toast({
        title: "Submission Error",
        description: "Oops! There was a problem submitting your form",
        variant: 'destructive'
      });
    });
    // toast({
    //   title: "Message Sent!",
    //   description: "Thank you for your message. I'll get back to you soon!",
    // });
    // setFormData({ name: '', email: '', subject: '', message: '' });
  };

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
      value: "+234(0)-8142-385-302",
      href: "tel:+2348142385302"
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Lagos, Nigeria",
      href: "#"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Let's Work Together
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Have a project in mind? I'd love to hear about it. Let's create something amazing together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="space-y-8 animate-slide-up">
            {contactInfo.map((info, index) => (
              <Card 
                key={info.title}
                className="border-0 shadow-soft hover:shadow-card-hover transition-all duration-300 bg-gradient-card backdrop-blur-sm animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                      <info.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{info.title}</h3>
                      <a 
                        href={info.href}
                        className="text-muted-foreground hover:text-creative-primary transition-colors"
                      >
                        {info.value}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* CTA Section */}
            <Card className="border-0 shadow-soft bg-gradient-primary text-white">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Ready to Start?</h3>
                <p className="mb-6 opacity-90">
                  Let's discuss your project and bring your vision to life.
                </p>
                <Button 
                  variant="secondary" 
                  className="bg-white text-creative-primary hover:bg-white/90 font-semibold"
                >
                  Schedule a Call
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-soft bg-gradient-card backdrop-blur-sm animate-slide-up">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-foreground">Send Me a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form   action="https://formspree.io/f/xnnnkknq"
  method="POST" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="border-border focus:border-creative-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="border-border focus:border-creative-primary"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="border-border focus:border-creative-primary"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className="border-border focus:border-creative-primary resize-none"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    size="lg"
                    className="w-full bg-creative-primary hover:bg-creative-primary/90 text-white font-semibold"
                  >
                    Send Message
                    <Send className="ml-2 w-5 h-5" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;