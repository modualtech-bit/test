# ⚡ Deploy Modual in 15 Minutes

The fastest path to get your website online!

---

## 🎯 What You'll Get

- ✅ Live website at: `https://your-app.vercel.app`
- ✅ Working database (PostgreSQL)
- ✅ File uploads working
- ✅ Email/password authentication
- ✅ Admin dashboard
- ✅ Email notifications

**Time:** 15 minutes
**Cost:** $0 (100% free tier)

---

## Step 1: Push to GitHub (2 minutes)

```bash
cd C:\Users\hp\modual

# Initialize git
git init
git add .
git commit -m "Initial Modual website"

# Create repo on GitHub.com first, then:
git remote add origin https://github.com/YOUR_USERNAME/modual-website.git
git push -u origin main
```

---

## Step 2: Create Database on Supabase (3 minutes)

1. Go to [supabase.com](https://supabase.com) → Sign up with GitHub
2. Click **"New Project"**
   - Name: `modual`
   - Database Password: Create strong password (save it!)
   - Region: Choose closest to you
   - Click **"Create new project"**
3. Wait 2 minutes for setup
4. Go to **Settings** → **Database** → **Connection string** → **URI**
5. Copy the connection string:
   ```
   postgresql://postgres.xxxxx:[YOUR-PASSWORD]@xxx.pooler.supabase.com:6543/postgres
   ```
   Replace `[YOUR-PASSWORD]` with your actual password

---

## Step 3: Setup UploadThing (2 minutes)

1. Go to [uploadthing.com](https://uploadthing.com) → Sign up
2. Click **"Create a new app"**
   - Name: `Modual`
3. Copy these:
   - App ID: `abc123`
   - Secret Key: `sk_live_xxxxx...`

---

## Step 4: Setup Email (2 minutes)

**Using Gmail:**
1. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
2. If not available, enable 2-Step Verification first
3. Select **Mail** and **Windows Computer**
4. Click **Generate**
5. Copy the 16-character password (looks like: `xxxx xxxx xxxx xxxx`)

---

## Step 5: Deploy on Vercel (5 minutes)

1. Go to [vercel.com](https://vercel.com) → Sign in with GitHub

2. Click **"Add New"** → **"Project"**

3. Import your `modual-website` repository

4. **Before deploying**, add Environment Variables:

**Click "Environment Variables" and add these:**

```env
# Database (from Step 2)
DATABASE_URL=postgresql://postgres.xxxxx:[YOUR-PASSWORD]@xxx.pooler.supabase.com:6543/postgres

# NextAuth
NEXTAUTH_URL=https://your-project-name.vercel.app
NEXTAUTH_SECRET=run-this-in-terminal-to-generate: openssl rand -base64 32

# UploadThing (from Step 3)
UPLOADTHING_SECRET=sk_live_xxxxx
UPLOADTHING_APP_ID=abc123

# Email (from Step 4)
EMAIL_FROM=your-email@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx
ADMIN_EMAIL=your-email@gmail.com
```

**To generate NEXTAUTH_SECRET:**
Open terminal and run:
```bash
openssl rand -base64 32
```
Copy the output.

5. Click **"Deploy"**

6. Wait 2-3 minutes...

7. **Success!** Copy your URL: `https://your-project.vercel.app`

---

## Step 6: Run Database Migration (1 minute)

**Option A: Via Terminal**
```bash
# Set production database URL
$env:DATABASE_URL="your-supabase-connection-string"

# Run migration
npx prisma migrate deploy
```

**Option B: Via Supabase SQL Editor**
1. Go to Supabase dashboard → **SQL Editor**
2. Click **"New query"**
3. Paste this (copy from your local prisma/migrations):
```sql
-- Run your migration SQL here
-- You can find it in: prisma/migrations/xxx_init/migration.sql
```

---

## Step 7: Test Your Website! (2 minutes)

1. Visit your URL: `https://your-project.vercel.app`

2. Click **"Registreren"** (Register)
   - Enter name, email, password
   - Click register

3. You should be redirected to dashboard!

4. Test creating a project:
   - Click **"Nieuw Project Starten"**
   - Enter text, upload a photo
   - Click **"Verstuur Aanvraag"**
   - Should show AI preview animation
   - Should redirect to dashboard

5. Check your email - you should receive a notification!

---

## Step 8: Make Yourself Admin (1 minute)

1. Go to Supabase → **SQL Editor**

2. Run this query (replace with your email):
```sql
UPDATE "User" 
SET role = 'admin' 
WHERE email = 'your@email.com';
```

3. Go to: `https://your-project.vercel.app/admin`

4. You should see the admin dashboard! 🎉

---

## ✅ Success Checklist

- [ ] Website loads at my Vercel URL
- [ ] Can register new account
- [ ] Can login
- [ ] Can create new project
- [ ] Can upload photos
- [ ] Received email notification
- [ ] Can access /admin as admin
- [ ] Can see and manage projects in admin

---

## 🚨 Quick Troubleshooting

**"Can't connect to database"**
→ Check DATABASE_URL in Vercel environment variables
→ Make sure password is correct in connection string

**"File uploads don't work"**
→ Verify UPLOADTHING_SECRET and UPLOADTHING_APP_ID are correct
→ Check they're added to Vercel environment variables

**"No email received"**
→ Check spam folder
→ Verify EMAIL_FROM and EMAIL_PASSWORD are correct
→ Make sure it's the Gmail app password, not your regular password

**"Module not found" errors**
→ Check package.json has all dependencies
→ Vercel should auto-install, but you can trigger redeployment

**"Prisma Client error"**
→ Run migration: `npx prisma migrate deploy`
→ Or add to Vercel build command: `prisma generate && next build`

---

## 🎉 You're Live!

**Your Modual website is now online!**

**What works:**
✅ User registration & login
✅ Project submissions
✅ File uploads (photos & voice)
✅ Admin dashboard
✅ Email notifications
✅ Database storage

**Your URLs:**
- Main site: `https://your-project.vercel.app`
- Admin: `https://your-project.vercel.app/admin`

**Next Steps:**
1. Add Google/Facebook OAuth (see COMPLETE_DEPLOYMENT_GUIDE.md)
2. Get a custom domain
3. Share your website!

---

## 📚 Need More Help?

- **Complete Guide:** See `COMPLETE_DEPLOYMENT_GUIDE.md`
- **Checklist:** See `DEPLOYMENT_CHECKLIST.md`
- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
- **Supabase Docs:** [supabase.com/docs](https://supabase.com/docs)

**Happy hosting! 🚀**

