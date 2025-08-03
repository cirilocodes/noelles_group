# HabiGrid Deployment Guide - GitHub & Vercel

This guide will help you deploy your HabiGrid admin system to production using GitHub and Vercel.

## Prerequisites

Before deploying, ensure you have:
- A GitHub account
- A Vercel account (free tier works)
- Your Hostinger email credentials
- Access to your database provider (if different from local development)

## Step 1: Prepare Your Code for Production

### 1.1 Environment Variables Setup

Create a `.env.example` file in your root directory:
```
# Database
DATABASE_URL=your_production_database_url

# Email Configuration (Hostinger)
HOSTINGER_SMTP_HOST=mail.yourdomain.com
HOSTINGER_SMTP_PORT=587
HOSTINGER_EMAIL_USER=hello@habigridglobal.com
HOSTINGER_EMAIL_PASS=your_email_password

# Security
JWT_SECRET=your_super_secret_jwt_key_change_this
```

### 1.2 Update Package.json Scripts

Ensure your `package.json` has the correct build scripts:
```json
{
  "scripts": {
    "dev": "tsx server/index.ts",
    "build": "npm run build:frontend && npm run build:server",
    "build:frontend": "vite build",
    "build:server": "tsc server/index.ts --outDir dist --module commonjs",
    "start": "node dist/server/index.js",
    "db:push": "drizzle-kit push"
  }
}
```

### 1.3 Create Vercel Configuration

Create `vercel.json` in your root directory:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server/index.ts",
      "use": "@vercel/node"
    },
    {
      "src": "client/**/*",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/server/index.ts"
    },
    {
      "src": "/(.*)",
      "dest": "/client/dist/$1"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

## Step 2: Setup GitHub Repository

### 2.1 Initialize Git Repository
```bash
git init
git add .
git commit -m "Initial commit - HabiGrid admin system"
```

### 2.2 Create GitHub Repository
1. Go to [GitHub.com](https://github.com)
2. Click "New repository"
3. Name it `habigrid-admin` (or your preferred name)
4. Keep it private for security
5. Don't initialize with README (you already have code)
6. Click "Create repository"

### 2.3 Push to GitHub
```bash
git remote add origin https://github.com/yourusername/habigrid-admin.git
git branch -M main
git push -u origin main
```

## Step 3: Setup Production Database

### 3.1 Database Options

**Option A: Neon (Recommended)**
1. Go to [Neon.tech](https://neon.tech)
2. Create a free account
3. Create a new project
4. Copy the connection string

**Option B: Railway**
1. Go to [Railway.app](https://railway.app)
2. Create account and new project
3. Add PostgreSQL service
4. Copy connection string

**Option C: Vercel Postgres**
1. In your Vercel dashboard
2. Go to Storage → Create Database → Postgres
3. Copy connection string

### 3.2 Run Database Migration
```bash
# Set your production DATABASE_URL
export DATABASE_URL="your_production_database_url"
npm run db:push
```

## Step 4: Deploy to Vercel

### 4.1 Connect GitHub to Vercel
1. Go to [Vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click "Import Project"
4. Select your `habigrid-admin` repository

### 4.2 Configure Build Settings
- **Framework Preset**: Other
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 4.3 Add Environment Variables
In your Vercel project settings, add:
```
DATABASE_URL=your_production_database_url
HOSTINGER_SMTP_HOST=mail.yourdomain.com  
HOSTINGER_SMTP_PORT=587
HOSTINGER_EMAIL_USER=hello@habigridglobal.com
HOSTINGER_EMAIL_PASS=your_email_password
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=production
```

### 4.4 Deploy
Click "Deploy" and wait for the build to complete.

## Step 5: Post-Deployment Setup

### 5.1 Create First Admin User
Once deployed, you need to create your first admin user:

1. Go to `https://your-app.vercel.app/admin/login`
2. Click "Register" tab
3. Fill in your details:
   - Username: `admin` (or your preferred username)
   - Email: `hello@habigridglobal.com`
   - Password: (secure password)
4. You'll receive an approval email
5. Access your database directly to approve the first user:

```sql
UPDATE admin_users 
SET is_approved = true 
WHERE email = 'hello@habigridglobal.com';
```

### 5.2 Verify All Features Work
Test these features on your live site:

✅ **Admin Authentication**
- Registration sends approval email
- Login works with approved users
- Dashboard loads correctly

✅ **Early Access Form**
- Form submissions work
- Emails sent to hello@habigridglobal.com
- Admin can see submissions

✅ **Contact Form**
- Form submissions work  
- Emails sent to hello@habigridglobal.com
- Admin can manage contacts

✅ **Launch Updates**
- Admin can create updates
- Updates can be published/unpublished
- Updates appear on main site

## Step 6: Domain Setup (Optional)

### 6.1 Custom Domain
1. In Vercel project settings
2. Go to "Domains" 
3. Add your custom domain
4. Update DNS records as instructed

### 6.2 SSL Certificate
Vercel automatically provides SSL certificates for all domains.

## Step 7: Ongoing Management

### 7.1 Admin Workflow
1. **User Management**: Approve new admin users via dashboard
2. **Content Management**: Create and publish launch updates
3. **Communication**: Monitor early access and contact submissions
4. **Email**: All notifications go to hello@habigridglobal.com

### 7.2 Database Backups
- **Neon**: Automatic backups included
- **Railway**: Configure backup schedule
- **Vercel Postgres**: Automatic backups

### 7.3 Monitoring
- Use Vercel Analytics for traffic monitoring
- Check Vercel Function logs for errors
- Monitor email delivery

## Troubleshooting

### Common Issues

**Build Fails**
- Check all dependencies are in package.json
- Verify TypeScript compilation
- Check Vercel build logs

**Database Connection Issues**
- Verify DATABASE_URL is correct
- Check database is accessible from Vercel
- Run database migrations

**Email Not Working**
- Verify Hostinger SMTP credentials
- Check email service status
- Test with Hostinger's webmail

**Authentication Issues**
- Verify JWT_SECRET is set
- Check user approval status
- Clear browser localStorage

## Security Notes

🔒 **Production Security Checklist**
- [ ] JWT_SECRET is unique and secure
- [ ] Database has strong password
- [ ] Email credentials are secure
- [ ] Repository is private
- [ ] Environment variables never committed to code
- [ ] HTTPS enabled (automatic with Vercel)
- [ ] CORS configured properly

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Check browser console for errors
3. Test API endpoints directly
4. Verify environment variables
5. Check database connectivity

Your HabiGrid admin system is now live and ready to manage your platform launch! 🚀

---

**Quick Access URLs:**
- Admin Login: `https://your-app.vercel.app/admin/login`
- Admin Dashboard: `https://your-app.vercel.app/admin`
- Main Site: `https://your-app.vercel.app/`