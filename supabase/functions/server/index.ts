import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import { createClient } from "npm:@supabase/supabase-js";
const app = new Hono();

// Enable logger
app.use("*", logger(console.log));

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

    await kv.set("about:content", {
      title,
      subtitle,
      description1,
      description2,
    });
    return c.json({
      success: true,
      message: "About content updated successfully",
    });
  } catch (error) {
    console.error("Error updating about content:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Server-side DB insert route for portfolio (uses Service Role Key)
app.post("/make-server-294ae748/portfolio/db", async (c) => {
  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const admin = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false },
    });

    const authHeader = c.req.header("authorization") || "";
    const token = authHeader.replace(/Bearer\s*/i, "");
    if (!token)
      return c.json({ success: false, error: "Missing auth token" }, 401);

    // verify user token
    const { data: userData, error: userError } = await admin.auth.getUser(token);
    if (userError || !userData?.user) {
      return c.json({ success: false, error: "Invalid user token" }, 401);
    }

    const body = await c.req.json();
    const { title, description, category, image_url } = body;
    if (!title || !category)
      return c.json({ success: false, error: "Missing fields" }, 400);

    const userId = userData.user.id;
    const userName = (userData.user.user_metadata && (userData.user.user_metadata.full_name || userData.user.user_metadata.name)) || userData.user.email || null;

    const { data, error } = await admin
      .from("portfolio")
      .insert({ title, description, category, image_url, created_by: userId, created_by_name: userName })
      .select()
      .single();
    if (error) return c.json({ success: false, error: String(error) }, 500);
    return c.json({ success: true, data });
  } catch (err) {
    console.error(err);
    return c.json({ success: false, error: String(err) }, 500);
  }
});

Deno.serve(app.fetch);
