import { Linkedin, Twitter, Instagram } from "lucide-react";

const teamMembers = [
  {
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    name: "Alex Johnson",
    role: "Creative Director",
    description: "Visionary leader with 10+ years experience in creative design and brand strategy.",
    social: { linkedin: "#", twitter: "#", instagram: "#" }
  },
  {
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    name: "Sarah Chen",
    role: "UX/UI Designer",
    description: "Passionate about creating intuitive and beautiful user experiences that delight and engage.",
    social: { linkedin: "#", twitter: "#", instagram: "#" }
  },
  {
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    name: "Marcus Rodriguez",
    role: "Lead Developer",
    description: "Full-stack developer specializing in modern web technologies and scalable solutions.",
    social: { linkedin: "#", twitter: "#", instagram: "#" }
  }
];

export default function Team() {
  return (
    <section id="team" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Meet Our <span className="text-primary">Team</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our diverse team of creative professionals brings together unique skills and perspectives to deliver exceptional results.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-center group">
              <img
                src={member.image}
                alt={member.name}
                className="w-48 h-48 rounded-full mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105 object-cover"
              />
              <h3 className="text-2xl font-bold text-foreground mb-2">{member.name}</h3>
              <p className="text-primary font-semibold mb-4">{member.role}</p>
              <p className="text-muted-foreground mb-6">{member.description}</p>
              <div className="flex justify-center space-x-4">
                <a
                  href={member.social.linkedin}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={member.social.twitter}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href={member.social.instagram}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
