import { Shield, Users, CreditCard, MapPin, Search, MessageCircle, Star, FileCheck } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: Shield,
      title: "Always Verified",
      description: "No fake listings or unreliable people - everything is checked and double-checked",
      color: "primary" // simplified; you'll want to customize or extend for multiple colors if you want
    },
    {
      icon: Users,
      title: "Top Professionals",
      description: "The best contractors, agents, and service providers - all pre-screened for you",
      color: "primary"
    },
    {
      icon: CreditCard,
      title: "Safe Payments",
      description: "Your money is protected with secure payment options and escrow services",
      color: "primary"
    },
    {
      icon: MapPin,
      title: "Easier & Faster Rentals",
      description: "Find and secure rental properties quickly with our streamlined rental process",
      color: "primary"
    },
    {
      icon: Search,
      title: "Smart Search",
      description: "Tell us what you want and we'll find the perfect matches for your budget",
      color: "primary"
    },
    {
      icon: MessageCircle,
      title: "Easy Communication",
      description: "Chat directly with property owners and service providers - no middlemen",
      color: "primary"
    },
    {
      icon: Star,
      title: "Real Reviews",
      description: "See what other people really think with genuine reviews from actual customers",
      color: "primary"
    },
    {
      icon: FileCheck,
      title: "Paperless Process",
      description: "Handle everything online - no more printing, scanning, or waiting in lines",
      color: "primary"
    }
  ];

  // Use primary color classes for background and text, with opacity variants for hover states
  const getColorClasses = (color: string) => {
    return "bg-primary/10 text-primary group-hover:bg-primary/20";
  };

  return (
    <section id="features" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            What Makes Us
            <span className="text-primary block">Different</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            We've thought of everything to make your property journey smooth, safe, and successful. 
            Here's what sets HabiGrid apart from the rest.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-colors ${getColorClasses(feature.color)}`}>
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-foreground mb-6">
                Perfect For Everyone
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">Looking for a Place?</h4>
                    <p className="text-muted-foreground">Find apartments, houses, land, or commercial spaces with ease</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">Have Property to Rent/Sell?</h4>
                    <p className="text-muted-foreground">List your property and reach serious buyers and tenants</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileCheck className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">Need Help with Your Property?</h4>
                    <p className="text-muted-foreground">Connect with trusted contractors, cleaners, and maintenance experts</p>
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
              <div className="absolute inset-0 bg-primary/10 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
