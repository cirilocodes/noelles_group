import { apiRequest } from "./queryClient";
import type { InsertBooking, InsertContact, InsertReview } from "@shared/schema";

export const api = {
  bookings: {
    create: async (data: InsertBooking) => {
      const response = await apiRequest("POST", "/api/bookings", data);
      return response.json();
    },
    getAll: async () => {
      const response = await apiRequest("GET", "/api/bookings");
      return response.json();
    },
  },
  contacts: {
    create: async (data: InsertContact) => {
      const response = await apiRequest("POST", "/api/contacts", data);
      return response.json();
    },
    getAll: async () => {
      const response = await apiRequest("GET", "/api/contacts");
      return response.json();
    },
  },
  reviews: {
    create: async (data: InsertReview) => {
      const response = await apiRequest("POST", "/api/reviews", data);
      return response.json();
    },
    getAll: async () => {
      const response = await apiRequest("GET", "/api/reviews");
      return response.json();
    },
  },
};
