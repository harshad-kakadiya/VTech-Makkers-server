import { 
  leads, 
  productQueries,
  type Lead,
  type InsertLead,
  type ProductQuery,
  type InsertProductQuery
} from "./shared/schema";
import { products as fileProducts, type Product } from "./data/products";
import { db } from "./db";
import { eq, ilike, or } from "drizzle-orm";

export interface IStorage {
  // Product methods
  getAllProducts(): Promise<Product[]>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
  searchProducts(query: string): Promise<Product[]>;
  
  // Lead methods
  createLead(lead: InsertLead): Promise<Lead>;
  getLeads(): Promise<Lead[]>;
  getRecentLeads(): Promise<Lead[]>;
  semanticSearchLeads(query: string): Promise<Lead[]>;
  
  // Query methods
  createProductQuery(query: InsertProductQuery): Promise<ProductQuery>;
  updateProductQuery(id: number, updates: Partial<ProductQuery>): Promise<ProductQuery>;
}

export class DatabaseStorage implements IStorage {
  async getAllProducts(): Promise<Product[]> {
    return fileProducts;
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return fileProducts.filter(product => product.category === category);
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return fileProducts.slice(0, 3);
  }

  async searchProducts(query: string): Promise<Product[]> {
    const searchTerm = query.toLowerCase();
    return fileProducts.filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm) ||
      product.applications.some(app => app.toLowerCase().includes(searchTerm)) ||
      product.benefits.some(benefit => benefit.toLowerCase().includes(searchTerm))
    );
  }

  async createLead(lead: InsertLead): Promise<Lead> {
    const [newLead] = await db.insert(leads).values(lead).returning();
    return newLead;
  }

  async getLeads(): Promise<Lead[]> {
    return await db.select().from(leads).orderBy(leads.created_at);
  }

  async getRecentLeads(): Promise<Lead[]> {
    return await db.select().from(leads)
      .orderBy(leads.created_at)
      .limit(10);
  }

  async semanticSearchLeads(query: string): Promise<Lead[]> {
    const searchTerm = `%${query.toLowerCase()}%`;
    return await db.select().from(leads).where(
      or(
        ilike(leads.name, searchTerm),
        ilike(leads.email, searchTerm),
        ilike(leads.company, searchTerm),
        ilike(leads.query_text, searchTerm),
        ilike(leads.product_name, searchTerm)
      )
    ).orderBy(leads.created_at);
  }

  async createProductQuery(query: InsertProductQuery): Promise<ProductQuery> {
    const [newQuery] = await db.insert(productQueries).values(query).returning();
    return newQuery;
  }

  async updateProductQuery(id: number, updates: Partial<ProductQuery>): Promise<ProductQuery> {
    const [updatedQuery] = await db.update(productQueries)
      .set(updates)
      .where(eq(productQueries.id, id))
      .returning();
    return updatedQuery;
  }
}

export const storage = new DatabaseStorage();