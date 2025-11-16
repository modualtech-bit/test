# Modual Setup Instructies

Welkom bij Modual! Volg deze stappen om je website builder platform op te zetten.

## 1. Logo Vervangen

Het project bevat momenteel een tijdelijke SVG logo. Om je eigen Modual logo te gebruiken:

1. Plaats je logo bestand in de `public` map
2. Hernoem het naar `logo.svg` of `logo.png`
3. Als je een PNG gebruikt, update de referenties in:
   - `app/page.tsx`
   - `app/login/page.tsx`
   - `app/register/page.tsx`
   - `app/dashboard/page.tsx`
   - `app/project/[id]/page.tsx`

## 2. Omgevingsvariabelen

Maak een `.env.local` bestand aan in de root van het project met de volgende inhoud:

```env
# JWT Secret - Gebruik een sterke random string
JWT_SECRET=verander-dit-naar-een-sterke-random-string

# OpenAI API Key (optioneel maar aanbevolen)
# Verkrijg een API key op: https://platform.openai.com/api-keys
OPENAI_API_KEY=sk-your-api-key-here

# Applicatie URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### JWT Secret Genereren

Je kunt een sterke JWT secret genereren met:

**Op Windows (PowerShell):**
```powershell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | % {[char]$_})
```

**Op Linux/Mac:**
```bash
openssl rand -base64 32
```

## 3. Dependencies Installeren

```bash
npm install
```

Dit installeert alle benodigde packages:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- bcryptjs (wachtwoord hashing)
- jsonwebtoken (authenticatie)
- OpenAI SDK (AI website generatie)

## 4. Development Server Starten

```bash
npm run dev
```

De applicatie is nu beschikbaar op [http://localhost:3000](http://localhost:3000)

## 5. Eerste Gebruik

1. **Registreer een account**: Ga naar [http://localhost:3000/register](http://localhost:3000/register)
2. **Maak een project**: Klik op "Nieuw Project" in je dashboard
3. **Upload bestanden**: Voeg foto's, logo's toe aan je project
4. **Voeg spraak toe**: Neem een voice memo op of upload een audiobestand
5. **Genereer website**: Klik op "Genereer mijn website"
6. **Download**: Download je gegenereerde website

## 6. Troubleshooting

### Logo wordt niet weergegeven
- Controleer of het logo bestand in `public/` staat
- Ververs de pagina met Ctrl+F5 (hard refresh)
- Controleer de browser console voor errors

### OpenAI API errors
- Controleer of je API key correct is ingevuld
- Zorg dat je API key actief is en credits heeft
- Het systeem gebruikt een fallback template als de API niet werkt

### Upload errors
- Controleer of de `public/uploads/` map schrijfrechten heeft
- Voor grote bestanden, verhoog de Next.js body size limit

### Authenticatie problemen
- Controleer of JWT_SECRET is ingesteld in `.env.local`
- Clear je browser cookies en probeer opnieuw

## 7. Productie Deployment

Voor productie gebruik:

### Database Setup
Het project gebruikt momenteel in-memory opslag. Voor productie:

1. Installeer een database (PostgreSQL aanbevolen)
2. Vervang de in-memory arrays in `lib/auth.ts` en `lib/projects.ts`
3. Gebruik een ORM zoals Prisma of DrizzleORM

### Cloud Storage
Voor bestandsopslag in productie:

1. Configureer AWS S3, Cloudflare R2, of vergelijkbaar
2. Update de upload route in `app/api/projects/[id]/upload/route.ts`

### Environment Variables
Zet in productie omgeving:
- Sterke JWT_SECRET
- Productie database URL
- Cloud storage credentials
- NEXT_PUBLIC_APP_URL naar je productie domein

### Build en Deploy
```bash
npm run build
npm start
```

Of deploy naar:
- Vercel (aanbevolen voor Next.js)
- Netlify
- AWS
- DigitalOcean

## 8. Aanpassingen

### Kleuren Aanpassen
Wijzig de kleuren in `tailwind.config.js`:
```javascript
colors: {
  primary: { /* jouw primaire kleuren */ },
  secondary: { /* jouw secundaire kleuren */ },
}
```

### Nederlandse Teksten Wijzigen
Alle teksten staan direct in de componenten en kunnen eenvoudig aangepast worden.

### AI Prompts Verbeteren
De AI prompt voor website generatie staat in:
`app/api/projects/[id]/generate/route.ts`

## Support

Voor vragen of problemen:
- Check de documentatie in README.md
- Controleer de browser console voor error messages
- Verifieer dat alle dependencies correct geïnstalleerd zijn

Veel succes met Modual! 🚀



