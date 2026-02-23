import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import { createClient } from "npm:@supabase/supabase-js";
const app = new Hono();

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function onlyDigits(value: string) {
  return value.replace(/\D/g, "");
}

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

// Public contact route: sends email using Brevo
app.post("/make-server-294ae748/contact", async (c) => {
  try {
    const brevoApiKey = Deno.env.get("BREVO_API_KEY");
    const contactToEmail = Deno.env.get("CONTACT_TO_EMAIL");
    const contactFromEmail =
      Deno.env.get("CONTACT_FROM_EMAIL") || "no-reply@serralheriaella.com";

    if (!brevoApiKey || !contactToEmail) {
      console.error("Missing BREVO_API_KEY or CONTACT_TO_EMAIL in function env");
      return c.json(
        {
          success: false,
          error: "Server misconfigured: missing BREVO_API_KEY or CONTACT_TO_EMAIL",
        },
        500,
      );
    }

    const body = await c.req.json();
    const {
      name,
      email,
      phone,
      message,
      website,
    }: {
      name?: string;
      email?: string;
      phone?: string;
      message?: string;
      website?: string;
    } = body ?? {};

    // Honeypot (bots usually fill hidden fields)
    if (website && website.trim().length > 0) {
      return c.json({ success: true, message: "ok" });
    }

    if (!name || !email || !phone || !message) {
      return c.json({ success: false, error: "Missing required fields" }, 400);
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();
    const trimmedMessage = message.trim();

    if (
      trimmedName.length < 2 ||
      trimmedName.length > 120 ||
      trimmedEmail.length > 255 ||
      trimmedPhone.length > 40 ||
      trimmedMessage.length < 5 ||
      trimmedMessage.length > 4000
    ) {
      return c.json({ success: false, error: "Invalid field size" }, 400);
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(trimmedEmail)) {
      return c.json({ success: false, error: "Invalid email" }, 400);
    }

    const escapedName = escapeHtml(trimmedName);
    const escapedEmail = escapeHtml(trimmedEmail);
    const escapedPhone = escapeHtml(trimmedPhone);
    const escapedMessage = escapeHtml(trimmedMessage).replaceAll("\n", "<br />");

    const subject = `Novo contato do site - ${trimmedName}`;
    const htmlContent = `
      <h2>Novo contato recebido</h2>
      <p><strong>Nome:</strong> ${escapedName}</p>
      <p><strong>Email:</strong> ${escapedEmail}</p>
      <p><strong>Telefone:</strong> ${escapedPhone}</p>
      <p><strong>Mensagem:</strong><br />${escapedMessage}</p>
    `;

    const textContent = [
      "Novo contato recebido",
      `Nome: ${trimmedName}`,
      `Email: ${trimmedEmail}`,
      `Telefone: ${trimmedPhone}`,
      "Mensagem:",
      trimmedMessage,
    ].join("\n");

    const brevoResponse = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": brevoApiKey,
      },
      body: JSON.stringify({
        sender: { name: "Site Serralheria ELLA", email: contactFromEmail },
        to: [{ email: contactToEmail, name: "Serralheria ELLA" }],
        replyTo: { email: trimmedEmail, name: trimmedName },
        subject,
        htmlContent,
        textContent,
      }),
    });

    if (!brevoResponse.ok) {
      const responseBody = await brevoResponse.text();
      console.error("Brevo send failed:", responseBody);
      return c.json(
        { success: false, error: "Failed to send email through Brevo" },
        502,
      );
    }

    const whatsappAccessToken = Deno.env.get("WHATSAPP_ACCESS_TOKEN");
    const whatsappPhoneNumberId = Deno.env.get("WHATSAPP_PHONE_NUMBER_ID");
    const whatsappTo = Deno.env.get("WHATSAPP_TO");
    const whatsappTemplateName = Deno.env.get("WHATSAPP_TEMPLATE_NAME");
    const whatsappTemplateLanguage =
      Deno.env.get("WHATSAPP_TEMPLATE_LANGUAGE") || "pt_BR";
    const whatsappAllowTextFallback =
      (Deno.env.get("WHATSAPP_ALLOW_TEXT_FALLBACK") || "false").toLowerCase() ===
      "true";

    // Optional automatic WhatsApp notification to owner/admin
    if (whatsappAccessToken && whatsappPhoneNumberId && whatsappTo) {
      const normalizedWhatsappTo = onlyDigits(whatsappTo);

      const whatsappBody = [
        "🔔 Novo contato do site",
        `Nome: ${trimmedName}`,
        `Email: ${trimmedEmail}`,
        `Telefone: ${trimmedPhone}`,
        "Mensagem:",
        trimmedMessage,
      ].join("\n");

      const whatsappTemplatePayload = whatsappTemplateName
        ? {
          messaging_product: "whatsapp",
          to: normalizedWhatsappTo,
          type: "template",
          template: {
            name: whatsappTemplateName,
            language: { code: whatsappTemplateLanguage },
            components: [
              {
                type: "body",
                parameters: [
                  { type: "text", text: trimmedName },
                  { type: "text", text: trimmedPhone },
                  { type: "text", text: trimmedEmail },
                  { type: "text", text: trimmedMessage.slice(0, 1024) },
                ],
              },
            ],
          },
        }
        : {
          messaging_product: "whatsapp",
          to: normalizedWhatsappTo,
          type: "text",
          text: { body: whatsappBody },
        };

      const whatsappResponse = await fetch(
        `https://graph.facebook.com/v22.0/${whatsappPhoneNumberId}/messages`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${whatsappAccessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(whatsappTemplatePayload),
        },
      );

      if (!whatsappResponse.ok) {
        const responseBody = await whatsappResponse.text();
        console.error("WhatsApp send failed:", responseBody);

        if (
          whatsappTemplateName &&
          whatsappAllowTextFallback
        ) {
          const fallbackResponse = await fetch(
            `https://graph.facebook.com/v22.0/${whatsappPhoneNumberId}/messages`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${whatsappAccessToken}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                messaging_product: "whatsapp",
                to: normalizedWhatsappTo,
                type: "text",
                text: { body: whatsappBody },
              }),
            },
          );

          if (!fallbackResponse.ok) {
            const fallbackBody = await fallbackResponse.text();
            console.error("WhatsApp fallback text send failed:", fallbackBody);
            return c.json(
              {
                success: false,
                error: "Email sent but failed to send WhatsApp notification",
              },
              502,
            );
          }
        } else {
          return c.json(
            {
              success: false,
              error: "Email sent but failed to send WhatsApp notification",
            },
            502,
          );
        }
      }
    }

    return c.json({ success: true, message: "Contact sent successfully" });
  } catch (error) {
    console.error("Error sending contact email:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Server-side DB insert route for portfolio (uses Service Role Key)
app.post("/make-server-294ae748/portfolio/db", async (c) => {
  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !serviceRoleKey) {
      console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in function env");
      return c.json({ success: false, error: "Server misconfigured: missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY" }, 500);
    }
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
