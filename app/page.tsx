import { AnnouncementBar } from "@/components/site/AnnouncementBar";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Statement } from "@/components/site/Statement";
import { TikTok } from "@/components/site/TikTok";
import { Metrics } from "@/components/site/Metrics";
import { Features } from "@/components/site/Features";
import { ProductTour } from "@/components/site/ProductTour";
import { ProjectDetail } from "@/components/site/ProjectDetail";
import { AiFeature } from "@/components/site/AiFeature";
import { Trust } from "@/components/site/Trust";
import { Assurance } from "@/components/site/Assurance";
import { Comparison } from "@/components/site/Comparison";
import { Calculator } from "@/components/site/Calculator";
import { Pricing } from "@/components/site/Pricing";
import { Steps } from "@/components/site/Steps";
import { Faq } from "@/components/site/Faq";
import { Contact } from "@/components/site/Contact";
import { FinalCta } from "@/components/site/FinalCta";
import { Footer } from "@/components/site/Footer";
import { FloatCta } from "@/components/site/FloatCta";
import { BackToTop } from "@/components/site/BackToTop";
import { DotNav } from "@/components/site/DotNav";
import { CookieBanner } from "@/components/site/CookieBanner";
import { DemoModal } from "@/components/site/DemoModal";
import { SiteInteractions } from "@/components/site/SiteInteractions";

export default function Page() {
  return (
    <>
      <AnnouncementBar />
      <Nav />
      <main id="top">
        <Hero />
        <Statement />
        <TikTok />
        <Metrics />
        <Features />
        <ProductTour />
        <ProjectDetail />
        <AiFeature />
        <Trust />
        <Assurance />
        <Comparison />
        <Calculator />
        <Pricing />
        <Steps />
        <Faq />
        <Contact />
        <FinalCta />
      </main>
      <Footer />
      <FloatCta />
      <BackToTop />
      <DotNav />
      <CookieBanner />
      <DemoModal />
      <SiteInteractions />
    </>
  );
}
