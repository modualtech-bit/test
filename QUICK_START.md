# ⚡ Modual - Snelstart in 5 Minuten

## Stap 1: Installeer (30 sec)
```bash
npm install
```

## Stap 2: Database (1 min)

**Optie A: PostgreSQL lokaal**
```bash
# Als je PostgreSQL al hebt:
createdb modual
```

**Optie B: Docker (aanbevolen)**
```bash
docker run --name modual-db -e POSTGRES_PASSWORD=modual123 -e POSTGRES_DB=modual -p 5432:5432 -d postgres
```

**Optie C: Cloud (gratis)**
- Ga naar [supabase.com](https://supabase.com)
- Maak gratis project → Kopieer connection string

## Stap 3: Environment (1 min)

Maak `.env` bestand:
```env
DATABASE_URL="postgresql://postgres:modual123@localhost:5432/modual"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="supersecretkey123changemelater"
```

## Stap 4: Database Setup (1 min)
```bash
npx prisma generate
npx prisma migrate dev --name init
```

## Stap 5: Start! (30 sec)
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## ✅ Je Eerste Project Maken

1. **Registreer** → Ga naar http://localhost:3000/auth/registreren
2. **Vul in:** Naam, email, wachtwoord
3. **Dashboard** → Klik "Nieuw Project Starten"
4. **Omschrijf** je website wensen
5. **Verstuur!**

## 👤 Admin Worden

```bash
# Open Prisma Studio
npx prisma studio

# Of in terminal:
# Vind je user ID eerst, dan:
# UPDATE "User" SET role = 'admin' WHERE email = 'jouw@email.nl';
```

In Prisma Studio:
1. Click "User" table
2. Vind je gebruiker
3. Wijzig `role` van `user` naar `admin`
4. Save
5. Refresh browser
6. Ga naar http://localhost:3000/admin

---

## 🎨 Logo Toevoegen (Belangrijke Stap!)

**Plaats je Modual logo hier:**
```
public/logo.png
```

Het logo van de gebruiker (dat geüpload is) moet hier worden opgeslagen!

**Specs:**
- PNG met transparante achtergrond
- Ongeveer 600x180 pixels
- Moet "logo.png" heten

---

## 🚀 File Uploads Werkend Maken

Voor foto/audio uploads heb je UploadThing nodig:

1. Ga naar [uploadthing.com](https://uploadthing.com)
2. Sign up (gratis)
3. Maak nieuwe app
4. Kopieer keys naar `.env`:

```env
UPLOADTHING_SECRET="sk_live_xxxxx"
UPLOADTHING_APP_ID="xxxxx"
```

5. Restart `npm run dev`

---

## 📧 Email Notificaties (Optioneel)

Voeg toe aan `.env`:

```env
EMAIL_FROM="test@modual.nl"
EMAIL_PASSWORD="your-gmail-app-password"
ADMIN_EMAIL="admin@modual.nl"
```

Voor Gmail:
1. Google Account → Security → 2FA (enable)
2. App Passwords → Generate
3. Gebruik in EMAIL_PASSWORD

---

## 🔐 Social Login (Optioneel)

### Google:
1. [console.cloud.google.com](https://console.cloud.google.com)
2. New Project → APIs → Credentials
3. OAuth 2.0 Client → Web App
4. Redirect: `http://localhost:3000/api/auth/callback/google`
5. Kopieer credentials:

```env
GOOGLE_CLIENT_ID="xxxxx.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="xxxxx"
```

### Facebook:
1. [developers.facebook.com](https://developers.facebook.com)
2. Create App → Consumer
3. Facebook Login → Settings
4. Redirect: `http://localhost:3000/api/auth/callback/facebook`

```env
FACEBOOK_CLIENT_ID="xxxxx"
FACEBOOK_CLIENT_SECRET="xxxxx"
```

---

## 🎯 Test Checklist

- [ ] Homepage laadt → ✅
- [ ] Kan registreren → ✅
- [ ] Kan inloggen → ✅
- [ ] Dashboard zichtbaar → ✅
- [ ] Nieuw project maken → ✅
- [ ] Tekst invoeren werkt → ✅
- [ ] Files uploaden (met UploadThing) → ⚠️ Needs setup
- [ ] AI preview animatie → ✅
- [ ] Project verschijnt in lijst → ✅
- [ ] Admin dashboard (na admin role) → ✅
- [ ] Status update in admin → ✅

---

## 🐛 Problemen?

**"Can't reach database"**
```bash
# Check of postgres draait:
docker ps  # Moet modual-db zien
# Of:
pg_isready
```

**"Prisma Client not found"**
```bash
npx prisma generate
```

**"Module not found"**
```bash
rm -rf node_modules
npm install
```

**Uploads werken niet**
→ Voeg UploadThing keys toe in `.env`

**Logo niet zichtbaar**
→ Plaats `logo.png` in `/public/` folder

---

## 🎊 Klaar!

Je Modual app draait nu lokaal. 

**Volgende stappen:**
- Voeg je logo toe
- Setup UploadThing voor file uploads
- Maak jezelf admin
- Test de volledige flow
- Zie `SETUP_GUIDE.md` voor productie deployment

**Veel plezier met bouwen! 🚀**

