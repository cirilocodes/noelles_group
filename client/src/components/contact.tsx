import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { type InsertContact } from "@shared/schema";
import { enhancedContactSchema } from "@shared/validation";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormFieldWithValidation } from "@/components/ui/form-field-with-validation";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Mail, Phone, Clock, Send, Linkedin, Twitter, Instagram, CheckCircle, AlertTriangle } from "lucide-react";
import { SiBehance } from "react-icons/si";
import { cn } from "@/lib/utils";

const countries = [
  { name: "Ghana", code: "+233" },
  { name: "Nigeria", code: "+234" },
  { name: "United States", code: "+1" },
  { name: "United Kingdom", code: "+44" },
  { name: "Canada", code: "+1" },
  { name: "South Africa", code: "+27" },
  { name: "Kenya", code: "+254" },
  { name: "Germany", code: "+49" },
  { name: "France", code: "+33" },
  { name: "Australia", code: "+61" },
  { name: "India", code: "+91" },
  { name: "China", code: "+86" },
  { name: "Japan", code: "+81" },
  { name: "Brazil", code: "+55" },
  { name: "Mexico", code: "+52" },
  { name: "Egypt", code: "+20" },
  { name: "Morocco", code: "+212" },
  { name: "Ivory Coast", code: "+225" },
  { name: "Burkina Faso", code: "+226" },
  { name: "Senegal", code: "+221" },
  { name: "Mali", code: "+223" },
  { name: "Togo", code: "+228" },
  { name: "Benin", code: "+229" },
];

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [formProgress, setFormProgress] = useState(0);

  const form = useForm<InsertContact>({
    resolver: zodResolver(enhancedContactSchema),
    mode: "onChange", // Enable real-time validation
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      country: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  // Calculate form completion progress
  const watchedFields = form.watch();
  useEffect(() => {
    const requiredFields = ['firstName', 'lastName', 'email', 'subject', 'message'];
    const completedRequired = requiredFields.filter(field => 
      watchedFields[field] && watchedFields[field].toString().trim() !== ""
    ).length;
    setFormProgress((completedRequired / requiredFields.length) * 100);
  }, [watchedFields]);

  const getCountryCode = (countryName: string) => {
    const country = countries.find(c => c.name === countryName);
    return country ? country.code : "";
  };

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
                  href="tel:+233246766413" 
                  className="text-[hsl(262,52%,47%)] font-semibold hover:text-[hsl(217,91%,60%)] transition-colors duration-300"
                >
                  +233 24 676 6413
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

                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-semibold">Country (Optional)</FormLabel>
                        <Select onValueChange={(value) => {
                          field.onChange(value);
                          setSelectedCountry(value);
                        }} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[hsl(262,52%,47%)] focus:border-transparent transition-all duration-300">
                              <SelectValue placeholder="Select your country" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {countries.map((country) => (
                              <SelectItem key={country.name} value={country.name}>
                                {country.name} ({country.code})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-semibold">Phone Number (Optional)</FormLabel>
                        <FormControl>
                          <div className="flex">
                            <div className="flex items-center px-3 py-3 border border-r-0 border-gray-300 rounded-l-xl bg-gray-50 text-gray-600 font-medium">
                              {getCountryCode(selectedCountry) || "+233"}
                            </div>
                            <Input 
                              type="tel"
                              placeholder="24 676 6413" 
                              className="px-4 py-3 border border-gray-300 rounded-r-xl focus:ring-2 focus:ring-[hsl(262,52%,47%)] focus:border-transparent transition-all duration-300 flex-1"
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

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
