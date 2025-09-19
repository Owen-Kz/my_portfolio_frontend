import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  keywords?: string;
}

const SEO = ({ 
  title = "Dzidzom - Creative Graphic Designer Portfolio",
  description = "Professional graphic designer specializing in branding, digital art, and creative visual solutions. View my portfolio and let's create something amazing together.",
  canonicalUrl = "https://owen.paymeo.co",
  ogImage = "https://owen.paymeo.co/og-image.jpg",
  ogType = "website",
  keywords = "graphic designer, portfolio, branding, digital art, creative design, visual identity, logo design"
}: SEOProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "VisualArtwork",
          "name": "Dzidzom Graphic Design Portfolio",
          "description": description,
          "url": canonicalUrl,
          "creator": {
            "@type": "Person",
            "name": "Dzidzom",
            "jobTitle": "Graphic Designer",
            "skills": ["Graphic Design", "Branding", "Digital Art", "Visual Identity"]
          },
          "image": ogImage,
          "keywords": keywords
        })}
      </script>
    </Helmet>
  );
};

export default SEO;