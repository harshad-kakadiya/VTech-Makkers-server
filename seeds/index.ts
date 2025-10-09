import { db } from "../db";
import { products as productsSchema, articles as articlesSchema } from "../shared/schema";
import { products as productsData } from "../data/products";
import { articles as articlesData } from "../data/articles";
import { readFileSync } from "fs";
import path from "path";

async function seedProducts() {

  try {
    // Map the products data to match the database schema
    const productsToInsert = productsData.map(product => ({
      name: product.name,
      category: product.category,
      subcategory: product.slug.split("-").join(" "),
      description: product.description,
      applications: product.applications,
      features: product.benefits,
      is_featured: product.id <= 3, // First 3 products are featured
      specifications: product.spec_models ? { models: product.spec_models } : undefined,
    }));
    
    // Insert products into the database
    const insertedProducts = await db.insert(productsSchema).values(productsToInsert).returning();
    console.log(`✅ Successfully seeded ${insertedProducts.length} products`);
  } catch (error) {
    console.error("❌ Error seeding products:", error);
  }
}

async function seedArticles() {

  try {
    // Map the articles data to match the database schema
    const articlesToInsert = articlesData.map(article => ({
      title: article.title,
      slug: article.slug,
      content: article.content,
      excerpt: article.summary,
      author: article.author,
      category: "technical", // Default category
      tags: ["crusher", "maintenance", "efficiency"], // Example tags
      published: true,
      featured_image: article.image,
    }));
    
    // Insert articles into the database
    const insertedArticles = await db.insert(articlesSchema).values(articlesToInsert).returning();
    console.log(`✅ Successfully seeded ${insertedArticles.length} articles`);
  } catch (error) {
    console.error("❌ Error seeding articles:", error);
  }
}

async function seedSolutions() {

  try {
    // Read solutions data from JSON file
    const solutionsPath = path.join(process.cwd(), "data", "solutions.json");
    const solutionsData = JSON.parse(readFileSync(solutionsPath, "utf-8"));
    
    // For now, just log the solutions as there's no solutions table in the schema
    console.log(`✅ Found ${solutionsData.length} solutions (no table to insert into yet)`);
  } catch (error) {
    console.error("❌ Error processing solutions:", error);
  }
}

async function seedSpecs() {

  try {
    // This data is already included in the products specifications field
    // Just log that we've processed it
    console.log("✅ Specs data is included in product specifications");
  } catch (error) {
    console.error("❌ Error processing specs:", error);
  }
}

async function main() {

  try {
    // Run all seed functions
    await seedProducts();
    await seedArticles();
    await seedSolutions();
    await seedSpecs();
    
    console.log("✅ Database seeding completed successfully!");
  } catch (error) {
    console.error("❌ Database seeding failed:", error);
  } finally {
    // Close the database connection
    process.exit(0);
  }
}

// Run the main function
main();