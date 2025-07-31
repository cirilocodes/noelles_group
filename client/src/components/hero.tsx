import { Button } from "@/components/ui/button";
import { Building2, Home, Users, Shield } from "lucide-react";

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-700 relative overflow-hidden flex items-center">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 to-emerald-900/40"></div>
      
      {/* Floating elements for artistic effect */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-emerald-400/30 rounded-full animate-float">
        <Home className="w-8 h-8 text-white m-6" />
      </div>
      <div className="absolute bottom-32 right-16 w-16 h-16 bg-emerald-300/40 rounded-full animate-float" style={{animationDelay: '2s'}}>
        <Building2 className="w-6 h-6 text-white m-5" />
      </div>
      <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-float" style={{animationDelay: '4s'}}>
        <Shield className="w-5 h-5 text-white m-3.5" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-up">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <span className="text-emerald-200 text-sm font-medium">🚀 Coming Soon to Ghana</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
              Where Dreams
              <span className="text-emerald-300 block">Meet</span>
              <span className="text-emerald-400">Reality</span>
            </h1>
            
            <p className="text-xl text-emerald-100 mb-4 leading-relaxed font-medium">
              Connecting Ghana to better homes and trusted professionals
            </p>
            
            <p className="text-lg text-emerald-200/90 mb-8 leading-relaxed">
              The bridge that connects you to verified properties, trusted professionals, and fair deals. 
              No more searching everywhere - everything you need is here, waiting for you.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => scrollToSection('newsletter')}
                className="bg-white text-emerald-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-emerald-50 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                size="lg"
              >
                Get Launch Updates
              </Button>
              <Button 
                onClick={() => scrollToSection('about')}
                variant="outline"
                className="border-2 border-white/50 px-8 py-4 rounded-full text-white font-bold text-lg hover:bg-white/10 transition-all duration-300"
                size="lg"
              >
                Discover More
              </Button>
            </div>
            
            <div className="flex items-center gap-6 mt-8 pt-8 border-t border-white/20">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-emerald-300" />
                <span className="text-emerald-200 text-sm">100% Verified</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-300" />
                <span className="text-emerald-200 text-sm">Trusted by Thousands</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-emerald-300" />
                <span className="text-emerald-200 text-sm">Secure Transactions</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Modern Ghanaian residential development" 
              className="rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500" 
            />
            
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl rotate-12 animate-pulse opacity-80"></div>
            
            {/* Stats overlay */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
              <div className="text-xs text-gray-600 mb-1">Launching Soon</div>
              <div className="text-lg font-bold text-emerald-800">West Africa</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
