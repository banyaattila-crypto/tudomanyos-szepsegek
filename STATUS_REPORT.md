# STATUS_REPORT — Halhatatlan tudományos szépségek (PWA)

**Projekt:** Telepíthető webapp (PWA) — szubjektív rangsor a legszebb matematikai, fizikai és informatikai tételekről.
**Hely:** `/home/attila/projects/tudomanyos-szepsegek/`
**Utolsó frissítés:** 2026. október 16.
**Fő fájlok (forrás):** `index_template.html` (455 soros vékony HTML-váz) + `app.css` (1717 sor) + `app.js` (5174 sor) + `editor.js` (269 sor) + `data/*.json` (473 tétel).
**Production:** `dist/` — **4 moduláris, külön cache-elhető fájlban** (`index.html` 20 KB + `app.css` 74 KB + `app.js` 776 KB + `editor.js` 12 KB), `index.htm` kompatibilitási aliasszal.

---

## 1. JELENLEGI ÁLLAPOT — ÖSSZEFOGLALÓ

A PWA **teljesen működőképes**, production-ready állapotban van. Összesen **473 tétel** (3 domain, 7 nézet + Kedvencek fül + beépített szerkesztőpanel + **Interaktív Tudományos Laboratórium** + **Nyomtatható A4 Tudományos Adatlapok**), obszervatóriumi "Kozmikus aurora" dizájn, deck móddal, "Tippeld meg a képletet" játékkal, kártyakészítővel, Éjszakai égbolt móddal és offline-tűrő PWA architektúrával.

| Metrika | Érték |
|---|---|
| Tételek összesen | **473 (minden slug egyedi, 0 duplikátum-ütközés)** |
| — Matematika | 202 |
| — Fizika · Kémia · Biológia | 207 |
| — Informatika | 64 |
| Évszám lefedettség | **100% (mind a 473 tétel rendelkezik pontos `year` mezővel)** |
| Figyelmeztetések (Warnings) | **0 (a build validator 0 hibával és 0 figyelmeztetéssel fut le)** |
| Domainek | 3 (matek / fizika / informatika) |
| Nézetek | 7 fül: Rangsor / Kategóriák / Idővonal / Lapozó / Játék / Térkép / Kedvencek |
| Interaktív laboratórium | **7 Canvas szimuláció** (Lorentz, Kvantum-alagút, Mandelbrot, Fourier, Conway, Kettős inga, N-test gravitáció) |
| Nyomtatás | **A4 Tudományos Adatlap generálás** (Print CSS / PDF export) minden tételnél |
| Szerkesztő panel | ✅ beépített (edit, add, delete, export, offline localStorage) |
| Wiki linkek | minden tételnél (en/hu.wikipedia.org) |
| SVG illusztrációk | **mind a 473 tételnél** (202 + 207 + 64), 4 téma: wave / lattice / graph / spiral |
| PWA telepíthető | igen (manifest.json + sw.js **v9**) |
| Offline tűrés | igen (SW precache: index.html + app.css + app.js + editor.js + KaTeX-független boot) |
| Forrás fájlszerkezet | **4 fájl** (moduláris): `index_template.html` + `app.css` + `app.js` + `editor.js` |
| Build step | `python3 build.py` (JSON → `dist/` 4 fájl) + smoke guard |
| Script szintaxis | Node --check: OK (a build smoke guard része, 2 JS-en) |
| CI / CD | GitHub Actions automatikus build + GitHub Pages deployment (zöld ✓) |

---

## 2. FUNKCIÓK ÉS ÁLLAPOTUK

### Tartalom és adat
- [x] **3 domain** (Matematika, Fizika·Kémia·Biológia, Informatika) — dedikált színvilág, cím, alcím.
- [x] **473 tétel** (202 matek + 207 fizika + 64 info) — minden tétel: `name`, `tag`, `category`, `year`, `tex`/`equations`, `why`, `wiki`, `illustration`.
- [x] **100% évszám-kitöltöttség** — a korábban hiányzó 273 évszám pótolva lett (`build.py` 0 warning).
- [x] **Wikipedia gombok** — minden tételnél ℹ ikon, közvetlen hivatkozással.
- [x] **Helyben generált SVG illusztrációk** — 4 téma (wave / lattice / graph / spiral), **mind a 473 tételnél**, offline működőképes.

### Nézetek és eszközök
- [x] **Rangsor** (grid, kedvenc/ugrás/wiki/szimuláció/nyomtatás gombokkal)
- [x] **Kategorikus** (csoportosított, kibontható)
- [x] **Idővonal** (kronológiai rendezés évszázadok szerint az ókortól napjainkig)
- [x] **Lapozó / Deck** — teljes képernyős kártyanézet, swipe + gombok (‹/›/🎲), kategóriaszűrő, kereső, billentyűparancsok (`←/→`, `F`, `R`), szimuláció és nyomtatás gombok.
- [x] **Játék** ("Tippeld meg a képletet" — 10 körös tudományos kvíz)
- [x] **Térkép** (tudás-gráf, csillagtérkép, pinch-zoom mobilon)
- [x] **Kedvencek fül** (dedikált nézet, `data-view="fav"`)
- [x] **Éjszakai égbolt** (kedvencek csillagképként kirajzolva)
- [x] **🕹️ Interaktív Tudományos Laboratórium**:
  - *Lorentz-transzformáció és Idődilatáció* ($v/c$ csúszka, élő fényóra, $\gamma$-faktor telemetria)
  - *Kvantum-alagúthatás* (Schrödinger-egyenlet, állítható $E, V_0, a$, transzmissziós együttható)
  - *Mandelbrot-halmaz* (élő komplex dinamika, kattintásos 2.5× nagyítás, 3 színpaletta)
  - *Fourier-sorfejtés* (forgó epiciklusok és szintetizált hullámforma négyszög/fűrészfog/háromszög jelekre, Gibbs-jelenség)
  - *Conway: Életjáték* (B3/S23 sejt-automata, kattintással rajzolható rács, beépített sablonok)
  - *Kettős inga és Káoszelmélet* (4. rendű Runge-Kutta [RK4] szimuláció, Pillangóhatás és ikeringa divergencia 0,001 rad kezdőeltérésből, Fázistér diagram [θ₁ vs ω₁], interaktív szög- és csillapítás-állítás)
  - *N-test gravitáció és Égimechanika* (szimplektikus Velocity Verlet integrátor [$\Delta E/E < 10^{-6}$], Chenciner–Montgomery 8-as pálya, Belső Naprendszer a Holddal, Lagrange L4/L5 pontok, Pitagoraszi 3-test és gravitációs parittya, interaktív égitest-indítás sebességvektorral)
- [x] **🖨️ Nyomtatható A4 Tudományos Adatlap**:
  - Nyomtatóbarát, letisztult fehér hátterű A4-es tudományos lap generálás minden tételhez (Ctrl+P / PDF mentés).
- [x] **Kártyakészítő** — PNG kártya letöltése megosztáshoz.

### Dizájn — "Kozmikus aurora" obszervatórium
- [x] **Aurora sávok** — hullámzó fény a főcím felett (`@keyframes aurora`, 9s)
- [x] **Forgó galaxis-köd** — lassan forgó köd a jobb alsó sarokban (`@keyframes galaxySpin`)
- [x] **Parallax csillagpor** — rAF-throttle-olt scroll-követés
- [x] **Twinkle** — csillagpor pislákolás
- [x] **Nebula színkövetés** — a köd színe domainenként változik
- [x] **Főcím glow & Hover-glow** — kiemelések Fraunces és pulzáló fénykoszorúval

### Technikai / PWA
- [x] **SW v9 cache** — `tsz-cache-v9`, precache a moduláris app shellre, skipWaiting + clients.claim
- [x] **KaTeX-független indítás** — `safeKatex` wrapper + boot fix: az app mindig elindul offline is
- [x] **Manifest** — telepíthető ikonokkal (icon-192/512/maskable)
- [x] **Gyökér átirányítás & kompatibilitás** — az elavult monolit gyökérfájl lecserélve tiszta átirányításra, `dist/index.htm` alias biztosítja a `.htm` linkek hibátlan működését.

---

## 3. ARCHITEKTÚRA ÉS FÁJLOK

### Forrásfájlok (git, fejlesztés):
| Fájl | Sorok / Méret | Szerep |
|---|---|---|
| `index_template.html` | 455 sor / 20 KB | Vékony HTML-váz (modalok, konténerek, scriptek) |
| `app.css` | 1717 sor / 74 KB | Stíluslapok, aurora animációk, szimulációk és print CSS |
| `app.js` | 5174 sor / 211 KB | Alkalmazáslogika, nézetek, szimulációk, nyomtatás és boot |
| `editor.js` | 269 sor / 12 KB | Beépített szerkesztőpanel modul |
| `data/*.json` | 473 tétel | Adatbázis (`matek.json`, `fizika.json`, `informatika.json`) |
| `build.py` | 262 sor | Build pipeline + `--validate-only` + smoke guard |
| `sw.js` | 87 sor | Service worker (cache v9) |
| `manifest.json`, `icon-*.png` | 1–7 KB | PWA metaadatok és ikonok |

### Production (`dist/` — a CI és webszerver ezt szolgálja ki):
| Fájl | Méret | Szerep |
|---|---|---|
| `dist/index.html` | 20 KB | Vékony HTML |
| `dist/index.htm` | 20 KB | Kompatibilitási alias |
| `dist/app.css` | 74 KB | Tömör stíluslapok |
| `dist/app.js` | 776 KB | Core JS + beágyazott 473 tétel + szimulációk |
| `dist/editor.js` | 12 KB | Szerkesztő modul |
| `dist/sw.js`, `manifest.json`, ikonok | — | PWA shell elemek |

---

## 4. FEJLESZTÉSI EREDMÉNYEK ÉS JAVÍTÁSOK

### 2026. október 14–16. ✅
1. **273 hiányzó évszám pótlása (100% lefedettség)**:
   - A `data/matek.json` (136 tétel) és `data/fizika.json` (137 tétel) tételeinek `year` mezőit automatizált elemzéssel és forrásellenőrzéssel feltöltöttük.
   - A `build.py --validate-only` kimenete: **0 hiba, 0 figyelmeztetés**.
   - Az **Idővonal nézet** most már mind a 473 tételt pontosan a saját évszázadába rendezi.
2. **Interaktív Tudományos Laboratórium (7 Canvas szimuláció)**:
   - Reszponzív, retina/DPI skálázott szimulációs keretrendszer az appon belül.
   - 7 interaktív fizikai és matematikai modell:
     1. *Lorentz-transzformáció és Idődilatáció* ($v/c$ relativisztikus csúszka, élő fényóra, $\gamma$ telemetria).
     2. *Kvantum-alagúthatás* (Schrödinger-egyenlet, állítható gátmagasság és elektronenergia, transzmissziós együttható).
     3. *Mandelbrot-halmaz* (élő komplex dinamika, kattintásos 2.5× zoom, 3 választható színpaletta).
     4. *Fourier-sorfejtés* (forgó epiciklusok és szintetizált hullámforma négyszög/fűrészfog/háromszög jelekre, Gibbs-jelenség).
     5. *Conway: Életjáték* (B3/S23 sejt-automata, kattintással rajzolható rács, glider/pulsar/acorn sablonok).
     6. *Kettős inga és Káoszelmélet* (4. rendű Runge-Kutta [RK4] integrátor szub-lépésekkel, ikeringa pillangóhatás $\Delta\theta_0 = 0.001\text{ rad}$ kezdőeltérésből, fázistér diagram [$\theta_1$ vs $\omega_1$], interaktív egérhúzás és szögállítás).
     7. *$N$-test gravitáció és Égimechanika* (szimplektikus Velocity Verlet integrátor, $\Delta E/E < 10^{-6}$ energiamegmaradás, Plummer lágyítás, 5 preset: Chenciner–Montgomery 8-as pálya, Belső Naprendszer a Holddal a Hill-gömbön belül, Lagrange L4/L5 libráció, Pitagoraszi 3-test és Voyager gravitációs parittya, interaktív égitest-indítás sebességvektorral és jobb klikkes törléssel).
   - Gyorsindító gombok a navigációban (`🕹️`), a tétel sorokban és a lapozó kártyákon (15 tételhez közvetlenül hozzárendelve).
3. **Nyomtatható A4 Tudományos Adatlap (C. 10 feladat)**:
   - Dedicated `printEntry()` funkció és `@media print` stíluslap.
   - Egy kattintással (🖨️ ikon) elegáns, fehér hátterű, Fraunces/KaTeX tipográfiájú A4 adatlap nyomtatása / mentése PDF-be.
4. **Takarítás és kompatibilitás**:
   - Az elavult, 745 KB-os monolit gyökér `index.html` lecserélve tiszta átirányításra.
   - A régi 240 KB-os bináris `files.zip` törölve a repóból.
   - `dist/index.htm` alias létrehozva a `.htm` végződésű linkek támogatására.
5. **Dokumentáció**:
   - `README.md` teljesen újraírva és aktualizálva.
   - GitHub szinkronizáció sikeres, GitHub Pages automatikus deployment lefutott (zöld pipával).
6. **Service Worker v9 és gyorsítótár-stratégia**:
   - Cache verzió növelése `tsz-cache-v9`-re az új szimulációk és módosított shell azonnali aktiválásához.
   - PWA precache lista szinkronban a moduláris felépítéssel.

---

## 5. HASZNÁLATI ÚTMUTATÓ

### Build és ellenőrzés
```bash
# Teljes build (dist/ frissítése és smoke guard futtatása)
python3 build.py

# Csak adat- és szintaxisellenőrzés (nem ír fájlt)
python3 build.py --validate-only
```

### Helyi webszerver futtatása
```bash
python3 -m http.server 8000
```
- **Alkalmazás:** [http://localhost:8000/dist/index.html](http://localhost:8000/dist/index.html) *(vagy simán `http://localhost:8000/`)*
- **Fejlesztési sablon:** [http://localhost:8000/index_template.html](http://localhost:8000/index_template.html)

---

## 6. NYITOTT FELADATOK / HÁTRALÉK

*Minden korábbi feladat és backlog-tétel sikeresen befejezve:*
- [x] B) 4–7 Deck UX (szűrő, kereső, billentyűk, kedvencek fül)
- [x] C) 10 Nyomtatható A4 lap minden tételről
- [x] D) 13 `files.zip` takarítása és gyökér átirányítás
- [x] 48 hiányzó matek illusztráció pótlása
- [x] 273 hiányzó évszám pótlása (0 warning)
- [x] 7 Canvas tudományos szimuláció (Kettős inga RK4 + N-test gravitáció Verlet)
- [x] Service Worker v9 cache frissítés
- [x] README és STATUS_REPORT aktualizálása

*A rendszer production-ready, minden funkció működik és ellenőrzött.*
