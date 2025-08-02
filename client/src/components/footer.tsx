import { Building2, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import HabiGridLogo from "./habigrid-logo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <HabiGridLogo className="w-10 h-10 text-primary-foreground" />
              <span className="text-2xl font-bold">HabiGrid</span>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Ghana's comprehensive real estate universe. From the simplest artisan hire to the most complex property acquisition - everything you need, all in one revolutionary platform.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Facebook, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Instagram, href: "#" },
                { icon: Linkedin, href: "#" }
              ].map(({ icon: Icon, href }, idx) => (
                <a
                  key={idx}
                  href={href}
                  className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center hover:bg-primary/30 transition-colors"
                  aria-label="Social Link"
                >
                  <Icon className="w-5 h-5 text-primary-foreground" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-primary-foreground">Real Estate Universe</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li><a href="#features" className="hover:text-primary-foreground transition-colors">Properties & Land</a></li>
              <li><a href="#how-it-works" className="hover:text-primary-foreground transition-colors">Services & Professionals</a></li>
              <li><a href="#newsletter" className="hover:text-primary-foreground transition-colors">Launch Updates</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Marketplace</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-primary-foreground">Everything You Need</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Buy, Sell, Rent</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Construction & Repairs</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Legal & Financial</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Property Management</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-primary-foreground">Contact</h3>
            <div className="space-y-3 text-muted-foreground">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary-foreground" />
                <span>hello@habigrid.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary-foreground" />
                <span>Accra, Ghana</span>
              </div>
              <div className="flex items-center gap-3">
                <Building2 className="w-5 h-5 text-primary-foreground" />
                <span>Serving all of Ghana</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary/40 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-primary/60 text-sm">
              © {currentYear} HabiGrid. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary-foreground transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-primary-foreground transition-colors">Cookie Policy</a>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-primary-foreground font-medium text-lg italic">
              "Your Real Estate Universe - The First and Final Destination"
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
