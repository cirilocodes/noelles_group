import { z } from "zod";
import { insertBookingSchema, insertContactSchema, insertReviewSchema } from "./schema";

export type { InsertBooking, InsertContact, InsertReview } from "./schema";

// Enhanced validation schemas with detailed error messages and real-time validation
export const enhancedBookingSchema = insertBookingSchema.extend({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
  
  email: z.string()
    .email("Please enter a valid email address")
    .min(5, "Email is too short")
    .max(100, "Email is too long"),
  
  phone: z.string()
    .min(8, "Phone number must be at least 8 digits")
    .max(20, "Phone number is too long")
    .regex(/^[+\d\s()-]+$/, "Invalid phone number format"),
  
  projectDetails: z.string()
    .min(10, "Please provide at least 10 characters describing your project")
    .max(1000, "Project details must be less than 1000 characters"),
  
  serviceType: z.string()
    .min(1, "Please select a service type"),
  
  country: z.string()
    .min(1, "Please select your country"),
});

export const enhancedContactSchema = insertContactSchema.extend({
  firstName: z.string()
    .min(2, "First name must be at least 2 characters")
    .max(30, "First name must be less than 30 characters")
    .regex(/^[a-zA-Z]+$/, "First name can only contain letters"),
  
  lastName: z.string()
    .min(2, "Last name must be at least 2 characters")
    .max(30, "Last name must be less than 30 characters")
    .regex(/^[a-zA-Z]+$/, "Last name can only contain letters"),
  
  email: z.string()
    .email("Please enter a valid email address")
    .min(5, "Email is too short")
    .max(100, "Email is too long"),
  
  phone: z.string()
    .optional()
    .refine((val) => !val || (val.length >= 8 && val.length <= 20), "Phone number must be 8-20 characters")
    .refine((val) => !val || /^[+\d\s()-]+$/.test(val), "Invalid phone number format"),
  
  subject: z.string()
    .min(3, "Subject must be at least 3 characters")
    .max(100, "Subject must be less than 100 characters"),
  
  message: z.string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters"),
  
  country: z.string()
    .optional(),
});

export const enhancedReviewSchema = insertReviewSchema.extend({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
  
  email: z.string()
    .email("Please enter a valid email address")
    .min(5, "Email is too short")
    .max(100, "Email is too long"),
  
  rating: z.number()
    .min(1, "Please provide a rating")
    .max(5, "Rating cannot exceed 5 stars")
    .int("Rating must be a whole number"),
  
  message: z.string()
    .min(10, "Review must be at least 10 characters")
    .max(500, "Review must be less than 500 characters"),
  
  serviceUsed: z.string()
    .optional(),
});

// Validation helper functions
export const validateField = (schema: z.ZodSchema, fieldName: string, value: any) => {
  try {
    const fieldSchema = schema.shape[fieldName];
    if (fieldSchema) {
      fieldSchema.parse(value);
      return { isValid: true, error: null };
    }
    return { isValid: true, error: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { isValid: false, error: error.errors[0]?.message || "Invalid input" };
    }
    return { isValid: false, error: "Validation error" };
  }
};

export const getFieldValidationState = (errors: any, fieldName: string) => {
  return {
    hasError: !!errors[fieldName],
    errorMessage: errors[fieldName]?.message || "",
    isValid: !errors[fieldName],
  };
};