import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import SEO from "@/components/SEO";
import WebPortfolio from "@/components/web/WebPortfolio";
import WebHero from "@/components/web/WebHero";
import AboutWeb from "@/components/web/AboutWeb";
import WebNavigation from "@/components/web/WebNavigation";
import ContactWeb from "@/components/web/ContactWeb";
import FooterWeb from "@/components/web/FooterWeb";

const WebPortfolioIndex = () => {
  const location = useLocation();
  const baseUrl = "https://owen.paymeo.co";

  // Get meta tag configuration based on current path
  const getMetaConfig = () => {
    switch (location.pathname) {
      case '/dev-portfolio':
        return {
          title: 'Portfolio - Dzidzom Development Projects',
          description: 'Explore my development portfolio featuring web applications, mobile apps, and full-stack projects.',
          canonicalUrl: `${baseUrl}/dev-portfolio`,
          keywords: 'web development portfolio, react projects, full-stack development, mobile apps'
        };
      case '/dev-about':
        return {
          title: 'About Dzidzom - Full-Stack Developer',
          description: 'Learn about my journey as a developer, my technical skills, and what drives me to build innovative solutions.',
          canonicalUrl: `${baseUrl}/dev-about`,
          keywords: 'about developer, technical skills, development experience, programming background'
        };
      case '/dev-contact':
        return {
          title: 'Contact Dzidzom - Let\'s Build Together',
          description: 'Get in touch for development projects, technical consultations, or collaboration opportunities.',
          canonicalUrl: `${baseUrl}/dev-contact`,
          keywords: 'contact developer, hire developer, technical consultation, project collaboration'
        };
      default:
        return {
          title: 'Dzidzom - Full-Stack Developer Portfolio',
          description: 'Professional full-stack developer specializing in React, Node.js, and modern web technologies. View my portfolio and let\'s build something amazing together.',
          canonicalUrl: baseUrl,
          keywords: 'full-stack developer, react developer, web development, portfolio, javascript, node.js'
        };
    }
  };

  const metaConfig = getMetaConfig();

  // Handle scrolling to sections based on route
  useEffect(() => {
    const scrollToSection = () => {
      // Remove 'dev-' prefix for section IDs
      const path = location.pathname;
      let sectionId = '';
      
      if (path === '/dev-portfolio') sectionId = 'portfolio';
      else if (path === '/dev-about') sectionId = 'about';
      else if (path === '/dev-contact') sectionId = 'dev-contact';
      else if (path === '/') sectionId = 'home';
      else sectionId = path.substring(1);

      if (sectionId === "home" || sectionId === "") {
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
      
      <WebNavigation />
      
      <section id="home" itemScope itemType="https://schema.org/CreativeWork">
        <WebHero />
      </section>
      
      <section id="portfolio" itemScope itemType="https://schema.org/SoftwareSourceCode">
        <WebPortfolio />
      </section>
      
      <section id="about" itemScope itemType="https://schema.org/AboutPage">
        <AboutWeb />
      </section>
      
      <section id="dev-contact" itemScope itemType="https://schema.org/ContactPage">
        <ContactWeb />
      </section>
      
      <FooterWeb />
    </div>
  );
};

export default WebPortfolioIndex;