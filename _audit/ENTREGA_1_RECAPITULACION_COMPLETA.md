# ENTREGA 1 — Recapitulación completa del sitio web de Wiesing (Tirol, Austria)

**Sitio auditado:** https://www.wiesing.gv.at/
**Fecha del rastreo:** 17 de noviembre de 2026
**Alcance de esta entrega:** inventario y recapitulación de TODO el contenido y las funcionalidades encontradas. No es todavía el informe de modernización (fases 3–11); es la base documental sobre la que se construirá ese informe.

---

## 0. Cómo leer este documento

- Todo lo marcado como **verificado** procede del rastreo directo del sitio (148 URLs descargadas) o de las cabeceras HTTP.
- Lo marcado como **no verificable** son enlaces o servicios externos que desde este entorno devolvieron error de red o DNS; no se concluye que estén rotos, solo que no se pudieron comprobar.
- Se conservan los términos oficiales en alemán (Bürgerservice, Amtstafel, Gemeindeamt, etc.) porque son nombres legales/administrativos y no deben traducirse en un rediseño.
- Cada bloque indica la URL de origen.

---

## 1. Resumen ejecutivo de la recapitulación

1. **Qué es:** portal oficial del municipio (Gemeinde) de **Wiesing**, en el distrito de Schwaz (Tirol), a orillas del lago Achensee. Es a la vez escaparate institucional, oficina de atención al ciudadano (Bürgerservice), tablón oficial de anuncios (Amtstafel), calendario de eventos, directorio económico/turístico y repositorio documental.
2. **Tamaño real:** se descubrieron **148 URLs**, de las que **147 respondieron correctamente** y **144 son páginas únicas** tras deduplicar. El resto son variantes de plantilla (`?design=…`) y URLs duplicadas generadas por el CMS.
3. **Tecnología:** CMS **RISCMS / RIS Kommunal** (Regionales Informations System), ASP.NET WebForms, plantilla `sommer__pt.css`. Front-end con **Bootstrap 5.2.0** conviviendo con **jQuery 1.7.2 y jQuery UI 1.8.17 (de 2012)**, Leaflet para el plano, Matomo para analítica y acoplamiento a la app **GEM2GO**.
4. **Estructura:** 13 áreas de navegación principal, 17 subpáginas de Bürgerservice, 6 bloques dentro de Gemeindeamt, 7 en Politik y 3 en Kirche und Religion. Debajo hay cientos de páginas de detalle (noticias, eventos, anuncios, formularios, tasas, empresas, alojamientos) creadas como “páginas sueltas” con sufijos numéricos (`_2`, `_16`, `_22`…).
5. **Contenido:** muy completo en lo administrativo (contactos, tasas, formularios, ordenanzas, presupuestos, cementerio, residuos, agua) y muy desigual en lo informativo: el directorio de **Vereine tiene una sola entrada**, “Zahlen und Fakten” solo da 3 datos, “Förderungen” solo lista 3 categorías sin contenido y “Informationsfreiheit” son dos párrafos.
6. **Estado:** hay **enlaces críticos muertos** (`www.wiesing.tirol.gv.at`, dominio histórico del municipio, enlazado desde la home y desde “Kontakt”), una página con **error 500** (`/Veranstaltungskalender/Meine_Veranstaltungen`), un formulario **caducado de 2022** publicado en `/Formular`, y la propia **declaración de accesibilidad admite incumplimientos de WCAG 2.1 AA** mientras la barra lateral muestra un sello **WCAG 1.0 A**.
7. **SEO/técnico:** sin HTML semántico (`div` en lugar de `header/nav/main/footer`), sin `<h1>` de página, meta description idéntica (“Wiesing”) en todas las URLs, 404 blandos por redirección 302, `Cache-Control: max-age=1`, ~1 MB de CSS+JS y PDFs de hasta 26 MB.
8. **Conclusión de fase:** el sitio *contiene* casi toda la información que un municipio debe publicar, pero está **desorganizada, duplicada, envejecida y sin gobierno de contenidos**. La modernización no es principalmente “escribir contenido nuevo”, sino **reestructurar, depurar, migrar y poner al día** lo existente.

---

## 2. Metodología y cobertura

### 2.1 Fuentes utilizadas

| Fuente | Resultado |
|---|---|
| `https://www.wiesing.gv.at/robots.txt` | `Sitemap: https://www.wiesing.gv.at/sitemap.xml`, `Crawl-delay: 20` |
| `sitemap.xml` + `sitemap_1.xml` | 59 URLs semilla |
| Rastreo propio (Node `fetch`) | 148 URLs descargadas |
| Extracción HTML→texto | 147 páginas, 4.432 líneas de digest, ~168.000 caracteres |
| Cabeceras HTTP / assets | Tamaños, caché, seguridad, librerías |
| Comprobación de enlaces | 818 enlaces únicos detectados (revisión parcial: el crawl completo excedió 300 s) |

### 2.2 Cifras del rastreo

- **148** URLs solicitadas.
- **147** con estado 200 y HTML válido.
- **1** fallo de red: `https://www.wiesing.gv.at/e-zustellung` (“fetch failed”).
- **144** URLs finales únicas tras deduplicar redirecciones.
- **1** error de servidor real: `https://www.wiesing.gv.at/Veranstaltungskalender/Meine_Veranstaltungen` → **HTTP 500** (“Runtime Error”).
- **20** URLs son variantes de plantilla o duplicados del mismo contenido (`?design=cssgraphicmode|csshighcontrast|cssnostyle`, `default.aspx?menuonr=…`, `/Buergerservice` = `/Buergerservice/Amtliche_Termine`, etc.).

### 2.3 Limitaciones declaradas

- No se ejecutó JavaScript en el rastreo: los contenidos inyectados por JS (mapa, widgets) se documentan por lo que expone el HTML.
- El servidor aplica **rate limiting** (HTTP 429 a peticiones paralelas); el rastreo se hizo secuencial y lento.
- `sessionnet.service365.at`, `formulare.service365.at` y `e-zustellung` no respondieron desde este entorno: **no verificables**, no “rotos”.
- `https://www.wiesing.tirol.gv.at/` → **DNS ENOTFOUND** (verificado): el dominio antiguo ya no resuelve.

---

## 3. Ficha institucional (datos verificados en el sitio)

| Campo | Dato | Fuente |
|---|---|---|
| Municipio | Gemeinde Wiesing | `/Gemeindeamt/Kontakt_und_Amtszeiten` |
| Dirección | Dorf 19, 6210 Wiesing, Tirol, Österreich | ídem |
| Teléfono | +43 5244 62623 | ídem |
| Fax | +43 5244 62623-18 | ídem |
| E-Mail | gemeinde@wiesing.gv.at | ídem |
| E-Mail certificada | kg-wiesing1@tsn.at | `/Gemeindeamt/Amtsleiter` |
| DVR | 70939 | `/system/web/impressum.aspx` |
| Distrito político | Schwaz | `/Gemeindeamt/Wissenswertes/Zahlen_und_Fakten` |
| Superficie | 10,39 km² | ídem |
| Altitud | 568 m | ídem |
| Web (según el sitio) | `http://www.wiesing.tirol.gv.at/` (**dominio caído**) | `/Gemeindeamt/Kontakt_und_Amtszeiten` |
| Turismo | `http://www.achensee.info/wiesing` | menú principal |
| App municipal | `https://www.gem2go.at/wiesing` | home / GEM2GO |
| Analytics | Matomo, `var allowTracking = false;` | código fuente |
| Firma electrónica | Amtssignatur (eA), `gem2go.eyeable` | código fuente |

**Horario de atención (Amtszeiten)** — dos versiones en el propio sitio:

| Día | Kontakt und Amtszeiten | Impressum |
|---|---|---|
| Lunes | 08:00–12:00 y **13:00–18:00** | 08:00–12:00 y **12:30–18:00** |
| Martes–Jueves | 08:00–12:00 | 08:00–12:00 |
| Viernes | 08:00–13:00 | 08:00–13:00 |
| Sábado/Domingo | Cerrado | Cerrado |

Parteienverkehr (atención presencial): 08:00–12:00, con cita previa recomendada.

---

## 4. Mapa del sitio actual

### 4.1 Navegación principal (idéntica en todas las páginas)

```
Startseite                         /
Bürgerservice                      /Buergerservice
Gemeindeamt                        /Gemeindeamt
Politik                            /Politik
Veranstaltungskalender             /Veranstaltungskalender
Vereine                            /Vereine
Wirtschaft                         /Wirtschaft
Gastronomie                        /Gastronomie
Gesundheit und Soziales            /Gesundheit_und_Soziales
Kirche und Religion                /Kirche_und_Religion
Schule und Bildung                 /Schule_und_Bildung
Unterkünfte                        /Unterkuenfte
Digitaler Ortsplan                 /Digitaler_Ortsplan
Kurzurlaub in Wiesing              http://www.wiesing.tirol.gv.at/...  (MUERTO)
Tourismusverband Wiesing           http://www.achensee.info/wiesing
Formular                           /Formular
```

### 4.2 Árbol completo (según la sitemap oficial del sitio)

```
Startseite
├── Bürgerservice
│   ├── Amtliche Termine
│   ├── Amtstafel
│   ├── Elektronische Zustellung        → formulare.service365.at (externo)
│   ├── Formulare
│   ├── Gebühren
│   ├── Gemeindezeitung
│   ├── Informationsfreiheit
│   ├── Legalisator
│   ├── Mülltermine
│   ├── Rechnungsabschlüsse
│   ├── Wasserinformationen, Wasserqualität, Wasserhärte
│   ├── News
│   ├── Newsletter abonnieren
│   ├── Verordnungen
│   ├── Zuständigkeiten
│   ├── Barrierefreiheit
│   └── Datenschutz
├── Gemeindeamt
│   ├── Amtsleiter
│   ├── Anfrage und E-Mail
│   ├── Die Amtssignatur
│   ├── Einrichtungen
│   │   └── Gebäudeinventar Gemeinde
│   ├── Kontakt und Amtszeiten
│   ├── Verwaltung
│   │   ├── Abteilungen
│   │   ├── Amtsleiter
│   │   ├── Förderungen
│   │   └── Mitarbeiter
│   └── Wissenswertes
│       ├── Aus der Geschichte
│       ├── Statistische Daten        → redirige a statistik.at
│       ├── Wappen
│       └── Zahlen und Fakten
├── Politik
│   ├── Bürgermeister
│   ├── Vizebürgermeister
│   ├── Gemeinderat
│   ├── Gemeindevorstand
│   ├── Ausschüsse
│   ├── Protokolle
│   ├── Mandatar-Infoportal            → sessionnet.service365.at (externo, área cerrada)
│   └── Wahlergebnisse
├── Veranstaltungskalender
│   ├── Meine Veranstaltungen          → HTTP 500
│   └── Newsletter abonnieren
├── Vereine
├── Wirtschaft
├── Gastronomie
├── Gesundheit und Soziales
│   ├── Ärztenotdienst                 → aektirol.at/bereitschaftsdienste
│   └── Notdienste
├── Kirche und Religion
│   ├── Index
│   ├── Interessante Links
│   └── Kirchengeschichte
├── Schule und Bildung
├── Unterkünfte
├── Digitaler Ortsplan
├── Kurzurlaub in Wiesing              → dominio muerto
├── Tourismusverband Wiesing           → achensee.info
└── Formular
```

**Páginas “fantasma”** (aparecen en la sitemap o en el menú pero no funcionan / no son contenido real):
- `Mandatar-Infoportal` → servicio externo cerrado.
- `Meine Veranstaltungen` → error 500.
- `Ärztenotdienst` → enlace externo sin página propia.
- `Kurzurlaub in Wiesing` → dominio inexistente.
- `Digitaler Ortsplan` → solo un mapa JS, sin texto propio.

### 4.3 Duplicados y URLs heredadas (verificado)

| URL | Problema |
|---|---|
| `/`, `/Startseite`, `/default.aspx`, `/system/web/default.aspx?menuonr=218626573` | Cuatro entradas a la misma home |
| `/Buergerservice` = `/Buergerservice/Amtliche_Termine` | Mismo contenido, dos canonical distintos (la segunda es la que gana) |
| `/Gemeindeamt` = `/Gemeindeamt/Amtsleiter` | Ídem |
| `/Gemeindeamt/Verwaltung` → `/Gemeindeamt/Verwaltung/Abteilungen` | Redirección |
| `/Kirche_und_Religion` = `/Kirche_und_Religion/Index` | Ídem |
| `/Gemeindeamt/Wissenswertes` = `/Gemeindeamt/Wissenswertes/Aus_der_Geschichte` | Ídem |
| `_2`, `_3`, `_8`, `_9`, `_11`… `_24` | Sufijos automáticos del CMS sobre el mismo tipo de página (noticias, eventos, tasas, anuncios) |
| `?design=cssgraphicmode/csshighcontrast/cssnostyle` | Versiones de accesibilidad indexables (3 × cada plantilla) |

---

## 5. Inventario de contenidos, sección por sección

### 5.1 Startseite (`/`, `/Startseite`)

Es una portada de **widgets**, no de contenido editorial. Orden real de bloques:

1. **Cabecera:** solo una imagen decorativa (`getImage.ashx?fileid=2126047`, alt “Sommerbild”). **No hay logo del municipio ni el nombre “Wiesing” en texto.**
2. **Menú principal** (13 + 4 enlaces).
3. **Bloque “Raumordnung”** + enlace a “Örtliches Raumordnungskonzept”.
4. **Seniorenfahrdienst “Wiemo”**: lunes, martes y viernes 8:00–12:00 (excepto festivos), tel. 05244 62623 33.
5. **Umweltkalender** (3 próximas fechas): Problemstoffsammlung 18.11.2026, Biomüll 27.11.2026, Restmüll 27.11.2026.
6. **Wetter**: widget externo `/system/web/wetter.aspx` (temperaturas, precipitación, viento).
7. **Aktuelles**: 4 noticias + “Weitere News…”.
8. **Amtstafel**: 4 comunicaciones oficiales vigentes.
9. **Veranstaltungsvorschau**: 5 eventos.
10. **GEM2GO APP**: banner enlazado a `gem2go.at/wiesing`.
11. **Gemeindezeitung**: portada de la “84. Ausgabe”.
12. **Arztordination**: ficha de la Dra. Podagova con horarios completos.
13. **Kinderbetreuung**: logo-enlace a `/Schule_und_Bildung`.
14. **Elektronische Zustellung**: imagen-enlace a `/e-zustellung` (**no responde**).
15. **DahoamCard**: enlace a Achensee + PDF alojado en el **dominio muerto**.
16. **Barrierefreie Darstellung**: sello W3C **WCAG 1.0 A** + selector “Grafische Version / Hoher Kontrast / Nur Text”.
17. **Schnellübersicht**: Ämter und Behörden, Ärztedienste, Gemeindezeitung, ÖBB Fahrpläne, Ortsplan/Adressuche, St. Notburga Pflege GmbH, Statistische Daten, Tourismusverband, Telefonbuch.
18. **Footer**: Newsletter abonnieren | Sitemap | Cookies | Barrierefreiheit | Datenschutz | Impressum.

> **Observación de fondo:** la home no responde a “¿qué necesita un vecino?” sino a “¿qué widgets tiene el CMS?”. No hay buscador de trámites, ni accesos destacados a “Anmeldung Wohnsitz”, “Müll”, “Baubewilligung”, ni aviso de horarios.

### 5.2 Bürgerservice (17 subpáginas)

#### Amtliche Termine — `/Buergerservice/Amtliche_Termine`
Listado de citas administrativas: 14.12.2026 Sprechtag der Landesvolksanwältin (BH Schwaz), 31.05.2027 Notarsprechstunde (Gemeindeamt Wiesing), 15.11.2027 … (paginado).

#### Amtstafel — `/Buergerservice/Amtstafel`
Tablón oficial, filtrado por categorías **Alle / Andere Behörden / Bauwesen / Kundmachungen**. Entradas vigentes (17.11.2026):
- *Andere Behörden:* “Kundmachung über Umlaufbeschlüsse der Forsttagsatzungskommission” (19.01.2026–31.01.2027).
- *Bauwesen:* “Öffentliche Bekanntmachung einer mündlichen Verhandlung, GP 1098” (06.11.2026–19.11.2026) y “Dorf 83c” (05.11.2026–19.11.2026).
- *Kundmachungen:* “Kundmachung Amtsstunden und Parteienverkehrszeiten…” (27.06.2024, es decir, **sin actualizar desde 2024**).

#### Elektronische Zustellung — enlace externo
`https://formulare.service365.at/standard/start.do?party=70939&generalid=ELEKTRONISCHE_ZUSTELLUNG`. **No verificable** desde este entorno.

#### Formulare — `/Buergerservice/Formulare`
Buscador A–W con categoría “Alle / Allgemeine Formulare”. Lista real (paginada, ~30 formularios):

| Formato | Formulario |
|---|---|
| .DOC | Abmeldung Hundesteuer (49 KB) |
| HTML | Anmeldung Flurreinigung 2026 |
| HTML | Anmeldung Wohnsitz |
| .PDF | Ansuchen Bauanzeige (15 KB) |
| HTML | Ansuchen Bauanzeige – digitale Einreichung |
| .PDF | Ansuchen Bauanzeige Errichtung Photovoltaikanlage über 100 m² (122 KB) |
| .PDF | Ansuchen Grundsteuerbefreiung (16 KB) |
| HTML | Arbeitnehmerveranlagung |
| .PDF | Bauansuchen (.XLSX + presentación digital) |
| HTML | Bauvollendungsmeldung PV-Anlage |
| HTML | Elektronische Zustellung |
| HTML | Familienpass |
| HTML | Flächenwidmungsbestätigung |
| HTML | Grundstücksgrenzenänderung |
| HTML | Hundeanmeldung / Hundeabmeldung |
| HTML | Informationsbegehren Art. 22a B-VG |
| HTML | Kindergeld plus |
| HTML | Kommunalsteueranmeldung |
| HTML | Melde-/Haushaltsbestätigung |
| HTML | Meldeauskunft |
| HTML | Passantrag |
| HTML | Pensionsantrag |
| HTML | Schulstarthilfe |
| HTML | SEPA-Lastschrift |
| HTML | Straßenarbeiten STVO |
| HTML | Veranstaltungsanmeldung |
| HTML | Verlustmeldung |
| HTML | Wohnbauförderung |
| HTML | Wohnungsansuchen |

> Mezcla de formatos (DOC, PDF, XLSX, HTML) y de destinos (descarga local, formulario propio, servicio365 externo). No hay búsqueda por palabra clave ni filtro por “quiero hacer…”.

#### Gebühren — `/Buergerservice/Gebuehren`
11 tasas en 3 páginas de paginación:

| Tasa | Importe |
|---|---|
| Ankündigungssteuer | 5,00 € / 6,20 € según tamaño del cartel |
| Biomüllkübel | 10 L 7,00 € · 25 L 21,00 € · 80 L 54,00 € (IVA 10 % incl.) |
| Biosäcke | 10 L 0,30 € · 15 L 0,51 € · rollos de almidón 4,20 / 4,30 / 8,70 €; tasa base 19,69 €/persona/año, desde la 3.ª persona 11,76 € |
| Erschließungsbeitrag | 7,05 € (2,75 % de 235,00 €, TVAAG) |
| Friedhofsgebühren | Einzelgrab 30,00 € · Doppelgrab/Familiengrab/Urnennische 48,00 € · Dreifachgrab 72,00 € · placa de urna 228,00 € |
| Grundsteuer A | 500 % del Messbetrag |
| Grundsteuer B | 500 % del Messbetrag |
| Hausnummer | 42,00 € (sujeto a coste real) |
| Hundesteuer | 103,00 €/año; 2.º perro 150,00 €; con adiestramiento 78,00 €; perro de servicio 45,00 €; perro guía exento; chapa 4,40 € |
| Kanalanschlussgebühren | 6,99 €/m³ (TVAGG, IVA 10 %); piscinas/estanques 15,50 €/m³ |
| Legalisator | 3–31 € según acto + tasa federal 14,30 € |

#### Gemeindezeitung — `/Buergerservice/Gemeindezeitung`
Archivo **2004–2026**, paginado (4+ páginas). Última: **84. Ausgabe, 10.07.2026, 10,08 MB**. Ejemplos: 83.ª (15.12.2025, 8,35 MB), 82.ª (27.06.2025, 8,04 MB), 81.ª (10.12.2024, 8,79 MB), 80.ª (15.07.2024, 12,03 MB), 74.ª (15.12.2022, 4,63 MB). Hay números de hasta **19,76 MB** (21.12.2021).
> Los nombres de archivo son caóticos: “Zeitung”, “GZ Wiesing September_web.pdf”, “Datei für Eintrag”, “Wiesinger Gemeindezeitung”.

#### Informationsfreiheit — `/Buergerservice/Informationsfreiheit`
Dos párrafos: desde el **1 de septiembre de 2025** rige la nueva **Informationsfreiheitsgesetz (IFG)**; derecho a información oficial gratuita; “la transparencia nos importa, por eso ponemos a disposición información central”. **No hay registro de información publicado, ni formulario, ni procedimiento.**

#### Legalisator — `/Buergerservice/Legalisator`
Explica qué es el Legalisator (nombrado por el Oberlandesgericht, competente para legalizar firmas en documentos de Registro de la Propiedad en Tirol), qué no hace (no revisa el contrato) y los requisitos. Incluye tarifas.

#### Mülltermine — `/Buergerservice/Muelltermine`
Calendario de residuos + reglas:
- Sammelstelle Bradl: martes 17:00–19:00, viernes 13:00–18:00; de mayo a mediados de octubre también jueves 17:00–19:00.
- Restos de poda: máximo 2 m³ en Bradl; volúmenes mayores a la Kompostieranlage Strass, Trenkerweg 6 (martes 14:00–16:00, sábado 08:00–12:00).
- Recogida a demanda con remolque y grúa por el Sr. Kröll.
- PDF “Abfuhrkalender 2026”.

#### Rechnungsabschlüsse — `/Buergerservice/Rechnungsabschluesse`
Presupuestos y cuentas 2020–2026:
- Voranschlag 2020 (3,66 MB), 2021 (3,7 MB), 2022 (3,89 MB), 2023 (4 MB), **2024 (26,28 MB)**, 2025 (4,54 MB), 2026 (5,31 MB).
- Jahresrechnung 2020 (7,72 MB), 2021 (7,14 MB), 2022 (8,82 MB)…

#### Wasserinformationen — `/Buergerservice/Wasserinformationen_Wasserqualitaet_Wasserhaerte`
Solo un enlace: **“WASSERQUALITÄT 2025.pdf” (0,32 MB)**. Sin datos de dureza ni valores en texto.

#### News — `/Buergerservice/News`
10 noticias (más reciente 10.11.2026):
1. Gottesdienstordnung der Pfarre Wiesing (10.11.2026)
2. Forstweg im Bereich Sportplatz und Astenberg **vorübergend** gesperrt (05.11.2026) — *error ortográfico en el título, visible en la home*
3. “Jede:r Zweite fühlt sich auf den Ernstfall nicht ausreichend vorbereitet.” (09.10.2026)
4. Eröffnung RE:USE Shops in Schwaz (06.10.2026)
5. Morgenkreis Schuljahr 2026/27 in der Volksschule (16.09.2026)
6. ZIVA – Die App für den Ernstfall (09.09.2026)
7. ID-Austria Registrierung im Gemeindeamt (01.04.2026)
8. “Immer bestens informiert – mit der GEM2GO App” (05.03.2026)
9. Kostenloses VVT-Ticket (fecha por confirmar)
10. Lärmschutzwand Erlach (fecha por confirmar)

#### Newsletter abonnieren — `/Buergerservice/Newsletter_abonnieren`
Formulario: E-Mail*, Anrede (Herr/Frau/Damen und Herren/Familie/Verein/Organisation/Firma), título, nombre, apellidos, PLZ, Ort, Straße, **Sprache (solo “deutsch”)**, **Newslettertyp** (klassischer Newsletter / Veranstaltungsnewsletter), **19 categorías de eventos**, consentimiento DSGVO, “Newsletter abmelden”.

#### Verordnungen — `/Buergerservice/Verordnungen`
Aviso clave: **desde el 1 de julio de 2025 las ordenanzas se publican exclusivamente en el RIS** (Rechtsinformationssystem des Bundes), conforme al **Tiroler Digitalisierungsgesetz 2023**; la publicación en la web municipal “desaparece”. Aun así la página sigue listando PDFs antiguos:
- Baulärmverordnung 2016 (derecho regional)
- Friedhofsordnung (337 KB)
- Lärmverordnung (93 KB)
- Müllabfuhrverordnung (3,01 MB)
- Verordnung über … (Garagen/Stellplätze)
- Waldumlage 2024
- Freizeitwohnsitz-/Leerstandsabgabe
- Hundehalter-Verordnung
- Wasserleitungsverordnung
> **Contradicción editorial:** se anuncia que ya no se publican ordenanzas en la web y se mantienen PDFs sin marcar como históricos.

#### Zuständigkeiten — `/Buergerservice/Zustaendigkeiten`
Directorio A–Z de competencias (Altenehrungen, Altenhilfe, Amtsleitung, Anlagenrecht, Anmeldung bei Bürgermeister und Amtsleiter, Anzeige einer Geburt, Anzeige eines Sterbefalles, Bauanzeigen § 30 TBO, Baubewilligungen, Flächenwidmung, Hausnummerierung, Kindergartenwesen, Meldeamt, Pensionsangelegenheiten…). Paginado y sin buscador.

#### Barrierefreiheit — `/Buergerservice/Barrierefreiheit`
**Declaración oficial** (ver §12): se basa en § 14b Tiroler Antidiskriminierungsgesetz 2005 y Directiva (UE) 2016/2102; afirma conformidad **parcial** con **WCAG 2.1 AA / EN 301 549 V2.1.2 (2018-08)**; enumera incumplimientos propios (1.1.1, 1.3.1, 1.3.2, 2.4.2, 4.1.1, 4.1.2, PDFs). Redactada el **27 de marzo de 2023**.

#### Datenschutz — `/Buergerservice/Datenschutz`
Texto largo (14.620 caracteres). Puntos:
- Responsable: Gemeinde Wiesing.
- Encargado externo: **hpc DUAL Österreich GmbH**, Hasnerstraße 123, 1060 Wien.
- Referencias a **BZD/MeinPostkorb** en oesterreich.gv.at.
- **Mandatar-Infoportal**: área cerrada con cookies propias.
- Cookies, Matomo, derechos ARCO, contacto del delegado de protección de datos.

### 5.3 Gemeindeamt

#### Amtsleiter — `/Gemeindeamt/Amtsleiter` (y `/Gemeindeamt`)
**Mag. Martina Gasteiger**, Amtsleiterin. Dorf 19, +43 5244 626 23 10, fax -18, gemeinde@wiesing.gv.at, e-mail certificado kg-wiesing1@tsn.at. Competencias: Amtsleitung, Bauanzeigen (§ 30 TBO), Baubewilligungsansuchen, Bauverhandlungen, Bebauungsplan, Grundteilungen, Hausnummerierung, Kindergartenwesen, Comunicación/PR, Pensionsangelegenheiten.

#### Anfrage und E-Mail — `/Gemeindeamt/Anfrage_und_E-Mail`
Formulario de contacto: Nombre*, Anschrift, Teléfono, E-Mail*, Betreff*, Anfrage*, **adjunto de archivo**, consentimiento DSGVO.

#### Die Amtssignatur — `/Gemeindeamt/Die_Amtssignatur`
Explica la firma electrónica oficial (§ 19 E-GovG: imagen de marca, aviso de firma, información de verificación), enlaces a verificación (signaturpruefung.gv.at, pruefung.signatur.rtr.at, buergerkarte.at).
> **Error grave de contenido:** dice “la publicación de la imagen de marca de la **Gemeinde Kufstein**” — texto copiado de otro municipio.

#### Einrichtungen — `/Gemeindeamt/Einrichtungen`
| Instalación | Datos |
|---|---|
| Bauhof | Dominik Wiedner, Bradl 320, +43 676 721 45 14, **bauhof@wiesing.tirol.gv.at** (dominio caído) |
| Kindergarten 1 | Dorf 66, +43 5244 64900 / +43 676 353 72 52, kg-wiesing1@tsn.at |
| Kindergarten 2 | Ingrid Prantl, Dorf 67, +43 676 353 74 23, kg-wiesing2@tsn.at |
| Legalisator | Marcus Huber, Dorf 19, +43 5244 62623 13 |
| Sammelstelle | 6210 Wiesing (sin dirección ni horario) |
| Schülerhort | Dorf 67, +43 676 710 68 24, ho-wiesing@tsn.at |
| Waldaufseher | Manuel Eberharter, Bradl 320, +43 676 4493112, waldaufseher@wiesing.gv.at |

#### Gebäudeinventar Gemeinde — `/Gemeindeamt/Einrichtungen/Gebaeudeinventar_Gemeinde`
Documento/inventario de edificios municipales (contenido mínimo en texto; descarga).

#### Kontakt und Amtszeiten — `/Gemeindeamt/Kontakt_und_Amtszeiten`
Ficha oficial (ver §3), horarios, mapa y “Das nächste Mal geöffnet: Mi, 18.11.2026 ab 08:00 Uhr”.
> El campo “Web” apunta al **dominio muerto** `http://www.wiesing.tirol.gv.at/`.

#### Verwaltung
- **Abteilungen** — `/Gemeindeamt/Verwaltung/Abteilungen`: Bauamt (Gasteiger), Bauhof (Wiedner, **bauhof@wiesing.gv.at**), Buchhaltung (Huber), Chronisten (chronik@wiesing.gv.at), Kindergarten 1 y 2, Meldeamt (Kohler), Schülerhort (Hanser), Waldaufseher (Eberharter).
- **Amtsleiter** — ficha de Gasteiger (duplicada).
- **Förderungen** — solo 3 categorías sin contenido: **Heizkostenzuschuss, Mietzinsbeihilfe, Mindestsicherung**.
- **Mitarbeiter** — directorio A–W con 17 fichas (ver §8).

#### Wissenswertes
- **Aus der Geschichte** — cronología 1700 a. C.–2000 (texto largo).
- **Wappen** — descripción heráldica: campo de trébol, muro de sillares, águila tirolesa; concedido en **1930**.
- **Zahlen und Fakten** — solo 3 líneas: 10,39 km², 568 m, Bezirk Schwaz. **Sin población, sin hogares, sin empresas.**
- **Statistische Daten** — redirección externa a `statistik.at/atlas/blick/?gemnr=70939`.

### 5.4 Politik

| Página | Contenido |
|---|---|
| **Bürgermeister** `/Politik/Buergermeister` | Ing. Stefan Schiestl, BSc. (UWL). Dorf 19, +43 5244 626 23 12, móvil +43 677 640 880 66, fax -18, buergermeister@wiesing.gv.at, “Technischer Angestellter”. Competencias: Bauanzeigen § 30 TBO, Baubewilligungen, Bebauungsplan, Flächenwidmung, Grundteilungen, Comunicación/PR. |
| **Vizebürgermeister** `/Politik/Vizebuergermeister` | Andreas Singer (UWL), **sin dirección postal** (solo “6210 Wiesing”), +43 676 936 12 61, andreas.singer@tube.tirol. |
| **Gemeinderat** `/Politik/Gemeinderat` | 15 miembros + 9 Ersatzmitglieder. Partidos: **UWL** (7), **WL – Wiesing Leben** (3), **WFW – Wir für Wiesing** (2), **FLW – Freie Liste Wiesing** (1), **MFG** (1). Nombres completos en §8. |
| **Gemeindevorstand** `/Politik/Gemeindevorstand` | Schiestl (Obmann), Singer (Stellvertreter), Untermair, Danzl + suplentes. |
| **Ausschüsse** `/Politik/Ausschuesse` | 5 comisiones: Kindergarten/Schule/Soziales; Finanz- und Wirtschaftsausschuss; Raumordnungs-, Bau- und Umweltausschuss; Überprüfungsausschuss; Vereins- und Kulturausschuss. **Solo títulos, sin miembros ni competencias.** |
| **Protokolle** `/Politik/Protokolle` | Filtro por año **2006–2026**; sin listado ni buscador en el texto extraído. |
| **Wahlergebnisse** `/Politik/Wahlergebnisse` | 19 entradas 2004–2024 con buscador y filtro. Ejemplos: Nationalratswahl 2024 (1.687 electores, 1.308 votos), Europawahl 2024 (1.685 / 810), BPW 2022 (1.666 / 764), Landtag 2022 (1.658 / 1.132), Bürgermeister 2022 (1.784 / 1.202), Gemeinderat 2022 (1.784 / 1.206). |
| **Mandatar-Infoportal** | `https://sessionnet.service365.at/70939m` — área cerrada, **no verificable**. |

### 5.5 Veranstaltungskalender

- **`/Veranstaltungskalender`**: calendario agregado de la región. Filtros por **19 categorías** (Advent, Ausflug/Führung/Tour, Ausstellung, Ball/Umzug, Fest/Brauchtum, Film, Gesundheit/Soziales, Jugend, Kirche/Religion, Kulinarisches, Kurs/Seminar/Tagung, Messe/Kongress/Markt, Musik/Konzerte, Schul-/Kinderveranstaltung, Senioren, Sonstige, Sport/Freizeit, Theater/Kabarett/Show, Versammlung, Vortrag/Lesung) y por **7 municipios** (Achenkirch, Alpbach, Brixlegg, Kramsach, Reith im Alpbachtal, Vomp, Wiesing). Navegación por meses (Nov 2026 → “Weitere”).
- Eventos propios (con página de detalle):
  - **Volkstanz** — 19.11.2026 y 26.11.2026.
  - **Adventmarkt Wiesing** — 28.11.2026 y 12.12.2026, 15:00, Dorf 32.
  - **Nikolauseinzug** — 06.12.2026.
  - **Senioren-Adventfeier** — 08.12.2026.
- **`/Veranstaltungskalender/Meine_Veranstaltungen`** → **HTTP 500 Runtime Error**.
- **`/Veranstaltungskalender/Newsletter_abonnieren`** → mismo formulario que el newsletter general.

### 5.6 Vereine — `/Vereine`

Buscador A–Z (B, E, F, G, I, K, L, M, S, T, V, W). **Una única entrada: Bundesmusikkapelle Wiesing** (con ficha propia `/Bundesmusikkapelle_Wiesing_1`).
> **Vacío grave:** no constan bomberos, deportes, ganadería, cultura, juventud, etc. El directorio está prácticamente sin poblar.

### 5.7 Wirtschaft — `/Wirtschaft`

Directorio A–Z (~3 páginas). Entradas verificadas (20+):
Alpen Altholz IP Paletten GmbH · Astner Holzschindeln GmbH · BAAR Hotelbedarf GmbH · Böck Elektrotechnik · Bofrost Austria GmbH · Christian Aschberger ChA Land- und Baumaschinenservice · Danzl Martin GmbH · Der Bildlmacher · Dorfladen Aschberger · Eberharter Alfred Kunst- und Metallgestaltung · Egger Peter Tischlerei · Elektro & Heizungstechnik Oberladstätter GmbH · Eni Tankstelle Bracher GmbH · Fahrsicherheitszentrum · Fekonja Bau · Hechenblaickner Holz · Heli Shop · Himu Ofenbau · Installationstechnik Moser · …
> Calidad irregular: hay fichas **sin teléfono, sin email y sin web** (p. ej. Bofrost); otras con fax como único “teléfono”.

### 5.8 Gastronomie — `/Gastronomie`

| Establecimiento | Dirección | Contacto |
|---|---|---|
| Astenau-Alpe 1483 m | Astenberg 503 | +43 676 751 48 01 · biechl@astenau.at · astenau.at |
| Baguette Bistro-Betriebs GmbH | Dorf 103 | +43 503 226 041 · baguette.at |
| Café Bar Waldruh | Dikat 402 | +43 676 571 36 66 · gasthof@waldruh.com · waldruh.com |
| Café EZEB | Dorf 32 | +43 5288 624 445 76 · office@ezeb.at · ezeb.at |
| Dorfwirt – Restaurant Café Bar | Dorf 31 | +43 676 593 56 90 · info@dorfwirt-wiesing.at |
| Eni Tankstelle Bracher GmbH | Dorf 23d | +43 5244 615 46 · tankstelle@eni-wiesing.at |
| Inntal Stadl | Dorf 100 | +43 5244 626 93 · jbrugger@camping-inntal.at |
| Pension Sonnhof | Dorf 45 | +43 5244 620 12 / 623 45 · info@sonnhof.cc |

### 5.9 Gesundheit und Soziales — `/Gesundheit_und_Soziales`

Directorio A–Z (A, E, K, O, P, R, S, W):
- **Achensee Apotheke** — Achenseestraße 69, 6200 Jenbach, +43 5244 625 00.
- **Dr. Andreas Eliskases** — Austraße 30, Jenbach, +43 5244 622 56.
- **Karwendel-Apotheke Jenbach** (Karin Glötzer) — Postgasse 17, +43 5244 622 35.
- **Krankenhaus Schwaz** — Swarovskistraße 1-3, 6130 Schwaz, +43 5242 600.
- **Dr. Gudrun Krois Walder** — Schalserstraße 4a, Jenbach, +43 5244 620 85.
- **Dr. Manfred Oberwinkler** — Kirchgasse 3a, Jenbach, +43 5244 644 33, praxis@dr-oberwinkler.at.
- **Dr. Ekaterina Podagova** — Dorf 19, Wiesing, +43 5244 23200, praxis@dr-podagova.at. Horario: L 8–12 y 17–19; M 8–12; X 17–19; J 8–12; V 8–12.
- **Dr. Gudrun Radacher** — Auckenthalerstraße 11, Jenbach, +43 5244 62067. *(En el sitio figura “Radacher Grudrun”.)*
- **SeneCura Sozialzentrum Region Achensee** — Ebener Straße 106, 6212 Eben, +43 5243 431 28.
- **St. Notburga Pflege GmbH** — Tratzbergstraße 12, Jenbach, +43 5244 630 33, info@notburgapflege.at.
- **Dr. Ina Wimmer** — Achenseestraße 66, Jenbach, 05244/20540.

**Notdienste** (`/Gesundheit_und_Soziales/Notdienste`): Ärztenotdienst **141**, Bergrettung **140**, Feuerwehr **122**, Polizei **133**, Rettung **144**. “Notdienst der Ärztekammer” sin número (enlace a aektirol.at).
**Ärztenotdienst** → enlace externo `aektirol.at/bereitschaftsdienste`.

### 5.10 Kirche und Religion

- **Index** (`/Kirche_und_Religion/Index`): Pfarramt Wiesing (Dorf 29, +43 5244 626 72, pfarre.wiesing@dibk.at), Pfarramt Jenbach (Tratzbergstraße 9, +43 5244 622 55), Pfarramt Münster (Dorf 93, 6232 Münster, +43 5337 936 47), Zeugen Jehovas Versammlung Jenbach (Postgasse 20, +43 650 505 04 55).
- **Kirchengeschichte** (`/Kirche_und_Religion/Kirchengeschichte`): 7.063 caracteres. Iglesia parroquial construida **1777–1781**, torre de más de **70 m**, historia de la parroquia y de la comunidad.
- **Interessante Links**: una sola entrada, “Webside Dekanat Jenbach” (**error tipográfico en “Website”**).

### 5.11 Schule und Bildung — `/Schule_und_Bildung`

| Centro | Datos |
|---|---|
| Kindergarten Wiesing 1 | Dorf 66, +43 5244 649 00 / +43 676 353 72 52, kg-wiesing1@tsn.at |
| Kindergarten Wiesing 2 | Dorf 67, +43 676 353 74 23, kg-wiesing2@tsn.at |
| Kinderkrippe “Die Sterne” (privada) | Dorf 19, +43 650 750 22 01 |
| Kinderkrippe “Montessori Sonnenkinder” (privada) | Dorf 102a, +43 699 1174 3226, info@montessori-sonnenkinder.at |
| Schülerhort | Dorf 67, +43 676 710 68 24, ho-wiesing@tsn.at |
| Volksschule Wiesing | Dorf 67, +43 5244 640 08 / +43 676 387 01 78, direktion@vs-wiesing.tsn.at, vs-wiesing.tsn.at |

### 5.12 Unterkünfte — `/Unterkuenfte`

Directorio A–Z (A, C, F, G, H, L, P, S), **17 alojamientos**:
Apart Landhaus Ferrari · Astenau Alpe · Camping Inntal · Ferienwohnung “Hannah Lena” · Ferienwohnung Außerdorf · Gästehaus Waldrand · Gästehaus Wilderer · Haus Alex · Haus Christl · Haus Egger · Haus Lörgetbohrer · Haus Plattner · Lamplhof · Landhaus Alpenblick · Pension Sonnhof · Pension Waldruh · Stangleggerhof.
> Fichas con datos de contacto, sin fotos, sin precios, sin disponibilidad y sin enlace de reserva. Varias remiten genéricamente a `achensee.com/wiesing`.

### 5.13 Digitaler Ortsplan — `/Digitaler_Ortsplan`

Mapa interactivo Leaflet (`rismap3leaflet.js`) con teselas propias en `https://mffiles.gem2go.page/custom/wiesing/tiles/`. Texto alternativo: “Este es el plano interactivo. El mapa sirve para orientación espacial… puede manejarse con el ratón. Alternativamente puede abrir la dirección manualmente en un servicio de mapas externo.”
> **Sin contenido textual**: para SEO y para lectores de pantalla la página está vacía. Los mapas de detalle (“Lageplan vergrößern”) se repiten en cada ficha de contacto.

### 5.14 Formular — `/Formular`

**Formulario obsoleto**: “Anmeldung Jungbürgerfeier — el sábado **10 de septiembre de 2022** la Gemeinde Wiesing invita a la Jungbürgerfeier…”. Sigue publicado en 2026 con campos Nombre, participación, reserva del libro, teléfono, email.
> Ejemplo claro de **falta de gobierno de contenidos**.

### 5.15 Páginas legales y transversales

| Página | Contenido |
|---|---|
| **Impressum** `/system/web/impressum.aspx` | Medieninhaber/Herausgeber: Gemeinde Wiesing; persona de contacto: Heidrun Kohler; DVR 70939; § 13 AVG; §§ 24f/25 MedienG; dirección **“6200 Wiesing”** (incorrecta: es 6210); horarios con **12:30–18:00**; formatos admitidos (TXT, PDF, RTF, DOC, XLS, GIF, JPG, BMP, HTM, ZIP); condiciones de uso; cláusula genérica “Stadt-, Markt-, Gemeinde”. |
| **Datenschutz** `/Buergerservice/Datenschutz` | Ver §5.2. |
| **Barrierefreiheit** `/Buergerservice/Barrierefreiheit` | Ver §12. |
| **Cookies** (enlace de footer) | Banner/gestión de cookies; según la propia declaración de accesibilidad, “el aviso de cookies se carga en el lugar equivocado”. |
| **Sitemap** `/system/web/sitemap.aspx` | Árbol oficial (ver §4.2). |
| **Suche** (buscador de cabecera) | Buscador global del CMS (`#search_218626858`). |

### 5.16 Contenido dinámico transversal

- **Aktuelles / News** — 10 noticias, sin categorías ni etiquetas, sin archivo por año visible.
- **Amtstafel** — 4 entradas, 3 categorías, sin archivo histórico.
- **Umweltkalender** — próximas 3 fechas de residuos.
- **Wetter** — widget externo.
- **Veranstaltungsvorschau** — 5 próximos eventos.
- **Gemeindezeitung** — última edición + archivo 2004–2026.
- **“Das nächste Mal geöffnet”** — cálculo automático del próximo horario.

### 5.17 Páginas huérfanas / heredadas (indexables)

`/Oertliches_Raumordnungskonzept`, `_1`, `_13`, `_14`, `_22` (5 copias del mismo plan, 17 PDFs cada una) · `/Problemstoffsammlung_2`, `_8`, `_19`, `_22` · `/Biomuellabholung_3`, `_12`, `_16`, `_24` · `/Restmuellabfuhr_11`, `_12`, `_17`, `_19`, `_22` · `/84_Ausgabe`, `/84_Ausgabe_18` · `/Muellkalender` · `/Gemeindesteuer…` etc.
> Son el residuo de recrear páginas en el CMS: **mismo contenido, varias URLs, todas rastreables e indexables**.

---

## 6. Inventario documental (descargas)

| Familia | Volumen | Formatos | Dónde |
|---|---|---|---|
| Gemeindezeitung | 2004–2026, 4+ páginas | PDF 2,17–19,76 MB | `/Buergerservice/Gemeindezeitung` |
| Presupuestos y cuentas | 2020–2026 | PDF 3,66–26,28 MB | `/Buergerservice/Rechnungsabschluesse` |
| Örtliches Raumordnungskonzept | 17 documentos × 5 copias | PDF | `/Oertliches_Raumordnungskonzept*` |
| Ordenanzas | ~9 PDFs históricos | PDF | `/Buergerservice/Verordnungen` |
| Formularios | ~30 | DOC, PDF, XLSX, HTML | `/Buergerservice/Formulare` |
| Calendario de residuos | 1 | PDF | `/Buergerservice/Muelltermine` |
| Calidad del agua | 1 | PDF 0,32 MB | `/Buergerservice/Wasserinformationen…` |
| Marcas de firma | 1 | PDF 0,2 MB | `/Gemeindeamt/Die_Amtssignatur` |
| Inventario de edificios | 1 | documento | `/Gemeindeamt/Einrichtungen/Gebaeudeinventar_Gemeinde` |
| Actas del consejo | 2006–2026 | documentos | `/Politik/Protokolle` |
| Resultados electorales | 2004–2024, 19 entradas | HTML | `/Politik/Wahlergebnisse` |
| DahoamCard | 1 | PDF en **dominio muerto** | home |

> **Riesgo:** PDFs enormes (26 MB), sin versión HTML, sin etiquetado de accesibilidad y con nombres de archivo inconsistentes.

---

## 7. Funcionalidades detectadas

| # | Funcionalidad | Estado | Notas |
|---|---|---|---|
| 1 | Navegación principal de 13 áreas | ✅ | Sin mega-menú; submenús solo al entrar |
| 2 | Buscador global | ✅ | Cabecera (`accesskey 4`) |
| 3 | Buscador A–Z (Vereine, Wirtschaft, Zuständigkeiten, Formulare, Gebühren) | ✅ | 5 directorios con el mismo patrón |
| 4 | Filtro por categoría (Amtstafel, Förderungen, Formulare) | ✅ | Básico |
| 5 | Calendario de eventos con filtros por categoría y municipio | ✅ | Agrega 7 municipios |
| 6 | Formulario de contacto con adjunto | ✅ | `/Gemeindeamt/Anfrage_und_E-Mail` |
| 7 | Newsletter (alta/baja) | ✅ | 19 categorías, solo alemán |
| 8 | Formularios HTML de trámites | ✅ | Vía service365 / propios |
| 9 | Firma electrónica / Amtssignatur | ✅ | Informativa + verificación externa |
| 10 | Plano interactivo Leaflet | ✅ | Teselas propias GEM2GO |
| 11 | “Lageplan vergrößern” por ficha | ✅ | Repetido en cada contacto |
| 12 | Widget del tiempo | ✅ | Externo |
| 13 | Calendario de residuos | ✅ | Estático + PDF |
| 14 | “Das nächste Mal geöffnet” | ✅ | Dinámico |
| 15 | Selector de accesibilidad (gráfico/contraste/texto) | ⚠️ | Solo por query param y en algunas plantillas |
| 16 | App GEM2GO | ✅ externo | Banner + enlace |
| 17 | Elektronische Zustellung | ⚠️ | Enlace muerto/no verificable |
| 18 | Mandatar-Infoportal | 🔒 | Área cerrada externa |
| 19 | Búsqueda de eventos propios (“Meine Veranstaltungen”) | ❌ | HTTP 500 |
| 20 | Versión en otra lengua | ❌ | Solo alemán |

---

## 8. Directorio de personas y contactos (consolidado)

### 8.1 Política
| Persona | Cargo | Partido | Contacto |
|---|---|---|---|
| Ing. Stefan Schiestl, BSc. | Bürgermeister | UWL | +43 5244 626 23 12 · +43 677 640 880 66 · buergermeister@wiesing.gv.at |
| Andreas Singer | Vizebürgermeister | UWL | +43 676 936 12 61 · andreas.singer@tube.tirol |
| Sandro Daberto | Gemeinderat | UWL | — |
| Christian Untermair | Gemeinderat | UWL | — |
| Wolfgang Mayer | Gemeinderat | UWL | — |
| Bernd Schlögl | Gemeinderat | UWL | — |
| Herbert Danler | Gemeinderat | UWL | — |
| Panoraia Arvaniti | Gemeinderätin | UWL | — |
| Stefan Danzl | Gemeinderat | WL | — |
| Franz Fuchs | Gemeinderat | WL | — |
| Kathrin Huber | Gemeinderätin | WL | — |
| Michael Rott | Gemeinderat | WFW | — |
| Marco Theuretzbacher | Gemeinderat | WFW | — |
| Hubert Klammer | Gemeinderat | FLW | — |
| Michael Moser | Gemeinderat | MFG | — |
| *Suplentes* | Michael Amplatz, Dominik Böck, Bernhard Wachter (UWL); Markus Geisler, Florian Gfrei (WFW); Chiara Dietl, Matthias Kerbl (WL); Wolfgang Berger (FLW); Florian Marksteiner | | |

### 8.2 Administración
| Persona | Función | Teléfono | E-mail |
|---|---|---|---|
| Mag. Martina Gasteiger | Amtsleiterin | +43 5244 626 23 10 | gemeinde@wiesing.gv.at |
| Sandra Gluderer | Kassa | -14 | kassa@wiesing.gv.at |
| Marcus Huber | Buchhaltung / Legalisator | -13 | buchhaltung@wiesing.gv.at |
| Heidrun Kohler | Meldeamt | -11 | meldeamt@wiesing.gv.at |
| Dominik Wiedner | Bauhof | +43 676 721 45 14 | bauhof@wiesing.gv.at / bauhof@wiesing.tirol.gv.at |
| Manuel Eberharter | Waldaufseher | +43 676 449 3112 | waldaufseher@wiesing.gv.at |
| Ingrid Prantl | Kindergarten 2 | +43 676 353 74 23 | kg-wiesing2@tsn.at |
| Roswitha Hanser | Schülerhort | +43 676 710 68 24 | ho-wiesing@tsn.at |

### 8.3 Personal de kindergarten (17 fichas)
Sabine Brugger · Laura Hagleitner (Regenbogengruppe) · Roswitha Hanser · Gabriele Kirchmair (Sonnengruppe) · Richard Klingenschmid · Tamara Ortner (Regenbogengruppe) · Ingrid Prantl (Bärengruppe) · Anna-Lena Steiner (Wassertropfengruppe) · Sandra Steinlechner (Sonnengruppe) · Lisa Theuretzbacher (Regenbogengruppe) · Stefanie Weisleitner (Wassertropfengruppe).

### 8.4 Salud, iglesia, educación, turismo
Ver §5.9, §5.10, §5.11. Turismo: `achensee.info/wiesing` y `achensee.com`.

---

## 9. Estado técnico (verificado)

### 9.1 Plataforma
- **RISCMS / RIS Kommunal**, ASP.NET WebForms (`aspnetForm`, `__doPostBack`, `/system/web/*.aspx`).
- Plantilla `sommer__pt.css` (`/css/sommer__pt.css?cts=1753874840`).
- Servidor sin cabecera `server`; `x-ris-px: ng/21, hap/27` (nginx + HAProxy).
- gzip activo; TTFB ≈ **232 ms**; HTML ≈ **35 KB** comprimido.
- `Cache-Control: public, max-age=1` en HTML (prácticamente sin caché).
- HSTS `max-age=2592000` (30 días), `upgrade-insecure-requests`, `X-Frame-Options: sameorigin`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: no-referrer-when-downgrade`, `Permissions-Policy` vacía.

### 9.2 Librerías y peso
| Recurso | Versión | Tamaño |
|---|---|---|
| Bootstrap CSS | 5.2.0 (cargado 2 veces: preload + noscript) | 190,1 KB |
| Bootstrap JS bundle | 5.x | 77,9 KB |
| jQuery | **1.7.2 (2012)** | 92,6 KB |
| jQuery UI | **1.8.17 (2012)** | 206,0 KB |
| FontAwesome `all.min.css` | — | 211,2 KB |
| `riscms_pre.css` | — | 76,1 KB |
| `sommer__pt.css` | — | 61,9 KB |
| `template.js` | — | 62,9 KB |
| `mobileMenu.js` | — | 23,0 KB |
| **Total CSS+JS** | | **≈ 1 MB** |
| Otros | jQuery Validate, jQuery Lazy, Lightbox 0.5, socialshareprivacy, flipbook, `rismap3leaflet.js` | |

- **34 recursos externos** en la home.
- CSS referencia `http://www.wiesing.gv.at/grafiken/bg_img_11.jpg` y `bg_img_1.gif` (HTTP, contenido mixto; siguen devolviendo 200).

### 9.3 Analítica y terceros
- **Matomo** (comentarios “Matomo” / “End Matomo Code”), `var allowTracking = false;`.
- `var eA_domain = 'gem2go.eyeable';`
- GEM2GO, Achensee Tourismus, Statistik Austria, RIS, service365, aektirol.at, help.gv.at, w3.org.

### 9.4 Comportamiento HTTP
- `http://www.wiesing.gv.at/` → **302** a `https://www.wiesing.gv.at/` (debería ser 301).
- `https://wiesing.gv.at` → **302** a `https://www.wiesing.gv.at/`.
- URL inexistente → **302** a `/system/web/notvalid.aspx?code=404` (**soft 404**).
- `robots.txt` con `Crawl-delay: 20`.
- Rate limiting: **HTTP 429** ante ráfagas.

---

## 10. Hallazgos UX/UI (evidencia)

1. **Sin identidad visual institucional:** no hay logo ni nombre del municipio en la cabecera; solo una foto (“Sommerbild”).
2. **Sin jerarquía semántica:** no existen `<header>`, `<nav>`, `<main>`, `<footer>`, `<section>`; todo son `div` (`#header`, `#header2`, `#columns`, `#col-b`, `#col-a`, `.main-content`, `#content`, `.sidecol-c`).
3. **Sin `<h1>` de página:** el único `h1` de la home es el nombre de la médica de la barra lateral; el resto son `h2`.
4. **Home sobrecargada:** 18 bloques compitiendo, 2 columnas laterales, sin prioridad visual ni “tareas principales”.
5. **Navegación plana:** 13 áreas de primer nivel sin agrupación lógica (ciudadano / municipio / ocio / economía).
6. **Etiquetas imprecisas:** “Kurzurlaub in Wiesing” (dominio muerto), “Formular” (formulario de 2022), “Statistische Daten” (sale del sitio), “Meine Veranstaltungen” (error 500).
7. **Buscadores A–Z repetidos** en 5 secciones, sin búsqueda transversal.
8. **Duplicación de contenido** entre páginas “índice” y su primera subpágina.
9. **Fichas de contacto sin foto, sin mapa embebido útil y sin “cómo llegar” real** (solo un enlace “wegfinder”).
10. **Formularios largos y sin ayuda contextual** (p. ej. contacto pide “Anschrift” sin explicar formato).
11. **Móvil:** existe `mobileMenu.js`, pero el diseño no es mobile-first; el menú de 13+17 enlaces se colapsa sin agrupación.
12. **Estados vacíos y errores** visibles para el usuario (500, enlaces muertos, PDFs gigantes).
13. **Mezcla de idiomas y erratas** (“vorübergend”, “Webside”, “Radacher Grudrun”, “Ersatugemeinderat”, “Gemeinderatsmitlgieder”).

---

## 11. Hallazgos SEO (evidencia)

| Elemento | Estado |
|---|---|
| `<title>` | Patrón “Wiesing Gemeinde - Startseite - <Sección> - <Página>” — largo, redundante, orientado a la marca y no a la búsqueda |
| `meta description` | **“Wiesing”** en todas las páginas (inútil) |
| `meta keywords` | Genéricas (“Wiesing Gemeinde Region Regional Regionales Information System…”) |
| `canonical` | Presente por página, pero convive con duplicados reales |
| `lang` | `de` correcto |
| `hreflang` / idiomas | **No hay**; solo alemán |
| Encabezados | Sin `h1`; jerarquía `h2` plana |
| HTML semántico | Ausente |
| URLs | Mezcla de slugs limpios (`/Buergerservice/Gebuehren`) y ASP.NET (`/system/web/…aspx?menuonr=…`) |
| 404 | **Soft 404** (302 a `notvalid.aspx`) |
| Redirecciones | **302** en lugar de 301 |
| Imágenes | 12 en la home, todas con `alt`, pero **sin `width`/`height`** (riesgo CLS) y **sin `loading="lazy"`** |
| `alt` | Débiles (“Sommerbild”, “sperre”) |
| Contenido duplicado | Variantes `?design=`, sufijos `_2`…`_24`, índices = primera subpágina |
| Sitemap XML | Presente y declarada en robots.txt |
| Datos estructurados | **Ninguno** (sin `LocalBusiness`, `GovernmentOrganization`, `Event`, `FAQPage`) |
| Open Graph / Twitter Cards | **No verificados / ausentes** |
| Rendimiento | ~1 MB CSS+JS, 34 recursos, PDFs de hasta 26 MB, caché de 1 s |

---

## 12. Accesibilidad (evidencia)

- **Declaración oficial** (`/Buergerservice/Barrierefreiheit`, 27.03.2023): conformidad **parcial** con **WCAG 2.1 AA** y **EN 301 549 V2.1.2 (2018-08)**, bajo § 14b Tiroler Antidiskriminierungsgesetz 2005 y Directiva (UE) 2016/2102.
- **Incumplimientos que la propia declaración reconoce:**
  - **1.1.1** contenido no textual (alt erróneos o ausentes);
  - **1.3.1** información y relaciones (jerarquía de encabezados deficiente, HTML a mejorar);
  - **1.3.2** orden significativo (el aviso de cookies se carga en el lugar equivocado);
  - **2.4.2** título de página;
  - **4.1.1** análisis sintáctico (enlace del glosario);
  - **4.1.2** nombre, rol, valor;
  - **PDF/DOC antiguos** no etiquetados (carga desproporcionada).
- **Promesas caducadas:** “planificamos 2023”, “hasta finales de 2024”, “hasta finales de 2021” — todas vencidas y sin actualizar.
- **Contradicción visible:** la barra lateral muestra el sello **WCAG 1.0 A** (`w3.org/WAI/wcag1A`), estándar obsoleto desde hace más de 15 años.
- **Positivo:** existen *skip links* (`accesskey 1/2/4`: “Hauptinhalt”, “Hauptnavigation”, “Suche”) y un modo de alto contraste / solo texto.
- **Modos de accesibilidad limitados:** funcionan por parámetro `?design=cssgraphicmode|csshighcontrast|cssnostyle` y solo en algunas plantillas (home, termin, amtstafel, formular, gebuehr, gelbeseite).
- **Mapa:** el plano Leaflet no tiene alternativa textual equivalente (solo una frase genérica).

---

## 13. Enlaces roto o no verificables

| Enlace | Estado | Impacto |
|---|---|---|
| `http://www.wiesing.tirol.gv.at/` (menú “Kurzurlaub in Wiesing”, “Web” en Kontakt, PDF DahoamCard) | **DNS ENOTFOUND** | **Crítico**: dominio histórico del municipio, visible en home y en la ficha oficial de contacto |
| `/Veranstaltungskalender/Meine_Veranstaltungen` | **HTTP 500** | Alto: función anunciada en la sitemap |
| `http://www.aektirol.at/fas.htm` | **404** | Medio |
| `/e-zustellung` | fallo de red | No verificable |
| `https://sessionnet.service365.at/70939m` | error de red | No verificable (área cerrada) |
| `https://formulare.service365.at/...` | error de red | No verificable |
| `http://www.signaturpruefung.gv.at/` | redirige a RTR | Aceptable pero conviene actualizar |
| `statistik.at/atlas/blick/?gemnr=70939` | ✅ 200 | Sale del sitio sin aviso |
| `achensee.info/wiesing`, `achensee.com/...`, `gem2go.at/wiesing`, `aektirol.at/bereitschaftsdienste`, `help.gv.at` | ✅ 200 | Correctos |

---

## 14. Inconsistencias, duplicidades y vacíos de contenido

### 14.1 Inconsistencias de datos
1. **Código postal:** el Impressum dice **6200 Wiesing**; el resto del sitio, **6210**.
2. **Horario del lunes:** 13:00–18:00 (Kontakt) vs **12:30–18:00** (Impressum).
3. **E-mail del Bauhof:** `bauhof@wiesing.gv.at` (Abteilungen) vs `bauhof@wiesing.tirol.gv.at` (Einrichtungen, **dominio caído**).
4. **Vizebürgermeister:** sin dirección postal completa.
5. **“Gemeinde Kufstein”** mencionada en la página de la Amtssignatur de Wiesing.
6. **Erratas:** “vorübergend”, “Webside”, “Radacher Grudrun”, “Ersatugemeinderat”, “Gemeinderatsmitlgieder”.

### 14.2 Duplicidades
7. Cuatro URLs para la home.
8. Índices que son la primera subpágina (`/Buergerservice`, `/Gemeindeamt`, `/Kirche_und_Religion`, `/Gemeindeamt/Wissenswertes`).
9. Sufijos `_2`…`_24` sobre eventos, residuos, tasas y el plan de ordenación (5 copias).
10. Variantes `?design=` indexables.
11. Newsletter duplicado en dos rutas.
12. Ficha de Gasteiger duplicada (`/Gemeindeamt/Amtsleiter` y `/Gemeindeamt/Verwaltung/Amtsleiter`).

### 14.3 Vacíos y contenido obsoleto
13. **Vereine:** 1 sola entrada.
14. **Zahlen und Fakten:** 3 datos, sin población.
15. **Förderungen:** 3 títulos sin explicación ni enlace.
16. **Informationsfreiheit:** 2 párrafos, sin registro de información ni procedimiento.
17. **Ausschüsse:** solo nombres, sin composición.
18. **Protokolle:** filtro por año sin contenido visible.
19. **Kirche → Interessante Links:** 1 enlace.
20. **Digitaler Ortsplan:** sin texto.
21. **Wasserinformationen:** solo un PDF.
22. **`/Formular`:** formulario de la Jungbürgerfeier de **2022**.
23. **Amtstafel:** la “Kundmachung Amtsstunden” es de **27.06.2024**.
24. **Verordnungen:** se anuncia el fin de la publicación web pero siguen los PDFs sin marca de histórico.
25. **Sammelstelle:** sin dirección ni horario en la ficha de Einrichtungen (sí en Mülltermine).
26. **Notdienste:** “Notdienst der Ärztekammer” sin número.
27. **Wirtschaft:** fichas sin teléfono/email/web.
28. **Unterkünfte:** sin fotos, precios ni reserva.
29. **Gemeindezeitung:** nombres de archivo y metadatos caóticos; PDFs de hasta 19,76 MB.
30. **Barrierefreiheit:** declaración de 2023 con plazos vencidos y sello WCAG 1.0 A.

---

## 15. Conclusión de la fase 1

**Lo que el sitio ya tiene y debe conservarse:**
- Toda la información institucional y de contacto, con un nivel de detalle poco habitual (tasas, competencias, ordenanzas, presupuestos, cementerio, residuos, agua, firma electrónica).
- Un archivo documental valioso (Gemeindezeitung 2004–2026, cuentas 2020–2026, plan de ordenación, actas 2006–2026).
- Integraciones útiles: GEM2GO, Amtssignatur, RIS, service365, Matomo, plano Leaflet.
- Base legal correcta en Impressum, Datenschutz y Barrierefreiheit (aunque desactualizada).

**Lo que está fallando y justifica la modernización:**
- **Arquitectura de información** pensada para el CMS, no para el ciudadano.
- **Gobierno de contenidos** inexistente: duplicados, páginas huérfanas, formularios caducados, erratas, datos contradictorios.
- **Deuda técnica** (jQuery 2012, 1 MB de assets, sin semántica, sin caché, soft 404, 302).
- **SEO y accesibilidad** por debajo de lo exigible a un sitio público austriaco en 2026 (WCAG 2.1 AA / EN 301 549, IFG, Digitalisierungsgesetz).
- **Enlaces críticos muertos** y una función anunciada que devuelve 500.

**Siguiente paso natural (fases 3–11):** convertir este inventario en (a) auditoría UX/UI y técnica priorizada, (b) nuevo mapa del sitio y arquitectura de la home, (c) requisitos funcionales, (d) stack y modelo de datos, (e) plan de migración de las 144 URLs y del archivo documental, (f) roadmap y lista de tareas priorizada.

---

## Anexo A — URLs rastreadas (agrupadas)

### A.1 Núcleo
```
/
/Startseite
/default.aspx
/system/web/default.aspx?menuonr=218626573
```

### A.2 Bürgerservice
```
/Buergerservice
/Buergerservice/Amtliche_Termine
/Buergerservice/Amtstafel
/Buergerservice/Formulare
/Buergerservice/Gebuehren
/Buergerservice/Gemeindezeitung
/Buergerservice/Informationsfreiheit
/Buergerservice/Legalisator
/Buergerservice/Muelltermine
/Buergerservice/Rechnungsabschluesse
/Buergerservice/Wasserinformationen_Wasserqualitaet_Wasserhaerte
/Buergerservice/News
/Buergerservice/Newsletter_abonnieren
/Buergerservice/Verordnungen
/Buergerservice/Zustaendigkeiten
/Buergerservice/Barrierefreiheit
/Buergerservice/Datenschutz
```

### A.3 Gemeindeamt
```
/Gemeindeamt
/Gemeindeamt/Amtsleiter
/Gemeindeamt/Anfrage_und_E-Mail
/Gemeindeamt/Die_Amtssignatur
/Gemeindeamt/Einrichtungen
/Gemeindeamt/Einrichtungen/Gebaeudeinventar_Gemeinde
/Gemeindeamt/Kontakt_und_Amtszeiten
/Gemeindeamt/Verwaltung
/Gemeindeamt/Verwaltung/Abteilungen
/Gemeindeamt/Verwaltung/Amtsleiter
/Gemeindeamt/Verwaltung/Foerderungen
/Gemeindeamt/Verwaltung/Mitarbeiter
/Gemeindeamt/Wissenswertes
/Gemeindeamt/Wissenswertes/Aus_der_Geschichte
/Gemeindeamt/Wissenswertes/Statistische_Daten
/Gemeindeamt/Wissenswertes/Wappen
/Gemeindeamt/Wissenswertes/Zahlen_und_Fakten
```

### A.4 Politik
```
/Politik
/Politik/Buergermeister
/Politik/Vizebuergermeister
/Politik/Gemeinderat
/Politik/Gemeindevorstand
/Politik/Ausschuesse
/Politik/Protokolle
/Politik/Wahlergebnisse
```

### A.5 Resto de áreas
```
/Veranstaltungskalender
/Veranstaltungskalender/Meine_Veranstaltungen      (500)
/Veranstaltungskalender/Newsletter_abonnieren
/Vereine
/Bundesmusikkapelle_Wiesing_1
/Wirtschaft
/Gastronomie
/Gesundheit_und_Soziales
/Gesundheit_und_Soziales/Notdienste
/Kirche_und_Religion
/Kirche_und_Religion/Index
/Kirche_und_Religion/Interessante_Links
/Kirche_und_Religion/Kirchengeschichte
/Schule_und_Bildung
/Unterkuenfte
/Digitaler_Ortsplan
/Formular
```

### A.6 Contenido dinámico y detalle
```
/Buergerservice/News
/Gottesdienstordnung_der_Pfarre_Wiesing
/Forstweg_im_Bereich_Sportplatz_und_Astenberg_voruebergend_gesperrt
/Eroeffnung_RE_USE_Shops_in_Schwaz
/Jede_r_Zweite_fuehlt_sich_auf_den_Ernstfall_nicht_ausreichend_vorbereitet_
/Volkstanz_2
/Adventmarkt_Wiesing_2
/Nikolauseinzug_3
/Senioren-Adventfeier_2
/84_Ausgabe
/84_Ausgabe_18
/Oeffentliche_Bekanntmachung_einer_muendlichen_Verhandlung_GP_1098
/Oeffentliche_Bekanntmachung_einer_muendlichen_Verhandlung_Dorf_83c
/Kundmachung_ueber_Umlaufbeschluesse_der_Forsttagsatzungskommission
/Kundmachung_Amtsstunden_und_Parteienverkehrszeiten_sowie_Bekanntmachungen_gem_13_Abs_2_5_42_Abs_1a_Allgemeines_Verwaltungsverfahrensgesetz_1991_und_86b_Bundesabgabenordnung
```

### A.7 Tasas (detalle)
```
/Ankuendigungssteuer
/Biomuellkuebel
/Biosaecke
/Erschliessungsbeitrag
/Friedhofsgebuehren_1
/Grundsteuer_A
/Grundsteuer_B
/Hausnummer
/Hundesteuer
/Kanalanschlussgebuehren
```

### A.8 Plan de ordenación (5 copias) y residuos
```
/Oertliches_Raumordnungskonzept
/Oertliches_Raumordnungskonzept_1
/Oertliches_Raumordnungskonzept_13
/Oertliches_Raumordnungskonzept_14
/Oertliches_Raumordnungskonzept_22
/Muellkalender
/Biomuellabholung_3 / _12 / _16 / _24
/Restmuellabfuhr_11 / _12 / _17 / _19 / _22
/Problemstoffsammlung_2 / _8 / _19 / _22
```

### A.9 Sistema y variantes
```
/system/web/sitemap.aspx?menuonr=218626582
/system/web/impressum.aspx?menuonr=223380049
/system/web/wetter.aspx?menuonr=218626584
/system/web/news.aspx?menuonr=218626578
/system/web/formular.aspx?letter=ALLE|B|E|F|G|H|I|K|M|P|S|V|W
/system/web/gebuehr.aspx?letter=ALLE&page=1|2
/system/web/termin.aspx?design=…
/system/web/amtstafel.aspx?design=…
/system/web/kalender.aspx?detailonr=…
/system/web/zusatzseite.aspx?menuonr=226758943&detailonr=226758939
?design=cssgraphicmode | csshighcontrast | cssnostyle
```

### A.10 No verificables
```
https://www.wiesing.gv.at/e-zustellung
https://sessionnet.service365.at/70939m
https://formulare.service365.at/standard/start.do?party=70939&generalid=ELEKTRONISCHE_ZUSTELLUNG
```

---

*Fin de la Entrega 1. Datos obtenidos por rastreo directo el 17.11.2026; las cifras de tráfico/rendimiento son mediciones puntuales, no una serie histórica.*
