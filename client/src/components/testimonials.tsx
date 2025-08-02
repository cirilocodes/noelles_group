import { Star } from "lucide-react";

const testimonials = [
  {
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
    name: "Pastor Emmanuel Asante",
    role: "Senior Pastor, Glory Baptist Church",
    content: "Noelles Group developed our church website and coordinated our gospel dance ministry. Their professionalism and understanding of our spiritual mission was exceptional."
  },
  {
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
    name: "Akosua Mensah",
    role: "Owner, Glamour Beauty Salon",
    content: "From nail services to promotional flyers, Noelles Group has been our go-to partner. They understand the Ghanaian market and deliver quality every time."
  },
  {
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
    name: "Kwame Osei",
    role: "Coach, Accra Sports Club",
    content: "The team jerseys and sports equipment from Noelles Group are top quality. They handle everything from design to delivery with true Ghanaian excellence."
  }
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6">
            What Our <span className="text-primary">Clients Say</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our clients have to say about working with Noelles Group.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card p-8 rounded-2xl border border-border shadow-lg"
            >
              <div className="flex items-center mb-6">
                <div className="flex text-yellow-400 space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-muted-foreground mb-6 italic">
                "{testimonial.content}"
              </p>
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="text-foreground font-semibold">{testimonial.name}</h4>
                  <p className="text-muted-foreground text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
