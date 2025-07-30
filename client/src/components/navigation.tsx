import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import HabiGridLogo from "./habigrid-logo";

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
    <nav className="fixed top-0 w-full z-50 bg-emerald-900/90 backdrop-blur-md border-b border-emerald-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <HabiGridLogo className="w-10 h-10 text-emerald-400" />
            <span className="text-2xl font-bold text-white">HabiGrid</span>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-emerald-100 hover:text-emerald-300 transition-colors duration-300 font-medium"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-emerald-100 hover:text-emerald-300 transition-colors duration-300 font-medium"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('features')}
              className="text-emerald-100 hover:text-emerald-300 transition-colors duration-300 font-medium"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('how-it-works')}
              className="text-emerald-100 hover:text-emerald-300 transition-colors duration-300 font-medium"
            >
              How It Works
            </button>
            <button 
              onClick={() => scrollToSection('early-access')}
              className="text-emerald-100 hover:text-emerald-300 transition-colors duration-300 font-medium"
            >
              Early Access
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-emerald-100 hover:text-emerald-300 transition-colors duration-300 font-medium"
            >
              Contact
            </button>
          </div>

          <Button 
            onClick={() => scrollToSection('early-access')}
            className="hidden md:block bg-white text-emerald-900 hover:bg-emerald-50 transition-all duration-300"
          >
            Join Early Access
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-emerald-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-emerald-800/95 backdrop-blur-sm rounded-lg mb-4 p-4">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('home')}
                className="text-emerald-100 hover:text-emerald-300 transition-colors duration-300 font-medium text-left"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-emerald-100 hover:text-emerald-300 transition-colors duration-300 font-medium text-left"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('features')}
                className="text-emerald-100 hover:text-emerald-300 transition-colors duration-300 font-medium text-left"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('how-it-works')}
                className="text-emerald-100 hover:text-emerald-300 transition-colors duration-300 font-medium text-left"
              >
                How It Works
              </button>
              <button 
                onClick={() => scrollToSection('early-access')}
                className="text-emerald-100 hover:text-emerald-300 transition-colors duration-300 font-medium text-left"
              >
                Early Access
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-emerald-100 hover:text-emerald-300 transition-colors duration-300 font-medium text-left"
              >
                Contact
              </button>
              <Button 
                onClick={() => scrollToSection('early-access')}
                className="bg-white text-emerald-900 w-full hover:bg-emerald-50"
              >
                Join Early Access
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
