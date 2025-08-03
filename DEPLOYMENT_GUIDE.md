# HabiGrid Deployment Guide

## Vercel Deployment (Recommended)

### Prerequisites
1. GitHub repository with latest code
2. Vercel account connected to GitHub
3. Environment variables configured

### Environment Variables (Optional)
For enhanced functionality, configure these in Vercel dashboard:

```
# Optional: For future backend integration
DATABASE_URL=your_database_url
NODE_ENV=production

# Note: Current deployment is frontend-only
# Admin and contact forms use client-side functionality
```

### Deployment Steps

1. **Connect Repository to Vercel**
   - Import project from GitHub in Vercel dashboard
   - Select the main branch

2. **Configure Build Settings**
   - Framework Preset: Vite
   - Build Command: `node build.js`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Add Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add all required variables listed above

4. **Deploy**
   - Push changes to main branch
   - Vercel will automatically build and deploy
   - Monitor build logs for any issues

### Build Configuration
The project uses:
- **Frontend**: Vite builds React app to `dist/` directory 
- **Backend**: Frontend-only deployment (admin functionality uses client-side state)
- **Database**: Not required for static deployment
- **Email**: Contact forms use frontend validation only
- **Build Process**: Custom `build.js` script bypasses TypeScript compilation issues

### Troubleshooting

**Build Failures:**
- Check TypeScript errors in build logs
- Ensure all dependencies are installed
- Verify environment variables are set

**Database Connection:**
- Verify DATABASE_URL format
- Check Neon database is accessible
- Run `npm run db:push` locally first

**Email Issues:**
- Test SMTP credentials with Hostinger
- Check firewall/security settings
- Verify environment variables

### Post-Deployment

1. **Test Admin System**
   - Access `/admin/login` route
   - Register first admin user
   - Test approval workflow

2. **Test Forms**
   - Submit early access request
   - Submit contact form
   - Verify emails are received

3. **Monitor Performance**
   - Check Vercel analytics
   - Monitor database connections
   - Test form submissions

### Production Database
Use Neon PostgreSQL for production with proper connection pooling and security settings.

### Maintenance
- Regular database backups via Neon dashboard
- Monitor email delivery rates
- Update dependencies quarterly
- Review admin users periodically