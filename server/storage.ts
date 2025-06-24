import { users, bookings, contacts, reviews, type User, type InsertUser, type InsertBooking, type Booking, type InsertContact, type Contact, type InsertReview, type Review } from "@shared/schema";
import { db } from "./db";
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
      error,
      data: insertBooking,
    });

    throw new Error("Could not create booking. See logs for details.");
  }
}

  async getBookings(): Promise<Booking[]> {
    return await db.select().from(bookings);
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const [contact] = await db
      .insert(contacts)
      .values(insertContact)
      .returning();
    return contact;
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
      error,
      data: insertReview,
    });

    throw new Error("Could not create review. See logs for details.");
  }
}

  async getApprovedReviews(): Promise<Review[]> {
    return await db.select().from(reviews).where(eq(reviews.isApproved, true));
  }

  async getAllReviews(): Promise<Review[]> {
    return await db.select().from(reviews);
  }
}

export const storage = new DatabaseStorage();
