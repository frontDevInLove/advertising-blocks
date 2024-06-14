import { defineConfig } from "vite";
import { resolve } from "path";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import { createHtmlPlugin } from "vite-plugin-html";
import dts from "vite-plugin-dts";

export default defineConfig(({ mode }) => {
  if (mode === "lib") {
    // Конфигурация для сборки библиотеки
    return {
      plugins: [
        cssInjectedByJsPlugin(),
        dts({
          insertTypesEntry: true,
        }),
      ],
      build: {
        lib: {
          entry: resolve(__dirname, "src/main.ts"),
          name: "MyLibrary",
          fileName: (format) => `my-library.${format}.js`,
        },
      },
    };
  } else {
    // Конфигурация для сборки демонстрации
    return {
      plugins: [
        cssInjectedByJsPlugin(),
        createHtmlPlugin({
          inject: {
            data: {
              title: "MyLibrary Demo",
            },
          },
        }),
      ],
      build: {
        rollupOptions: {
          input: {
            main: resolve(__dirname, "index.html"),
          },
          output: {
            entryFileNames: "assets/[name].[hash].js",
            chunkFileNames: "assets/[name].[hash].js",
            assetFileNames: "assets/[name].[hash].[ext]",
          },
        },
      },
    };
  }
});
