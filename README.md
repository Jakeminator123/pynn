# Pynn - Innovation Intelligence Platform

A modern Next.js website for Pynn, the intelligence layer of European innovation.

## Features

- 🎨 Modern, responsive design with Tailwind CSS
- ⚡ Optimized performance with Next.js 15
- 🎭 Smooth animations with Framer Motion
- 🖼️ Optimized images with Next.js Image component
- ♿ Accessible and SEO-friendly
- 🌐 Multi-language ready structure

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
pynn/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Home page
│   ├── layout.tsx         # Root layout
│   └── blog/              # Blog pages
├── components/            # React components
│   ├── Header.tsx         # Navigation header
│   ├── Footer.tsx         # Footer component
│   ├── Team.tsx           # Team section
│   └── ...
├── lib/                   # Utilities and content
│   └── content.ts         # Site content data
├── public/                # Static assets
│   ├── img/              # Images
│   └── video/            # Video files
└── next.config.js        # Next.js configuration
```

## Team Images

Team member avatars are located in `public/img/`:

- `person_left.png` - Lead Developer
- `person_center.png` - Founder & CEO (David Franzen)
- `person_right.png` - Senior Developer

## Technologies

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Three.js** - 3D logo rendering

## Deployment

### Render

This project includes a `render.yaml` configuration file for easy deployment on Render.

1. Push your code to GitHub
2. Connect your GitHub repository to Render
3. Render will automatically detect the `render.yaml` file and configure the service

### Environment Variables

If needed, set these in Render dashboard:

- `NODE_ENV=production`

## License

Copyright © Pynn AI SL
