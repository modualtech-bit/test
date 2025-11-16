# 🚀 Complete Modual Deployment Guide

## Step-by-Step Guide to Host Your Website Online

This guide will help you deploy your Modual website to production with **everything working**: authentication, file uploads, database, emails, and OAuth.

---

## 📋 Pre-Deployment Checklist

Before deploying, make sure you have:
- [ ] Your Modual logo saved as `public/logo.png`
- [ ] Working local development (npm run dev works)
- [ ] A GitHub account (for code hosting)
- [ ] Your website content/text ready

---

## 🎯 Best Hosting Option: Vercel (Recommended)

**Why Vercel?**
- ✅ Built specifically for Next.js
- ✅ Free tier (perfect for starting)
- ✅ Automatic deployments
- ✅ Built-in database option
- ✅ Takes 10 minutes to deploy

---

## Part 1: Prepare Your Code

### Step 1: Create GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click **"New repository"**
3. Name it: `modual-website`
4. Make it **Private** (recommended)
5. Click **"Create repository"**

### Step 2: Push Your Code to GitHub

Open terminal in your modual folder:

```bash
cd C:\Users\hp\modual

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial Modual website"

# Add your GitHub repo (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/modual-website.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Important:** Make sure you have a `.gitignore` file to exclude:
```
node_modules/
.next/
.env
.env.local
```

---

## Part 2: Setup Database (PostgreSQL)

### Option A: Vercel Postgres (Easiest)

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Sign in with GitHub
3. Go to **Storage** → **Create Database**
4. Select **Postgres**
5. Choose a name: `modual-db`
6. Select region (closest to your users)
7. Click **Create**

**Save these credentials** (you'll need them):
- `POSTGRES_URL`
- `POSTGRES_PRISMA_URL`
- `POSTGRES_URL_NON_POOLING`

### Option B: Supabase (Free Alternative)

1. Go to [supabase.com](https://supabase.com)
2. Sign up with GitHub
3. Create new project
   - Name: `modual`
   - Database Password: (create a strong password)
   - Region: Choose closest to you
4. Wait 2 minutes for setup
5. Go to **Settings** → **Database**
6. Copy the **Connection String** (URI format)
   - Example: `postgresql://postgres:password@db.xxx.supabase.co:5432/postgres`

### Option C: Railway (Also Good)

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. New Project → **Provision PostgreSQL**
4. Click database → **Variables** → Copy `DATABASE_URL`

---

## Part 3: Setup UploadThing (File Uploads)

### Step 1: Create UploadThing Account

1. Go to [uploadthing.com](https://uploadthing.com)
2. Sign up (free)
3. Click **"Create App"**
4. Name it: `Modual`

### Step 2: Get API Keys

1. Go to your app dashboard
2. Copy **App ID** (looks like: `abc123xyz`)
3. Go to **API Keys**
4. Copy the **Secret Key** (starts with `sk_live_...`)

**Save these:**
```
UPLOADTHING_SECRET="sk_live_xxxxxxxxxxxxx"
UPLOADTHING_APP_ID="abc123xyz"
```

---

## Part 4: Setup OAuth (Google & Facebook)

### Google OAuth (Production)

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Select your project (or create new)
3. **APIs & Services** → **Credentials**
4. Edit your OAuth 2.0 Client
5. Add **Authorized redirect URIs:**
   ```
   https://your-domain.vercel.app/api/auth/callback/google
   ```
   (Replace `your-domain` with your actual Vercel URL)
6. Save

### Facebook OAuth (Production)

1. Go to [developers.facebook.com](https://developers.facebook.com)
2. Select your app
3. **Facebook Login** → **Settings**
4. Add **Valid OAuth Redirect URIs:**
   ```
   https://your-domain.vercel.app/api/auth/callback/facebook
   ```
5. In **Settings** → **Basic**:
   - Add **App Domains**: `your-domain.vercel.app`
   - Add **Privacy Policy URL**
   - Add **Terms of Service URL**
6. Switch app to **Live mode** (not Development)

---

## Part 5: Setup Email (Nodemailer)

### Option A: Gmail (Quick Setup)

1. Go to [myaccount.google.com/security](https://myaccount.google.com/security)
2. Enable **2-Step Verification**
3. Go to **App passwords**
4. Select **Mail** and **Windows Computer**
5. Click **Generate**
6. Copy the 16-character password

**Save this:**
```
EMAIL_FROM="your-email@gmail.com"
EMAIL_PASSWORD="xxxx xxxx xxxx xxxx" (the app password)
ADMIN_EMAIL="admin@modual.nl" (where you want notifications)
```

### Option B: SendGrid (Professional)

1. Go to [sendgrid.com](https://sendgrid.com)
2. Sign up (free tier: 100 emails/day)
3. Create API Key
4. Use in your .env:
   ```
   EMAIL_SERVER="smtp://apikey:YOUR_API_KEY@smtp.sendgrid.net:587"
   EMAIL_FROM="noreply@modual.nl"
   ```

---

## Part 6: Deploy to Vercel

### Step 1: Connect GitHub to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click **"Add New"** → **"Project"**
4. **Import Git Repository**
5. Select `modual-website`
6. Click **Import**

### Step 2: Configure Environment Variables

In the Vercel deployment settings, add these variables:

**Required:**
```env
# Database (from Part 2)
DATABASE_URL="your-postgres-connection-string"

# NextAuth (generate new secret)
NEXTAUTH_URL="https://your-app.vercel.app"
NEXTAUTH_SECRET="generate-new-secret-run: openssl rand -base64 32"

# UploadThing (from Part 3)
UPLOADTHING_SECRET="sk_live_xxxxxxxxxxxxx"
UPLOADTHING_APP_ID="abc123xyz"

# Email (from Part 5)
EMAIL_FROM="your-email@gmail.com"
EMAIL_PASSWORD="your-app-password"
ADMIN_EMAIL="admin@modual.nl"
```

**Optional (if using OAuth):**
```env
# Google OAuth (from Part 4)
GOOGLE_CLIENT_ID="xxxxx.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="xxxxx"

# Facebook OAuth (from Part 4)
FACEBOOK_CLIENT_ID="xxxxx"
FACEBOOK_CLIENT_SECRET="xxxxx"
```

### Step 3: Deploy

1. Click **"Deploy"**
2. Wait 2-3 minutes
3. You'll get a URL like: `https://modual-website.vercel.app`

### Step 4: Run Database Migration

After first deployment:

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Link your project:
   ```bash
   cd C:\Users\hp\modual
   vercel link
   ```

4. Run migration:
   ```bash
   vercel env pull .env.production
   npx prisma migrate deploy
   ```

Or use Vercel dashboard → **Settings** → **Functions** → Run this command.

---

## Part 7: Update OAuth Redirect URLs

Now that you have your production URL (`https://your-app.vercel.app`):

### Update Google OAuth:
1. [console.cloud.google.com](https://console.cloud.google.com)
2. Credentials → Edit OAuth client
3. Add authorized redirect URI:
   ```
   https://your-app.vercel.app/api/auth/callback/google
   ```

### Update Facebook OAuth:
1. [developers.facebook.com](https://developers.facebook.com)
2. Facebook Login → Settings
3. Add valid OAuth redirect URI:
   ```
   https://your-app.vercel.app/api/auth/callback/facebook
   ```

---

## Part 8: Custom Domain (Optional)

### If you have a domain (e.g., modual.nl):

1. In Vercel dashboard → **Settings** → **Domains**
2. Add your domain: `modual.nl`
3. Vercel will show you DNS records to add
4. Go to your domain provider (GoDaddy, Namecheap, etc.)
5. Add the DNS records:
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   
   Type: A
   Name: @
   Value: 76.76.21.21
   ```
6. Wait 10-60 minutes for DNS propagation

### Update environment variables:
```env
NEXTAUTH_URL="https://modual.nl"
```

Update OAuth redirect URLs to use your custom domain.

---

## Part 9: Create Admin User

After deployment:

### Option A: Using Prisma Studio (Local)

1. Connect to production database:
   ```bash
   # Add DATABASE_URL from Vercel to .env.local
   DATABASE_URL="your-production-db-url"
   ```

2. Open Prisma Studio:
   ```bash
   npx prisma studio
   ```

3. Register an account on your live website
4. Find the user in Prisma Studio
5. Change `role` from `"user"` to `"admin"`
6. Save

### Option B: Direct Database Access

If using Supabase:
1. Go to Supabase dashboard
2. **SQL Editor** → New query
3. Run:
   ```sql
   UPDATE "User" 
   SET role = 'admin' 
   WHERE email = 'your@email.com';
   ```

---

## Part 10: Testing Checklist

Test everything on your live website:

### Basic Functionality:
- [ ] Homepage loads correctly
- [ ] Logo displays properly
- [ ] Responsive design works on mobile

### Authentication:
- [ ] Email registration works
- [ ] Email login works
- [ ] Google login works (if configured)
- [ ] Facebook login works (if configured)
- [ ] Logout works

### User Features:
- [ ] Dashboard loads after login
- [ ] Can create new project
- [ ] Can enter text description
- [ ] Can upload photos (test UploadThing)
- [ ] Can upload voice memo
- [ ] AI preview animation works
- [ ] Project appears in dashboard
- [ ] Status badges display correctly

### Admin Features:
- [ ] Admin role assigned correctly
- [ ] Can access /admin dashboard
- [ ] Can see all projects
- [ ] Can filter projects by status
- [ ] Can update project status
- [ ] Statistics display correctly

### Email:
- [ ] Admin receives email on new project submission
- [ ] Email contains correct project details
- [ ] Email links work

---

## 🎯 Quick Deployment Summary

**For the impatient, here's the express version:**

1. **Push to GitHub:** `git push origin main`
2. **Deploy on Vercel:** Import from GitHub
3. **Database:** Create Postgres on Vercel or Supabase
4. **UploadThing:** Sign up, get keys
5. **Environment Variables:** Add all to Vercel
6. **Deploy:** Click deploy button
7. **Migrate:** Run `npx prisma migrate deploy`
8. **Test:** Visit your-app.vercel.app
9. **Make Admin:** Update user role in database

---

## 🔧 Troubleshooting

### "Prisma Client Error"
```bash
# In Vercel, add this build command:
npm install && npx prisma generate && next build
```

### "Module not found"
- Check all dependencies are in `package.json`
- Vercel automatically runs `npm install`

### "Database connection failed"
- Verify DATABASE_URL in Vercel environment variables
- Make sure it's the correct pooling URL
- Check database is accessible from internet

### "OAuth not working"
- Verify redirect URLs match exactly (including https://)
- Check OAuth app is in "Production" mode (Facebook)
- Ensure client IDs and secrets are correct

### "File uploads fail"
- Verify UploadThing keys are correct
- Check UPLOADTHING_SECRET starts with `sk_live_`
- Ensure keys are added to Vercel environment variables

### "Emails not sending"
- Test email credentials locally first
- Check Gmail app password is correct (16 characters)
- Verify EMAIL_FROM matches the authenticated account

---

## 🎉 Success!

Your Modual website is now live and fully functional! 

**Your URLs:**
- Website: `https://your-app.vercel.app`
- Admin: `https://your-app.vercel.app/admin`

**Next Steps:**
1. Share your website URL
2. Monitor the admin dashboard for submissions
3. Consider upgrading to custom domain
4. Set up analytics (Vercel Analytics)
5. Add monitoring (Sentry for errors)

---

## 📞 Support

If you run into issues:
1. Check Vercel deployment logs
2. Check browser console for errors
3. Review this guide's troubleshooting section
4. Vercel has great documentation: [vercel.com/docs](https://vercel.com/docs)

**Your Modual website is production-ready! 🚀**

