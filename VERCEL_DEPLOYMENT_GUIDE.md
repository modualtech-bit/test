# 🚀 Modual - Vercel Deployment Guide
## Deploy Your Application in 15 Minutes

---

## Part 1: Install Git (If Not Already Installed)

### Download and Install Git:
1. Go to: https://git-scm.com/download/win
2. Download "64-bit Git for Windows Setup"
3. Run the installer
4. Use default settings (just keep clicking "Next")
5. Restart VS Code/Cursor after installation

---

## Part 2: Create GitHub Account & Repository

### Step 1: Create GitHub Account (if you don't have one)
1. Go to: https://github.com/signup
2. Enter your email and create account
3. Verify your email

### Step 2: Create New Repository
1. Go to: https://github.com/new
2. Repository name: `modual-website`
3. Make it **Private** ✅
4. Do NOT add README, .gitignore, or license
5. Click **"Create repository"**

### Step 3: Push Your Code to GitHub
Open a new terminal in your project folder and run:

```bash
cd C:\Users\hp\modual
git init
git add .
git commit -m "Initial commit - Modual website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/modual-website.git
git push -u origin main
```

*Replace `YOUR_USERNAME` with your actual GitHub username*

---

## Part 3: Set Up Database (Choose One)

### ✅ Option A: Vercel Postgres (Recommended - Easiest)

1. Go to: https://vercel.com/signup
2. Sign up with GitHub
3. Click **"Storage"** in sidebar
4. Click **"Create Database"**
5. Select **"Postgres"**
6. Name: `modual-database`
7. Select region closest to you
8. Click **"Create"**
9. Copy the connection strings (you'll need them):
   - `POSTGRES_URL`
   - `POSTGRES_PRISMA_URL`

### Option B: Supabase (Free Alternative)

1. Go to: https://supabase.com
2. Sign up with GitHub
3. Click **"New project"**
4. Name: `modual`
5. Database Password: Create a strong password (SAVE THIS!)
6. Select region closest to you
7. Wait 2 minutes for setup
8. Go to **Settings** → **Database**
9. Copy **Connection String** (URI format)
10. Replace `[YOUR-PASSWORD]` with your actual password

---

## Part 4: Set Up UploadThing (File Uploads)

1. Go to: https://uploadthing.com
2. Sign up (free account)
3. Click **"Create App"**
4. Name: `Modual`
5. Go to **API Keys**
6. Copy:
   - **App ID** (like: `abc123xyz`)
   - **Secret Key** (starts with: `sk_live_...`)

---

## Part 5: Set Up Email (Gmail)

### Create Gmail App Password:

1. Go to: https://myaccount.google.com/security
2. Enable **2-Step Verification** (if not already enabled)
3. Go to **App passwords** 
4. Select **Mail** and **Windows Computer**
5. Click **Generate**
6. Copy the 16-character password (format: xxxx xxxx xxxx xxxx)

---

## Part 6: Deploy to Vercel

### Step 1: Connect GitHub to Vercel

1. Go to: https://vercel.com/new
2. Sign in with GitHub (if not already)
3. Click **"Import Git Repository"**
4. Find and select: `modual-website`
5. Click **"Import"**

### Step 2: Configure Build Settings

Before clicking deploy, configure these settings:

**Framework Preset:** Next.js (should auto-detect)

**Build Command:**
```
npm install && npx prisma generate && npm run build
```

**Install Command:**
```
npm install
```

### Step 3: Add Environment Variables

In the deployment page, expand **"Environment Variables"** section and add:

#### Required Variables:

```env
DATABASE_URL
```
Value: Your PostgreSQL connection string from Part 3

```env
NEXTAUTH_URL
```
Value: Leave empty for now (will update after deployment)

```env
NEXTAUTH_SECRET
```
Value: Generate one at: https://generate-secret.vercel.app/32
(Or run: `openssl rand -base64 32` in terminal)

```env
UPLOADTHING_SECRET
```
Value: Your UploadThing secret key (from Part 4)

```env
UPLOADTHING_APP_ID
```
Value: Your UploadThing app ID (from Part 4)

```env
EMAIL_FROM
```
Value: Your Gmail address (e.g., yourname@gmail.com)

```env
EMAIL_PASSWORD
```
Value: Your Gmail app password (from Part 5)

```env
ADMIN_EMAIL
```
Value: Where you want to receive notifications (e.g., admin@modual.nl)

#### Optional (for OAuth):

If you want Google/Facebook login, add:
```env
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
FACEBOOK_CLIENT_ID
FACEBOOK_CLIENT_SECRET
```

### Step 4: Deploy!

1. Click **"Deploy"**
2. Wait 2-3 minutes ⏱️
3. You'll get a URL like: `https://modual-website-xyz123.vercel.app`

---

## Part 7: Update NEXTAUTH_URL

After deployment:

1. Copy your Vercel URL (e.g., `https://modual-website-xyz123.vercel.app`)
2. In Vercel dashboard → **Settings** → **Environment Variables**
3. Find `NEXTAUTH_URL`
4. Update its value to your Vercel URL
5. Click **Save**
6. Go to **Deployments** → Click **"Redeploy"** on latest deployment

---

## Part 8: Run Database Migration

You need to create the database tables. You have two options:

### Option A: Using Vercel CLI (Recommended)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login:
```bash
vercel login
```

3. Link your project:
```bash
cd C:\Users\hp\modual
vercel link
```

4. Pull environment variables:
```bash
vercel env pull .env.production
```

5. Run migration:
```bash
npx prisma migrate deploy
```

### Option B: Using Supabase SQL Editor (If using Supabase)

1. Go to Supabase dashboard
2. Click **SQL Editor**
3. Click **New Query**
4. Run the Prisma migration SQL (I'll provide this if needed)

---

## Part 9: Create Admin User

After your website is live:

1. Go to your website: `https://your-site.vercel.app`
2. Click **Register** (or **Registreren**)
3. Create an account with your email
4. Then update the role to admin:

### Using Prisma Studio:

```bash
# In your local project, connect to production database
# Add DATABASE_URL from Vercel to a temporary .env.production file
npx prisma studio
```

1. Find your user in the **User** table
2. Change `role` from `user` to `admin`
3. Save

### OR Using Supabase SQL Editor:

```sql
UPDATE "User" 
SET role = 'admin' 
WHERE email = 'your@email.com';
```

---

## Part 10: Test Everything! ✅

Visit your live website and test:

- [ ] Homepage loads
- [ ] Can register new account
- [ ] Can login
- [ ] Can access dashboard
- [ ] Can create new project
- [ ] Can upload photos
- [ ] Can record voice memo
- [ ] Admin can access /admin page
- [ ] Admin receives email notifications

---

## Part 11: Connect Your Cap Connect Domain (Optional)

Once you register a domain with Cap Connect (e.g., `modual.ma`):

### Step 1: Add Domain to Vercel

1. Vercel Dashboard → **Settings** → **Domains**
2. Add your domain: `modual.ma`
3. Also add: `www.modual.ma`

### Step 2: Update DNS at Cap Connect

Vercel will show you DNS records. In Cap Connect cPanel:

1. Go to **Zone Editor** or **DNS Management**
2. Add these records:

**For root domain (modual.ma):**
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600
```

**For www subdomain:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

### Step 3: Update Environment Variables

1. In Vercel → **Settings** → **Environment Variables**
2. Update `NEXTAUTH_URL` to: `https://modual.ma`
3. Redeploy

### Step 4: Update OAuth URLs (if using)

Update redirect URLs in:
- Google Cloud Console
- Facebook Developer Portal

From: `https://your-site.vercel.app/api/auth/callback/google`
To: `https://modual.ma/api/auth/callback/google`

**Wait 10-60 minutes for DNS propagation** 🌍

---

## 🎉 You're Live!

Your Modual website is now online and fully functional!

**URLs:**
- Website: `https://your-site.vercel.app` (or your custom domain)
- Admin Panel: `https://your-site.vercel.app/admin`

---

## 🔧 Troubleshooting

### "Build Failed"
- Check Vercel build logs
- Make sure all environment variables are set
- Ensure DATABASE_URL is correct

### "Database Connection Error"
- Verify DATABASE_URL is correct
- Check if database is accessible from internet
- Try the non-pooling URL if using Vercel Postgres

### "UploadThing Not Working"
- Verify UPLOADTHING_SECRET starts with `sk_live_`
- Check UPLOADTHING_APP_ID is correct
- Make sure keys are added to Vercel environment variables

### "Emails Not Sending"
- Verify Gmail app password (16 characters)
- Check EMAIL_FROM matches the Gmail account
- Test with a simple email first

---

## 📞 Need Help?

- Vercel Docs: https://vercel.com/docs
- Vercel Support: https://vercel.com/support
- Check build logs in Vercel dashboard

---

**Your Modual website is production-ready! 🚀**

