import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import SEO from "@/components/SEO";

const Index = () => {
  const location = useLocation();
  const baseUrl = "https://owen.paymeo.co";

  // Get meta tag configuration based on current path
  const getMetaConfig = () => {
    switch (location.pathname) {
      case '/portfolio':
        return {
          title: 'Portfolio - Dzidzom Graphic Design Projects',
          description: 'Explore my creative graphic design portfolio featuring branding projects, digital art, logo designs, and visual identity work.',
          canonicalUrl: `${baseUrl}/portfolio`,
          keywords: 'graphic design portfolio, branding projects, logo design, digital art portfolio, creative work'
        };
      case '/about':
        return {
          title: 'About Dzidzom - Creative Graphic Designer',
          description: 'Learn about my journey as a graphic designer, my creative process, and what inspires me to create compelling visual solutions.',
          canonicalUrl: `${baseUrl}/about`,
          keywords: 'about graphic designer, creative process, design philosophy, artist bio'
        };
      case '/contact':
        return {
          title: 'Contact Dzidzom - Let\'s Create Together',
          description: 'Get in touch for graphic design projects, collaborations, or creative consultations. Let\'s bring your vision to life.',
          canonicalUrl: `${baseUrl}/contact`,
          keywords: 'contact graphic designer, hire designer, design collaboration, creative consultation'
        };
      default:
        return {
          title: 'Dzidzom - Creative Graphic Designer Portfolio',
          description: 'Professional graphic designer specializing in branding, digital art, and creative visual solutions. View my portfolio and let\'s create something amazing together.',
          canonicalUrl: baseUrl,
          keywords: 'graphic designer, portfolio, branding, digital art, creative design, visual identity, logo design'
        };
    }
  };

  const metaConfig = getMetaConfig();

  // Handle scrolling to sections based on route
  useEffect(() => {
    const scrollToSection = () => {
      const sectionId = location.pathname.substring(1);
      
      if (sectionId === "") {
        window.scrollTo({ top: 0, behavior: 'auto' });
        return;
      }

      const element = document.getElementById(sectionId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 50);
      }
    };

    scrollToSection();
  }, [location.pathname]);

  // Handle direct hash links
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location.hash]);

  return (
    <div className="min-h-screen">
      <SEO {...metaConfig} />
      
      <Navigation />
      
      <section id="home" itemScope itemType="https://schema.org/CreativeWork">
        <Hero />
      </section>
      
      <section id="portfolio" itemScope itemType="https://schema.org/VisualArtwork">
        <Portfolio />
      </section>
      
      <section id="about" itemScope itemType="https://schema.org/AboutPage">
        <About />
      </section>
      
      <section id="contact" itemScope itemType="https://schema.org/ContactPage">
        <Contact />
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;