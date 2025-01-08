/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },
      listStyleType: {
        'none': 'none',
        'disc': 'disc',
        'decimal': 'decimal',
      },
      overflowClipMargin: {
        auto: 'auto',
        '0': '0',
        sm: '4px',
        md: '8px',
        lg: '16px',
        xl: '24px',
      }
    },
  },
  plugins: [
    function ({ addUtilities, theme }) {
      const overflowClipMargin = theme('overflowClipMargin');
      const newUtilities = Object.fromEntries(
        Object.entries(overflowClipMargin).map(([key, value]) => [
          `.overflow-clip-margin-${key}`,
          { 'overflow-clip-margin': value },
        ])
      );

      addUtilities(newUtilities, ['responsive']);
    },


  ],
}

