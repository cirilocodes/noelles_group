import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import HabiGridLogo from "./habigrid-logo";

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "features", label: "Features" },
  { id: "how-it-works", label: "How It Works" },
  { id: "early-access", label: "Early Access" },
  { id: "contact", label: "Contact" },
];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav
      aria-label="Primary Navigation"
      className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-md border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Name */}
          <div className="flex items-center space-x-3">
            <HabiGridLogo className="w-10 h-10 text-primary" />
            <span className="text-2xl font-bold text-primary">HabiGrid</span>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-8">
            {navItems.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="text-primary hover:text-primary/80 transition-colors duration-300 font-medium"
              >
                {label}
              </button>
            ))}
          </div>

          {/* CTA */}
          <Button
            onClick={() => scrollToSection("early-access")}
            className="hidden md:block bg-primary text-background hover:bg-primary/80 transition-all duration-300"
          >
            Join Early Access
          </Button>

          {/* Mobile menu toggle */}
          <Button
            variant="ghost"
            size="icon"
            aria-controls="mobile-menu"
            aria-expanded={isMenuOpen}
            className="md:hidden text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden bg-background/95 backdrop-blur-sm rounded-lg mb-4 p-4"
          >
            <div className="flex flex-col space-y-4">
              {navItems.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className="text-primary hover:text-primary/80 transition-colors duration-300 font-medium text-left"
                >
                  {label}
                </button>
              ))}
              <Button
                onClick={() => scrollToSection("early-access")}
                className="bg-primary text-background w-full hover:bg-primary/80"
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
