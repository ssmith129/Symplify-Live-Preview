# Symplify - Medical & Hospital Management System

A comprehensive medical and hospital management system built with React, TypeScript, and Vite. Features include appointment scheduling, patient management, AI-powered insights, and more.

## 🚀 Quick Start

### Development
```bash
npm install
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

## 📦 Deploy

### Vercel
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/your-username/symplify-medical)

### Netlify
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/your-username/symplify-medical)

📖 **[Complete Deployment Guide](./DEPLOYMENT.md)** - Detailed instructions for both platforms

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **UI Components**: Bootstrap, Ant Design, React Bootstrap
- **Charts**: ApexCharts, Chart.js
- **Calendar**: FullCalendar
- **State Management**: Redux Toolkit
- **Routing**: React Router v7

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
