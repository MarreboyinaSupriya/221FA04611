# LinkShrink - Frontend URL Shortener

A modern, client-side URL shortener application built with React and TypeScript. All data is stored locally in your browser using localStorage - no backend required!

## Features

- **URL Shortening**: Create short, memorable URLs with optional custom aliases
- **Click Tracking**: Monitor URL performance with detailed analytics
- **Expiry Management**: Set custom expiry dates with automatic status updates
- **Custom Domains**: Display URLs with your current domain
- **Search & Filter**: Find URLs quickly with advanced filtering options
- **Copy to Clipboard**: One-click copying with visual feedback
- **Responsive Design**: Beautiful UI that works on all devices
- **Local Storage**: All data stored securely in your browser
- **No Backend Required**: Fully client-side application

## Tech Stack

- React 18 with TypeScript
- Tailwind CSS for styling
- Lucide React for icons
- Vite for development and building
- localStorage for data persistence

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd linkShrink
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`.

## How It Works

1. **URL Shortening**: Enter a long URL and optionally customize the alias
2. **Local Storage**: URLs are saved in your browser's localStorage
3. **Redirection**: When someone visits a short URL, the app looks up the original URL and redirects
4. **Analytics**: Click counts and statistics are tracked locally

## Features Overview

### Home Page
- Clean, intuitive URL shortening interface
- Advanced options for custom aliases, domains, and expiry dates
- Instant URL generation with copy-to-clipboard functionality

### Statistics Page
- Comprehensive table showing all your shortened URLs
- Real-time search and filtering capabilities
- Click analytics and status monitoring
- Easy URL management with delete functionality

### About Page
- Project overview and feature highlights
- How-to guide for getting started

## Project Structure

```
linkShrink/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── Header.tsx       # Navigation header
│   │   ├── UrlForm.tsx      # URL creation form
│   │   ├── UrlDisplay.tsx   # Display shortened URL
│   │   ├── StatisticsTable.tsx # URL statistics table
│   │   ├── Toast.tsx        # Toast notifications
│   │   └── RedirectHandler.tsx # Handle short URL redirects
│   ├── pages/               # Page components
│   │   ├── Home.tsx         # Home page
│   │   ├── Statistics.tsx   # Statistics page
│   │   └── About.tsx        # About page
│   ├── hooks/               # Custom React hooks
│   │   └── useToast.tsx     # Toast management hook
│   ├── services/            # API service layer
│   │   └── api.ts           # localStorage API client
│   ├── utils/               # Utility functions
│   │   ├── generateShortCode.ts # Short code generation
│   │   └── validateUrl.ts   # URL validation
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts         # Shared types
│   ├── App.tsx              # Main application component
│   ├── main.tsx             # React entry point
│   └── index.css            # Global styles
├── package.json             # Dependencies and scripts
├── tailwind.config.js       # Tailwind configuration
├── vite.config.ts           # Vite configuration
└── README.md                # Project documentation
```

## Data Storage

All URL data is stored locally in your browser using localStorage. This means:

- **Privacy**: Your data never leaves your browser
- **No Server Costs**: No backend infrastructure required
- **Instant Performance**: No network requests for data operations
- **Offline Capable**: Works without an internet connection (for management)

**Note**: Data is tied to your browser and domain. Clearing browser data will remove all stored URLs.

## Browser Compatibility

- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge

All modern browsers with localStorage support are compatible.

## Deployment

Build the application for production:

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment to any static hosting service like:
- Netlify
- Vercel
- GitHub Pages
- AWS S3
- Any web server

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the MIT License.