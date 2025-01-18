import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "./landing/components/Header";
import { HeroSection } from "./landing/components/HeroSection";
import { FeaturesSection } from "./landing/components/FeaturesSection";
import { TestimonialsSection } from "./landing/components/TestimonialsSection";
import { CTASection } from "./landing/components/CTASection";
import { Footer } from "./landing/components/Footer";
import type { LandingContent, Testimonial } from "./landing/types";

const LandingPage = () => {
  const { t } = useTranslation();
  const [content, setContent] = useState<LandingContent[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const fetchContent = async () => {
      const { data: landingContent, error: contentError } = await supabase
        .from("landing_page_content")
        .select("*")
        .order("order_index");

      if (contentError) {
        console.error("Error fetching landing content:", contentError);
      } else {
        setContent(landingContent);
      }

      const { data: testimonialData, error: testimonialError } = await supabase
        .from("testimonials")
        .select("*")
        .eq("is_active", true)
        .order("is_featured", { ascending: false });

      if (testimonialError) {
        console.error("Error fetching testimonials:", testimonialError);
      } else {
        setTestimonials(testimonialData);
      }
    };

    fetchContent();
  }, []);

  const heroContent = content.find(item => item.section === "hero");
  const featuresContent = content.find(item => item.section === "features");
  const ctaContent = content.find(item => item.section === "cta");

  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection 
        title={heroContent?.title} 
        description={heroContent?.description || ""} 
      />
      <FeaturesSection 
        title={featuresContent?.title} 
        description={featuresContent?.description || ""} 
      />
      <TestimonialsSection testimonials={testimonials} />
      <CTASection 
        title={ctaContent?.title} 
        description={ctaContent?.description || ""} 
      />
      <Footer />
    </div>
  );
};

export default LandingPage;