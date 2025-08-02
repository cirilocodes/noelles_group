import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Sparkles, Bell } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const subscribeMutation = useMutation({
    mutationFn: (data: { email: string }) => apiRequest("/api/newsletter", "POST", data),
    onSuccess: () => {
      toast({
        title: "Welcome to the HabiGrid Universe! 🚀",
        description: "You'll be the first to know when we launch. Check your email for a special welcome message!",
      });
      setEmail("");
      queryClient.invalidateQueries({ queryKey: ["/api/newsletter"] });
    },
    onError: (error: any) => {
      toast({
        title: "Subscription Failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    subscribeMutation.mutate({ email: email.trim() });
  };

  return (
    <section
      id="newsletter"
      className="py-24 bg-gradient-to-br from-primary via-[hsl(220,80%,40%)] to-[hsl(220,80%,35%)] relative overflow-hidden text-foreground"
    >
      <div className="absolute inset-0 bg-black/20" />

      {/* Decorative floating circles */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full animate-pulse-blue" />
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-primary/10 rounded-full animate-float" />
      <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white/5 rounded-full animate-float" style={{ animationDelay: "2s" }} />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center bg-background/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-border/20">
          <Sparkles className="w-5 h-5 text-primary mr-2" />
          <span className="text-primary font-medium">The Revolution Begins Soon</span>
        </div>

        <h2 className="text-4xl md:text-6xl font-black text-primary-foreground mb-6 leading-tight">
          Get Ready for
          <span className="text-primary block">Something</span>
          <span className="text-primary/90">Amazing</span>
        </h2>

        <p className="text-xl text-foreground/80 mb-4 leading-relaxed">
          Ghana's smartest property platform is almost here
        </p>

        <p className="text-lg text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto">
          Be the first to know when we launch. Get exclusive access to the best properties,
          most reliable professionals, and easiest way to find your perfect home in Ghana.
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary w-5 h-5" />
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-12 py-4 text-lg rounded-full border border-border bg-background/30 backdrop-blur-sm text-foreground placeholder-muted-foreground focus:border-primary focus:bg-background/50"
                required
              />
            </div>
            <Button
              type="submit"
              disabled={subscribeMutation.isPending}
              className="bg-background text-primary hover:bg-muted px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
            >
              {subscribeMutation.isPending ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                  <span>Joining...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  <span>Notify Me</span>
                </div>
              )}
            </Button>
          </div>
        </form>

        <div className="flex flex-wrap justify-center gap-8 mt-16 pt-8 border-t border-border">
          {[
            { value: "1000+", label: "Property Listings Ready" },
            { value: "500+", label: "Verified Artisans Waiting" },
            { value: "100+", label: "Service Categories" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-3xl font-bold text-primary">{value}</div>
              <div className="text-muted-foreground">{label}</div>
            </div>
          ))}
        </div>

        <p className="text-muted-foreground text-sm mt-8">
          Join thousands of Ghanaians ready to transform how real estate works.
          No spam, just game-changing updates.
        </p>
      </div>
    </section>
  );
}
