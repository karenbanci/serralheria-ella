import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-294ae748/health", (c) => {
  return c.json({ status: "ok" });
});

// ============= PORTFOLIO ROUTES =============

// Get all portfolio projects
app.get("/make-server-294ae748/portfolio", async (c) => {
  try {
    const projects = await kv.getByPrefix("portfolio:");
    return c.json({ success: true, projects: projects || [] });
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Add new portfolio project
app.post("/make-server-294ae748/portfolio", async (c) => {
  try {
    const body = await c.req.json();
    const { id, title, category, image } = body;
    
    if (!id || !title || !category || !image) {
      return c.json({ success: false, error: "Missing required fields" }, 400);
    }
    
    await kv.set(`portfolio:${id}`, { id, title, category, image });
    return c.json({ success: true, message: "Project added successfully" });
  } catch (error) {
    console.error("Error adding portfolio project:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Update portfolio project
app.put("/make-server-294ae748/portfolio/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const { title, category, image } = body;
    
    const existing = await kv.get(`portfolio:${id}`);
    if (!existing) {
      return c.json({ success: false, error: "Project not found" }, 404);
    }
    
    await kv.set(`portfolio:${id}`, { id, title, category, image });
    return c.json({ success: true, message: "Project updated successfully" });
  } catch (error) {
    console.error("Error updating portfolio project:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Delete portfolio project
app.delete("/make-server-294ae748/portfolio/:id", async (c) => {
  try {
    const id = c.req.param("id");
    await kv.del(`portfolio:${id}`);
    return c.json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting portfolio project:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ============= ABOUT SECTION ROUTES =============

// Get "About Us" content
app.get("/make-server-294ae748/about", async (c) => {
  try {
    const content = await kv.get("about:content");
    return c.json({ success: true, content: content || null });
  } catch (error) {
    console.error("Error fetching about content:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Update "About Us" content
app.put("/make-server-294ae748/about", async (c) => {
  try {
    const body = await c.req.json();
    const { title, subtitle, description1, description2 } = body;
    
    await kv.set("about:content", { title, subtitle, description1, description2 });
    return c.json({ success: true, message: "About content updated successfully" });
  } catch (error) {
    console.error("Error updating about content:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

Deno.serve(app.fetch);