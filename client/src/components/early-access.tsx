import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Users, MapPin, Home } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { InsertEarlyAccess } from "@shared/schema";

export default function EarlyAccess() {
  const [formData, setFormData] = useState<InsertEarlyAccess>({
    name: "",
    email: "",
    phone: "",
    userType: "consumer",
    location: "",
    interests: "both"
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: InsertEarlyAccess) => apiRequest("/api/early-access", "POST", data),
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "You've been added to our early access list. We'll be in touch soon!",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        userType: "consumer",
        location: "",
        interests: "both"
      });
      queryClient.invalidateQueries({ queryKey: ["/api/early-access"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to join early access. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  const benefits = [
    {
      icon: Users,
      title: "First Access",
      description: "Be among the first to use HabiGrid when we launch"
    },
    {
      icon: MapPin,
      title: "Priority Listings",
      description: "Get early access to premium verified land listings"
    },
    {
      icon: Home,
      title: "Exclusive Updates",
      description: "Receive regular updates on our progress and features"
    }
  ];

  return (
    <section id="early-access" className="py-20 bg-gradient-to-br from-emerald-900 to-emerald-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Join Our
            <span className="text-emerald-300 block">Early Access</span>
          </h2>
          <p className="text-xl text-emerald-100 max-w-3xl mx-auto leading-relaxed">
            Be the first to experience Ghana's most trusted platform for land acquisition and construction. 
            Join thousands of early adopters who are ready to build their futures.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="grid gap-6 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="w-12 h-12 bg-emerald-400 rounded-lg flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-6 h-6 text-emerald-900" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">{benefit.title}</h3>
                    <p className="text-emerald-200">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-white mb-4">Why Early Access?</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span className="text-emerald-100">Shape the platform with your feedback</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span className="text-emerald-100">Access to exclusive beta features</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span className="text-emerald-100">Special launch pricing and benefits</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span className="text-emerald-100">Direct line to our founding team</span>
                </div>
              </div>
            </div>
          </div>

          <Card className="bg-white shadow-2xl">
            <CardHeader>
              <CardTitle className="text-2xl text-emerald-900">Reserve Your Spot</CardTitle>
              <CardDescription>
                Join the revolution in Ghanaian real estate and construction
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone || ""}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="mt-1"
                      placeholder="+233 XX XXX XXXX"
                    />
                  </div>
                  <div>
                    <Label htmlFor="userType">I am a *</Label>
                    <Select value={formData.userType} onValueChange={(value: any) => setFormData({ ...formData, userType: value })}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="consumer">Land Buyer/Home Builder</SelectItem>
                        <SelectItem value="salesperson">Land/Property Agent</SelectItem>
                        <SelectItem value="artisan">Construction Professional</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="location">Location/Region</Label>
                    <Input
                      id="location"
                      type="text"
                      value={formData.location || ""}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="mt-1"
                      placeholder="e.g. Greater Accra, Ashanti, Western"
                    />
                  </div>
                  <div>
                    <Label htmlFor="interests">Primary Interest</Label>
                    <Select value={formData.interests || ""} onValueChange={(value: any) => setFormData({ ...formData, interests: value })}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="land_buying">Land Acquisition Only</SelectItem>
                        <SelectItem value="construction">Construction Services Only</SelectItem>
                        <SelectItem value="both">Both Land & Construction</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  type="submit" 
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? "Joining..." : "Join Early Access"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
}