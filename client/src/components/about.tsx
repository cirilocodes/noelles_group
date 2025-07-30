import { Shield, Users, Building2, Zap, Target, CheckCircle } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Revolutionizing Land Acquisition in
            <span className="text-emerald-600 block">Ghana</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            HabiGrid bridges the gap between aspiring homeowners and verified property access 
            through a transparent, tech-driven platform that connects consumers, land agents, 
            and trusted artisans.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h3>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              To empower Ghanaians to confidently acquire land and build with trusted professionals 
              through a transparent, tech-driven platform that bridges the gap between verified 
              property access and reliable artisan services.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-emerald-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Verified Land Listings</h4>
                  <p className="text-gray-600">All properties undergo strict verification to prevent fraud</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-emerald-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Trusted Artisan Network</h4>
                  <p className="text-gray-600">Connect with vetted construction professionals</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-emerald-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Transparent Pricing</h4>
                  <p className="text-gray-600">Clear, upfront pricing with no hidden costs</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Modern Ghanaian architecture" 
              className="rounded-2xl shadow-2xl" 
            />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-emerald-600 rounded-2xl -rotate-12 opacity-20"></div>
          </div>
        </div>

        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h3>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            To become West Africa's most trusted digital gateway for affordable land acquisition 
            and verified construction support — enabling communities to own, build, and thrive with dignity.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center group">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-200 transition-colors">
              <Shield className="w-8 h-8 text-emerald-600" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">Trust & Security</h4>
            <p className="text-gray-600">Every transaction is secured with escrow protection and verification</p>
          </div>
          
          <div className="text-center group">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-200 transition-colors">
              <Users className="w-8 h-8 text-emerald-600" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">Community Focus</h4>
            <p className="text-gray-600">Empowering Ghanaian communities to build their futures</p>
          </div>
          
          <div className="text-center group">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-200 transition-colors">
              <Building2 className="w-8 h-8 text-emerald-600" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">Quality Assurance</h4>
            <p className="text-gray-600">Vetted professionals and verified property documentation</p>
          </div>
          
          <div className="text-center group">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-200 transition-colors">
              <Zap className="w-8 h-8 text-emerald-600" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">Innovation</h4>
            <p className="text-gray-600">Cutting-edge technology for seamless user experience</p>
          </div>
        </div>

        <div className="mt-20 bg-emerald-50 rounded-3xl p-8 md:p-12">
          <div className="text-center">
            <Target className="w-16 h-16 text-emerald-600 mx-auto mb-6" />
            <h3 className="text-3xl font-bold text-gray-900 mb-6">The Problem We're Solving</h3>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              Many Ghanaians face significant challenges when trying to buy land or build homes: 
              fraudulent land sales, difficulty accessing trusted artisans, lack of pricing transparency, 
              and a fragmented offline system that benefits only the well-connected.
            </p>
            <p className="text-xl font-semibold text-emerald-800">
              HabiGrid centralizes verified listings, vetted connections, and educational resources 
              into one trusted digital ecosystem.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}