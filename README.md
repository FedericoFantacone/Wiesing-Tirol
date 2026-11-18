# Gemeinde Wiesing – Website (Redesign)

Statische, abhängigkeitsfreie Website der Gemeinde Wiesing (Tirol): redaktionelle
Typografie, authentische Fotografien, zwei Videohintergründe und barrierefreie
Bedienung. Die fertige Website liegt vollständig in `web/` und wird ohne Build-Schritt
ausgeliefert.

## Struktur

- `web/` – die fertige statische Website (ausliefern!). Reines HTML/CSS/JS, keine
  Frameworks, keine Tracking- oder Cookie-Requests.
  - `assets/css/style.css` – Styles, Layout, Kontrast- und Textgrößen-Modi.
  - `assets/js/main.js` – Suche, Dialoge, mobiles Menü, A11y-Einstellungen
    (`localStorage`), Formularvalidierung, Reveal-Animationen.
  - `assets/js/search-index.js` – clientseitiger Suchindex (`window.WIESING_SEARCH`).
  - `assets/video/ort.mp4`, `assets/video/sec2.mp4` – die beiden Videohintergründe
    der Startseite (autoplay, muted, loop, playsinline).
  - `assets/img/`, `assets/fonts/` – lokal gehostete Bilder (WebP/AVIF/JPEG) und
    6 WOFF2-Schriften (Fraunces, Source Sans 3).
  - `index.html`, `en/index.html`, `es/index.html` – Startseiten DE/EN/ES.
  - `sitemap.xml`, `robots.txt`, `search-index.json`, `404.html`.
- `_build/serve.mjs` – minimaler lokaler Static-Server (siehe unten).
- `_audit/` – Rohdaten und Dokumentation der Analyse des Originalauftritts:
  - `ENTREGA_1_RECAPITULACION_COMPLETA.md` – vollständige Recapitulación (148 URLs).
  - `DIGEST.md`, `DIGEST2.md`, `links.txt` – extrahierte Texte und Links.
  - `pages/` – 148 Originalseiten als Markdown (Quellen für Inhaltsprüfung).
  - `_content.json`, `seeds.json`, `zustaendigkeiten.json` – strukturierte Rohdaten.

Es gibt bewusst **keinen Build-Generator** mehr: die Seite wird direkt in `web/`
gepflegt. Die alten, unvollständigen Build-Skripte wurden entfernt, um Verwirrung
zu vermeiden.

## Lokal starten

Voraussetzung: Node.js ≥ 18 (keine npm-Installation nötig).

```sh
node _build/serve.mjs 4173     # http://localhost:4173/
```

Der Server liefert ausschließlich den Ordner `web/` aus.

## Deployment (Cloudflare Pages)

Die Website ist eine statische Seite im Ordner `web/` (kein Build-Schritt nötig).
Gehostet auf **Cloudflare Pages**.

1. Repository in Cloudflare Pages verbinden (Workers & Pages → Create → Pages → Connect to Git).
2. Build command: *(leer lassen)*
3. Build output directory: `web`
4. Das Projekt ist sofort unter `https://<projektname>.pages.dev` erreichbar.
5. (Optional, später) Eigene Domain `www.wiesing.gv.at` in Cloudflare Pages → Custom domains eintragen und DNS anpassen.
6. Security-/Cache-Header liegen in `web/_headers`.

Lokales Deploy mit Wrangler:

```sh
npx wrangler pages deploy web
```

Den Ordner `web/` kann weiterhin auch auf einen beliebigen Static-Host hochgeladen
werden (funktioniert auch per `file://`). Kanonische URLs zeigen auf
`https://www.wiesing.gv.at/`.

## Architektur & Qualität

- **Zero-Runtime-Dependencies**: reines HTML/CSS/JS ohne Framework und ohne
  externe Requests zur Laufzeit (DSGVO-freundlich).
- **Suche**: clientseitig über `search-index.js`; Umlaut-Normalisierung (z. B.
  „Mull" findet „Müll"), Live-Treffer und dedizierte Suchseite `/suche/`.
- **Barrierefreiheit**: semantisches HTML, Tastaturnavigation, sichtbarer Fokus,
  Kontrast- und Textgrößen-Panel mit Persistenz via `localStorage`.
- **Mehrsprachig**: Startseiten auf Deutsch, Englisch und Spanisch
  (`/`, `/en/`, `/es/`), inklusive vollständigem `hreflang`-Cluster
  (de/en/es/x-default). Innenseiten sind auf Deutsch; Sprachlinks führen auf
  die jeweilige Startseite.
- **Geprüft** (November 2026): 0 broken interne Links (7.568 geprüft), 0 fehlende
  Assets (555 Referenzen), 61 HTML-Dateien mit je genau 1 `<h1>` und eindeutigem
  `<title>`, Sitemap/Suchindex 60/60 gültig, 0 Konsolenfehler im Browser.

## Inhaltslücken (bewusst nicht erfunden)

- Einwohnerzahl: auf dem offiziellen Auftritt kein aktueller Stand → nicht genannt.
- Abweichende Parteiverkehrszeiten im alten Impressum (12:30–18:00) sind auf der
  Kontaktseite dokumentiert, aber nicht als gültig übernommen.
- Vereinsverzeichnis: nur die Bundesmusikkapelle Wiesing ist verifiziert; weitere
  Vereine wurden nicht erfunden.
- Das Formularverzeichnis umfasst 31 Einträge und entspricht dem offiziellen
  Verzeichnis inklusive help.gv.at-/service365-Verweisen.

## Bildnachweise

- Achensee-Panorama – © Stephan van Helden, CC BY-SA 4.0
- Achensee-Ufer – © Holger Uwe Schmitt, CC BY-SA 4.0
- Sonnhof & Felderer-Kapelle – © Falk2, CC BY-SA 4.0
- Pfarrkirche (Innen) – © Xeno odem, CC BY-SA 4.0
- Wankratbach – © Wasquewhat, CC BY-SA 4.0
- Luftbild & Wappen – © Gemeinde Wiesing
- Detailseite: `web/bildnachweis/index.html`
