import { Globe, Smartphone, Video, Palette, Gamepad2, ShoppingBag, Shirt, Sparkles, Music, Scissors, Clapperboard } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Website Development",
    description: "Modern, responsive websites that showcase your brand and drive business growth.",
    features: ["Custom Design", "E-commerce Solutions", "Mobile Optimization"]
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Native and cross-platform mobile applications for iOS and Android.",
    features: ["Native Apps", "Cross-Platform", "UI/UX Design"]
  },
  {
    icon: Video,
    title: "Video Editing",
    description: "Professional video editing services for marketing, events, and creative content.",
    features: ["Marketing Videos", "Event Coverage", "Creative Content"]
  },
  {
    icon: Palette,
    title: "Flyer Design",
    description: "Eye-catching flyers and promotional materials that capture attention and drive action.",
    features: ["Event Flyers", "Business Promotions", "Digital & Print"]
  },
  {
    icon: Gamepad2,
    title: "Games Installation",
    description: "Professional game installation and setup services for various platforms.",
    features: ["PC Games", "Console Setup", "Technical Support"]
  },
  {
    icon: ShoppingBag,
    title: "Apple Product Sales",
    description: "Authentic Apple products with warranty and professional setup services.",
    features: ["iPhones", "MacBooks", "Accessories"]
  },
  {
    icon: Shirt,
    title: "Jerseys (Team Sets & Singles)",
    description: "Custom team jerseys and individual sportswear with professional printing.",
    features: ["Team Sets", "Custom Printing", "Quality Materials"]
  },
  {
    icon: Sparkles,
    title: "Perfumes",
    description: "Premium fragrance collection for all occasions and preferences.",
    features: ["Designer Brands", "Unisex Options", "Gift Sets"]
  },
  {
    icon: Music,
    title: "Gospel Ministries Dancers",
    description: "Professional dance performances for church events and gospel celebrations.",
    features: ["Church Events", "Gospel Celebrations", "Professional Choreography"]
  },
  {
    icon: Scissors,
    title: "Nails Fixing and Design",
    description: "Professional nail care services with creative designs and quality finishes.",
    features: ["Nail Art", "Manicure/Pedicure", "Creative Designs"]
  },
  {
    icon: Clapperboard,
    title: "Animation Creation",
    description: "Custom animations for marketing, education, and entertainment purposes.",
    features: ["2D Animation", "Motion Graphics", "Explainer Videos"]
  }
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-[hsl(0,0%,6%)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover our full range of services - from cutting-edge technology solutions to premium products and creative services, all delivered with Ghanaian excellence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div key={index} className="service-card bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-2xl border border-gray-700 hover:border-[hsl(262,52%,47%)] group">
                <div className="w-14 h-14 bg-gradient-to-br from-[hsl(262,52%,47%)] to-[hsl(217,91%,60%)] rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="text-white w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-gray-300 mb-4 text-sm">{service.description}</p>
                <ul className="text-gray-400 space-y-1 text-sm">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <div className="w-2 h-2 bg-[hsl(262,52%,47%)] rounded-full mr-2"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
