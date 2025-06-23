import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const portfolioItems = [
  {
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    title: "Church Website & Management System",
    description: "Complete digital solution for a major Ghanaian church including website and member management.",
    tags: ["Web Development", "Ministry"]
  },
  {
    image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    title: "Local Restaurant Mobile App",
    description: "Food delivery mobile application for popular Accra restaurant chain.",
    tags: ["Mobile App", "E-commerce"]
  },
  {
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    title: "Football Team Jersey Collection",
    description: "Custom jersey designs and printing for Ghana Premier League team supporters.",
    tags: ["Design", "Sports"]
  },
  {
    image: "https://images.unsplash.com/photo-1586717799252-bd134ad00e26?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    title: "Corporate Event Video Production",
    description: "Professional video editing and production for major corporate events in Accra.",
    tags: ["Video Editing", "Corporate"]
  },
  {
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    title: "Beauty Salon Promotional Materials",
    description: "Complete flyer design package for luxury beauty salon chain across Ghana.",
    tags: ["Graphic Design", "Beauty"]
  },
  {
    image: "https://images.unsplash.com/photo-1551651653-c5369ba6cf0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    title: "Gospel Ministry Dance Performance",
    description: "Choreographed performances for major gospel events and church celebrations.",
    tags: ["Ministry", "Performance"]
  }
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Our <span className="gradient-text">Portfolio</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our latest projects and see how we've helped businesses transform their digital presence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item, index) => (
            <div key={index} className="group cursor-pointer">
              <img 
                src={item.image}
                alt={item.title}
                className="rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105 w-full h-64 object-cover" 
              />
              <div className="mt-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, tagIndex) => (
                    <Badge 
                      key={tagIndex} 
                      variant="secondary" 
                      className={tagIndex === 0 ? "bg-[hsl(262,52%,47%)]/10 text-[hsl(262,52%,47%)]" : "bg-[hsl(217,91%,60%)]/10 text-[hsl(217,91%,60%)]"}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button className="bg-gradient-to-r from-[hsl(262,52%,47%)] to-[hsl(217,91%,60%)] px-8 py-4 rounded-full text-white font-bold text-lg hover:shadow-xl hover:shadow-[hsl(262,52%,47%)]/30 transition-all duration-300 transform hover:scale-105">
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
}
