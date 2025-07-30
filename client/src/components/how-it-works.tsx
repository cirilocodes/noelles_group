import { Search, FileCheck, Users, CreditCard, Home, ArrowRight } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: "Browse & Search",
      description: "Search for verified land listings or trusted artisans in your preferred location",
      details: "Use our advanced filters to find exactly what you need"
    },
    {
      icon: FileCheck,
      title: "Verify & Connect",
      description: "Review verified documents, ratings, and portfolios before making contact",
      details: "All listings and professionals undergo strict verification"
    },
    {
      icon: Users,
      title: "Communicate Safely",
      description: "Use our secure in-app messaging to negotiate terms and discuss project details",
      details: "Your privacy is protected with communication masking"
    },
    {
      icon: CreditCard,
      title: "Secure Payment",
      description: "Make milestone-based payments through our escrow system for guaranteed protection",
      details: "Funds are released only when milestones are achieved"
    },
    {
      icon: Home,
      title: "Build Your Future",
      description: "Track progress, communicate with professionals, and achieve your homeownership goals",
      details: "Complete support from land purchase to move-in"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How HabiGrid
            <span className="text-emerald-600 block">Works</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A simple, secure process that transforms the way Ghanaians acquire land and build homes. 
            From search to settlement, we're with you every step of the way.
          </p>
        </div>

        <div className="relative">
          {/* Desktop Layout */}
          <div className="hidden lg:block">
            <div className="flex justify-between items-start relative">
              {/* Connection Lines */}
              <div className="absolute top-16 left-0 right-0 h-0.5 bg-emerald-200 z-0"></div>
              <div className="absolute top-16 left-20 right-20 flex justify-between z-10">
                {[...Array(4)].map((_, i) => (
                  <ArrowRight key={i} className="w-6 h-6 text-emerald-400 bg-emerald-50 rounded-full p-1" />
                ))}
              </div>

              {steps.map((step, index) => (
                <div key={index} className="flex-1 relative z-20">
                  <div className="text-center max-w-xs mx-auto">
                    <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="bg-emerald-100 text-emerald-800 text-sm font-semibold px-3 py-1 rounded-full inline-block mb-3">
                      Step {index + 1}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600 mb-2 leading-relaxed">{step.description}</p>
                    <p className="text-sm text-emerald-600 font-medium">{step.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                    <step.icon className="w-7 h-7 text-white" />
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-px h-16 bg-emerald-200 mx-auto mt-4"></div>
                  )}
                </div>
                <div className="flex-1 pt-1">
                  <div className="bg-emerald-100 text-emerald-800 text-sm font-semibold px-3 py-1 rounded-full inline-block mb-2">
                    Step {index + 1}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 mb-2 leading-relaxed">{step.description}</p>
                  <p className="text-sm text-emerald-600 font-medium">{step.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="text-center bg-white rounded-2xl p-6 shadow-lg">
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <FileCheck className="w-6 h-6 text-emerald-600" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">For Land Buyers</h4>
            <p className="text-gray-600">Access verified property listings with complete documentation and legal clarity</p>
          </div>

          <div className="text-center bg-white rounded-2xl p-6 shadow-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">For Construction</h4>
            <p className="text-gray-600">Connect with verified artisans, track progress, and ensure quality workmanship</p>
          </div>

          <div className="text-center bg-white rounded-2xl p-6 shadow-lg">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">For Payments</h4>
            <p className="text-gray-600">Secure escrow system ensures safe transactions for all parties involved</p>
          </div>
        </div>
      </div>
    </section>
  );
}