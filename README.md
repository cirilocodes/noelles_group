# Noelles Group - Business Website

A comprehensive business website for Noelles Group, a Ghana-based company offering 11 diverse services including technology solutions, creative services, premium products, and specialized ministries.

## 🌟 Features

- **Modern Design** - Artistic violet/deep blue color scheme with strategic black backgrounds
- **Service Showcase** - Complete portfolio of 11 business services
- **Booking System** - Advanced booking form with email notifications
- **Contact Management** - Smart contact forms with country/phone integration
- **Review System** - Customer reviews with star ratings and approval workflow
- **Responsive Design** - Mobile-first approach with seamless user experience
- **International Support** - Country selection with automatic phone code detection

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL database
- npm or yarn

### Clone and Setup
```bash
# Clone the repository
git clone [repository-url]
cd noelles-group-website

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database and email credentials

# Initialize database
npm run db:push

# Start development server
npm run dev
```

Visit `http://localhost:5000` to see the website.

## 📋 Services Offered

1. **Website Development** - Custom web solutions
2. **Mobile App Development** - iOS and Android applications
3. **Video Editing** - Professional video production
4. **Flyer Design** - Creative graphic design
5. **Games Installation** - Gaming setup services
6. **Apple Product Sales** - Authorized Apple products
7. **Jerseys** - Team sets and individual sports wear
8. **Perfumes** - Premium fragrance collection
9. **Gospel Ministries Dancers** - Spiritual performance services
10. **Nails Fixing and Design** - Professional nail services
11. **Animation Creation** - Custom animation projects

## 🛠 Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Express.js, Node.js
- **Database**: PostgreSQL with Drizzle ORM
- **Email**: Nodemailer integration
- **UI Components**: Radix UI, Shadcn/ui
- **Icons**: Lucide React, React Icons

## 📱 Contact Information

- **Phone**: +233 24 676 6413
- **Email**: noellesgroup4@gmail.com
- **Location**: Ghana

## 🎨 Design Features

- Custom 3D embossed logo integration
- Gradient backgrounds and modern animations
- Glass morphism effects
- Responsive grid layouts
- Interactive form elements
- Smooth scrolling navigation

## 📊 Database Schema

### Main Tables
- **users** - Authentication and user management
- **bookings** - Service booking requests with project details
- **contacts** - Contact form submissions with country/phone data
- **reviews** - Customer reviews with rating system and approval status

## 🔧 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run db:push      # Push database schema changes
npm run build        # Build for production
npm start           # Start production server
```

### Project Structure
```
├── client/          # React frontend application
├── server/          # Express backend API
├── shared/          # Shared schemas and types
├── attached_assets/ # Logo and image assets
└── docs/           # Documentation files
```

## 📧 Email Notifications

The system automatically sends email notifications for:
- New booking requests
- Contact form submissions
- Customer review submissions

Configure email settings in your environment variables.

## 🌍 International Features

- Country selection dropdown with 23+ countries
- Automatic phone code detection
- Default Ghana (+233) country code
- Support for African and international markets

## 🔒 Security Features

- Input validation with Zod schemas
- SQL injection prevention
- XSS protection
- Environment variable security
- Rate limiting ready

## 📈 Performance

- Optimized bundle sizes
- Lazy loading components
- Database connection pooling
- Efficient query patterns
- CDN-ready asset structure

## 🚀 Deployment

The project is optimized for multiple deployment platforms:
- **Replit** (Recommended) - One-click deployment
- **Vercel** - Serverless deployment
- **Heroku** - Traditional hosting
- **VPS/Cloud** - Self-hosted options

See `DEPLOYMENT.md` for detailed instructions.

## 📚 Documentation

- `INSTALLATION.md` - Complete setup guide
- `DEPLOYMENT.md` - Production deployment instructions
- `README.md` - This overview document

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary software for Noelles Group. All rights reserved.

## 📞 Support

For technical support or business inquiries:
- Email: noellesgroup4@gmail.com
- Phone: +233 24 676 6413

---

**Built with ❤️ for Noelles Group** - Your trusted partner for technology solutions, creative services, and premium products in Ghana.