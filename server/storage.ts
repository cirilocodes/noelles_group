import { users, bookings, contacts, reviews, type User, type InsertUser, type InsertBooking, type Booking, type InsertContact, type Contact, type InsertReview, type Review } from "@shared/schema";
import { db } from "./db";

// Add error logging for debugging
function logError(operation: string, error: any, data?: any) {
  console.error(`[DB] Failed to ${operation}:`, { error, data });
}
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  getBookings(): Promise<Booking[]>;
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  createReview(review: InsertReview): Promise<Review>;
  getApprovedReviews(): Promise<Review[]>;
  getAllReviews(): Promise<Review[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    try {
      const [booking] = await db
        .insert(bookings)
        .values(insertBooking)
        .returning();

      if (!booking) {
        throw new Error("Database did not return the new booking.");
      }

      return booking;
    } catch (error) {
      console.error("[DB] Failed to create booking:", {
        error: error instanceof Error ? error.message : error,
        data: insertBooking,
      });
      throw new Error("Could not create booking. Please check database connection.");
    }
  }

  async getBookings(): Promise<Booking[]> {
    return await db.select().from(bookings);
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    try {
      const [contact] = await db
        .insert(contacts)
        .values(insertContact)
        .returning();
      
      if (!contact) {
        throw new Error("Database did not return the new contact.");
      }
      
      return contact;
    } catch (error) {
      console.error("[DB] Failed to create contact:", {
        error: error instanceof Error ? error.message : error,
        data: insertContact,
      });
      throw new Error("Could not create contact. Please check database connection.");
    }
  }

  async getContacts(): Promise<Contact[]> {
    return await db.select().from(contacts);
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    try {
      const [review] = await db
        .insert(reviews)
        .values(insertReview)
        .returning();

      if (!review) {
        throw new Error("Database did not return the new review.");
      }

      return review;
    } catch (error) {
      console.error("[DB] Failed to create review:", {
        error: error instanceof Error ? error.message : error,
        data: insertReview,
      });
      throw new Error("Could not create review. Please check database connection.");
    }
  }

  async getApprovedReviews(): Promise<Review[]> {
    try {
      return await db.select().from(reviews).where(eq(reviews.isApproved, true));
    } catch (error) {
      console.error("[DB] Failed to fetch approved reviews:", error instanceof Error ? error.message : error);
      throw new Error("Could not fetch reviews. Please check database connection.");
    }
  }

  async getAllReviews(): Promise<Review[]> {
    return await db.select().from(reviews);
  }
}

export const storage = new DatabaseStorage();
