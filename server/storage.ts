import { users, landInquiries, contacts, earlyAccess, type User, type InsertUser, type InsertLandInquiry, type LandInquiry, type InsertContact, type Contact, type InsertEarlyAccess, type EarlyAccess } from "@shared/schema";
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
  createLandInquiry(inquiry: InsertLandInquiry): Promise<LandInquiry>;
  getLandInquiries(): Promise<LandInquiry[]>;
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  createEarlyAccess(earlyAccess: InsertEarlyAccess): Promise<EarlyAccess>;
  getEarlyAccessList(): Promise<EarlyAccess[]>;
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

  async createLandInquiry(insertInquiry: InsertLandInquiry): Promise<LandInquiry> {
    try {
      const [inquiry] = await db
        .insert(landInquiries)
        .values(insertInquiry)
        .returning();

      if (!inquiry) {
        throw new Error("Database did not return the new land inquiry.");
      }

      return inquiry;
    } catch (error) {
      console.error("[DB] Failed to create land inquiry:", {
        error: error instanceof Error ? error.message : error,
        data: insertInquiry,
      });
      throw new Error("Could not create land inquiry. Please check database connection.");
    }
  }

  async getLandInquiries(): Promise<LandInquiry[]> {
    return await db.select().from(landInquiries);
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

  async createEarlyAccess(insertEarlyAccess: InsertEarlyAccess): Promise<EarlyAccess> {
    try {
      const [earlyAccessRecord] = await db
        .insert(earlyAccess)
        .values(insertEarlyAccess)
        .returning();

      if (!earlyAccessRecord) {
        throw new Error("Database did not return the new early access record.");
      }

      return earlyAccessRecord;
    } catch (error) {
      console.error("[DB] Failed to create early access record:", {
        error: error instanceof Error ? error.message : error,
        data: insertEarlyAccess,
      });
      throw new Error("Could not create early access record. Please check database connection.");
    }
  }

  async getEarlyAccessList(): Promise<EarlyAccess[]> {
    try {
      return await db.select().from(earlyAccess);
    } catch (error) {
      console.error("[DB] Failed to fetch early access list:", error instanceof Error ? error.message : error);
      throw new Error("Could not fetch early access list. Please check database connection.");
    }
  }
}

export const storage = new DatabaseStorage();
