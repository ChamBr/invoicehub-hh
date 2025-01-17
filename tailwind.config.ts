import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#10B981", // Emerald green
          dark: "#065F46", // Forest green
          light: "#ECFDF5", // Light green
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#065F46", // Forest green
          foreground: "#FFFFFF",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "#ECFDF5", // Light green
          foreground: "#1F2937", // Dark slate
        },
        card: {
          DEFAULT: "#FFFFFF", // Clean white
          foreground: "#1F2937", // Dark slate
        },
        invoice: {
          blue: "#0066CC",
          lightBlue: "#E6F0FF",
          tableHeader: "#004C99",
        },
        role: {
          superadmin: {
            DEFAULT: "#8B5CF6", // Vivid Purple
            light: "#E5DEFF", // Soft Purple
          }
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;