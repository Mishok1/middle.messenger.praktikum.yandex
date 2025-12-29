import { defineConfig } from "vite";
import handlebars from "vite-plugin-handlebars";

export default defineConfig({
    plugins: [handlebars()],
    // css: {
    //     preprocessorOptions: {
    //         scss: {
    //             api: 'modern-compiler',
    //         },
    //     },
    // },
})