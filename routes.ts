import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema, insertProductQuerySchema } from "./shared/schema";
import { eventBus } from "./events/event-bus";
import { z } from "zod";
import { articles } from "./data/articles.ts";
import multer from "multer";
import path from "path";
import fs from "fs";

// Industries data
export interface Industry {
  id: string;
  name: string;
  icon: string;
  painPoint: string;
  products: string[];
}

// Configure multer for industry background image uploads
const storage_config = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(process.cwd(), 'public', 'images', 'industries');
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Use industry ID as filename with original extension
    const industryId = req.body.industryId || 'default';
    const ext = path.extname(file.originalname);
    cb(null, `${industryId}${ext}`);
  }
});

const upload = multer({
  storage: storage_config,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept only image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

export const industries: Industry[] = [
  {
    id: "turnkey-solutions",
    name: "Turnkey Solutions",
    icon: "/icons/turnkey.svg",
    painPoint: "Complete project delivery",
    products: ["Complete Plant Design", "Project Management", "Installation & Support", "Commissioning"]
  },
  {
    id: "construction",
    name: "Mining & Aggregates",
    icon: "/icons/construction.svg",
    painPoint: "Consistent sizing & fines control",
    products: ["Inclined Vibrating Screens", "HSI Impactors", "Single-Toggle Jaw", "Double-Toggle Jaw"]
  },
  {
    id: "washing-m-sand",
    name: "Sand Washing & M-Sand",
    icon: "/icons/washing.svg",
    painPoint: "Ultra-fine removal & cubical shape production",
    products: ["Bucket Sand Classifier", "Hydrocyclone Classifier", "VSI (CubiSand) Sand Maker", "Screw Sand Washers"]
  },
  {
    id: "cd-recycling",
    name: "C&D Recycling",
    icon: "/icons/recycling.svg",
    painPoint: "Contamination removal & material recovery",
    products: ["Grizzly Screens", "Conveyor Systems", "HSI Impactors", "Inclined Vibrating Screens"]
  },
  {
    id: "mobile",
    name: "Mobile & Modular Plants",
    icon: "/icons/mobile.svg",
    painPoint: "On-site mobility & quick setup",
    products: ["Mobile Crushing Plant", "Grizzly & Pan Feeders"]
  }
];

// Import consumers to register event handlers
import "./consumers/save-lead-consumer";
import "./consumers/notify-sales-consumer";

// Transformer function to convert article data to JSON-LD format
function transformArticleToJsonLD(article: any): any {
  const baseUrl = process.env.BASE_URL || 'https://vtis-industrial.com';
  
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": article.title,
    "description": article.summary,
    "image": `${baseUrl}${article.image}`,
    "datePublished": new Date(article.publishDate).toISOString(),
    "dateModified": new Date(article.publishDate).toISOString(),
    "author": {
      "@type": "Organization",
      "name": article.author,
      "url": baseUrl
    },
    "publisher": {
      "@type": "Organization",
      "name": "VTech Makkers",
      "url": baseUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/images/logos/Logo.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${baseUrl}/knowledge-center/${article.slug}`
    },
    "url": `${baseUrl}/knowledge-center/${article.slug}`,
    "articleBody": article.content.replace(/<[^>]*>/g, ''), // Strip HTML tags for plain text
    "keywords": ["industrial equipment", "crushing", "screening", "mining", "construction"],
    "about": {
      "@type": "Thing",
      "name": "Industrial Equipment Engineering",
      "description": "Technical guidance for crushing and screening equipment operations"
    },
    "articleSection": "Technical Articles",
    "wordCount": article.content.replace(/<[^>]*>/g, '').split(' ').length
  };
}

// Transformer function to convert product data to JSON-LD format
function transformToJsonLD(product: any): any {
  const baseUrl = process.env.BASE_URL || 'https://vtis-industrial.com';
  
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": `${baseUrl}${product.image}`,
    "category": product.category,
    "brand": {
      "@type": "Brand",
      "name": "VTech Makkers"
    },
    "manufacturer": {
      "@type": "Organization",
      "name": "VTech Makkers",
      "url": baseUrl
    },
    "applicationCategory": product.applications,
    "additionalProperty": product.benefits.map((benefit: string) => ({
      "@type": "PropertyValue",
      "name": "Key Benefit",
      "value": benefit
    })),
    "model": product.spec_models ? product.spec_models.map((model: any) => ({
      "@type": "ProductModel",
      "name": model.model,
      "mpn": model.model,
      "propertyValue": Object.entries(model)
        .filter(([key]) => key !== 'model')
        .map(([key, value]) => ({
          "@type": "PropertyValue",
          "name": formatPropertyName(key),
          "value": String(value)
        }))
    })) : [],
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceValidUntil": new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      "seller": {
        "@type": "Organization",
        "name": "VTech Makkers"
      }
    }
  };

  // If product has FAQs, return an array with both Product and FAQPage schemas
  if (product.faqs && product.faqs.length > 0) {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": product.faqs.map((faq: any) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };

    return [productSchema, faqSchema];
  }

  // If no FAQs, return just the product schema
  return productSchema;
}

// Helper function to format property names for better readability
function formatPropertyName(key: string): string {
  return key
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export async function registerRoutes(app: Express): Promise<Server> {
  // All products API endpoint for navigation - register first to avoid conflicts
  app.get("/api/menu-products", async (req, res) => {
    try {
      const { products } = await import("./data/products.ts");
      res.json({ products });
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  });

  // GraphQL-style query endpoint for products
  app.post("/api/graphql", async (req, res) => {
    try {
      const { query, variables } = req.body;
      
      // Simple GraphQL resolver for products
      if (query.includes("products")) {
        const products = await storage.getAllProducts();
        res.json({
          data: {
            products: products,
          },
        });
      } else if (query.includes("searchProducts")) {
        const { searchQuery } = variables || {};
        const results = await storage.searchProducts(searchQuery || "");
        res.json({
          data: {
            searchProducts: results,
          },
        });
      } else {
        res.status(400).json({ error: "Unknown query" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Product endpoints
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  app.get("/api/products/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const products = await storage.getProductsByCategory(category);
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products by category" });
    }
  });

  app.get("/api/products/featured", async (req, res) => {
    try {
      const products = await storage.getFeaturedProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch featured products" });
    }
  });

  // Industries endpoint
  app.get("/api/industries", async (req, res) => {
    try {
      res.json(industries);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch industries" });
    }
  });

  // Solutions API endpoint for data-driven management
  app.get("/api/solutions", async (req, res) => {
    try {
      const solutions = [
        {
          slug: 'turnkey-solutions',
          name: 'Turnkey Solutions',
          title: 'Turnkey Solutions',
          subtitle: 'Complete end-to-end plant solutions from design to commissioning with full project management and support.',
          painPoint: 'Complete project delivery',
          image: '/images/solutions/turnkey-solutions.jpg'
        },
        {
          slug: 'construction',
          name: 'Mining & Aggregates',
          title: 'Mining & Aggregates Solutions',
          subtitle: 'Complete crushing and screening solutions for mining operations and aggregate production with maximum efficiency and reliability.',
          painPoint: 'Maximize uptime and throughput',
          image: '/images/solutions/Mining Operations Solutions.jpeg'
        },
        {
          slug: 'washing-m-sand',
          name: 'Sand Washing & M-Sand',
          title: 'Sand Washing & M-Sand Solutions',
          subtitle: 'Advanced sand washing and manufactured sand production systems for high-quality construction materials.',
          painPoint: 'Produce premium quality sand',
          image: '/images/solutions/washing-m-sand.jpg'
        },
        {
          slug: 'mobile',
          name: 'Mobile & Modular Plants',
          title: 'Mobile & Modular Plants Solutions',
          subtitle: 'Portable crushing and screening plants for flexible operations and rapid deployment at multiple sites.',
          painPoint: 'Flexible multi-site operations',
          image: '/images/solutions/mobile.jpg'
        },
        {
          slug: 'cd-recycling',
          name: 'C&D Recycling',
          title: 'C&D Recycling Solutions',
          subtitle: 'Comprehensive construction and demolition waste recycling solutions for sustainable material recovery.',
          painPoint: 'Sustainable waste recovery',
          image: '/images/solutions/C&D Recycling'
        }
      ];

      // Set cache headers for 5 minutes TTL
      res.set('Cache-Control', 'public, max-age=300');
      res.json(solutions);
    } catch (error) {
      console.error("Error fetching solutions:", error);
      res.status(500).json({ error: "Failed to fetch solutions" });
    }
  });

  // Configure multer for about page image uploads
  const aboutUploadStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.join(process.cwd(), 'public', 'uploads', 'about');
      // Create directory if it doesn't exist
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      // Generate unique filename with timestamp
      const timestamp = Date.now();
      const ext = path.extname(file.originalname);
      cb(null, `about-${timestamp}${ext}`);
    }
  });

  const aboutUpload = multer({
    storage: aboutUploadStorage,
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB limit
    },
    fileFilter: (req, file, cb) => {
      // Accept only image files
      if (file.mimetype.startsWith('image/')) {
        cb(null, true);
      } else {
        cb(new Error('Only image files are allowed'));
      }
    }
  });

  // Upload about page image endpoint
  app.post("/api/upload/about", aboutUpload.single('image'), async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No image file provided' });
      }

      const imageUrl = `/uploads/about/${req.file.filename}`;
      
      res.json({
        success: true,
        imageUrl,
        message: 'Image uploaded successfully'
      });
    } catch (error) {
      console.error('Error uploading about image:', error);
      res.status(500).json({ error: 'Failed to upload image' });
    }
  });

  // Upload industry background image endpoint
  app.post("/api/upload-industry-image", upload.single('image'), async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No image file provided' });
      }

      const { industryId } = req.body;
      if (!industryId) {
        return res.status(400).json({ error: 'Industry ID is required' });
      }

      // Check if industry exists
      const industry = industries.find(ind => ind.id === industryId);
      if (!industry) {
        return res.status(404).json({ error: 'Industry not found' });
      }

      const imageUrl = `/images/industries/${req.file.filename}`;
      
      res.json({
        success: true,
        imageUrl,
        message: `Background image uploaded for ${industry.name}`
      });
    } catch (error) {
      console.error('Error uploading industry image:', error);
      res.status(500).json({ error: 'Failed to upload image' });
    }
  });

  // Interactive query endpoint - AI-powered semantic search
  app.post("/api/query", async (req, res) => {
    try {
      const { query } = req.body;
      if (!query || typeof query !== "string") {
        return res.status(400).json({ error: "Query text is required" });
      }

      // Store the query for analytics
      const queryRecord = await storage.createProductQuery({
        query_text: query,
        matched_products: [],
        query_embedding: null, // Would be populated by vector DB
      });

      // Perform semantic search (simplified for now)
      const results = await storage.searchProducts(query);
      
      // Update the query record with matched products
      await storage.updateProductQuery(queryRecord.id, {
        matched_products: results.map(p => p.id),
      });

      res.json({
        query_id: queryRecord.id,
        results: results,
        analysis: {
          intent: "equipment_search",
          capacity_mentioned: query.includes("TPH") || query.includes("ton"),
          material_mentioned: query.includes("granite") || query.includes("limestone"),
          mobility_mentioned: query.includes("mobile") || query.includes("portable"),
        },
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to process query" });
    }
  });

  // Event-Driven Lead capture endpoint - Fast API that only publishes events
  app.post("/api/leads", async (req, res) => {
    try {
      const validatedData = insertLeadSchema.parse(req.body);
      
      // Generate unique lead ID for event tracking
      const leadId = Date.now(); // In production, use proper UUID
      
      // Immediately return success to user for optimal UX
      res.json({ 
        success: true, 
        lead_id: leadId,
        message: "Lead captured successfully. Our expert will contact you within 24 hours." 
      });
      
      // Publish event asynchronously - this happens after user gets response
      const leadEvent = {
        type: 'LeadSubmittedV1' as const,
        timestamp: new Date().toISOString(),
        data: {
          leadId: leadId,
          name: validatedData.name,
          email: validatedData.email,
          company: validatedData.company || '',
          phone: req.body.phone,
          project_location: validatedData.project_location || '',
          message: req.body.message || validatedData.query_text,
          matched_products: validatedData.matched_products || [],
          query_text: validatedData.query_text,
          product_name: req.body.product_name,
          product_slug: req.body.product_slug
        }
      };
      
      // Fire event to trigger independent consumers
      setImmediate(async () => {
        try {
          await eventBus.publish(leadEvent);
        } catch (eventError) {
          console.error('Failed to publish lead event:', eventError);
          // Event publishing failure doesn't affect user experience
        }
      });
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid lead data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to process lead" });
      }
    }
  });

  // Technical specifications endpoint
  app.get("/api/specifications/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const products = await storage.getProductsByCategory(category);
      
      const specifications = products.map(product => ({
        id: product.id,
        name: product.name,
        description: product.description,
        category: product.category,
        applications: product.applications,
        spec_models: product.spec_models || []
      }));
      
      res.json(specifications);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch specifications" });
    }
  });

  // Internal Analytics API (for sales team dashboard)
  app.get("/api/analytics", async (req, res) => {
    try {
      const [leads, queries, products] = await Promise.all([
        storage.getLeads(),
        // For demo, we'll create some sample query data
        Promise.resolve([
          { id: 1, query_text: "mobile crushing plant 150 TPH", results_count: 3, created_at: new Date().toISOString() },
          { id: 2, query_text: "jaw crusher for granite", results_count: 5, created_at: new Date().toISOString() },
        ]),
        storage.getAllProducts()
      ]);

      // Add inquiry counts to products (mock data for demo)
      const productsWithCounts = products.map(product => ({
        ...product,
        inquiry_count: Math.floor(Math.random() * 20) + 1
      }));

      res.json({
        leads,
        queries: [],
        products: productsWithCounts
      });
    } catch (error) {
      console.error("Analytics error:", error);
      res.status(500).json({ error: "Failed to fetch analytics data" });
    }
  });

  // Recent leads endpoint for dashboard
  app.get("/api/leads/recent", async (req, res) => {
    try {
      const recentLeads = await storage.getRecentLeads();
      res.json(recentLeads);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch recent leads" });
    }
  });



  // AI-First Product API endpoint with JSON-LD structured data
  app.get("/api/products/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      
      if (!slug) {
        return res.status(400).json({ error: 'Product slug is required' });
      }

      // Import products from data file since storage uses database models
      const { products } = await import("./data/products");
      const product = products.find(p => p.slug === slug);
      
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      // Transform to JSON-LD format
      const jsonLdData = transformToJsonLD(product);
      
      // Return both the original product data and JSON-LD structured data
      const response = {
        product,
        jsonLd: jsonLdData,
        metadata: {
          slug: product.slug,
          category: product.category,
          lastModified: new Date().toISOString()
        }
      };

      res.json(response);
    } catch (error) {
      console.error('Error in product API:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // AI-First Article API endpoint with JSON-LD structured data
  app.get("/api/articles/:slug", async (req: Request, res: Response) => {
    try {
      const { slug } = req.params;
      
      if (!slug) {
        return res.status(400).json({ error: 'Article slug is required' });
      }

      const article = articles.find(a => a.slug === slug);
      
      if (!article) {
        return res.status(404).json({ error: 'Article not found' });
      }

      // Transform to JSON-LD format
      const jsonLdData = transformArticleToJsonLD(article);
      
      // Return both the original article data and JSON-LD structured data
      const response = {
        article,
        jsonLd: jsonLdData,
        metadata: {
          slug: article.slug,
          publishDate: article.publishDate,
          lastModified: new Date().toISOString()
        }
      };

      res.json(response);
    } catch (error) {
      console.error('Error in article API:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // GraphQL endpoint with semantic search
  app.post("/api/graphql", async (req: Request, res: Response) => {
    try {
      const { query, variables } = req.body;
      
      if (query.includes("searchProducts")) {
        const searchQuery = variables?.query || "";
        const results = await storage.searchProducts(searchQuery);
        
        res.json({
          data: {
            searchProducts: results,
          },
        });
      } else if (query.includes("internalSemanticSearchForLeads")) {
        const searchQuery = variables?.searchQuery || "";
        
        // Semantic search implementation using vector similarity
        const leads = await storage.semanticSearchLeads(searchQuery);
        
        res.json({
          data: {
            internalSemanticSearchForLeads: {
              leads: leads,
              totalResults: leads.length,
              searchQuery: searchQuery
            }
          },
        });
      } else {
        res.status(400).json({ error: "Unknown query" });
      }
    } catch (error) {
      console.error('GraphQL error:', error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
