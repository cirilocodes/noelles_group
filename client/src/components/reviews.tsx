import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { insertReviewSchema, type InsertReview, type Review } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Star, Send, MessageSquarePlus } from "lucide-react";
import { queryClient } from "@/lib/queryClient";

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

export default function Reviews() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);

  const form = useForm<InsertReview>({
    resolver: zodResolver(insertReviewSchema),
    defaultValues: {
      name: "",
      email: "",
      rating: 5,
      message: "",
      serviceUsed: "",
    },
  });

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ['/api/reviews'],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/reviews");
      return response.json() as Promise<Review[]>;
    },
  });

  const reviewMutation = useMutation({
    mutationFn: async (data: InsertReview) => {
      const response = await apiRequest("POST", "/api/reviews", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Review Submitted Successfully!",
        description: "Thank you for your feedback. Your review will be published after approval.",
      });
      form.reset();
      setSelectedRating(0);
      setShowReviewForm(false);
      setIsSubmitting(false);
      queryClient.invalidateQueries({ queryKey: ['/api/reviews'] });
    },
    onError: (error) => {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your review. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    },
  });

  const onSubmit = (data: InsertReview) => {
    setIsSubmitting(true);
    const reviewData: InsertReview = {
      ...data,
      rating: selectedRating,
      serviceUsed: data.serviceUsed || undefined
    };
    reviewMutation.mutate(reviewData);
  };

  const StarRating = ({ rating, onRatingChange, readonly = false }: {
    rating: number;
    onRatingChange?: (rating: number) => void;
    readonly?: boolean;
  }) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-6 h-6 cursor-pointer transition-colors duration-200 ${
              star <= rating 
                ? "fill-yellow-400 text-yellow-400" 
                : readonly 
                  ? "fill-gray-200 text-gray-200"
                  : "fill-gray-200 text-gray-200 hover:fill-yellow-300 hover:text-yellow-300"
            }`}
            onClick={() => !readonly && onRatingChange && onRatingChange(star)}
          />
        ))}
      </div>
    );
  };

  return (
    <section id="reviews" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Customer <span className="gradient-text">Reviews</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            See what our amazing clients have to say about our services and share your own experience.
          </p>
          
          <Button 
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="bg-gradient-to-r from-[hsl(262,52%,47%)] to-[hsl(217,91%,60%)] px-8 py-4 rounded-full text-white font-bold text-lg hover:shadow-xl hover:shadow-[hsl(262,52%,47%)]/30 transition-all duration-300 transform hover:scale-105"
          >
            <MessageSquarePlus className="mr-2 w-5 h-5" />
            {showReviewForm ? "Close Review Form" : "Leave a Review"}
          </Button>
        </div>

        {/* Review Form */}
        {showReviewForm && (
          <div className="max-w-2xl mx-auto mb-16">
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Share Your Experience</h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-semibold">Your Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter your name" 
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

                  <FormField
                    control={form.control}
                    name="serviceUsed"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-semibold">Service Used (Optional)</FormLabel>
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

                  <div>
                    <FormLabel className="text-gray-700 font-semibold mb-3 block">Your Rating</FormLabel>
                    <StarRating 
                      rating={selectedRating} 
                      onRatingChange={setSelectedRating}
                    />
                    {selectedRating === 0 && (
                      <p className="text-sm text-red-500 mt-1">Please select a rating</p>
                    )}
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-semibold">Your Review</FormLabel>
                        <FormControl>
                          <Textarea 
                            rows={5}
                            placeholder="Tell us about your experience with Noelles Group..." 
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
                    disabled={isSubmitting || selectedRating === 0}
                    className="w-full bg-gradient-to-r from-[hsl(262,52%,47%)] to-[hsl(217,91%,60%)] px-8 py-4 rounded-xl text-white font-bold text-lg hover:shadow-xl hover:shadow-[hsl(262,52%,47%)]/30 transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Review"}
                    <Send className="ml-2 w-5 h-5" />
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        )}

        {/* Display Reviews */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            <div className="col-span-full text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[hsl(262,52%,47%)]"></div>
              <p className="mt-4 text-gray-600">Loading reviews...</p>
            </div>
          ) : reviews.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <MessageSquarePlus className="mx-auto w-16 h-16 text-gray-400 mb-4" />
              <p className="text-xl text-gray-600 mb-2">No reviews yet</p>
              <p className="text-gray-500">Be the first to share your experience!</p>
            </div>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center justify-between mb-4">
                  <StarRating rating={review.rating} readonly />
                  <span className="text-sm text-gray-500">
                    {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : 'Recent'}
                  </span>
                </div>
                
                <p className="text-gray-700 mb-4 italic">
                  "{review.message}"
                </p>
                
                <div className="border-t pt-4">
                  <h4 className="font-semibold text-gray-900">{review.name}</h4>
                  {review.serviceUsed && (
                    <p className="text-sm text-[hsl(262,52%,47%)] font-medium">
                      {review.serviceUsed}
                    </p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}