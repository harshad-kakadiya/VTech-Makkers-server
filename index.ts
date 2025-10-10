import dotenv from "dotenv";
dotenv.config();

import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import cors from "cors";
import helmet from "helmet";

const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(",")
    : [];

const log = (message: string) => console.log(`[server] ${message}`);

const app = express();
app.use(helmet());
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With', 'Accept'],
  exposedHeaders: ['Content-Range', 'Accept-Ranges', 'Content-Length'],
  maxAge: 86400
}));

app.use((req, res, next) => {
  res.header('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (req.path.startsWith("/api")) {
      log(`${req.method} ${req.path} ${res.statusCode} in ${duration}ms`);
    }
  });
  next();
});

registerRoutes(app);

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  log(`Error: ${message}`);
  res.status(status).json({ message });
});
app.use((req: Request, res: Response) => {
  // Log unknown route (optional)
  console.warn(`404 Not Found: ${req.method} ${req.originalUrl}`);

  // Return a structured JSON response
  res.status(404).json({
    success: false,
    message: "Endpoint not found",
    path: req.originalUrl,
    method: req.method,
    suggestion: "Check if the endpoint URL is correct or refer to API documentation"
  });
});

// Handle any unexpected server errors globally
app.use((err: any, req: Request, res: Response, next: Function) => {
  console.error("Unhandled server error:", err);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  log(`✅ Server running on port ${PORT}`);
});
