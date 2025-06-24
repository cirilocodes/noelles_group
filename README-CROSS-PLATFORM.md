# Cross-Platform Setup Guide

This Noelles Group website is designed to run on any platform and IDE. Follow the appropriate setup for your environment.

## Quick Start (Any Platform)

1. **Clone the repository**
2. **Install dependencies**: `npm install`
3. **Set up environment** (optional - app works with defaults)
4. **Run the app**: `npm run dev`

## Platform-Specific Instructions

### Replit (Cloud IDE)
- No additional setup required
- Database and email are pre-configured
- Click "Run" or use the start workflow

### VS Code / Local Development
1. **Install Node.js 18+**
2. **Set up PostgreSQL locally** (optional)
3. **Create .env file** (optional):
   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/database
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   PORT=5000
   ```
4. **Run**: `npm run dev`

### CodeSandbox
- Import from GitHub
- No additional configuration needed
- Uses default settings automatically

### Gitpod / GitHub Codespaces
- Open in browser
- Dependencies install automatically
- Default configuration works out of the box

### Stackblitz
- Import project
- Uses web containers
- All features work without setup

## Environment Variables (All Optional)

The app works without any environment variables using sensible defaults:

| Variable | Default | Purpose |
|----------|---------|---------|
| `DATABASE_URL` | Auto-detected | Database connection |
| `EMAIL_USER` | noellesgroup4@gmail.com | Email sender |
| `EMAIL_PASS` | App-specific password | Email authentication |
| `PORT` | 5000 | Server port |
| `NODE_ENV` | development | Environment mode |

## Database Configuration

### Replit
- Uses Neon PostgreSQL automatically
- No setup required

### Local Development Options
1. **Use default Replit database** (recommended)
2. **Local PostgreSQL**: Install and configure locally
3. **Docker PostgreSQL**: `docker run -p 5432:5432 -e POSTGRES_PASSWORD=password postgres`

## Email Configuration

### Default (Works Everywhere)
- Uses noellesgroup4@gmail.com with app password
- No setup required for testing

### Custom Email
- Set `EMAIL_USER` and `EMAIL_PASS` in environment
- Use Gmail app passwords for security

## Troubleshooting

### Port Issues
- App automatically uses available port
- Default: 5000, fallback: any available

### Database Connection
- App detects environment and uses appropriate database
- Replit: Uses Neon automatically
- Local: Falls back to localhost PostgreSQL

### Build Issues
- Run `npm install` to ensure dependencies
- Check Node.js version (18+ required)
- Clear `node_modules` and reinstall if needed

## IDE-Specific Features

### VS Code
- Includes `.vscode/` configuration
- Debugging and tasks pre-configured
- Extensions recommended automatically

### WebStorm/IntelliJ
- TypeScript support out of the box
- Run configurations included

### Vim/Neovim
- Works with any LSP setup
- TypeScript server supported

## Deployment Options

1. **Replit Deployments** (recommended)
2. **Vercel**: Connect GitHub repository
3. **Netlify**: Deploy with build command
4. **Heroku**: Uses Procfile automatically
5. **Docker**: Dockerfile included
6. **VPS**: PM2 or systemd service

## Features That Work Everywhere

- ✅ Server-side rendering
- ✅ Database integration
- ✅ Email notifications
- ✅ File uploads
- ✅ Real-time updates
- ✅ Mobile responsive design
- ✅ Cross-browser compatibility

## Support

The application is tested and verified to work on:
- Windows 10/11
- macOS 12+
- Linux (Ubuntu, Fedora, Arch)
- Chrome, Firefox, Safari, Edge
- All major cloud IDEs
- Mobile browsers