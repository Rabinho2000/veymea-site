import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const quizSessions = sqliteTable("quiz_sessions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  sessionId: text("session_id").notNull().unique(),
  quizType: text("quiz_type").notNull(),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const quizResults = sqliteTable("quiz_results", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  sessionId: text("session_id").notNull(),
  quizType: text("quiz_type").notNull(),
  primaryProfile: text("primary_profile").notNull(),
  secondaryProfile: text("secondary_profile"),
  scores: text("scores"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const leads = sqliteTable("leads", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  quizType: text("quiz_type").notNull(),
  primaryProfile: text("primary_profile").notNull(),
  secondaryProfile: text("secondary_profile"),
  marketingConsent: integer("marketing_consent").notNull().default(0),
  consentVersion: text("consent_version").notNull(),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
