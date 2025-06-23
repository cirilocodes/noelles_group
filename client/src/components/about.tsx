import { Lightbulb, Palette, Users } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            About <span className="gradient-text">Noelles Group</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Based in Ghana, we are a versatile service provider offering everything from cutting-edge technology solutions to creative services and premium products.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Artistic technology setup" 
              className="rounded-2xl shadow-xl" 
            />
          </div>

          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[hsl(262,52%,47%)] to-[hsl(217,91%,60%)] rounded-xl flex items-center justify-center flex-shrink-0">
                <Lightbulb className="text-white w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Diverse Expertise</h3>
                <p className="text-gray-600">From tech development to fashion, beauty services to ministry work, we bring professional excellence across all our service areas.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[hsl(262,52%,47%)] to-[hsl(217,91%,60%)] rounded-xl flex items-center justify-center flex-shrink-0">
                <Palette className="text-white w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Creative Innovation</h3>
                <p className="text-gray-600">We combine artistic creativity with technical precision, delivering unique solutions that exceed expectations in every project.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[hsl(262,52%,47%)] to-[hsl(217,91%,60%)] rounded-xl flex items-center justify-center flex-shrink-0">
                <Users className="text-white w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Ghana-Based Excellence</h3>
                <p className="text-gray-600">Proudly serving clients from our base in Ghana, we bring local expertise with global standards to every service we provide.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
