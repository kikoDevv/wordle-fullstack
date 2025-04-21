import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
	plugins: [react()],
	test: {
		environment: "jsdom",
		globals: true,
		setupFiles: ["./src/tests/setup.ts"],
		include: ["**/*.test.{ts,tsx}"],
		testTimeout: 15000, // Increase timeout to 15 seconds
	},
	resolve: {
		alias: {
			"@": resolve(__dirname, "./src"),
		},
	},
});
