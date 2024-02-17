/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      fontFamily: {
        'display': ['Space Grotesk', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
      },
      extend: {
        colors: {
          white: {
            400: "#EAEAEA",
            500: "#DEDEDE",
            600: "#959595",
            200: "#fff"
          },
          black: {
            400: "#22262B"
          },
          yellow: "#FFDB63",
          blue: "#B2C2EC",
          pink: "#F3D0BB",
          green: {
            300: "#D9F2DD",
            400: "#359742"
          },
          red: {
            300: "#ffcccb",
            400: "#FF312E"
          }
        },
      },
    },
    plugins: [],
  }
  