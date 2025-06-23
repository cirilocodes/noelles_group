import { Button } from "@/components/ui/button";

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen bg-[hsl(0,0%,6%)] relative overflow-hidden flex items-center">
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(262,52%,47%)]/20 to-[hsl(217,91%,60%)]/20"></div>
      
      {/* Floating elements for artistic effect */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-[hsl(262,52%,47%)]/30 rounded-full animate-float"></div>
      <div className="absolute bottom-32 right-16 w-16 h-16 bg-[hsl(217,91%,60%)]/40 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-float" style={{animationDelay: '4s'}}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-up">
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
              Your Vision,
              <span className="gradient-text block">Our Expertise</span>
              <span className="text-[hsl(262,52%,47%)]">Ghana's Premier</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              From cutting-edge websites and mobile apps to premium products and creative services - we deliver excellence across technology, fashion, beauty, and ministry. Based in Ghana, serving the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => scrollToSection('portfolio')}
                className="bg-gradient-to-r from-[hsl(262,52%,47%)] to-[hsl(217,91%,60%)] px-8 py-4 rounded-full text-white font-bold text-lg hover:shadow-xl hover:shadow-[hsl(262,52%,47%)]/30 transition-all duration-300 transform hover:scale-105"
                size="lg"
              >
                Explore Our Work
              </Button>
              <Button 
                onClick={() => scrollToSection('booking')}
                variant="outline"
                className="border-2 border-[hsl(262,52%,47%)] px-8 py-4 rounded-full text-[hsl(262,52%,47%)] font-bold text-lg hover:bg-[hsl(262,52%,47%)] hover:text-white transition-all duration-300"
                size="lg"
              >
                Start Your Project
              </Button>
            </div>
          </div>

          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1586717799252-bd134ad00e26?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Modern creative workspace" 
              className="rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500" 
            />
            
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-[hsl(262,52%,47%)] to-[hsl(217,91%,60%)] rounded-2xl rotate-12 animate-pulse-violet"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
