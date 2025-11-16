# Modual - Snelstart Gids

## ⚡ Quick Start

### 1. Installeer Dependencies

```bash
npm install
```

### 2. Database Configuratie

Maak een PostgreSQL database aan en configureer de connection string in `.env`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/modual?schema=public"
```

**Lokale PostgreSQL:**
```bash
# MacOS/Linux (met Homebrew)
brew install postgresql
brew services start postgresql
createdb modual

# Windows
# Download van https://www.postgresql.org/download/windows/
# Of gebruik Docker:
docker run --name modual-postgres -e POSTGRES_PASSWORD=password -e POSTGRES_DB=modual -p 5432:5432 -d postgres
```

### 3. Environment Variabelen

Kopieer `.env.example` naar `.env`:

```bash
cp .env.example .env
```

**Minimum vereiste variabelen:**
```env
DATABASE_URL="postgresql://user:password@localhost:5432/modual"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="run: openssl rand -base64 32"
```

**Genereer een veilige NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### 4. Prisma Setup

```bash
# Genereer Prisma Client
npx prisma generate

# Run database migraties
npx prisma migrate dev --name init

# (Optioneel) Open Prisma Studio om data te bekijken
npx prisma studio
```

### 5. Logo Toevoegen

Plaats het Modual logo in `public/logo.png` (zie LOGO_INSTRUCTIONS.md in de public folder).

### 6. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📧 Email Setup (Optioneel maar aanbevolen)

Voor productie gebruik, configureer email notificaties:

**Gmail:**
```env
EMAIL_SERVER="smtp://your-email@gmail.com:your-app-password@smtp.gmail.com:587"
EMAIL_FROM="noreply@modual.nl"
EMAIL_PASSWORD="your-gmail-app-password"
ADMIN_EMAIL="admin@modual.nl"
```

**Voor Gmail App Password:**
1. Google Account → Security
2. 2-Step Verification (enable indien niet actief)
3. App passwords → Generate new

## 📤 UploadThing Setup (Voor file uploads)

1. Ga naar [uploadthing.com](https://uploadthing.com)
2. Maak een gratis account
3. Maak een nieuwe app
4. Kopieer je keys naar `.env`:

```env
UPLOADTHING_SECRET="sk_live_..."
UPLOADTHING_APP_ID="your-app-id"
```

## 🔐 OAuth Setup (Optioneel)

### Google OAuth:

1. [Google Cloud Console](https://console.cloud.google.com)
2. Nieuw project → APIs & Services → Credentials
3. Create OAuth 2.0 Client ID
4. Application type: Web application
5. Authorized redirect URIs: 
   - `http://localhost:3000/api/auth/callback/google`
   - `https://yourdomain.com/api/auth/callback/google` (voor productie)

```env
GOOGLE_CLIENT_ID="your-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-client-secret"
```

### Facebook OAuth:

1. [Facebook Developers](https://developers.facebook.com)
2. Create App → Consumer
3. Add Facebook Login product
4. Settings → Basic → Copy App ID & App Secret
5. Settings → Advanced → Valid OAuth Redirect URIs:
   - `http://localhost:3000/api/auth/callback/facebook`

```env
FACEBOOK_CLIENT_ID="your-app-id"
FACEBOOK_CLIENT_SECRET="your-app-secret"
```

## 👤 Admin Account Aanmaken

Na registratie, maak je account admin via Prisma Studio:

```bash
npx prisma studio
```

1. Open User model
2. Vind je gebruiker (op email)
3. Wijzig `role` van `"user"` naar `"admin"`
4. Save

Of via SQL:
```sql
UPDATE "User" SET role = 'admin' WHERE email = 'jouw@email.nl';
```

## 🧪 Testen

1. **Registreer** een nieuw account op `/auth/registreren`
2. **Login** op `/auth/inloggen`
3. **Dashboard** → Nieuw Project → Vul formulier in
4. **Admin** → Maak account admin → Ga naar `/admin`

## 🚨 Veelvoorkomende Problemen

### "Error: Prisma Client is not configured"
```bash
npx prisma generate
```

### "Can't reach database server"
- Check of PostgreSQL draait
- Verificeer DATABASE_URL in .env
- Test connection: `psql -d modual`

### "Module not found"
```bash
rm -rf node_modules package-lock.json
npm install
```

### UploadThing uploads werken niet
- Verificeer UPLOADTHING_SECRET en UPLOADTHING_APP_ID
- Check of keys niet verlopen zijn
- Test in browser console voor CORS errors

### Email notificaties werken niet
- Verificeer EMAIL_SERVER configuratie
- Check firewall/antivirus settings
- Test SMTP credentials apart

## 📚 Volgende Stappen

1. ✅ Configureer alle environment variabelen
2. ✅ Voeg Modual logo toe in `/public/logo.png`
3. ✅ Maak een admin account
4. ✅ Test de volledige flow (registratie → project aanmaken → admin bekijken)
5. ✅ Configureer productie database en hosting
6. ✅ Setup custom domain
7. ✅ Configureer productie OAuth callbacks

## 🚀 Productie Deployment

### Aanbevolen Platforms:

**Hosting:**
- [Vercel](https://vercel.com) - Beste voor Next.js, gratis tier beschikbaar
- [Netlify](https://netlify.com)
- [Railway](https://railway.app)

**Database:**
- [Vercel Postgres](https://vercel.com/storage/postgres)
- [Supabase](https://supabase.com) - Gratis tier met 500MB
- [Railway Postgres](https://railway.app)

### Deployment Checklist:

- [ ] Set alle environment variabelen in hosting platform
- [ ] Update NEXTAUTH_URL naar productie URL
- [ ] Update OAuth redirect URIs naar productie URL
- [ ] Run `npx prisma migrate deploy` in productie
- [ ] Test alle functionaliteiten in productie
- [ ] Setup monitoring en error tracking

Succes met je Modual website builder! 🎉

