# Windows Development - Form Submission Fix

## The Problem
Your forms aren't submitting successfully because the app is trying to connect to a remote database that's not accessible from your local Windows machine.

## The Solution

### Step 1: Set Up Local Database
You have 3 options:

#### Option A: Quick Docker Setup (Recommended)
1. Install Docker Desktop for Windows
2. Run this command:
```bash
docker run -d --name noelles-db -e POSTGRES_PASSWORD=password -e POSTGRES_DB=noelles_group -p 5432:5432 postgres:15
```

#### Option B: Install PostgreSQL
1. Download from: https://www.postgresql.org/download/windows/
2. Install with password: `password`
3. Create database: `noelles_group`

#### Option C: Use SQLite (Simplest)
Create a `.env` file in your project root:
```env
DATABASE_URL=file:./database.sqlite
```

### Step 2: Set Environment Variable
Create `.env` file in your project root:
```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/noelles_group
NODE_ENV=development
```

### Step 3: Initialize Database
```bash
npm run db:push
```

### Step 4: Test the Fix
```bash
npm run dev
```

Then test any form - it should work now!

## Verification Steps

1. **Check server logs** - You should see:
   ```
   [DB] Connecting to database: postgresql://postgres:***@localhost:5432/noelles_group
   [DB] Environment: Local
   ```

2. **Test API directly**:
   ```bash
   curl -X POST http://localhost:5000/api/bookings -H "Content-Type: application/json" -d "{\"name\":\"Test\",\"email\":\"test@test.com\",\"country\":\"Ghana\",\"phone\":\"+233123456789\",\"serviceType\":\"Website Development\",\"projectDetails\":\"Test\"}"
   ```

3. **Check database**:
   ```bash
   npm run db:push
   ```

## Quick Fix if You Don't Want Local Database

Alternatively, you can use the Replit database by setting:
```env
DATABASE_URL=postgresql://neondb_owner:npg_j2mLwlsU5WgX@ep-flat-recipe-a5i78zq1.us-east-2.aws.neon.tech/neondb?sslmode=require
```

But this requires internet connection and may be slower.

## Common Issues

### "ECONNREFUSED" Error
- PostgreSQL isn't running
- Wrong port or credentials
- Firewall blocking connection

### "relation does not exist" Error
- Run `npm run db:push` to create tables

### Forms Still Not Working
- Check browser console for JavaScript errors
- Verify all form fields are filled correctly
- Check if API endpoints return 200 status