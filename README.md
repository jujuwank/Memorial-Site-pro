# Version professionnelle — site de veillée de recueillement

Cette version contient :
- animation de chargement
- bougie animée
- photo dans un cercle doré
- compte à rebours
- menu sticky moderne
- mode clair / sombre
- programme en timeline
- cantiques avec recherche
- galerie photo
- bloc hommage
- bouton WhatsApp
- diffusion YouTube
- design responsive téléphone

## À modifier rapidement

### Dans index.html
Remplace :
- `Maman Prénom NOM`
- `1950 — 2026`
- `Famille NOM`
- les numéros de téléphone
- le lien Google Form
- le lien Google Maps
- le lien WhatsApp
- `VIDEO_ID`

### Dans script.js
Remplace :
```js
const eventDate = new Date("2026-07-15T17:00:00");
```
par la vraie date et heure de la veillée.

Remplace aussi les cantiques d'exemple par tes vrais cantiques.

### Dans assets
Remplace :
- `photo-defunte.png`
- `fond-veillee.jpg`

## Utilisation avec Google Sites

Google Sites ne permet pas toujours d'héberger directement un site HTML complet comme un serveur classique.

Le plus simple :
1. Créer les pages dans Google Sites.
2. Copier le contenu visuel principal.
3. Intégrer les blocs HTML via **Insérer > Intégrer > Code intégré**.
4. Pour avoir tout le site tel quel, publier le dossier sur GitHub Pages, Netlify ou Apps Script Web App, puis intégrer le lien dans Google Sites.

## Conseil
Si tu veux un rendu vraiment “application”, héberge cette version comme mini-site, puis mets le lien ou le QR code dans Google Sites.
