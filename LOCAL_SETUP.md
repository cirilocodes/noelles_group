# Local Development Setup (Windows/Mac/Linux)

## Quick Fix for Database Connection Issues

### Option 1: Use Replit Database (Recommended)
The app is already configured to use the Replit database. No local setup needed.

### Option 2: Local PostgreSQL Setup

#### Windows (using PostgreSQL installer)
1. **Download PostgreSQL**: https://www.postgresql.org/download/windows/
2. **Install with these settings**:
   - Username: `postgres`
   - Password: `password`
   - Port: `5432`
   - Database: Create one called `noelles_group`

3. **Create database**:
   ```sql
   CREATE DATABASE noelles_group;
   ```

4. **Set environment variable** (optional):
   ```bash
   set DATABASE_URL=postgresql://postgres:password@localhost:5432/noelles_group
   ```

#### Mac (using Homebrew)
```bash
brew install postgresql
brew services start postgresql
createdb noelles_group
```

#### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo -u postgres createdb noelles_group
sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'password';"
```

### Option 3: Docker PostgreSQL (All Platforms)
```bash
docker run -d --name noelles-postgres -e POSTGRES_PASSWORD=password -e POSTGRES_DB=noelles_group -p 5432:5432 postgres:15
```

## Running the Application

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Push database schema**:
   ```bash
   npm run db:push
   ```

3. **Start the application**:
   ```bash
   npm run dev
   ```

## Testing Forms

After setup, test each form:

1. **Booking Form**: Fill all fields and submit
2. **Contact Form**: Fill all fields and submit  
3. **Review Form**: Fill all fields and submit

Check the console logs for any errors and verify data appears in the database.

## Troubleshooting

### Database Connection Errors
- Ensure PostgreSQL is running
- Check the connection string format
- Verify database exists
- Check firewall settings

### Form Submission Failures
- Check browser console for JavaScript errors
- Check server logs for API errors
- Verify all required fields are filled
- Test API endpoints directly with curl

### Email Issues
- Email notifications may fail in local development
- This is normal and doesn't affect form submissions
- Forms will still save to database

## Environment Variables (Optional)

Create `.env` file:
```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/noelles_group
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
PORT=5000
NODE_ENV=development
```