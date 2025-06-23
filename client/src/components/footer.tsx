import { Linkedin, Twitter, Instagram } from "lucide-react";
import { SiBehance } from "react-icons/si";
import logoImage from "@assets/N1_1750686199510.jpg";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[hsl(0,0%,6%)] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src={logoImage} 
                alt="Noelles Group Logo" 
                className="w-12 h-12 rounded-xl shadow-lg object-cover"
              />
              <span className="text-2xl font-bold gradient-text">Noelles Group</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Based in Ghana, we are your one-stop destination for technology solutions, creative services, premium products, and specialized ministries. Excellence in every service we provide.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-[hsl(262,52%,47%)] hover:bg-gray-700 transition-all duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-[hsl(262,52%,47%)] hover:bg-gray-700 transition-all duration-300"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-[hsl(262,52%,47%)] hover:bg-gray-700 transition-all duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-[hsl(262,52%,47%)] hover:bg-gray-700 transition-all duration-300"
              >
                <SiBehance className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-6">Services</h3>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="text-gray-400 hover:text-[hsl(262,52%,47%)] transition-colors duration-300"
                >
                  Website Development
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="text-gray-400 hover:text-[hsl(262,52%,47%)] transition-colors duration-300"
                >
                  Mobile App Development
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="text-gray-400 hover:text-[hsl(262,52%,47%)] transition-colors duration-300"
                >
                  Video Editing
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="text-gray-400 hover:text-[hsl(262,52%,47%)] transition-colors duration-300"
                >
                  Apple Products
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="text-gray-400 hover:text-[hsl(262,52%,47%)] transition-colors duration-300"
                >
                  Nail Services
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="text-gray-400 hover:text-[hsl(262,52%,47%)] transition-colors duration-300"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('portfolio')}
                  className="text-gray-400 hover:text-[hsl(262,52%,47%)] transition-colors duration-300"
                >
                  Portfolio
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('team')}
                  className="text-gray-400 hover:text-[hsl(262,52%,47%)] transition-colors duration-300"
                >
                  Our Team
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="text-gray-400 hover:text-[hsl(262,52%,47%)] transition-colors duration-300"
                >
                  Contact
                </button>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-[hsl(262,52%,47%)] transition-colors duration-300"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Noelles Group. All rights reserved. Created with passion and precision.
          </p>
        </div>
      </div>
    </footer>
  );
}
