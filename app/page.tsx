import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { Numbers } from "@/components/Numbers";
import { WhoItsFor } from "@/components/WhoItsFor";
import { SocialProof } from "@/components/SocialProof";
import { Pricing } from "@/components/Pricing";
import { FinalCTA } from "@/components/FinalCTA";
import { Solution } from "@/components/Solution";
import { OrderJourney } from "@/components/OrderJourney";


export default function Page() {
  return (
    <main id="main" className="relative">
      <Nav />
      <Hero />
      <Problem />
      <Solution />
      <OrderJourney />
      <Numbers />
      <WhoItsFor />
      <SocialProof />
      <Pricing />
      <FinalCTA />
    </main>
  );
}
