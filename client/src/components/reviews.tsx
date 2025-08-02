import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { type InsertReview, type Review } from "@shared/schema";
import { enhancedReviewSchema } from "@shared/validation";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormFieldWithValidation } from "@/components/ui/form-field-with-validation";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Star, Send, MessageSquarePlus, CheckCircle, AlertTriangle } from "lucide-react";
import { queryClient } from "@/lib/queryClient";
import { cn } from "@/lib/utils";

const serviceTypes = [/* ...same list... */];

export default function Reviews() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [formProgress, setFormProgress] = useState(0);

  const form = useForm<InsertReview>({
    resolver: zodResolver(enhancedReviewSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      rating: 5,
      message: "",
      serviceUsed: "",
    },
  });

  const watchedFields = form.watch();
  useEffect(() => {
    const requiredFields = ['name', 'email', 'rating', 'message'];
    const completedRequired = requiredFields.filter(field => {
      const value = watchedFields[field];
      if (field === 'rating') return value && value > 0;
      return value && value.toString().trim() !== "";
    }).length;
    setFormProgress((completedRequired / requiredFields.length) * 100);
  }, [watchedFields]);

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
      toast({ title: "Review Submitted Successfully!", description: "Your review will be published after approval." });
      form.reset(); setSelectedRating(0); setShowReviewForm(false); setIsSubmitting(false);
      queryClient.invalidateQueries({ queryKey: ['/api/reviews'] });
    },
    onError: () => {
      toast({ title: "Submission Failed", description: "Try again.", variant: "destructive" });
      setIsSubmitting(false);
    },
  });

  const onSubmit = (data: InsertReview) => {
    setIsSubmitting(true);
    reviewMutation.mutate({ ...data, rating: selectedRating, serviceUsed: data.serviceUsed || undefined });
  };

  const StarRating = ({ rating, onRatingChange, readonly = false }: any) => (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-6 h-6 cursor-pointer transition-colors ${
            star <= rating ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted hover:fill-yellow-300"
          }`}
          onClick={() => !readonly && onRatingChange && onRatingChange(star)}
        />
      ))}
    </div>
  );

  return (
    <section id="reviews" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Customer <span className="gradient-text">Reviews</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            See what our amazing clients have to say.
          </p>
          <Button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <MessageSquarePlus className="mr-2 w-5 h-5" />
            {showReviewForm ? "Close Review Form" : "Leave a Review"}
          </Button>
        </div>

        {showReviewForm && (
          <div className="max-w-2xl mx-auto mb-16">
            <div className="bg-card rounded-3xl p-8 shadow-xl border border-border">
              <h3 className="text-2xl font-bold text-foreground mb-6 text-center">Share Your Experience</h3>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-muted-foreground">Review Progress</span>
                  <span className="text-sm font-medium text-muted-foreground">{Math.round(formProgress)}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${formProgress}%` }}
                  />
                </div>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormFieldWithValidation form={form} name="name" label="Your Name" type="text" />
                    <FormFieldWithValidation form={form} name="email" label="Email" type="email" />
                  </div>

                  <FormFieldWithValidation form={form} name="serviceUsed" label="Service" type="select" options={serviceTypes.map(s => ({ value: s, label: s }))} />

                  <div>
                    <label className="text-foreground font-semibold mb-3 block">Your Rating</label>
                    <StarRating rating={selectedRating} onRatingChange={setSelectedRating} />
                    {selectedRating === 0 && <p className="text-sm text-destructive mt-1">Please select a rating</p>}
                  </div>

                  <FormFieldWithValidation form={form} name="message" label="Your Review" type="textarea" />

                  <div className="bg-muted rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {Object.keys(form.formState.errors).length === 0 && formProgress > 80 && selectedRating > 0 ? (
                          <>
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            <span className="text-green-700">Review looks good!</span>
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="h-5 w-5 text-orange-500" />
                            <span className="text-orange-700">
                              {selectedRating === 0
                                ? 'Select rating'
                                : Object.keys(form.formState.errors).length > 0
                                  ? `${Object.keys(form.formState.errors).length} issue(s)`
                                  : 'Complete required fields'}
                            </span>
                          </>
                        )}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {Object.values(watchedFields).filter((v, i) => ['name', 'email', 'message'].includes(Object.keys(watchedFields)[i]) && v && v.toString().trim() !== "").length + (selectedRating > 0 ? 1 : 0)} / 4 completed
                      </span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting || reviewMutation.isPending || selectedRating === 0 || Object.keys(form.formState.errors).length > 0}
                    className={cn(
                      "w-full py-4 px-8 rounded-xl font-semibold text-lg transition-all transform hover:scale-[1.02] shadow-lg",
                      Object.keys(form.formState.errors).length === 0 && formProgress > 80 && selectedRating > 0
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "bg-muted text-muted-foreground cursor-not-allowed"
                    )}
                  >
                    {isSubmitting || reviewMutation.isPending ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Submitting...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        Submit Review
                        <Send className="ml-2 h-5 w-5" />
                      </div>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            <div className="col-span-full text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="mt-4 text-muted-foreground">Loading reviews...</p>
            </div>
          ) : reviews.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <MessageSquarePlus className="mx-auto w-16 h-16 text-muted-foreground mb-4" />
              <p className="text-xl text-foreground mb-2">No reviews yet</p>
              <p className="text-muted-foreground">Be the first to share!</p>
            </div>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="bg-card p-6 rounded-2xl shadow-lg border border-border hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center justify-between mb-4">
                  <StarRating rating={review.rating} readonly />
                  <span className="text-sm text-muted-foreground">
                    {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : 'Recent'}
                  </span>
                </div>
                <p className="text-foreground mb-4 italic">"{review.message}"</p>
                <div className="border-t pt-4">
                  <h4 className="font-semibold text-foreground">{review.name}</h4>
                  {review.serviceUsed && (
                    <p className="text-sm text-primary font-medium">{review.serviceUsed}</p>
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
