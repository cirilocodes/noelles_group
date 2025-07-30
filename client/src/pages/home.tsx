import Navigation from "@/components/navigation";
import Hero from "@/components/hero";
import About from "@/components/about";
import Features from "@/components/features";
import HowItWorks from "@/components/how-it-works";
import Newsletter from "@/components/newsletter";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Features />
      <HowItWorks />
      <Newsletter />
      <Footer />
    </div>
  );
}
