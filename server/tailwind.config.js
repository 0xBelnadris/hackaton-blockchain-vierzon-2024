/** @type {import('tailwindcss').Config} */

const colors = {
  blue: '#085da9',
  lightBlue: '#009fe3',
  indigo: '#6610f2',
  purple: '#6f42c1',
  pink: '#d63384',
  red: '#dc3545',
  orange: '#fd7e14',
  yellow: '#fef8c6',
  green: '#198754',
  teal: '#42b9b9',
  cyan: '#0dcaf0',
  inherit: 'inherit',
  transparent: 'transparent',
  black: '#000',
  white: '#fff',
  gray: '#6c757d',
  'gray-dark': '#343a40',
  'gray-100': '#f8f9fa',
  'gray-200': '#e9ecef',
  'gray-300': '#dee2e6',
  'gray-400': '#ced4da',
  'gray-500': '#adb5bd',
  'gray-600': '#6c757d',
  'gray-700': '#495057',
  'gray-800': '#343a40',
  'gray-900': '#212529',
}

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    colors: {
      ...colors,
      primary: colors.blue,
      secondary: colors.teal,
      tertiary: colors.yellow,
      success: colors.green,
      info: colors.cyan,
      warning: colors.orange,
      danger: colors.red,
      light: colors['gray-100'],
      dark: colors['gray-900'],
    },
    fontFamily: {
      mulish: ['Mulish', 'ui-sans-serif', 'Arial', 'sans-serif'],
      kreypt: ['Kreypt', 'ui-sans-serif', 'Arial', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [
  ],
}

