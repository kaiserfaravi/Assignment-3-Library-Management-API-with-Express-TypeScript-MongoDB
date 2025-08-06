import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: ["node_modules", "dist", "build"], // ⚠️ এখানে ignore করা ফোল্ডার গুলো উল্লেখ করো
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node, // যদি Node.js environment হয়
      },
    },
  },
  tseslint.configs.recommended,
]);
