# Modual - Testing Guide

## 🧪 Hoe Test Je Modual

Deze gids helpt je om alle functionaliteit van Modual te testen.

## Voordat Je Start

1. Zorg dat de development server draait:
```bash
npm run dev
```

2. Open http://localhost:3000 in je browser

3. Open de browser Developer Tools (F12) om console logs te zien

---

## Test 1: Landing Page ✓

**Doel:** Verifieer dat de landing page correct laadt

### Stappen:
1. Ga naar `http://localhost:3000`
2. Controleer dat je ziet:
   - ✓ Modual logo in header
   - ✓ "Bouw je droomwebsite" hero tekst
   - ✓ "Gratis beginnen" en "Bekijk functies" knoppen
   - ✓ 3 feature cards (Upload, Spraak, AI)
   - ✓ "Hoe werkt het" sectie met 4 stappen
   - ✓ Footer met copyright

### Verwacht Resultaat:
- Alle elementen zijn zichtbaar
- Knoppen zijn klikbaar
- Hover effecten werken
- Layout is responsive

---

## Test 2: Registratie Systeem ✓

**Doel:** Test het aanmaken van een nieuw account

### Stappen:
1. Klik op "Gratis beginnen" of "Registreer hier"
2. Vul in:
   - Naam: `Test Gebruiker`
   - Email: `test@example.com`
   - Wachtwoord: `test123`
3. Klik "Account aanmaken"

### Verwacht Resultaat:
- ✓ Redirect naar `/dashboard`
- ✓ Welkom bericht in dashboard
- ✓ "Hallo, Test Gebruiker" in header

### Test Fout Scenario's:
1. **Leeg formulier submissen**
   - Verwacht: Browser validatie "Vul dit veld in"

2. **Te kort wachtwoord** (< 6 karakters)
   - Wachtwoord: `test`
   - Verwacht: Error "Wachtwoord moet minimaal 6 karakters lang zijn"

3. **Dubbele email**
   - Registreer opnieuw met `test@example.com`
   - Verwacht: Error "Dit e-mailadres is al in gebruik"

---

## Test 3: Login Systeem ✓

**Doel:** Test het inloggen met bestaand account

### Stappen:
1. Log eerst uit (als je ingelogd bent)
2. Ga naar `/login`
3. Vul in:
   - Email: `test@example.com`
   - Wachtwoord: `test123`
4. Klik "Inloggen"

### Verwacht Resultaat:
- ✓ Redirect naar `/dashboard`
- ✓ Je projecten zijn zichtbaar

### Test Fout Scenario's:
1. **Verkeerd wachtwoord**
   - Email: `test@example.com`
   - Wachtwoord: `wrong`
   - Verwacht: Error "Ongeldige inloggegevens"

2. **Onbestaande gebruiker**
   - Email: `doesnotexist@example.com`
   - Wachtwoord: `anything`
   - Verwacht: Error "Ongeldige inloggegevens"

---

## Test 4: Dashboard & Project Aanmaken ✓

**Doel:** Test project management functionaliteit

### Stappen:
1. Zorg dat je ingelogd bent
2. Je moet nu in `/dashboard` zijn
3. Klik "Nieuw Project" knop
4. Vul in modal:
   - Projectnaam: `Mijn Test Website`
   - Beschrijving: `Dit is een test project voor mijn nieuwe website`
5. Klik "Project aanmaken"

### Verwacht Resultaat:
- ✓ Redirect naar `/project/[id]`
- ✓ Project details zichtbaar
- ✓ Status is "Concept"

### Test Dashboard Features:
1. **Terug naar dashboard**
   - Klik "Terug naar dashboard" of logo
   - Verwacht: Project verschijnt in de grid

2. **Meerdere projecten**
   - Maak nog 2-3 projecten aan
   - Verwacht: Alle projecten in grid layout

---

## Test 5: Bestand Upload ✓

**Doel:** Test foto en logo upload functionaliteit

### Stappen:
1. Open een project detail pagina
2. Zoek "Upload je materiaal" sectie
3. Klik in de upload area of sleep een bestand
4. Selecteer 1-3 afbeeldingen (jpg, png)

### Verwacht Resultaat:
- ✓ Loading state tijdens upload
- ✓ Thumbnails verschijnen na upload
- ✓ Hover over thumbnail toont bestandsnaam

### Test Scenario's:
1. **Enkele upload**
   - Upload 1 foto
   - Verwacht: 1 thumbnail zichtbaar

2. **Meerdere bestanden**
   - Upload 3 foto's tegelijk
   - Verwacht: 3 thumbnails zichtbaar

3. **Verschillende formaten**
   - Upload .jpg, .png, .gif
   - Verwacht: Alle tonen correct

---

## Test 6: Voice Recording ✓

**Doel:** Test spraakopname functionaliteit

### Stappen:

#### Opname Testen:
1. Scroll naar "Spraakbericht" sectie
2. Klik "Start opname"
3. Geef microfoon toegang als gevraagd
4. Spreek een kort bericht (5-10 seconden)
5. Klik "Stop opname"

### Verwacht Resultaat:
- ✓ Browser vraagt microfoon toegang
- ✓ Timer toont opnameduur (0:00, 0:01, ...)
- ✓ Rode opname indicator zichtbaar
- ✓ Na stop: audio player verschijnt
- ✓ Audio is afspeelbaar

#### Audio Upload Testen:
1. Klik "Upload een audiobestand"
2. Selecteer een audio bestand
3. Upload

### Verwacht Resultaat:
- ✓ Audio player verschijnt
- ✓ Bestand is afspeelbaar

---

## Test 7: Website Generatie (Zonder OpenAI) ✓

**Doel:** Test fallback website generatie

### Voorwaarde:
- GEEN OpenAI API key in `.env.local`

### Stappen:
1. Zorg dat je minimaal 1 foto geüpload hebt
2. Klik "Genereer mijn website" knop
3. Wacht enkele seconden

### Verwacht Resultaat:
- ✓ Button toont "Website wordt gegenereerd..."
- ✓ Loading spinner zichtbaar
- ✓ Status wijzigt naar "Voltooid"
- ✓ Preview sectie verschijnt
- ✓ Website preview in iframe zichtbaar
- ✓ Fallback template wordt gebruikt met:
  - Project naam in header
  - Project beschrijving
  - Geüploade foto's in galerij

---

## Test 8: Website Generatie (Met OpenAI) ⚠️

**Doel:** Test AI-gegenereerde websites

### Voorwaarde:
- OpenAI API key in `.env.local`

### Stappen:
1. Configureer `.env.local`:
```env
OPENAI_API_KEY=sk-your-real-api-key
```
2. Herstart de dev server
3. Upload foto's en/of spraakbericht
4. Klik "Genereer mijn website"

### Verwacht Resultaat:
- ✓ AI genereert custom HTML
- ✓ Website gebruikt project informatie
- ✓ Moderne styling en layout
- ✓ Nederlandse tekst

**Note:** Dit kost OpenAI credits!

---

## Test 9: Website Preview & Download ✓

**Doel:** Test preview en download functionaliteit

### Stappen:
1. Genereer een website (zie Test 7/8)
2. Klik "Toon preview" (als verborgen)
3. Bekijk de website in iframe
4. Klik "Download HTML"

### Verwacht Resultaat:
- ✓ Preview iframe toont volledige website
- ✓ Website is interactive in preview
- ✓ Download start automatisch
- ✓ Bestandsnaam is `[projectnaam].html`
- ✓ Gedownload bestand is geldig HTML
- ✓ HTML kan geopend worden in browser

### Extra Test:
1. Klik "Opnieuw genereren"
   - Verwacht: Nieuwe website wordt gegenereerd
   - Oude wordt overschreven

---

## Test 10: Responsive Design ✓

**Doel:** Test responsive gedrag

### Stappen:
1. Open Chrome DevTools (F12)
2. Klik "Toggle device toolbar" (Ctrl+Shift+M)
3. Test verschillende schermformaten:

#### Desktop (1920x1080):
- ✓ 3-column project grid
- ✓ Volledige navigatie
- ✓ Grote preview iframe

#### Tablet (768x1024):
- ✓ 2-column project grid
- ✓ Compacte layout
- ✓ Alle functies beschikbaar

#### Mobile (375x667):
- ✓ 1-column layout
- ✓ Stack menu items
- ✓ Touch-friendly buttons
- ✓ Scrollbare inhoud

---

## Test 11: Beveiliging & Sessies ✓

**Doel:** Test authenticatie en toegangscontrole

### Stappen:

#### Test 1: Protected Routes
1. Log uit
2. Probeer direct naar `/dashboard` te gaan
   - Verwacht: Redirect naar `/login`

3. Probeer direct naar `/project/123` te gaan
   - Verwacht: Redirect naar `/login`

#### Test 2: Session Persistence
1. Log in
2. Refresh de pagina (F5)
   - Verwacht: Nog steeds ingelogd

3. Sluit en heropen browser
   - Verwacht: Nog steeds ingelogd (cookie geldig voor 7 dagen)

#### Test 3: Logout
1. Klik "Uitloggen"
   - Verwacht: Redirect naar home
   - Cookie verwijderd
   - Niet meer toegang tot dashboard

---

## Test 12: Error Handling ✓

**Doel:** Test foutafhandeling

### Scenario's:

1. **Genereer zonder bestanden**
   - Klik "Genereer mijn website" zonder uploads
   - Verwacht: Button is disabled

2. **Ongeldig project ID**
   - Ga naar `/project/invalid-id`
   - Verwacht: Redirect naar dashboard

3. **Upload tijdens uploaden**
   - Upload een bestand
   - Probeer direct nog een te uploaden
   - Verwacht: Eerste upload moet eerst voltooien

---

## Test 13: UI/UX Details ✓

**Doel:** Test gebruikerservaring details

### Checklist:

- ✓ **Loading States**: Buttons tonen loading tijdens acties
- ✓ **Hover Effects**: Smooth hover animaties op cards en buttons
- ✓ **Transitions**: Smooth page transitions
- ✓ **Form Validation**: Browser native validation werkt
- ✓ **Error Messages**: Duidelijke Nederlandse foutmeldingen
- ✓ **Success Feedback**: Bevestigingen na succesvolle acties
- ✓ **Gradients**: Mooie gradient kleuren (pink-blue)
- ✓ **Typography**: Leesbare font sizes en line heights
- ✓ **Spacing**: Consistent padding en margins

---

## Test 14: Performance ✓

**Doel:** Test performance aspecten

### Checks:

1. **Page Load**
   - Open Network tab in DevTools
   - Refresh home page
   - Verwacht: < 3 seconden laden

2. **Image Loading**
   - Upload 5+ afbeeldingen
   - Verwacht: Lazy loading, smooth rendering

3. **Navigation**
   - Navigeer tussen pagina's
   - Verwacht: Instant transitions (Next.js routing)

---

## Common Issues & Oplossingen

### 1. Logo Wordt Niet Weergegeven
**Probleem:** `/logo.svg` not found

**Oplossing:**
- Controleer of `public/logo.svg` bestaat
- Hard refresh browser (Ctrl+F5)

### 2. Upload Werkt Niet
**Probleem:** Bestanden kunnen niet geüpload worden

**Oplossing:**
- Controleer console voor errors
- Verifieer dat `public/uploads/` schrijfbaar is

### 3. Voice Recording Werkt Niet
**Probleem:** "Kon niet starten met opnemen"

**Oplossing:**
- Geef browser microfoon toegang
- Gebruik HTTPS of localhost (required for getUserMedia)
- Test in Chrome/Edge (beste support)

### 4. AI Generatie Faalt
**Probleem:** "Er is een fout opgetreden bij het genereren"

**Oplossing:**
- Check OpenAI API key in `.env.local`
- Verifieer dat API key credits heeft
- Fallback template zou alsnog moeten werken

### 5. Session Verlopen
**Probleem:** Moet telkens opnieuw inloggen

**Oplossing:**
- Check browser cookies (niet disabled)
- Verifieer JWT_SECRET in `.env.local`

---

## ✅ Test Checklist

Vink af wat je getest hebt:

### Basis Functionaliteit
- [ ] Landing page laadt
- [ ] Registratie werkt
- [ ] Login werkt
- [ ] Dashboard toont projecten
- [ ] Project aanmaken werkt
- [ ] Logout werkt

### Upload & Media
- [ ] Foto upload werkt
- [ ] Meerdere uploads tegelijk
- [ ] Voice recording werkt
- [ ] Audio upload werkt
- [ ] Thumbnails tonen correct

### Website Generatie
- [ ] Generatie met fallback template
- [ ] Generatie met OpenAI (als API key beschikbaar)
- [ ] Preview iframe werkt
- [ ] HTML download werkt
- [ ] Opnieuw genereren werkt

### Security & Sessions
- [ ] Protected routes werken
- [ ] Session persisteert
- [ ] Logout wist sessie
- [ ] Geen toegang tot andermans projecten

### UI/UX
- [ ] Responsive design werkt
- [ ] Hover effects werken
- [ ] Loading states tonen
- [ ] Error messages zijn duidelijk
- [ ] Nederlandse tekst overal

---

## 🎉 Test Voltooid!

Als alle tests slagen, is Modual klaar voor gebruik!

**Next Steps:**
1. Vervang logo met je eigen branding
2. Configureer OpenAI voor productie
3. Voeg database toe voor permanente opslag
4. Deploy naar productie platform

**Happy Testing!** 🚀



