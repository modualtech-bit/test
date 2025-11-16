# Modual - Gebruikers Workflow

## 🎯 Hoe Modual Werkt

### Voor Bezoekers (Niet Ingelogd)

```
┌─────────────────────────────────────────┐
│        Landing Page (/)                 │
│  - Hero sectie met uitleg               │
│  - Features overzicht                   │
│  - "Hoe werkt het" sectie               │
│  - Call-to-action knoppen               │
└────────────┬────────────────────────────┘
             │
             ├──► "Gratis beginnen" → /register
             │
             └──► "Inloggen" → /login
```

### Registratie Flow

```
┌─────────────────────────────────────────┐
│     Registratie Pagina (/register)      │
│  1. Volledige naam                      │
│  2. E-mailadres                         │
│  3. Wachtwoord (min 6 karakters)        │
│  4. "Account aanmaken" knop             │
└────────────┬────────────────────────────┘
             │
             ▼
      [API: POST /api/auth/register]
             │
             ├─ Success ──► Automatisch ingelogd
             │              Cookie gezet
             │              Redirect naar /dashboard
             │
             └─ Error ──► Foutmelding tonen
                          - Email al in gebruik
                          - Velden niet ingevuld
```

### Login Flow

```
┌─────────────────────────────────────────┐
│       Login Pagina (/login)             │
│  1. E-mailadres                         │
│  2. Wachtwoord                          │
│  3. "Inloggen" knop                     │
└────────────┬────────────────────────────┘
             │
             ▼
      [API: POST /api/auth/login]
             │
             ├─ Success ──► Cookie gezet
             │              Redirect naar /dashboard
             │
             └─ Error ──► Foutmelding tonen
                          - Ongeldige gegevens
```

### Dashboard Overview

```
┌────────────────────────────────────────────┐
│        Dashboard (/dashboard)              │
│                                            │
│  Header: [Logo] [Hallo, Naam] [Uitloggen] │
│                                            │
│  ┌──────────────────────────────────────┐ │
│  │   Mijn Projecten                     │ │
│  │   [+ Nieuw Project]                  │ │
│  └──────────────────────────────────────┘ │
│                                            │
│  Projecten Grid:                           │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐│
│  │Project 1 │  │Project 2 │  │Project 3 ││
│  │[Concept] │  │[Voltooid]│  │[Concept] ││
│  │📅 Datum  │  │📅 Datum  │  │📅 Datum  ││
│  └──────────┘  └──────────┘  └──────────┘│
│                                            │
└────────────────────────────────────────────┘
        │                    │
        │                    └──► Klik project ──► /project/[id]
        │
        └──► Klik "Nieuw Project"
                    │
                    ▼
            ┌───────────────────┐
            │   Modal Popup     │
            │ - Projectnaam     │
            │ - Beschrijving    │
            │ [Aanmaken]        │
            └─────┬─────────────┘
                  │
                  ▼
        [API: POST /api/projects]
                  │
                  └──► Redirect naar /project/[id]
```

### Project Detail & Website Creatie Flow

```
┌────────────────────────────────────────────────────────┐
│           Project Detail (/project/[id])               │
│                                                        │
│  Header: [Logo] [← Terug naar dashboard]              │
│                                                        │
│  ┌──────────────────────────────────────────────────┐ │
│  │  Project Naam                                    │ │
│  │  Beschrijving                                    │ │
│  │  Status: [Concept/Verwerken/Voltooid]           │ │
│  └──────────────────────────────────────────────────┘ │
│                                                        │
│  ┌──────────────────────────────────────────────────┐ │
│  │  📸 Upload je materiaal                          │ │
│  │                                                  │ │
│  │  Foto's & Logo's:                                │ │
│  │  ┌────────────────────────────────────────────┐ │ │
│  │  │  [📁 Drag & Drop of Klik om te uploaden]  │ │ │
│  │  └────────────────────────────────────────────┘ │ │
│  │                                                  │ │
│  │  Geüploade bestanden:                            │ │
│  │  [🖼️ foto1.jpg] [🖼️ logo.png] [🖼️ foto2.jpg]    │ │
│  │                                                  │ │
│  └──────────────────────────────────────────────────┘ │
│                                                        │
│  ┌──────────────────────────────────────────────────┐ │
│  │  🎤 Spraakbericht                                │ │
│  │                                                  │ │
│  │  [🔴 Start opname]  of                          │ │
│  │  [📁 Upload audiobestand]                       │ │
│  │                                                  │ │
│  │  Audio bestanden:                                │ │
│  │  🎵 voice-memo.webm [▶️ Audio player]           │ │
│  └──────────────────────────────────────────────────┘ │
│                                                        │
│  ┌──────────────────────────────────────────────────┐ │
│  │     [✨ Genereer mijn website]                   │ │
│  └──────────────────────────────────────────────────┘ │
│                                                        │
│  (Na generatie verschijnt:)                            │
│  ┌──────────────────────────────────────────────────┐ │
│  │  🌐 Je gegenereerde website                      │ │
│  │                                                  │ │
│  │  [Toon/Verberg preview]                          │ │
│  │                                                  │ │
│  │  ┌────────────────────────────────────────────┐ │ │
│  │  │                                            │ │ │
│  │  │    [Website Preview in iframe]             │ │ │
│  │  │                                            │ │ │
│  │  └────────────────────────────────────────────┘ │ │
│  │                                                  │ │
│  │  [💾 Download HTML]  [🔄 Opnieuw genereren]    │ │
│  └──────────────────────────────────────────────────┘ │
│                                                        │
└────────────────────────────────────────────────────────┘
```

### Upload Flow (Detail)

```
1. Gebruiker selecteert bestand(en)
        ↓
2. Frontend toont loading state
        ↓
3. FormData met bestand naar API
        ↓
4. [API: POST /api/projects/[id]/upload]
        ↓
5. Bestand opslaan in /public/uploads/[id]/
        ↓
6. File metadata toevoegen aan project
        ↓
7. Response met file info naar frontend
        ↓
8. Frontend toont thumbnail/preview
        ↓
9. Project data refreshen
```

### Voice Recording Flow (Detail)

```
Opname:
1. Gebruiker klikt "Start opname"
        ↓
2. Browser vraagt microfoon toegang
        ↓
3. MediaRecorder start opname
        ↓
4. Timer toont opnameduur (0:00, 0:01, ...)
        ↓
5. Gebruiker klikt "Stop opname"
        ↓
6. Audio blob wordt gecreëerd
        ↓
7. Upload naar API als voice-memo.webm
        ↓
8. Audio player verschijnt in project

Upload:
1. Gebruiker klikt "Upload audiobestand"
        ↓
2. File picker opent
        ↓
3. Gebruiker selecteert audio bestand
        ↓
4. Direct upload naar API
        ↓
5. Audio player verschijnt in project
```

### AI Website Generatie Flow

```
1. Gebruiker klikt "Genereer mijn website"
        ↓
2. Frontend: disabled button, loading state
        ↓
3. [API: POST /api/projects/[id]/generate]
        ↓
4. Project status → "processing"
        ↓
5. AI Prompt wordt gebouwd:
   - Project naam
   - Beschrijving
   - Aantal bestanden
   - Bestandstypen
        ↓
6. OpenAI API call (GPT-4)
   │
   ├─ Success ──► HTML code ontvangen
   │              Project status → "completed"
   │              HTML opslaan in project
   │
   └─ Error ────► Fallback template gebruiken
                  Project status → "completed"
                  Basis HTML genereren
        ↓
7. Response naar frontend
        ↓
8. Frontend toont preview sectie
        ↓
9. Gebruiker kan:
   - Preview bekijken (iframe)
   - HTML downloaden
   - Opnieuw genereren
```

### Download Flow

```
1. Gebruiker klikt "Download HTML"
        ↓
2. JavaScript Blob van HTML string
        ↓
3. Blob URL creëren
        ↓
4. Invisible <a> element maken
        ↓
5. Trigger download met bestandsnaam:
   [projectnaam].html
        ↓
6. Gebruiker krijgt HTML bestand
```

## 🔒 Beveiliging & Validatie

### Route Protection

```
Publieke Routes:
- / (landing)
- /login
- /register

Beschermde Routes (require auth):
- /dashboard
- /project/[id]

API Routes:
- /api/auth/* (geen auth nodig)
- /api/projects/* (auth vereist)
```

### Validatie Checks

```
Registratie:
✓ Alle velden ingevuld
✓ Email format correct
✓ Wachtwoord minimaal 6 karakters
✓ Email niet al in gebruik

Login:
✓ Email & wachtwoord ingevuld
✓ Credentials correct
✓ User bestaat

Project Aanmaken:
✓ Naam & beschrijving ingevuld
✓ Gebruiker ingelogd

File Upload:
✓ Bestand geselecteerd
✓ Gebruiker heeft toegang tot project

Website Generatie:
✓ Minimaal 1 bestand geüpload
✓ Gebruiker heeft toegang tot project
```

## 📊 Data Flow

```
┌──────────────┐
│   Browser    │
└──────┬───────┘
       │
       ├─ Fetch API calls
       │
       ▼
┌──────────────────────────────────┐
│      Next.js API Routes          │
│  /app/api/**/*.ts                │
└──────┬───────────────────────────┘
       │
       ├─ Auth functions (lib/auth.ts)
       ├─ Project functions (lib/projects.ts)
       │
       ▼
┌──────────────────────────────────┐
│      In-Memory Storage           │
│  - users: User[]                 │
│  - projects: Project[]           │
└──────────────────────────────────┘
       +
┌──────────────────────────────────┐
│      File System                 │
│  /public/uploads/[id]/           │
└──────────────────────────────────┘
```

## 🎨 User Experience Highlights

### Feedback & Loading States

```
- Knop disabled tijdens submit
- Loading spinners tijdens verwerking
- Success berichten na acties
- Error berichten bij problemen
- Smooth transitions tussen states
```

### Responsive Gedrag

```
Desktop (>768px):
- 3-column project grid
- Sidebar navigatie mogelijk
- Grotere preview iframe

Tablet (768px):
- 2-column project grid
- Compacte navigatie

Mobile (<768px):
- 1-column layout
- Stack menu items
- Touch-friendly buttons
```

## 🚀 Performance Features

- Next.js Server Components waar mogelijk
- Image optimization (Next.js Image)
- CSS-in-JS met Tailwind (geen runtime overhead)
- Code splitting automatisch
- Fast Refresh tijdens development

---

**Dit workflow document helpt je begrijpen hoe alle onderdelen van Modual samenwerken!**



