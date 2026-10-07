import fs from "node:fs"
import path from "node:path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

// Каждая ниша — отдельная страница: добавь папку с index.html и её имя сюда
const pages = ["remont", "stomatologiya", "kosmetologiya", "yurist", "fotostudiya", "konditer"]

export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
  resolve: { alias: { "@": path.resolve(import.meta.dirname, "src") } },
  build: {
    rollupOptions: {
      input: Object.fromEntries([
        ["main", path.resolve(import.meta.dirname, "index.html")],
        ...pages.map((p) => [p, path.resolve(import.meta.dirname, `${p}/index.html`)]),
      ].filter(([, file]) => fs.existsSync(file))),
    },
  },
})
