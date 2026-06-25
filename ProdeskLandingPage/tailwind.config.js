/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light mode variables
        'bg-primary': '#fafafa',
        'bg-secondary': '#ffffff',
        'bg-tertiary': '#F9F9F9',
        'bg-card': '#ffffff',
        'bg-header': 'rgba(255, 255, 255, 0.70)',
        
        'text-primary': '#161515',
        'text-secondary': '#5E5E5F',
        'text-tertiary': '#555555',
        'text-light': '#ffffff',
        
        'border-light': 'rgba(0, 0, 0, 0.05)',
        'border-card': 'rgba(208, 196, 196, 0.20)',
        'border-card-hover': 'rgba(22, 21, 21, 0.15)',
        
        'btn-bg': '#161515',
        'btn-text': '#ffffff',
        'btn-border': '#161515',
        'btn-hover-bg': '#ffffff',
        'btn-hover-text': '#161515',
        
        'card-icon-bg': '#f3f3f3',
        'accent-line': '#d0c4c4',
        
        // Dark mode variables mapped inside dark classes directly, 
        // or we can use custom variables if we want, but since Tailwind provides `dark:` variant,
        // we will map these into the config so we can use them directly.
        'dark-bg-primary': '#0a0a0a',
        'dark-bg-secondary': '#121212',
        'dark-bg-tertiary': '#161616',
        'dark-bg-card': '#1a1a1c',
        'dark-bg-header': 'rgba(10, 10, 10, 0.70)',
        
        'dark-text-primary': '#ffffff',
        'dark-text-secondary': '#a0a0a2',
        'dark-text-tertiary': '#99999b',
        'dark-text-light': '#161515',
        
        'dark-border-light': 'rgba(255, 255, 255, 0.08)',
        'dark-border-card': 'rgba(255, 255, 255, 0.06)',
        'dark-border-card-hover': 'rgba(255, 255, 255, 0.15)',
        
        'dark-btn-bg': '#ffffff',
        'dark-btn-text': '#161515',
        'dark-btn-border': '#ffffff',
        'dark-btn-hover-bg': '#161515',
        'dark-btn-hover-text': '#ffffff',
        
        'dark-card-icon-bg': '#222222',
        'dark-accent-line': '#444446',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        'raleway': ['Raleway', 'sans-serif'],
        'hanken': ['"Hanken Grotesk"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
