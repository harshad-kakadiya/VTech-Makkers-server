import { db } from "./db";

export const registerRoutes = (app:any) => {
    app.get("/api/users", async (req:any, res:any) => {
        try {
            const result = await db.execute(`SELECT * FROM users LIMIT 10`);
            res.json(result.rows);
        } catch (error:any) {
            res.status(500).json({ message: "Database error", error: error.message });
        }
    });
};
