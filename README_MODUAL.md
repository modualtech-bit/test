# Modual - Website Builder

Een moderne, Nederlandse web applicatie waarmee gebruikers eenvoudig hun eigen websites kunnen creëren via tekst, foto's of spraakmemo's.

## 🚀 Functies

- **Authenticatie Systeem**
  - Email/wachtwoord registratie en inloggen
  - Social login via Google en Facebook (NextAuth.js)
  - Veilige opslag met Prisma + PostgreSQL

- **Gebruiker Dashboard**
  - Nieuwe projecten starten
  - Vorige inzendingen bekijken
  - Project status volgen

- **Project Inzending Formulier**
  - Tekst beschrijving van website wensen
  - Foto/logo uploads (max 5 afbeeldingen, 4MB elk)
  - Spraakmemo upload of opname (max 8MB)
  - Validatie en voortgangsindicatoren

- **AI Assistent (simulatie)**
  - Analyseert gebruikersinvoer (tekst, foto's, spraak)
  - Toont geanimeerde laadstatus
  - Mock "AI Ontwerppreview" resultaat

- **Admin Dashboard**
  - Toegang op basis van rol
  - Alle ingediende projecten bekijken en beheren
  - Projecten filteren op status (Nieuw, In Behandeling, Voltooid)
  - Status updates en projectbeheer

- **Notificaties**
  - Email notificaties naar admin team (Nodemailer)
  - Optionele WhatsApp notificaties (Twilio API)

## 🛠️ Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Prisma** + **PostgreSQL**
- **NextAuth.js** (Email, Google, Facebook)
- **UploadThing** (file uploads)
- **Framer Motion** (animaties)
- **Nodemailer** / **Twilio** (notificaties)

## 📋 Vereisten

- Node.js 18+ 
- PostgreSQL database
- Google OAuth credentials (optioneel)
- Facebook App credentials (optioneel)
- UploadThing account
- SMTP server voor emails

## 🔧 Installatie

1. **Clone de repository en installeer dependencies:**

```bash
npm install
```

2. **Configureer environment variabelen:**

Kopieer `.env.example` naar `.env` en vul de vereiste waarden in:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/modual?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="genereer-een-veilige-random-string"

# Google OAuth (optioneel)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Facebook OAuth (optioneel)
FACEBOOK_CLIENT_ID="your-facebook-app-id"
FACEBOOK_CLIENT_SECRET="your-facebook-app-secret"

# Email (Nodemailer)
EMAIL_SERVER="smtp://user@example.com:password@smtp.example.com:587"
EMAIL_FROM="noreply@modual.nl"
EMAIL_PASSWORD="your-email-password"
ADMIN_EMAIL="admin@modual.nl"

# UploadThing
UPLOADTHING_SECRET="your-uploadthing-secret"
UPLOADTHING_APP_ID="your-uploadthing-app-id"
```

3. **Database setup:**

```bash
# Genereer Prisma Client
npx prisma generate

# Run database migraties
npx prisma migrate dev --name init

# (Optioneel) Open Prisma Studio
npx prisma studio
```

4. **Logo toevoegen:**

Plaats je Modual logo in `public/logo.png` (met transparante achtergrond).

5. **Start de development server:**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in je browser.

## 📁 Project Structuur

```
/app
  /api
    /auth
      /[...nextauth]      # NextAuth route
      /register           # Registratie endpoint
    /projects             # Project CRUD endpoints
    /admin                # Admin endpoints
    /uploadthing          # File upload routes
  /auth
    /inloggen            # Login pagina
    /registreren         # Registratie pagina
  /dashboard             # Gebruiker dashboard
    /nieuw-project       # Project aanmaak pagina
  /admin                 # Admin dashboard
/components
  Logo.tsx               # Modual logo component
  Navbar.tsx             # Navigatie balk
  Footer.tsx             # Footer
  ProjectForm.tsx        # Project inzending formulier
/lib
  prisma.ts              # Prisma client
  auth.ts                # NextAuth configuratie
  notifications.ts       # Email/WhatsApp notificaties
/prisma
  schema.prisma          # Database schema
/public
  logo.png               # Modual logo
```

## 🎨 Design & Branding

Het Modual logo wordt gebruikt in:
- Header/navigatiebalk
- Login/registreer pagina's
- Gebruiker dashboard

**Kleurenpalet:**
- Pink: `#E94B8A`
- Purple: `#A855F7`
- Blue: `#6366F1`
- Gradient: `linear-gradient(to right, #E94B8A, #A855F7, #6366F1)`

Alle interface tekst is in het Nederlands.

## 👤 Gebruikersrollen

- **User (standaard):** Kan projecten aanmaken en eigen projecten bekijken
- **Admin:** Heeft toegang tot admin dashboard en kan alle projecten beheren

### Admin Gebruiker Aanmaken

In Prisma Studio of via SQL:

```sql
UPDATE "User" SET role = 'admin' WHERE email = 'jouw@email.nl';
```

## 🔐 OAuth Setup

### Google OAuth:
1. Ga naar [Google Cloud Console](https://console.cloud.google.com)
2. Maak een nieuw project of selecteer bestaand project
3. Enable Google+ API
4. Maak OAuth 2.0 credentials
5. Voeg authorized redirect URI toe: `http://localhost:3000/api/auth/callback/google`

### Facebook OAuth:
1. Ga naar [Facebook Developers](https://developers.facebook.com)
2. Maak een nieuwe app
3. Voeg Facebook Login product toe
4. Configureer redirect URI: `http://localhost:3000/api/auth/callback/facebook`

## 📧 Email Configuratie

Voor Gmail:
1. Enable 2-factor authentication
2. Genereer een App Password
3. Gebruik in EMAIL_PASSWORD

Voor andere SMTP providers, pas de EMAIL_SERVER aan.

## 📤 UploadThing Setup

1. Ga naar [UploadThing](https://uploadthing.com)
2. Maak een account en app
3. Kopieer je API keys naar .env

## 🧪 Development

```bash
# Start dev server
npm run dev

# Build voor productie
npm run build

# Start productie server
npm start

# Lint code
npm run lint

# Prisma Studio
npx prisma studio
```

## 🚀 Deployment

### Database:
- [Vercel Postgres](https://vercel.com/storage/postgres)
- [Supabase](https://supabase.com)
- [Railway](https://railway.app)

### Hosting:
- [Vercel](https://vercel.com) (aanbevolen voor Next.js)
- [Netlify](https://netlify.com)

Vergeet niet om alle environment variabelen te configureren in je hosting platform!

## 📝 Nederlandse UI Tekst

Alle interface elementen zijn in het Nederlands:
- "Inloggen" / "Registreren"
- "Mijn Projecten"
- "Start een nieuw project"
- "Upload je foto's of logo's"
- "Beschrijf je wensen"
- "Neem een spraakmemo op"
- "Verzenden"
- "AI Ontwerppreview"
- "Beheerdersdashboard"

## 🤝 Contributing

Dit is een custom project voor Modual. Voor vragen of aanpassingen, neem contact op met het development team.

## 📄 Licentie

© 2024 Modual. Alle rechten voorbehouden.

