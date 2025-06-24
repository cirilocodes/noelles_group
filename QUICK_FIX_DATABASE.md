# Quick Database Fix for Windows

## The Problem
Your forms are failing with "ECONNREFUSED" errors because the app is trying to connect to a PostgreSQL database that doesn't exist on your Windows machine.

## Immediate Solutions (Choose One)

### Option 1: Use SQLite (Fastest - No Setup Required)
Create a `.env` file in your project root with this content:
```env
DATABASE_URL=file:./database.sqlite
```

Then run:
```bash
npm run db:push
npm run dev
```

### Option 2: Install PostgreSQL on Windows
1. Download: https://www.postgresql.org/download/windows/
2. Install with password: `password`
3. Open pgAdmin or command line and create database:
   ```sql
   CREATE DATABASE noelles_group;
   ```
4. Run:
   ```bash
   npm run db:push
   npm run dev
   ```

### Option 3: Use Docker (If you have Docker Desktop)
```bash
docker run -d --name postgres-db -e POSTGRES_PASSWORD=password -e POSTGRES_DB=noelles_group -p 5432:5432 postgres:15
```

Then:
```bash
npm run db:push
npm run dev
```

## Verification
After choosing any option above, you should see:
```
[DB] Environment: Local Development
[DB] Database connection successful
```

Then test all your forms - they will work perfectly with real-time validation!