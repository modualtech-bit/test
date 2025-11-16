# 🌐 Create Temporary Public Link for Modual

## Option 1: localtunnel (Easiest - No Signup Required)

### Step 1: Make sure your dev server is running
```bash
npm run dev
```
(Should show: http://localhost:3000)

### Step 2: Open a NEW terminal and run:
```bash
npx localtunnel --port 3000
```

### Step 3: You'll get a URL like:
```
your url is: https://ugly-sheep-12.loca.lt
```

**Share this URL!** It's publicly accessible and temporary (expires when you close the terminal).

**Note:** First time visitors might see a warning page - just click "Continue" and enter the displayed IP.

---

## Option 2: ngrok (More Reliable - Free Signup)

### Step 1: Install ngrok
Download from [ngrok.com/download](https://ngrok.com/download) or use Chocolatey:
```bash
choco install ngrok
```

### Step 2: Sign up (free) at [ngrok.com](https://ngrok.com)
Get your authtoken from the dashboard

### Step 3: Authenticate (one-time)
```bash
ngrok config add-authtoken YOUR_TOKEN_HERE
```

### Step 4: Make sure dev server is running
```bash
npm run dev
```

### Step 5: Open NEW terminal and create tunnel
```bash
ngrok http 3000
```

### Step 6: You'll see:
```
Forwarding    https://abc123.ngrok-free.app -> http://localhost:3000
```

**Share the https URL!** Works perfectly, no warning pages.

---

## Option 3: Cloudflare Tunnel (Professional)

### Step 1: Install Cloudflare Tunnel
```bash
npm install -g cloudflared
```

### Step 2: Start dev server
```bash
npm run dev
```

### Step 3: Create tunnel (NEW terminal)
```bash
cloudflared tunnel --url http://localhost:3000
```

You'll get a URL like: `https://abc-def-123.trycloudflare.com`

---

## 🎯 Quick Start (Copy & Paste)

**Terminal 1:**
```bash
cd C:\Users\hp\modual
npm run dev
```

**Terminal 2 (choose one):**

**For localtunnel:**
```bash
npx localtunnel --port 3000
```

**For ngrok (after setup):**
```bash
ngrok http 3000
```

---

## ⚠️ Important Notes

### Before Sharing:

1. **Add .env variables:**
   ```env
   NEXTAUTH_URL="https://your-temporary-url.loca.lt"
   ```
   Restart the dev server after changing this.

2. **Database Access:**
   - Your PostgreSQL needs to be accessible
   - Local database = tunnel works
   - If using cloud database, no changes needed

3. **OAuth Redirects:**
   - Google/Facebook OAuth won't work with temporary URLs
   - You'd need to add the temporary URL to OAuth authorized redirects
   - For quick demos, use email/password login instead

### Security:

- ⚠️ This exposes your LOCAL server to the internet
- 🔒 Only share with trusted people
- ⏱️ Link expires when you stop the tunnel
- 🗑️ Close the tunnel when done

---

## 🎬 Step-by-Step Example

1. **Start your app:**
   ```bash
   npm run dev
   ```
   Wait for: `Ready in 2.3s`

2. **Open new terminal, create tunnel:**
   ```bash
   npx localtunnel --port 3000
   ```

3. **Copy the URL shown:**
   ```
   your url is: https://funny-cat-42.loca.lt
   ```

4. **Share it:**
   Send the URL to anyone. They can now access your Modual website!

5. **When done, press Ctrl+C** in the tunnel terminal to stop sharing.

---

## 🚀 For Production (Not Temporary)

If you want a permanent link, deploy to:
- **Vercel** (free, 5 mins) - Best for Next.js
- **Netlify** (free)
- **Railway** (free tier)

See `SETUP_GUIDE.md` for deployment instructions.

---

## 🆘 Troubleshooting

**"Port 3000 already in use":**
- Your dev server isn't running on port 3000
- Check what port it's actually using

**"Connection refused":**
- Make sure `npm run dev` is running first
- Check that you see "Ready" message

**"Tunnel not working":**
- Try a different option (localtunnel vs ngrok)
- Check firewall isn't blocking

**OAuth login fails:**
- Use email/password login instead for temporary links
- OAuth requires registered callback URLs

---

Enjoy sharing your Modual website! 🎉

