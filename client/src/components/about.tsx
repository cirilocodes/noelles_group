import { Shield, Users, Building2, Zap, Globe, Home, Hammer, MapPin, Target } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Everything You Need for
            <span className="text-emerald-600 block">Your Property Journey</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            From finding your dream apartment to buying land or hiring the right contractor - 
            HabiGrid makes it simple. One platform, countless possibilities, zero stress.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Why People Love HabiGrid</h3>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              No more endless searching or wondering if you're getting a fair deal. We've brought together 
              the best properties, most reliable professionals, and smartest tools so you can focus on 
              what matters - finding your perfect home or investment.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Home className="w-6 h-6 text-emerald-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Find Your Perfect Place</h4>
                  <p className="text-gray-600">Apartments, houses, land - all verified and fairly priced</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Hammer className="w-6 h-6 text-emerald-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Reliable Professionals</h4>
                  <p className="text-gray-600">Trusted contractors, electricians, plumbers - all pre-screened</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-emerald-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Smart Recommendations</h4>
                  <p className="text-gray-600">We learn what you like and show you the best options first</p>
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
          <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Promise</h3>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            We're building Ghana's most trusted place for real estate. Where finding your next home 
            is actually enjoyable, where fair prices are guaranteed, and where every transaction is secure.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center group">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-200 transition-colors">
              <Globe className="w-8 h-8 text-emerald-600" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">Everything in One Place</h4>
            <p className="text-gray-600">No need to jump between multiple sites - we've got it all</p>
          </div>
          
          <div className="text-center group">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-200 transition-colors">
              <Shield className="w-8 h-8 text-emerald-600" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">Always Verified</h4>
            <p className="text-gray-600">No fake listings, no unreliable contractors - everything checked</p>
          </div>
          
          <div className="text-center group">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-200 transition-colors">
              <Users className="w-8 h-8 text-emerald-600" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">Made for Ghana</h4>
            <p className="text-gray-600">Built by Ghanaians who understand what you really need</p>
          </div>
          
          <div className="text-center group">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-200 transition-colors">
              <Zap className="w-8 h-8 text-emerald-600" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">Super Simple</h4>
            <p className="text-gray-600">Easy to use, fast results, no technical headaches</p>
          </div>
        </div>

        <div className="mt-20 bg-emerald-50 rounded-3xl p-8 md:p-12">
          <div className="text-center">
            <Target className="w-16 h-16 text-emerald-600 mx-auto mb-6" />
            <h3 className="text-3xl font-bold text-gray-900 mb-6">The Problem We Solved</h3>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              Finding good properties used to mean endless searching. Getting reliable contractors meant 
              asking around for weeks. And you never knew if you were getting a fair price or being taken advantage of.
            </p>
            <p className="text-xl font-semibold text-emerald-800">
              Now there's a better way. Everything you need, all verified, all in one place.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}