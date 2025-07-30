import { Building2, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import HabiGridLogo from "./habigrid-logo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-emerald-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <HabiGridLogo className="w-10 h-10 text-emerald-400" />
              <span className="text-2xl font-bold">HabiGrid</span>
            </div>
            <p className="text-emerald-200 mb-6 leading-relaxed">
              Ghana's trusted digital gateway for verified land acquisition and construction support. 
              Building futures, one home at a time.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-emerald-800 rounded-lg flex items-center justify-center hover:bg-emerald-700 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-emerald-800 rounded-lg flex items-center justify-center hover:bg-emerald-700 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-emerald-800 rounded-lg flex items-center justify-center hover:bg-emerald-700 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-emerald-800 rounded-lg flex items-center justify-center hover:bg-emerald-700 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Platform</h3>
            <ul className="space-y-3 text-emerald-200">
              <li><a href="#features" className="hover:text-emerald-300 transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="hover:text-emerald-300 transition-colors">How It Works</a></li>
              <li><a href="#early-access" className="hover:text-emerald-300 transition-colors">Early Access</a></li>
              <li><a href="#" className="hover:text-emerald-300 transition-colors">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Services</h3>
            <ul className="space-y-3 text-emerald-200">
              <li><a href="#" className="hover:text-emerald-300 transition-colors">Land Verification</a></li>
              <li><a href="#" className="hover:text-emerald-300 transition-colors">Artisan Network</a></li>
              <li><a href="#" className="hover:text-emerald-300 transition-colors">Secure Payments</a></li>
              <li><a href="#" className="hover:text-emerald-300 transition-colors">Project Management</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Contact</h3>
            <div className="space-y-3 text-emerald-200">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-emerald-400" />
                <span>hello@habigrid.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-emerald-400" />
                <span>Accra, Ghana</span>
              </div>
              <div className="flex items-center gap-3">
                <Building2 className="w-5 h-5 text-emerald-400" />
                <span>Serving all of Ghana</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-emerald-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-emerald-300 text-sm">
              © {currentYear} HabiGrid. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm text-emerald-200">
              <a href="#" className="hover:text-emerald-300 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-emerald-300 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-emerald-300 transition-colors">Cookie Policy</a>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-emerald-400 font-medium text-lg">
              "Not another Promise, a blueprint for those who build futures"
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}