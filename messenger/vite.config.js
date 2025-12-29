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


    // переменные/миксины во все scss без ручных импортов
    // css: {
    //     preprocessorOptions: {
    //         scss: {
    //             // additionalData: `@use "./src/styles/vars.scss" as *;`
    //         },
    //     },
    // },

    // build: {
    //     outDir: 'build',
    //     emptyOutDir: true,
    //     assetsDir: 'assets',
    // },
})