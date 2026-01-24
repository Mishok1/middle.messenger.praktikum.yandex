import { defineConfig } from "vite";
// import handlebars from "vite-plugin-handlebars";
import handlebars from "@yoichiro/vite-plugin-handlebars";

export default defineConfig({
    plugins: [handlebars()],
    build: {
        outDir: 'build',
        emptyOutDir: true,
    },
    server: {
        port: 3000,
        historyApiFallback: true,
    }
})
