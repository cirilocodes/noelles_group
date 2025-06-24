import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { type InsertBooking } from "@shared/schema";
import { enhancedBookingSchema } from "@shared/validation";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormFieldWithValidation } from "@/components/ui/form-field-with-validation";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { ArrowRight, CheckCircle, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

const serviceTypes = [
  "Website Development",
  "Mobile App Development",
  "Video Editing",
  "Flyer Design",
  "Games Installation",
  "Apple Product Sales",
  "Jerseys (Team Sets & Singles)",
  "Perfumes",
  "Gospel Ministries Dancers",
  "Nails Fixing and Design",
  "Animation Creation"
];

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

export default function Booking() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [formProgress, setFormProgress] = useState(0);

  const form = useForm<InsertBooking>({
    resolver: zodResolver(enhancedBookingSchema),
    mode: "onChange", // Enable real-time validation
    defaultValues: {
      name: "",
      email: "",
      country: "",
      phone: "",
      serviceType: "",
      projectDetails: "",
    },
  });

  // Calculate form completion progress
  const watchedFields = form.watch();
  useEffect(() => {
    const totalFields = Object.keys(watchedFields).length;
    const completedFields = Object.values(watchedFields).filter(value => 
      value && value.toString().trim() !== ""
    ).length;
    setFormProgress((completedFields / totalFields) * 100);
  }, [watchedFields]);

  const getCountryCode = (countryName: string) => {
    const country = countries.find(c => c.name === countryName);
    return country ? country.code : "";
  };

  const bookingMutation = useMutation({
    mutationFn: async (data: InsertBooking) => {
      const response = await apiRequest("POST", "/api/bookings", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Booking Submitted Successfully!",
        description: "We'll get back to you within 24 hours to discuss your project.",
      });
      form.reset();
      setIsSubmitting(false);
    },
    onError: (error) => {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your booking. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    },
  });

  const onSubmit = (data: InsertBooking) => {
    setIsSubmitting(true);
    bookingMutation.mutate(data);
  };

  return (
    <section id="booking" className="py-20 bg-gradient-to-br from-[hsl(262,52%,47%)] to-[hsl(217,91%,60%)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Start Your <span className="text-[hsl(45,100%,70%)]">Project</span>
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Ready to bring your vision to life? Let's discuss your project and create something amazing together.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl">
          {/* Form Progress Indicator */}
          <div className="mb-8">
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
                  name="name"
                  label="Full Name"
                  type="text"
                  placeholder="Enter your full name"
                  required
                  description="Enter your first and last name"
                />
                <FormFieldWithValidation
                  form={form}
                  name="email"
                  label="Email Address"
                  type="email"
                  placeholder="Enter your email address"
                  required
                  description="We'll send booking confirmation here"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <FormFieldWithValidation
                  form={form}
                  name="country"
                  label="Country"
                  type="select"
                  placeholder="Select your country"
                  required
                  options={countries.map(country => ({
                    value: country.name,
                    label: `${country.name} (${country.code})`
                  }))}
                  description="Select your country for accurate phone code"
                />
                <FormFieldWithValidation
                  form={form}
                  name="phone"
                  label="Phone Number"
                  type="tel"
                  placeholder="24 676 6413"
                  required
                  description={`Format: ${getCountryCode(selectedCountry) || "+233"} followed by your number`}
                />
              </div>

              <FormFieldWithValidation
                form={form}
                name="serviceType"
                label="Service Type"
                type="select"
                placeholder="Select a service"
                required
                options={serviceTypes.map(service => ({
                  value: service,
                  label: service
                }))}
                description="Choose the service you need help with"
              />

              <FormFieldWithValidation
                form={form}
                name="projectDetails"
                label="Project Details"
                type="textarea"
                placeholder="Describe your project, goals, timeline, and any specific requirements..."
                required
                description="Provide detailed information about your project (minimum 10 characters)"
              />
                  <FormItem>
                    <FormLabel className="text-gray-700 font-semibold">Project Details</FormLabel>
                    <FormControl>
                      <Textarea 
                        rows={5}
                        placeholder="Tell us about your project requirements, goals, and any specific details..." 
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
                {isSubmitting ? "Submitting..." : "Submit Project Request"}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
