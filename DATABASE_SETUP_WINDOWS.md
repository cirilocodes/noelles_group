# Database Setup for Windows Development

## The Issue
Your forms are failing because the application can't connect to a local PostgreSQL database. The errors show it's trying to use WebSocket connections meant for Replit's cloud database.

## Quick Solutions

### Option 1: Install PostgreSQL Locally (Recommended)
1. **Download PostgreSQL**: https://www.postgresql.org/download/windows/
2. **Install with these settings**:
   - Username: `postgres`
   - Password: `password`
   - Port: `5432`
3. **Create the database**:
   ```sql
   CREATE DATABASE noelles_group;
   ```
4. **Run database migrations**:
   ```bash
   npm run db:push
   ```

### Option 2: Use Docker PostgreSQL
```bash
docker run -d --name noelles-postgres \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=noelles_group \
  -p 5432:5432 postgres:15
```

### Option 3: Use the Replit Database (Internet Required)
Create a `.env` file in your project root:
```env
DATABASE_URL=postgresql://neondb_owner:npg_j2mLwlsU5WgX@ep-flat-recipe-a5i78zq1.us-east-2.aws.neon.tech/neondb?sslmode=require
```

## Testing the Fix

After setting up the database, restart your application:
```bash
npm run dev
```

You should see:
```
[DB] Environment: Local Development
[DB] Connecting to: postgresql://postgres:***@localhost:5432/noelles_group
[DB] Database connection successful
```

## Verification

1. **Test a booking form** - fill out all fields and submit
2. **Test a contact form** - fill out all fields and submit  
3. **Test a review form** - fill out all fields and submit

All forms should now work without the WebSocket connection errors.

## Common Issues

### "Database connection failed"
- Ensure PostgreSQL is running
- Check username/password combination
- Verify the database `noelles_group` exists

### "relation does not exist"
- Run the database migration: `npm run db:push`

### Forms still not working
- Check browser console for JavaScript errors
- Ensure all required fields are filled correctly
- Verify the server logs show successful database connection