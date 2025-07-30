import { Shield, Users, Building2, Zap, Globe, Home, Hammer, MapPin, Target } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            The Real Estate
            <span className="text-emerald-600 block">Powerhouse</span>
            <span className="text-emerald-500">of Ghana</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            HabiGrid is your comprehensive real estate universe - the first and final destination for everything property-related. 
            From the simplest room paint job to the most complex building projects, from finding the perfect artisan to securing your dream land.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Everything Real Estate, One Platform</h3>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Imagine never having to search multiple places for your real estate needs again. HabiGrid brings together 
              every service, every professional, and every opportunity in Ghana's real estate ecosystem under one revolutionary platform.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Home className="w-6 h-6 text-emerald-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Properties & Land</h4>
                  <p className="text-gray-600">Buy, sell, rent - residential, commercial, agricultural properties</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Hammer className="w-6 h-6 text-emerald-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Services & Artisans</h4>
                  <p className="text-gray-600">Find verified professionals for any project - from painting to construction</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-emerald-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Location Intelligence</h4>
                  <p className="text-gray-600">Smart recommendations based on your needs, budget, and preferences</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Modern Ghanaian real estate ecosystem" 
              className="rounded-2xl shadow-2xl" 
            />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-emerald-600 rounded-2xl -rotate-12 opacity-20"></div>
          </div>
        </div>

        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h3>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            To become Ghana's undisputed real estate superpower - the ultimate destination where consumers, homeowners, 
            landlords, tenants, and professionals converge to make every property dream a reality.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center group">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-200 transition-colors">
              <Globe className="w-8 h-8 text-emerald-600" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">All-in-One Universe</h4>
            <p className="text-gray-600">Every real estate need covered in one comprehensive platform</p>
          </div>
          
          <div className="text-center group">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-200 transition-colors">
              <Shield className="w-8 h-8 text-emerald-600" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">Verified Everything</h4>
            <p className="text-gray-600">Every listing, every professional, every transaction verified</p>
          </div>
          
          <div className="text-center group">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-200 transition-colors">
              <Users className="w-8 h-8 text-emerald-600" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">Community Driven</h4>
            <p className="text-gray-600">Built for Ghanaians, by people who understand local needs</p>
          </div>
          
          <div className="text-center group">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-200 transition-colors">
              <Zap className="w-8 h-8 text-emerald-600" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">Future-Ready</h4>
            <p className="text-gray-600">Advanced technology meets local expertise for seamless experience</p>
          </div>
        </div>

        <div className="mt-20 bg-emerald-50 rounded-3xl p-8 md:p-12">
          <div className="text-center">
            <Target className="w-16 h-16 text-emerald-600 mx-auto mb-6" />
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Why HabiGrid Exists</h3>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              Ghana's real estate market is fragmented. Finding properties means visiting multiple sites. 
              Hiring professionals requires endless referrals. Getting fair prices demands extensive research. 
              Managing transactions involves countless intermediaries.
            </p>
            <p className="text-xl font-semibold text-emerald-800">
              HabiGrid eliminates this chaos by bringing everything under one powerful, 
              transparent, and trustworthy platform.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}