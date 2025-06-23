import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { insertContactSchema, type InsertContact } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Mail, Phone, Clock, Send, Linkedin, Twitter, Instagram } from "lucide-react";
import { SiBehance } from "react-icons/si";

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContact) => {
      const response = await apiRequest("POST", "/api/contacts", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message Sent Successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      form.reset();
      setIsSubmitting(false);
    },
    onError: (error) => {
      toast({
        title: "Message Failed",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    },
  });

  const onSubmit = (data: InsertContact) => {
    setIsSubmitting(true);
    contactMutation.mutate(data);
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to start your next project? We'd love to hear from you. Contact us today and let's create something extraordinary together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[hsl(262,52%,47%)] to-[hsl(217,91%,60%)] rounded-xl flex items-center justify-center flex-shrink-0">
                <Mail className="text-white w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Email Us</h3>
                <p className="text-gray-600 mb-2">Send us an email and we'll get back to you within 24 hours.</p>
                <a 
                  href="mailto:noellesgroup4@gmail.com" 
                  className="text-[hsl(262,52%,47%)] font-semibold hover:text-[hsl(217,91%,60%)] transition-colors duration-300"
                >
                  noellesgroup4@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[hsl(262,52%,47%)] to-[hsl(217,91%,60%)] rounded-xl flex items-center justify-center flex-shrink-0">
                <Phone className="text-white w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Call Us</h3>
                <p className="text-gray-600 mb-2">Give us a call to discuss your project requirements.</p>
                <a 
                  href="tel:+233501234567" 
                  className="text-[hsl(262,52%,47%)] font-semibold hover:text-[hsl(217,91%,60%)] transition-colors duration-300"
                >
                  +233 50 123 4567
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[hsl(262,52%,47%)] to-[hsl(217,91%,60%)] rounded-xl flex items-center justify-center flex-shrink-0">
                <Clock className="text-white w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Business Hours</h3>
                <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
                <p className="text-gray-600">Sunday: Closed</p>
              </div>
            </div>

            <div className="flex space-x-4 pt-8">
              <a 
                href="#" 
                className="w-12 h-12 bg-gradient-to-br from-[hsl(262,52%,47%)] to-[hsl(217,91%,60%)] rounded-xl flex items-center justify-center text-white hover:shadow-lg hover:shadow-[hsl(262,52%,47%)]/25 transition-all duration-300 transform hover:scale-110"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-12 h-12 bg-gradient-to-br from-[hsl(262,52%,47%)] to-[hsl(217,91%,60%)] rounded-xl flex items-center justify-center text-white hover:shadow-lg hover:shadow-[hsl(262,52%,47%)]/25 transition-all duration-300 transform hover:scale-110"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-12 h-12 bg-gradient-to-br from-[hsl(262,52%,47%)] to-[hsl(217,91%,60%)] rounded-xl flex items-center justify-center text-white hover:shadow-lg hover:shadow-[hsl(262,52%,47%)]/25 transition-all duration-300 transform hover:scale-110"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-12 h-12 bg-gradient-to-br from-[hsl(262,52%,47%)] to-[hsl(217,91%,60%)] rounded-xl flex items-center justify-center text-white hover:shadow-lg hover:shadow-[hsl(262,52%,47%)]/25 transition-all duration-300 transform hover:scale-110"
              >
                <SiBehance className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="bg-gray-50 rounded-3xl p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-semibold">First Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="John" 
                            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[hsl(262,52%,47%)] focus:border-transparent transition-all duration-300"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-semibold">Last Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Doe" 
                            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[hsl(262,52%,47%)] focus:border-transparent transition-all duration-300"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-semibold">Email</FormLabel>
                      <FormControl>
                        <Input 
                          type="email"
                          placeholder="john@example.com" 
                          className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[hsl(262,52%,47%)] focus:border-transparent transition-all duration-300"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-semibold">Subject</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="How can we help you?" 
                          className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[hsl(262,52%,47%)] focus:border-transparent transition-all duration-300"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-semibold">Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          rows={5}
                          placeholder="Tell us about your project or ask any questions..." 
                          className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[hsl(262,52%,47%)] focus:border-transparent transition-all duration-300"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[hsl(262,52%,47%)] to-[hsl(217,91%,60%)] px-8 py-4 rounded-xl text-white font-bold text-lg hover:shadow-xl hover:shadow-[hsl(262,52%,47%)]/30 transition-all duration-300 transform hover:scale-[1.02]"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <Send className="ml-2 w-5 h-5" />
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
