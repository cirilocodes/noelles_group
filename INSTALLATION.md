# Installation Guide - Noelles Group Website

This guide will help you set up the Noelles Group website on your local development environment.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (version 18 or higher)
- **npm** (comes with Node.js)
- **PostgreSQL** database
- **Git** (for cloning the repository)

## Quick Start

### 1. Clone the Repository

```bash
git clone [your-repository-url]
cd noelles-group-website
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory and add your environment variables:

```env
# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/noelles_group
PGHOST=localhost
PGPORT=5432
PGUSER=your_username
PGPASSWORD=your_password
PGDATABASE=noelles_group

# Email Configuration (Optional - for contact forms)
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

# Development
NODE_ENV=development
```

### 4. Database Setup

The project uses PostgreSQL with Drizzle ORM. Set up your database:

1. Create a PostgreSQL database named `noelles_group`
2. Update the `DATABASE_URL` in your `.env` file
3. Push the database schema:

```bash
npm run db:push
```

### 5. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## Project Structure

```
noelles-group-website/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Application pages
│   │   ├── lib/            # Utility functions and API clients
│   │   └── hooks/          # Custom React hooks
├── server/                 # Backend Express application
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Database operations
│   └── db.ts              # Database connection
├── shared/                 # Shared code between client and server
│   └── schema.ts          # Database schema and validation
├── attached_assets/        # Logo images and assets
└── package.json
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run db:push` - Push database schema changes
- `npm run build` - Build for production (if configured)

## Database Schema

The application uses the following main tables:

- **users** - User authentication
- **bookings** - Service booking requests
- **contacts** - Contact form submissions
- **reviews** - Customer reviews with approval system

## Features

- **Service Booking System** - Complete booking form with email notifications
- **Contact Management** - Contact form with country/phone integration
- **Review System** - Customer reviews with star ratings and approval workflow
- **Responsive Design** - Mobile-first design with Tailwind CSS
- **Email Notifications** - Automatic emails for bookings and contacts

## Email Configuration

To enable email notifications:

1. Use Gmail with App Password:
   - Enable 2FA on your Gmail account
   - Generate an App Password
   - Use the App Password in `EMAIL_PASSWORD`

2. Update email settings in `server/routes.ts` if using a different provider

## Troubleshooting

### Database Connection Issues
- Verify PostgreSQL is running
- Check DATABASE_URL format
- Ensure database exists and user has proper permissions

### Email Not Working
- Check email credentials in `.env`
- Verify Gmail App Password is correct
- Check server logs for email errors

### Port Already in Use
- Change the port in `server/index.ts`
- Or kill the process using port 5000:
  ```bash
  lsof -ti:5000 | xargs kill -9
  ```

## Development Tips

1. **Hot Reload**: The development server supports hot reload for both frontend and backend
2. **Database Changes**: Use `npm run db:push` after modifying schema in `shared/schema.ts`
3. **Styling**: The project uses Tailwind CSS with custom color scheme
4. **API Testing**: Use tools like Postman to test API endpoints at `http://localhost:5000/api/*`

## Support

For technical support or questions about the installation process, please contact the development team or refer to the project documentation.