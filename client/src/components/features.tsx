import { Shield, Users, CreditCard, MapPin, Search, MessageCircle, Star, FileCheck } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: Shield,
      title: "Verified Land Listings",
      description: "All properties undergo strict document verification to prevent fraud and ensure legitimacy",
      color: "emerald"
    },
    {
      icon: Users,
      title: "Trusted Artisan Network",
      description: "Connect with vetted builders, plumbers, electricians, and other construction professionals",
      color: "blue"
    },
    {
      icon: CreditCard,
      title: "Secure Escrow Payments",
      description: "Milestone-based payments with escrow protection for both buyers and service providers",
      color: "purple"
    },
    {
      icon: MapPin,
      title: "Location-Based Search",
      description: "Find properties and services in your preferred locations across Ghana",
      color: "orange"
    },
    {
      icon: Search,
      title: "Advanced Filtering",
      description: "Search by price, location, property type, verification status, and professional ratings",
      color: "indigo"
    },
    {
      icon: MessageCircle,
      title: "In-App Communication",
      description: "Secure messaging with privacy protection and communication history tracking",
      color: "green"
    },
    {
      icon: Star,
      title: "Rating & Review System",
      description: "Build trust through transparent feedback from verified transactions",
      color: "yellow"
    },
    {
      icon: FileCheck,
      title: "Digital Documentation",
      description: "Streamlined paperwork and digital contracts for faster, more secure transactions",
      color: "red"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      emerald: "bg-emerald-100 text-emerald-600 group-hover:bg-emerald-200",
      blue: "bg-blue-100 text-blue-600 group-hover:bg-blue-200",
      purple: "bg-purple-100 text-purple-600 group-hover:bg-purple-200",
      orange: "bg-orange-100 text-orange-600 group-hover:bg-orange-200",
      indigo: "bg-indigo-100 text-indigo-600 group-hover:bg-indigo-200",
      green: "bg-green-100 text-green-600 group-hover:bg-green-200",
      yellow: "bg-yellow-100 text-yellow-600 group-hover:bg-yellow-200",
      red: "bg-red-100 text-red-600 group-hover:bg-red-200"
    };
    return colors[color as keyof typeof colors] || colors.emerald;
  };

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Powerful Features for
            <span className="text-emerald-600 block">Secure Transactions</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            HabiGrid provides comprehensive tools and features to ensure safe, transparent, 
            and efficient land acquisition and construction processes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-colors ${getColorClasses(feature.color)}`}>
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Multiple User Types, One Platform
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">For Consumers</h4>
                    <p className="text-gray-600">Browse verified lands, hire trusted artisans, track projects, and make secure payments</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">For Land Agents</h4>
                    <p className="text-gray-600">List verified properties, connect with buyers, and manage transactions securely</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileCheck className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">For Artisans</h4>
                    <p className="text-gray-600">Create service profiles, showcase work portfolios, and receive milestone payments</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Construction team working together" 
                className="rounded-2xl shadow-2xl" 
              />
              <div className="absolute inset-0 bg-emerald-600/10 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}