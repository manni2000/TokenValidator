# Crypto Token Dashboard

A professional dashboard for viewing cryptocurrency token information powered by the DexScreener API.

## Features

- Professional UI with custom theme and styling
- Real-time token data from DexScreener API
- Responsive design for all device sizes
- Easy token search functionality

## Deployment on Vercel

This project is configured for easy deployment on Vercel:

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Import your repository on Vercel
3. Vercel will automatically detect the project as a Vite React application
4. The deployment will use the settings in `vercel.json`
5. No additional configuration is needed

## Local Development

### Prerequisites

- Node.js (version 20.19+ or 22.12+ recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd <repository-directory>/frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at http://localhost:3000

### Building for Production

```bash
npm run build
```

This will create a `dist` directory with the production build.
