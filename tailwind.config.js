// tailwind.config.js
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screen: {
        sm: "1150px",
      },
      height: {
        "nx-h": "18px",
      },
      minWidth: {
        "nx-min-w": "18px",
      },
      borderRadius: {
        "nx-rounded-sm": "0.125rem",
      },
      padding: {
        "nx-p-0.5": "0.125rem",
      },
      backgroundColor: {
        "nx-bg-gray-800/5": "rgba(31, 41, 55, 0.2)",
        "nx-bg-gray-100/5": "rgba(243, 244, 246, 0.2)",
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["hover", "dark"],
    },
  },
  plugins: [],
};
