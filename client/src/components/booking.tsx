import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { insertBookingSchema, type InsertBooking } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { ArrowRight } from "lucide-react";

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

export default function Booking() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<InsertBooking>({
    resolver: zodResolver(insertBookingSchema),
    defaultValues: {
      name: "",
      email: "",
      country: "",
      phone: "",
      serviceType: "",
      projectDetails: "",
    },
  });

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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-semibold">Full Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter your full name" 
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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-semibold">Email Address</FormLabel>
                      <FormControl>
                        <Input 
                          type="email"
                          placeholder="Enter your email" 
                          className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[hsl(262,52%,47%)] focus:border-transparent transition-all duration-300"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-semibold">Country</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter your country" 
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
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-semibold">Phone Number</FormLabel>
                      <FormControl>
                        <Input 
                          type="tel"
                          placeholder="Enter your phone number" 
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
                name="serviceType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-semibold">Service Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[hsl(262,52%,47%)] focus:border-transparent transition-all duration-300">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {serviceTypes.map((service) => (
                          <SelectItem key={service} value={service}>
                            {service}
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
                name="projectDetails"
                render={({ field }) => (
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
