# Windows Development Setup Guide

This guide will help you set up the Noelles Group website on Windows using VSCode.

## Prerequisites

### Required Software
1. **Node.js 18+** - Download from [nodejs.org](https://nodejs.org/)
2. **PostgreSQL** - Download from [postgresql.org](https://www.postgresql.org/download/windows/)
3. **VSCode** - Download from [code.visualstudio.com](https://code.visualstudio.com/)
4. **Git** - Download from [git-scm.com](https://git-scm.com/download/win)

### VSCode Extensions (Auto-installed via .vscode/extensions.json)
- Prettier - Code formatter
- ESLint - JavaScript linter
- Tailwind CSS IntelliSense
- TypeScript and JavaScript Language Features
- Auto Rename Tag
- Path Intellisense

## Step-by-Step Setup

### 1. Install PostgreSQL

1. Download PostgreSQL installer for Windows
2. Run installer and set a password for the `postgres` user
3. Remember the port (default: 5432)
4. Add PostgreSQL to your PATH during installation

### 3. Clone and Setup Project

```cmd
# Clone repository
git clone [your-repository-url]
cd noelles_group

# Install dependencies
npm install

### 5. Initialize Database

```cmd
npm run db:push
```

### 6. Start Development

```cmd
# Start both client and server
npm run dev

# Or start separately in different terminals:
# Terminal 1 - Server
npx tsx watch server/index.ts

# Terminal 2 - Client
npx vite
```

## VSCode Configuration

The project includes pre-configured VSCode settings:

### Debugging
- Press `F5` to start debugging
- Use "Start Development Server" configuration
- Breakpoints work in TypeScript files

### Tasks
Access via `Ctrl+Shift+P` → "Tasks: Run Task":
- Install Dependencies
- Start Development Server
- Push Database Schema
- Build for Production

### Terminal Integration
- Open integrated terminal: `Ctrl+``
- Multiple terminals supported for client/server

## Windows-Specific Considerations

### Path Separators
The code uses forward slashes `/` which work on Windows with Node.js.

### Environment Variables
Windows uses different syntax for environment variables in scripts:
- Use `set` command in Command Prompt
- Use `$env:` in PowerShell
- The project uses cross-platform npm scripts

### File Permissions
No special file permissions needed on Windows.

### Firewall
Windows Firewall may prompt for Node.js access - allow it for local development.

## Common Windows Issues

### Issue: `npm install` fails with permission errors
**Solution:**
```cmd
# Run as Administrator or use:
npm install --no-optional
```

### Issue: PostgreSQL connection fails
**Solutions:**
1. Check if PostgreSQL service is running:
   ```cmd
   services.msc
   # Look for "postgresql-x64-xx" service
   ```
2. Verify connection string in `.env`
3. Check firewall settings

### Issue: Port 5000 already in use
**Solution:**
```cmd
# Find process using port 5000
netstat -ano | findstr :5000

# Kill process (replace PID with actual process ID)
taskkill /PID <PID> /F

# Or change port in .env file
```

### Issue: tsx command not found
**Solution:**
```cmd
# Install tsx globally
npm install -g tsx

# Or use npx
npx tsx server/index.ts
```

## Email Setup for Windows

### Gmail Configuration
1. Enable 2-Factor Authentication
2. Generate App Password:
   - Google Account → Security → App passwords
   - Generate password for "Mail"
   - Use this password in `.env` file

### Alternative Email Providers
Update `server/routes.ts` for other providers:
```javascript
const transporter = nodemailer.createTransporter({
  host: 'smtp.your-provider.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});
```

## Database Management

### Using pgAdmin (Optional)
1. Download pgAdmin from postgresql.org
2. Connect to localhost:5432
3. Visual database management interface

### Command Line Tools
```cmd
# Connect to database
psql -U postgres -d noelles_group

# Backup database
pg_dump -U postgres noelles_group > backup.sql

# Restore database
psql -U postgres noelles_group < backup.sql
```

## Performance Tips

### Development
- Use SSD for faster file operations
- Close unnecessary applications
- Use Windows Terminal for better performance

### Database
- Increase PostgreSQL memory settings for development
- Use connection pooling in production

## Production Build

```cmd
# Build for production
npm run build

# Start production server
npm start
```

## Troubleshooting

### VSCode Issues
1. Reload window: `Ctrl+Shift+P` → "Developer: Reload Window"
2. Clear TypeScript cache: `Ctrl+Shift+P` → "TypeScript: Restart TS Server"
3. Check Output panel for errors

### Database Issues
1. Check PostgreSQL logs in Event Viewer
2. Verify service status in Services
3. Test connection with psql

### Network Issues
1. Check Windows Firewall
2. Verify no VPN conflicts
3. Test localhost connectivity

## Development Workflow

1. **Start Development:**
   ```cmd
   npm run dev
   ```

2. **Make Changes:**
   - Edit files in VSCode
   - Auto-reload works for both client and server

3. **Database Changes:**
   ```cmd
   npm run db:push
   ```

4. **Test Changes:**
   - Visit http://localhost:5000
   - Check both frontend and API endpoints

5. **Debug Issues:**
   - Use VSCode debugger (F5)
   - Check browser console
   - Review server logs in terminal

## Support

For Windows-specific issues:
1. Check Windows Event Viewer for system errors
2. Verify all prerequisites are installed correctly
3. Review firewall and antivirus settings
4. Contact development team with error logs and system specifications