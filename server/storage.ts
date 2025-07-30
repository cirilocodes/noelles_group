import { users, newsletterSubscribers, type User, type InsertUser, type InsertNewsletterSubscriber, type NewsletterSubscriber } from "@shared/schema";
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
  subscribeToNewsletter(subscriber: InsertNewsletterSubscriber): Promise<NewsletterSubscriber>;
  getNewsletterSubscribers(): Promise<NewsletterSubscriber[]>;
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

  async subscribeToNewsletter(insertSubscriber: InsertNewsletterSubscriber): Promise<NewsletterSubscriber> {
    try {
      const [subscriber] = await db
        .insert(newsletterSubscribers)
        .values(insertSubscriber)
        .returning();

      if (!subscriber) {
        throw new Error("Database did not return the new newsletter subscriber.");
      }

      return subscriber;
    } catch (error) {
      console.error("[DB] Failed to create newsletter subscription:", {
        error: error instanceof Error ? error.message : error,
        data: insertSubscriber,
      });
      throw new Error("Could not create newsletter subscription. Please check database connection.");
    }
  }

  async getNewsletterSubscribers(): Promise<NewsletterSubscriber[]> {
    try {
      return await db.select().from(newsletterSubscribers);
    } catch (error) {
      console.error("[DB] Failed to fetch newsletter subscribers:", error instanceof Error ? error.message : error);
      throw new Error("Could not fetch newsletter subscribers. Please check database connection.");
    }
  }
}

export const storage = new DatabaseStorage();
