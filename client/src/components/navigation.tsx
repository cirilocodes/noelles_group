import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logoImage from "@assets/N1_1750686199510.jpg";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 glass-effect">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <img 
              src={logoImage} 
              alt="Noelles Group Logo" 
              className="w-12 h-12 rounded-xl shadow-lg object-cover"
            />
            <span className="text-2xl font-bold gradient-text">Noelles Group</span>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-white hover:text-[hsl(262,52%,47%)] transition-colors duration-300 font-medium"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-white hover:text-[hsl(262,52%,47%)] transition-colors duration-300 font-medium"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="text-white hover:text-[hsl(262,52%,47%)] transition-colors duration-300 font-medium"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('portfolio')}
              className="text-white hover:text-[hsl(262,52%,47%)] transition-colors duration-300 font-medium"
            >
              Portfolio
            </button>
            <button 
              onClick={() => scrollToSection('team')}
              className="text-white hover:text-[hsl(262,52%,47%)] transition-colors duration-300 font-medium"
            >
              Team
            </button>
            <button 
              onClick={() => scrollToSection('reviews')}
              className="text-white hover:text-[hsl(262,52%,47%)] transition-colors duration-300 font-medium"
            >
              Reviews
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-white hover:text-[hsl(262,52%,47%)] transition-colors duration-300 font-medium"
            >
              Contact
            </button>
          </div>

          <Button 
            onClick={() => scrollToSection('booking')}
            className="hidden md:block bg-gradient-to-r from-[hsl(262,52%,47%)] to-[hsl(217,91%,60%)] hover:shadow-lg hover:shadow-[hsl(262,52%,47%)]/25 transition-all duration-300"
          >
            Get Started
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-[hsl(0,0%,6%)] rounded-lg mb-4 p-4">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('home')}
                className="text-white hover:text-[hsl(262,52%,47%)] transition-colors duration-300 font-medium text-left"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-white hover:text-[hsl(262,52%,47%)] transition-colors duration-300 font-medium text-left"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="text-white hover:text-[hsl(262,52%,47%)] transition-colors duration-300 font-medium text-left"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('portfolio')}
                className="text-white hover:text-[hsl(262,52%,47%)] transition-colors duration-300 font-medium text-left"
              >
                Portfolio
              </button>
              <button 
                onClick={() => scrollToSection('team')}
                className="text-white hover:text-[hsl(262,52%,47%)] transition-colors duration-300 font-medium text-left"
              >
                Team
              </button>
              <button 
                onClick={() => scrollToSection('reviews')}
                className="text-white hover:text-[hsl(262,52%,47%)] transition-colors duration-300 font-medium text-left"
              >
                Reviews
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-white hover:text-[hsl(262,52%,47%)] transition-colors duration-300 font-medium text-left"
              >
                Contact
              </button>
              <Button 
                onClick={() => scrollToSection('booking')}
                className="bg-gradient-to-r from-[hsl(262,52%,47%)] to-[hsl(217,91%,60%)] w-full"
              >
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
