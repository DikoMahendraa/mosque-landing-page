# Simple Supabase Setup - Data Consumption Only

Since your data already exists in Supabase tables and is managed through the dashboard, you only need to:

## 1. Environment Variables
Create `.env.local` with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 2. Your App Structure
- `lib/supabase.ts` - Supabase client connection
- `lib/types.ts` - TypeScript interfaces for your tables
- `lib/data.ts` - Simple data fetching functions
- `app/page.tsx` - Consumes the data with fallbacks

## 3. How It Works
The homepage automatically:
- Fetches data from your existing Supabase tables
- Shows loading state while fetching
- Falls back to static content if Supabase isn't configured
- Updates in real-time when you change data in the dashboard

## 4. Table Structure Expected
Your app expects these tables:
- `home_page` - Main page content
- `mosque_stats` - Statistics (events, members, etc.)  
- `events` - Event listings

That's it! Your app will now consume data directly from your Supabase dashboard.
