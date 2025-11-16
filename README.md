# Modual - Dutch Website Builder Platform

Modual is een moderne, gebruiksvriendelijke Nederlandse website builder die gebruikers helpt om eenvoudig hun eigen professionele websites te creëren met behulp van AI-technologie.

## Features

- **Gebruikersauthenticatie**: Veilig registratie- en loginsysteem
- **Dashboard**: Overzichtelijk dashboard voor projectbeheer
- **Bestandsupload**: Upload foto's, logo's en andere bestanden
- **Spraakopname**: Neem spraakberichten op of upload audiobestanden
- **AI Website Generatie**: Automatische website generatie op basis van gebruikersinput
- **Responsive Design**: Volledig responsive interface die werkt op alle apparaten
- **Nederlandse Interface**: Alle tekst en labels in het Nederlands

## Tech Stack

- **Framework**: Next.js 14 (React)
- **Styling**: Tailwind CSS
- **Authenticatie**: JWT met bcrypt
- **AI Integratie**: OpenAI API
- **TypeScript**: Voor type veiligheid

## Installatie

1. Clone de repository:
```bash
git clone <repository-url>
cd modual
```

2. Installeer dependencies:
```bash
npm install
```

3. Maak een `.env.local` bestand aan met de volgende variabelen:
```
JWT_SECRET=your-secret-key-change-this
OPENAI_API_KEY=your-openai-api-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. Start de development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in je browser.

## Project Structuur

```
modual/
├── app/                      # Next.js app directory
│   ├── api/                 # API routes
│   │   ├── auth/           # Authenticatie endpoints
│   │   └── projects/       # Project management endpoints
│   ├── dashboard/          # Dashboard pagina
│   ├── login/              # Login pagina
│   ├── register/           # Registratie pagina
│   └── project/[id]/       # Project details pagina
├── components/              # Herbruikbare componenten
│   └── VoiceRecorder.tsx   # Voice recording component
├── lib/                     # Utility libraries
│   ├── auth.ts             # Authenticatie functies
│   └── projects.ts         # Project management functies
└── public/                  # Statische bestanden
    ├── logo.png            # Modual logo
    └── uploads/            # Geüploade bestanden
```

## Gebruik

1. **Registreer een account**: Start door een gratis account aan te maken
2. **Maak een project**: Klik op "Nieuw Project" in je dashboard
3. **Upload materiaal**: Upload foto's, logo's en andere bestanden
4. **Voeg spraak toe**: Neem een spraakbericht op of upload een audiobestand
5. **Genereer website**: Klik op "Genereer mijn website" en laat de AI zijn werk doen
6. **Download**: Download je gegenereerde website als HTML bestand

## Notities

- **Data Opslag**: In de huidige versie wordt data in-memory opgeslagen. Voor productie gebruik, vervang dit met een database (bijv. PostgreSQL, MongoDB).
- **Bestandsopslag**: Bestanden worden lokaal opgeslagen in `public/uploads/`. Voor productie, gebruik een cloud storage oplossing (bijv. AWS S3, Cloudflare R2).
- **AI Generatie**: Voor de beste resultaten, configureer een OpenAI API key. Het systeem heeft een fallback template voor wanneer de API niet beschikbaar is.

## Productie Deployment

Voor productie deployment:

1. Configureer een productie database
2. Stel cloud storage in voor bestandsupload
3. Voeg een OpenAI API key toe
4. Gebruik sterke JWT secrets
5. Configureer HTTPS
6. Optimaliseer build met `npm run build`

## Licentie

© 2025 Modual. Alle rechten voorbehouden.



