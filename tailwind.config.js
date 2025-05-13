module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: '#4F46E5', // Indigo
          secondary: '#10B981', // Emerald
          background: '#1F2937', // Dark gray
          text: '#F9FAFB', // Light gray
          accent: '#F59E0B', // Amber
        },
      },
    },
    plugins: [], // Keep this an empty array if you're not using additional Tailwind plugins
  };
  