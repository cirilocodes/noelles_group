import { Search, FileCheck, Users, CreditCard, Home, ArrowRight } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: "Discover Everything",
      description: "Search through Ghana's most comprehensive real estate ecosystem - properties, services, professionals",
      details: "AI-powered search that understands your specific needs"
    },
    {
      icon: FileCheck,
      title: "Verify & Choose",
      description: "Every listing, every professional, every service is verified - no exceptions, no surprises",
      details: "Complete transparency with ratings, reviews, and credentials"
    },
    {
      icon: Users,
      title: "Connect Seamlessly",
      description: "Direct communication with property owners, agents, and service professionals",
      details: "Built-in messaging, video calls, and document sharing"
    },
    {
      icon: CreditCard,
      title: "Transact Securely",
      description: "Flexible payment options with escrow protection for every transaction type",
      details: "From property purchases to service payments - all secured"
    },
    {
      icon: Home,
      title: "Achieve Your Dreams",
      description: "Whether buying land, renting a home, or building an empire - we're with you throughout",
      details: "Complete support from search to settlement and beyond"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Your Real Estate Journey
            <span className="text-primary block">Simplified</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            From the simplest home repair to the most complex property acquisition - HabiGrid transforms 
            every real estate experience into a seamless, secure, and satisfying journey.
          </p>
        </div>

        <div className="relative">
          {/* Desktop Layout */}
          <div className="hidden lg:block">
            <div className="flex justify-between items-start relative">
              {/* Connection Lines */}
              <div
                className="absolute top-16 left-0 right-0 h-[1px] z-0"
                style={{ backgroundColor: 'var(--muted-foreground)' }}
              ></div>
              <div className="absolute top-16 left-20 right-20 flex justify-between z-10">
                {[...Array(4)].map((_, i) => (
                  <ArrowRight
                    key={i}
                    className="w-6 h-6 rounded-full p-1"
                    style={{
                      color: 'var(--primary)',
                      backgroundColor: 'var(--background)',
                    }}
                  />
                ))}
              </div>

              {steps.map((step, index) => (
                <div key={index} className="flex-1 relative z-20">
                  <div className="text-center max-w-xs mx-auto">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
                      style={{ backgroundColor: 'var(--primary)' }}
                    >
                      <step.icon className="w-8 h-8 text-background" />
                    </div>
                    <div
                      className="text-sm font-semibold px-3 py-1 rounded-full inline-block mb-3"
                      style={{
                        backgroundColor: 'var(--background)',
                        color: 'var(--primary)',
                      }}
                    >
                      Step {index + 1}
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                    <p className="text-muted-foreground mb-2 leading-relaxed">{step.description}</p>
                    <p className="text-sm font-medium text-primary">{step.details}</p>
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
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
                    style={{ backgroundColor: 'var(--primary)' }}
                  >
                    <step.icon className="w-7 h-7 text-background" />
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className="w-px h-16 mx-auto mt-4"
                      style={{ backgroundColor: 'var(--muted-foreground)' }}
                    ></div>
                  )}
                </div>
                <div className="flex-1 pt-1">
                  <div
                    className="text-sm font-semibold px-3 py-1 rounded-full inline-block mb-2"
                    style={{
                      backgroundColor: 'var(--background)',
                      color: 'var(--primary)',
                    }}
                  >
                    Step {index + 1}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground mb-2 leading-relaxed">{step.description}</p>
                  <p className="text-sm font-medium text-primary">{step.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div
            className="text-center rounded-2xl p-6 shadow-lg"
            style={{ backgroundColor: 'var(--background)' }}
          >
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: 'var(--background)' }}
            >
              <FileCheck
                className="w-6 h-6"
                style={{ color: 'var(--primary)' }}
              />
            </div>
            <h4 className="text-lg font-semibold text-foreground mb-2">For Land Buyers</h4>
            <p className="text-muted-foreground">
              Access verified property listings with complete documentation and legal clarity
            </p>
          </div>

          <div
            className="text-center rounded-2xl p-6 shadow-lg"
            style={{ backgroundColor: 'var(--background)' }}
          >
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: 'var(--primary)' }}
            >
              <Users
                className="w-6 h-6"
                style={{ color: 'var(--background)' }}
              />
            </div>
            <h4 className="text-lg font-semibold text-foreground mb-2">For Construction</h4>
            <p className="text-muted-foreground">
              Connect with verified artisans, track progress, and ensure quality workmanship
            </p>
          </div>

          <div
            className="text-center rounded-2xl p-6 shadow-lg"
            style={{ backgroundColor: 'var(--background)' }}
          >
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: 'var(--primary)' }}
            >
              <CreditCard
                className="w-6 h-6"
                style={{ color: 'var(--background)' }}
              />
            </div>
            <h4 className="text-lg font-semibold text-foreground mb-2">For Payments</h4>
            <p className="text-muted-foreground">
              Secure escrow system ensures safe transactions for all parties involved
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
