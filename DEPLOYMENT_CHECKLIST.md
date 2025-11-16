# ✅ Modual Deployment Checklist

Print this and check off each item as you complete it!

---

## 📦 Pre-Deployment

- [ ] Local development works (`npm run dev`)
- [ ] All features tested locally
- [ ] Modual logo added to `public/logo.png`
- [ ] No errors in console
- [ ] `.gitignore` includes `.env` and `node_modules`

---

## 🗂️ GitHub Setup

- [ ] GitHub account created/logged in
- [ ] New repository created: `modual-website`
- [ ] Repository set to Private
- [ ] Code pushed to GitHub
  ```bash
  git add .
  git commit -m "Initial commit"
  git push origin main
  ```

---

## 🗄️ Database Setup (Choose One)

### Option A: Vercel Postgres
- [ ] Vercel account created
- [ ] Postgres database created
- [ ] `POSTGRES_PRISMA_URL` copied

### Option B: Supabase
- [ ] Supabase account created
- [ ] New project created
- [ ] Connection string copied
- [ ] Format: `postgresql://postgres:password@db.xxx.supabase.co:5432/postgres`

### Option C: Railway
- [ ] Railway account created
- [ ] PostgreSQL provisioned
- [ ] `DATABASE_URL` copied

---

## 📤 UploadThing Setup

- [ ] Account created at [uploadthing.com](https://uploadthing.com)
- [ ] New app created: "Modual"
- [ ] `UPLOADTHING_SECRET` copied (starts with `sk_live_`)
- [ ] `UPLOADTHING_APP_ID` copied

---

## 🔐 OAuth Setup (Optional but Recommended)

### Google OAuth
- [ ] Google Cloud Console account
- [ ] OAuth 2.0 Client created
- [ ] Production redirect URI added: `https://YOUR-APP.vercel.app/api/auth/callback/google`
- [ ] `GOOGLE_CLIENT_ID` copied
- [ ] `GOOGLE_CLIENT_SECRET` copied

### Facebook OAuth
- [ ] Facebook Developers account
- [ ] App created
- [ ] Facebook Login added
- [ ] Production redirect URI added: `https://YOUR-APP.vercel.app/api/auth/callback/facebook`
- [ ] `FACEBOOK_CLIENT_ID` copied
- [ ] `FACEBOOK_CLIENT_SECRET` copied
- [ ] App switched to Live mode

---

## 📧 Email Setup

### Gmail Option
- [ ] 2-Step Verification enabled
- [ ] App password generated
- [ ] `EMAIL_FROM` = your Gmail address
- [ ] `EMAIL_PASSWORD` = 16-character app password
- [ ] `ADMIN_EMAIL` = where to receive notifications

### SendGrid Option
- [ ] SendGrid account created
- [ ] API key generated
- [ ] SMTP credentials copied

---

## 🚀 Vercel Deployment

- [ ] Vercel account created (sign in with GitHub)
- [ ] New project created
- [ ] GitHub repository imported
- [ ] Framework preset: Next.js (auto-detected)

---

## ⚙️ Environment Variables Added to Vercel

**Required Variables:**
- [ ] `DATABASE_URL`
- [ ] `NEXTAUTH_URL` (your Vercel URL)
- [ ] `NEXTAUTH_SECRET` (generate with: `openssl rand -base64 32`)
- [ ] `UPLOADTHING_SECRET`
- [ ] `UPLOADTHING_APP_ID`
- [ ] `EMAIL_FROM`
- [ ] `EMAIL_PASSWORD`
- [ ] `ADMIN_EMAIL`

**Optional OAuth Variables:**
- [ ] `GOOGLE_CLIENT_ID`
- [ ] `GOOGLE_CLIENT_SECRET`
- [ ] `FACEBOOK_CLIENT_ID`
- [ ] `FACEBOOK_CLIENT_SECRET`

---

## 🎯 Deployment

- [ ] Clicked "Deploy" in Vercel
- [ ] Deployment successful (no errors)
- [ ] Production URL received: `https://________.vercel.app`
- [ ] Website loads without errors

---

## 🗃️ Database Migration

- [ ] Vercel CLI installed: `npm install -g vercel`
- [ ] Logged into Vercel: `vercel login`
- [ ] Project linked: `vercel link`
- [ ] Migration run: `npx prisma migrate deploy`
- [ ] OR migration run via Vercel dashboard

---

## 🔄 Update OAuth Redirects

- [ ] Google: Production redirect URI updated to actual Vercel URL
- [ ] Facebook: Production redirect URI updated to actual Vercel URL
- [ ] Facebook app in Live mode

---

## 👤 Admin User Created

- [ ] Registered account on live website
- [ ] User role changed to "admin" in database
- [ ] Can access `/admin` dashboard
- [ ] Admin features working

---

## 🧪 Testing Checklist

### Homepage & Design
- [ ] Homepage loads
- [ ] Logo displays correctly
- [ ] Gradient colors correct
- [ ] Responsive on mobile
- [ ] Navigation works

### Authentication
- [ ] Register new account works
- [ ] Email login works
- [ ] Google login works (if enabled)
- [ ] Facebook login works (if enabled)
- [ ] Logout works
- [ ] Redirects to dashboard after login

### User Dashboard
- [ ] Dashboard loads after login
- [ ] "Nieuw Project" button works
- [ ] Project list displays (empty initially)
- [ ] User name displays correctly

### Project Creation
- [ ] Can access new project page
- [ ] Text input works
- [ ] Photo upload works (UploadThing)
- [ ] Voice upload works (UploadThing)
- [ ] AI preview modal displays
- [ ] Submission succeeds
- [ ] Redirects to dashboard
- [ ] Project appears in list

### Project Display
- [ ] Projects show in user dashboard
- [ ] Status badges display correctly
- [ ] Date formatting correct
- [ ] Project cards look good

### Admin Dashboard
- [ ] Can access `/admin` URL
- [ ] Statistics display correctly
- [ ] All projects visible
- [ ] Filter tabs work
- [ ] Can view project details
- [ ] Can update project status
- [ ] Status updates save

### Email Notifications
- [ ] Email received on new project submission
- [ ] Email contains user info
- [ ] Email contains project details
- [ ] Email formatted correctly

### File Uploads
- [ ] Image uploads complete
- [ ] Images display in preview
- [ ] Can remove uploaded images
- [ ] Audio uploads complete
- [ ] Audio playback works
- [ ] File size limits enforced

---

## 🌐 Custom Domain (Optional)

- [ ] Domain purchased
- [ ] Domain added in Vercel
- [ ] DNS records added to domain provider
- [ ] DNS propagated (test: `nslookup yourdomain.com`)
- [ ] HTTPS certificate active
- [ ] `NEXTAUTH_URL` updated to custom domain
- [ ] OAuth redirects updated to custom domain

---

## 📊 Post-Deployment

- [ ] Tested on desktop browser
- [ ] Tested on mobile browser
- [ ] Tested on different browsers (Chrome, Firefox, Safari)
- [ ] All features working as expected
- [ ] Performance acceptable
- [ ] No console errors
- [ ] Website URL shared with stakeholders

---

## 🎯 Production Monitoring

- [ ] Vercel Analytics enabled
- [ ] Error monitoring considered (Sentry)
- [ ] Uptime monitoring (optional)
- [ ] Database backups enabled

---

## 📝 Documentation

- [ ] Production URL documented
- [ ] Admin credentials saved securely
- [ ] Environment variables backed up securely
- [ ] OAuth credentials saved
- [ ] Database credentials saved

---

## 🎉 Launch!

- [ ] **Everything tested and working**
- [ ] **Website is LIVE!**
- [ ] **Admin can manage projects**
- [ ] **Users can submit projects**

**Production URL:** `https://________________________________`

**Admin Login:** `________________________________`

**Launch Date:** `________________________________`

---

**Congratulations! Your Modual website is now live! 🚀🎊**

