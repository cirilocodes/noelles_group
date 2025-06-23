# Deployment Guide - Noelles Group Website

This guide covers deploying the Noelles Group website to production environments.

## Replit Deployment (Recommended)

The project is optimized for Replit deployment with automatic builds and hosting.

### Prerequisites
- Replit account
- Project already running in Replit environment

### Steps

1. **Prepare Environment Variables**
   - Set up your production database (PostgreSQL)
   - Configure email credentials for notifications
   - Add environment variables in Replit Secrets:
     ```
     DATABASE_URL=your_production_database_url
     EMAIL_USER=your_production_email
     EMAIL_PASSWORD=your_email_app_password
     NODE_ENV=production
     ```

2. **Database Setup**
   ```bash
   npm run db:push
   ```

3. **Deploy**
   - Click the "Deploy" button in Replit
   - Your app will be available at `https://your-repl-name.your-username.replit.app`

### Replit Deployment Features
- Automatic SSL/TLS certificates
- Health checks
- Auto-scaling
- Custom domain support
- Built-in monitoring

## Manual Server Deployment

### Option 1: VPS/Cloud Server (Ubuntu/Debian)

1. **Server Setup**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install Node.js 18+
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Install PostgreSQL
   sudo apt install postgresql postgresql-contrib -y
   
   # Install PM2 for process management
   sudo npm install -g pm2
   ```

2. **Database Configuration**
   ```bash
   sudo -u postgres createdb noelles_group
   sudo -u postgres createuser --interactive
   ```

3. **Application Deployment**
   ```bash
   # Clone repository
   git clone [your-repository-url]
   cd noelles-group-website
   
   # Install dependencies
   npm install
   
   # Set environment variables
   nano .env
   
   # Push database schema
   npm run db:push
   
   # Start with PM2
   pm2 start server/index.ts --name noelles-group
   pm2 save
   pm2 startup
   ```

4. **Nginx Configuration**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

### Option 2: Docker Deployment

1. **Create Dockerfile**
   ```dockerfile
   FROM node:18-alpine
   
   WORKDIR /app
   
   COPY package*.json ./
   RUN npm ci --only=production
   
   COPY . .
   
   EXPOSE 5000
   
   CMD ["npm", "run", "dev"]
   ```

2. **Docker Compose Setup**
   ```yaml
   version: '3.8'
   
   services:
     app:
       build: .
       ports:
         - "5000:5000"
       environment:
         - DATABASE_URL=${DATABASE_URL}
         - EMAIL_USER=${EMAIL_USER}
         - EMAIL_PASSWORD=${EMAIL_PASSWORD}
         - NODE_ENV=production
       depends_on:
         - db
   
     db:
       image: postgres:14
       environment:
         - POSTGRES_DB=noelles_group
         - POSTGRES_USER=${POSTGRES_USER}
         - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
       volumes:
         - postgres_data:/var/lib/postgresql/data
   
   volumes:
     postgres_data:
   ```

3. **Deploy with Docker**
   ```bash
   docker-compose up -d
   ```

## Cloud Platform Deployment

### Heroku
1. **Install Heroku CLI**
2. **Create Heroku App**
   ```bash
   heroku create noelles-group-website
   ```
3. **Add PostgreSQL**
   ```bash
   heroku addons:create heroku-postgresql:hobby-dev
   ```
4. **Set Environment Variables**
   ```bash
   heroku config:set EMAIL_USER=your_email
   heroku config:set EMAIL_PASSWORD=your_password
   ```
5. **Deploy**
   ```bash
   git push heroku main
   ```

### Vercel
1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```
2. **Configure vercel.json**
   ```json
   {
     "builds": [
       {
         "src": "server/index.ts",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "server/index.ts"
       }
     ]
   }
   ```
3. **Deploy**
   ```bash
   vercel --prod
   ```

### Railway
1. **Connect GitHub Repository**
2. **Add Environment Variables**
3. **Railway auto-deploys on git push**

## Production Configuration

### Environment Variables
```env
NODE_ENV=production
DATABASE_URL=postgresql://user:password@host:5432/database
EMAIL_USER=your_production_email
EMAIL_PASSWORD=your_app_password
PORT=5000
```

### Database Considerations
- Use connection pooling for better performance
- Set up database backups
- Configure proper database user permissions
- Monitor database performance

### Security Checklist
- [ ] HTTPS enabled
- [ ] Environment variables secured
- [ ] Database access restricted
- [ ] CORS configured properly
- [ ] Rate limiting implemented
- [ ] Input validation in place
- [ ] Error handling configured

### Performance Optimization
- Enable gzip compression
- Configure caching headers
- Optimize database queries
- Use CDN for static assets
- Monitor application performance

### Monitoring and Logging
- Set up application monitoring (PM2, New Relic, etc.)
- Configure log aggregation
- Set up uptime monitoring
- Monitor database performance
- Configure error tracking

### Backup Strategy
- Daily database backups
- Code repository backups
- Environment configuration backups
- Asset file backups

## Domain and SSL

### Custom Domain Setup
1. **Purchase domain** from registrar
2. **Configure DNS** to point to your server
3. **Set up SSL certificate** (Let's Encrypt recommended)
4. **Update environment variables** with production domain

### SSL Certificate (Let's Encrypt)
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## Troubleshooting

### Common Issues
- **Database connection failures**: Check DATABASE_URL and network access
- **Email not sending**: Verify email credentials and SMTP settings
- **Static files not loading**: Check file paths and permissions
- **Performance issues**: Monitor resource usage and optimize queries

### Logs and Debugging
```bash
# PM2 logs
pm2 logs noelles-group

# Nginx logs
sudo tail -f /var/log/nginx/error.log

# Application logs
tail -f logs/app.log
```

## Maintenance

### Regular Tasks
- Monitor application health
- Update dependencies regularly
- Backup database weekly
- Review security updates
- Monitor disk space and resources

### Updates and Releases
1. Test changes in staging environment
2. Create database backup before deployment
3. Deploy during low-traffic periods
4. Monitor application after deployment
5. Have rollback plan ready

## Support

For deployment assistance or production issues, contact the development team with:
- Error logs
- Server specifications
- Environment configuration
- Steps to reproduce the issue