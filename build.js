// Custom build script for Vercel deployment
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚀 Starting HabiGrid build process...');

try {
  // Build frontend only
  console.log('📦 Building frontend...');
  execSync('npm run build:frontend', { stdio: 'inherit' });
  
  // Copy necessary static files
  console.log('📄 Copying static files...');
  
  // Ensure dist directory exists
  if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist', { recursive: true });
  }
  
  // Create a simple _redirects file for SPA routing
  const redirectsContent = `/*    /index.html   200`;
  fs.writeFileSync(path.join('dist', '_redirects'), redirectsContent);
  
  // Create vercel.json in dist for proper routing
  const vercelConfig = {
    "routes": [
      { "src": "/api/(.*)", "dest": "/api/$1" },
      { "src": "/(.*)", "dest": "/index.html" }
    ]
  };
  fs.writeFileSync(path.join('dist', 'vercel.json'), JSON.stringify(vercelConfig, null, 2));
  
  console.log('✅ Build completed successfully!');
  console.log('📁 Output directory: dist/');
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}