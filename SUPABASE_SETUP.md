# Supabase Setup Instructions

## 1. Create a Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project" 
3. Sign up/login with your GitHub account
4. Create a new organization (if needed)
5. Click "New Project"
6. Choose your organization
7. Enter project name: `digital-mosque`
8. Set a strong database password
9. Choose a region closest to your users
10. Click "Create new project"

## 2. Get Your Supabase Credentials
Once your project is ready:
1. Go to Project Settings → API
2. Copy the **Project URL** 
3. Copy the **anon public** key
4. Copy the **service_role** key (for server-side operations)

## 3. Set Up Environment Variables
Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

Replace the placeholder values with your actual Supabase credentials.

## 4. Set Up Database Schema
1. Go to the Supabase Dashboard
2. Click on "SQL Editor" in the left sidebar
3. Copy the contents of `supabase-schema.sql`
4. Paste it into the SQL Editor
5. Click "Run" to execute the schema

## 5. Verify Setup
1. Run your development server: `pnpm dev`
2. Open your app in the browser
3. The homepage should now load with data from Supabase
4. You can edit the data in the Supabase Dashboard under "Table Editor"

## 6. Managing Content
You can update your website content by:
- Using the Supabase Dashboard Table Editor
- Building an admin interface
- Using the Supabase API directly

## Tables Created
- `home_page`: Main page content and text
- `mosque_stats`: Statistics numbers (events, members, etc.)
- `events`: Event listings with details

## Security Notes
- Row Level Security (RLS) is enabled
- Public read access is allowed for all tables
- Only authenticated users can update data
- Never expose your service_role key on the client side
