const config = {
  content: [
    './src/**/*.{html,js,svelte,ts}',
    './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}',
    "./node_modules/flowbite-svelte-icons/**/*.{html,js,svelte,ts}",
  ],

  plugins: [require('flowbite/plugin')],

  darkMode: 'class',

  theme: {
    extend: {
      colors: {
        // flowbite-svelte
        primary: {
          50:  '#eff9ff',
          100: '#dbf1fe',
          200: '#bfe7fe',
          300: '#92dafe',
          400: '#5fc3fb',
          500: '#3aa6f7',
          600: '#2489ec',
          700: '#1c71d8',
          800: '#1d5cb0',
          900: '#1d4f8b',
        }
      }
    }
  }
};

module.exports = config;