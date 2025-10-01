import { pgTable, text, serial, integer, boolean, timestamp, decimal, jsonb } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Products table for industrial equipment
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(), // 'crushers', 'mobile-plants', 'screening', 'washing', 'conveying', 'complete-solutions'
  subcategory: text("subcategory"), // 'jaw-crusher', 'vsi-crusher', etc.
  description: text("description").notNull(),
  capacity_min: integer("capacity_min"), // TPH minimum
  capacity_max: integer("capacity_max"), // TPH maximum
  motor_power: text("motor_power"), // kW range
  weight: decimal("weight"), // tons
  feed_opening: text("feed_opening"), // dimensions
  applications: text("applications").array(), // material types
  specifications: jsonb("specifications"), // detailed tech specs
  features: text("features").array(),
  is_featured: boolean("is_featured").default(false),
  created_at: timestamp("created_at").defaultNow(),
});

// Leads table for customer inquiries
export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  phone: text("phone"),
  message: text("message"),
  product_id: integer("product_id").references(() => products.id),
  status: text("status").default("new"), // 'new', 'contacted', 'qualified', 'proposal', 'closed'
  created_at: timestamp("created_at").defaultNow(),
});

// Product queries for specific equipment information
export const productQueries = pgTable("product_queries", {
  id: serial("id").primaryKey(),
  lead_id: integer("lead_id").references(() => leads.id),
  product_id: integer("product_id").references(() => products.id),
  material_type: text("material_type"), // 'limestone', 'granite', 'river stone', etc.
  capacity_required: integer("capacity_required"), // TPH
  feed_size: text("feed_size"), // mm
  output_size: text("output_size"), // mm
  application: text("application"), // 'construction', 'mining', 'recycling', etc.
  additional_requirements: text("additional_requirements"),
  created_at: timestamp("created_at").defaultNow(),
});

// Articles for knowledge center
export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  author: text("author"),
  category: text("category"), // 'technical', 'industry', 'case-study', 'maintenance'
  tags: text("tags").array(),
  published: boolean("published").default(false),
  featured_image: text("featured_image"),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

// Relations
export const productsRelations = relations(products, ({ many }) => ({
  leads: many(leads),
  productQueries: many(productQueries),
}));

export const leadsRelations = relations(leads, ({ one, many }) => ({
  product: one(products, {
    fields: [leads.product_id],
    references: [products.id],
  }),
  productQueries: many(productQueries),
}));

export const productQueriesRelations = relations(productQueries, ({ one }) => ({
  lead: one(leads, {
    fields: [productQueries.lead_id],
    references: [leads.id],
  }),
  product: one(products, {
    fields: [productQueries.product_id],
    references: [products.id],
  }),
}));

// Zod schemas for validation
export const insertLeadSchema = createInsertSchema(leads);
export const insertProductQuerySchema = createInsertSchema(productQueries);

// Types
export type Lead = typeof leads.$inferSelect;
export type InsertLead = typeof leads.$inferInsert;
export type ProductQuery = typeof productQueries.$inferSelect;
export type InsertProductQuery = typeof productQueries.$inferInsert;
export type Article = typeof articles.$inferSelect;
export type InsertArticle = typeof articles.$inferInsert;