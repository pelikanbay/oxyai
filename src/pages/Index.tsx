import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Monetization from "@/components/Monetization";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground font-['Inter']">
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <Monetization />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
