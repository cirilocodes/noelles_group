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
            {/* Form Progress Indicator */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Form Progress</span>
                <span className="text-sm font-medium text-gray-600">{Math.round(formProgress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-[hsl(262,52%,47%)] to-[hsl(217,91%,60%)] h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${formProgress}%` }}
                />
              </div>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormFieldWithValidation
                    form={form}
                    name="firstName"
                    label="First Name"
                    type="text"
                    placeholder="John"
                    required
                    description="Enter your first name"
                  />
                  <FormFieldWithValidation
                    form={form}
                    name="lastName"
                    label="Last Name"
                    type="text"
                    placeholder="Doe"
                    required
                    description="Enter your last name"
                  />
                </div>

                <FormFieldWithValidation
                  form={form}
                  name="email"
                  label="Email Address"
                  type="email"
                  placeholder="john@example.com"
                  required
                  description="We'll use this to respond to your message"
                />

                <div className="grid md:grid-cols-2 gap-6">
                  <FormFieldWithValidation
                    form={form}
                    name="country"
                    label="Country (Optional)"
                    type="select"
                    placeholder="Select your country"
                    options={countries.map(country => ({
                      value: country.name,
                      label: `${country.name} (${country.code})`
                    }))}
                    description="Help us provide better service"
                  />
                  <FormFieldWithValidation
                    form={form}
                    name="phone"
                    label="Phone Number (Optional)"
                    type="tel"
                    placeholder="24 676 6413"
                    description="Enter your phone number (optional)"
                  />
                </div>

                <FormFieldWithValidation
                  form={form}
                  name="subject"
                  label="Subject"
                  type="text"
                  placeholder="How can we help you?"
                  required
                  description="Brief description of your inquiry"
                />

                <FormFieldWithValidation
                  form={form}
                  name="message"
                  label="Message"
                  type="textarea"
                  placeholder="Tell us about your project or ask any questions..."
                  required
                  description="Provide details about your inquiry (minimum 10 characters)"
                />

                {/* Form Validation Summary */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {Object.keys(form.formState.errors).length === 0 && formProgress > 80 ? (
                        <>
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <span className="text-green-700 font-medium">Form looks good! Ready to submit.</span>
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="h-5 w-5 text-orange-500" />
                          <span className="text-orange-700 font-medium">
                            {Object.keys(form.formState.errors).length > 0 
                              ? `${Object.keys(form.formState.errors).length} field(s) need attention`
                              : 'Please complete all required fields'
                            }
                          </span>
                        </>
                      )}
                    </div>
                    <span className="text-sm text-gray-500">
                      {Object.values(watchedFields).filter((v, i) => ['firstName', 'lastName', 'email', 'subject', 'message'].includes(Object.keys(watchedFields)[i]) && v && v.toString().trim() !== "").length} / 5 completed
                    </span>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting || contactMutation.isPending || Object.keys(form.formState.errors).length > 0} 
                  className={cn(
                    "w-full py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl",
                    Object.keys(form.formState.errors).length === 0 && formProgress > 80
                      ? "bg-gradient-to-r from-[hsl(262,52%,47%)] to-[hsl(217,91%,60%)] hover:from-[hsl(262,52%,42%)] hover:to-[hsl(217,91%,55%)] text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  )}
                >
                  {isSubmitting || contactMutation.isPending ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Sending...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      Send Message
                      <Send className="ml-2 h-5 w-5" />
                    </div>
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
