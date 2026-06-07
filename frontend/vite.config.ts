import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { writeFile } from "node:fs/promises";
import path from "node:path";

export default defineConfig({
  base: "./",
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "cv-markdown-save",
      configureServer(server) {
        server.middlewares.use("/__cv/save", async (req, res) => {
          if (req.method !== "POST") {
            res.statusCode = 405;
            res.end("Method Not Allowed");
            return;
          }

          let body = "";
          req.on("data", (chunk) => {
            body += chunk;
          });

          req.on("end", async () => {
            try {
              const payload = JSON.parse(body) as { markdown?: string };
              if (typeof payload.markdown !== "string") {
                res.statusCode = 400;
                res.end("Invalid markdown payload");
                return;
              }

              const targetFile = path.resolve(__dirname, "src/data/defaultCv.md");
              await writeFile(targetFile, payload.markdown, "utf8");
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ ok: true }));
            } catch {
              res.statusCode = 500;
              res.end("Failed to save markdown");
            }
          });
        });
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
});
