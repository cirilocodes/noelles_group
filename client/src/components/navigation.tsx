import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Menu, X, LogIn } from "lucide-react";
import { Link } from "wouter";
import HabiGridLogo from "./habigrid-logo";
import EarlyAccessForm from "./early-access-form";
import ContactForm from "./contact-form";

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

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="text-primary border-primary hover:bg-primary hover:text-background">
                  Early Access
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Join Early Access</DialogTitle>
                </DialogHeader>
                <EarlyAccessForm />
              </DialogContent>
            </Dialog>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="text-primary border-primary hover:bg-primary hover:text-background">
                  Contact
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Contact Us</DialogTitle>
                </DialogHeader>
                <ContactForm />
              </DialogContent>
            </Dialog>
            
            <Link href="/admin/login">
              <Button className="bg-primary text-background hover:bg-primary/80 transition-all duration-300">
                <LogIn className="w-4 h-4 mr-2" />
                Admin Login
              </Button>
            </Link>
          </div>

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
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-primary text-background w-full hover:bg-primary/80">
                    Early Access
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Join Early Access</DialogTitle>
                  </DialogHeader>
                  <EarlyAccessForm />
                </DialogContent>
              </Dialog>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full text-primary border-primary">
                    Contact
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Contact Us</DialogTitle>
                  </DialogHeader>
                  <ContactForm />
                </DialogContent>
              </Dialog>
              
              <Link href="/admin/login">
                <Button variant="outline" className="w-full text-primary border-primary">
                  <LogIn className="w-4 h-4 mr-2" />
                  Admin Login
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
