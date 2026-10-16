# STATUS_REPORT — Halhatatlan tudományos szépségek (PWA)

**Projekt:** Telepíthető webapp (PWA) — szubjektív rangsor a legszebb matematikai, fizikai és informatikai tételekről.
**Hely:** `/home/attila/projects/tudomanyos-szepsegek/`
**Utolsó frissítés:** 2026. október 16.
**Fő fájlok (forrás):** `index_template.html` (314 soros vékony HTML-váz) + `app.css` (1872 sor) + `app.js` (5244 sor) + `editor.js` (269 sor) + `data/*.json` (509 tétel).
**Production:** `dist/` — **4 moduláris, külön cache-elhető fájlban** (`index.html` 17 KB + `app.css` 78 KB + `app.js` 809 KB + `editor.js` 12 KB), `index.htm` és `vercel.json` direkt kiszolgálással.

---

## 1. JELENLEGI ÁLLAPOT — ÖSSZEFOGLALÓ

A PWA **teljesen működőképes**, production-ready állapotban van. Összesen **509 tétel** (3 domain: 202 matek, 207 fizika, **100 informatika**, 7 nézet + Kedvencek fül + beépített szerkesztőpanel + **Interaktív Tudományos Laboratórium** + **Nyomtatható A4 Tudományos Adatlapok**), obszervatóriumi "Kozmikus aurora" dizájn, deck móddal, "Tippeld meg a képletet" játékkal, kártyakészítővel, Éjszakai égbolt móddal, teljes OpenGraph közösségi megosztással és offline-tűrő PWA architektúrával.

| Metrika | Érték |
|---|---|
| Tételek összesen | **509 (minden slug egyedi, 0 duplikátum-ütközés)** |
| — Matematika | 202 |
| — Fizika · Kémia · Biológia | 207 |
| — Informatika | **100** (+36 új alapvető algoritmus és tétel) |
| Évszám lefedettség | **100% (mind az 509 tétel rendelkezik pontos `year` mezővel)** |
| Figyelmeztetések (Warnings) | **0 (a build validator 0 hibával és 0 figyelmeztetéssel fut le)** |
| Domainek | 3 (matek / fizika / informatika) |
| Nézetek | 7 fül: Rangsor / Kategóriák / Idővonal / Lapozó / Játék / Térkép / Kedvencek |
| Interaktív laboratórium | **7 Canvas szimuláció** (Lorentz, Kvantum-alagút, Mandelbrot, Fourier, Conway, Kettős inga, N-test gravitáció) |
| Nyomtatás | **A4 Tudományos Adatlap generálás** (Print CSS / PDF export) minden tételnél |
| Szerkesztő panel | ✅ beépített (edit, add, delete, export, offline localStorage) |
| Wiki linkek | minden tételnél (en/hu.wikipedia.org) |
| SVG illusztrációk | **mind az 509 tételnél** (202 + 207 + 100), 4 téma: wave / lattice / graph / spiral |
| PWA telepíthető | igen (manifest.json + sw.js **v11**) |
| Offline tűrés | igen (SW precache: index.html + app.css + app.js + editor.js + KaTeX-független boot) |
| Közösségi megosztás | Teljes OpenGraph és Twitter kártya előnézet (og:title, og:image, og:description) |
| Mélyhivatkozás (Deep Link) | Támogatott `#entry-domain-slug`, `#slug`, `#sim-key`, dinamikus hashchange figyelés és másolás a lapozóból is |
| Forrás fájlszerkezet | **4 fájl** (moduláris): `index_template.html` + `app.css` + `app.js` + `editor.js` |
| Build step | `python3 build.py` (JSON → `dist/` 4 fájl) + smoke guard |
| Script szintaxis | Node --check: OK (a build smoke guard része, 2 JS-en) |
| CI / CD & Hosting | GitHub Actions automatikus build + GitHub Pages + Vercel (`vercel.json` direkt `dist` root) |

---

## 2. FUNKCIÓK ÉS ÁLLAPOTUK

### Tartalom és adat
- [x] **3 domain** (Matematika, Fizika·Kémia·Biológia, Informatika) — dedikált színvilág, cím, alcím.
- [x] **509 tétel** (202 matek + 207 fizika + **100 info**) — minden tétel: `name`, `tag`, `category`, `year`, `tex`/`equations`, `why`, `whyMore`, `wiki`, `illustration`.
- [x] **100% évszám-kitöltöttség** — minden tétel rendelkezik évszámmal (`build.py` 0 warning).
- [x] **Wikipedia gombok** — minden tételnél ℹ ikon, közvetlen hivatkozással.
- [x] **Helyben generált SVG illusztrációk** — 4 téma (wave / lattice / graph / spiral), **mind az 509 tételnél**, offline működőképes.

### Nézetek és eszközök
- [x] **Rangsor** (grid, kedvenc/ugrás/wiki/szimuláció/nyomtatás/linkmásolás gombokkal)
- [x] **Kategorikus** (csoportosított, kibontható)
- [x] **Idővonal** (kronológiai rendezés évszázadok szerint az ókortól napjainkig)
- [x] **Lapozó / Deck** — teljes képernyős kártyanézet, swipe + gombok (‹/›/🎲), kategóriaszűrő, kereső, billentyűparancsok (`←/→`, `F`, `R`), közvetlen link másolása (`deckLink`), szimuláció és nyomtatás gombok.
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

### Technikai / PWA / Megosztás
- [x] **SW v11 cache** — `tsz-cache-v11`, precache a moduláris app shellre, skipWaiting + clients.claim
- [x] **Vercel Root kiszolgálás** — `vercel.json` (`outputDirectory: "dist"`), közvetlen gyökér kiszolgálás átirányítási villanás nélkül
- [x] **OpenGraph & Twitter Card SEO** — teljes metaadatkészlet a közösségi platformokon való látványos megosztáshoz
- [x] **Dinamikus Mélyhivatkozás (Deep Linking)** — hashchange eseménykezelő, automatikus domain és nézetváltás, fókuszált kiemelés és görgetés
- [x] **KaTeX-független indítás** — `safeKatex` wrapper + boot fix: az app mindig elindul offline is
- [x] **Manifest** — telepíthető ikonokkal (icon-192/512/maskable)

---

## 3. ARCHITEKTÚRA ÉS FÁJLOK

### Forrásfájlok (git, fejlesztés):
| Fájl | Sorok / Méret | Szerep |
|---|---|---|
| `index_template.html` | 314 sor / 17 KB | Vékony HTML-váz (OG tagek, modalok, scriptek) |
| `app.css` | 1872 sor / 78 KB | Stíluslapok, aurora animációk, szimulációk, editor panel és print CSS |
| `app.js` | 5244 sor / 218 KB | Alkalmazáslogika, nézetek, szimulációk, nyomtatás és boot |
| `editor.js` | 269 sor / 12 KB | Beépített szerkesztőpanel modul |
| `data/*.json` | 509 tétel | Adatbázis (`matek.json`, `fizika.json`, `informatika.json`) |
| `build.py` | 262 sor | Build pipeline + `--validate-only` + smoke guard |
| `sw.js` | 87 sor | Service worker (cache v11) |
| `vercel.json` | 8 sor | Vercel konfiguráció (`outputDirectory: "dist"`) |
| `manifest.json`, `icon-*.png` | 1–7 KB | PWA metaadatok és ikonok |

### Production (`dist/` — a CI és webszerver ezt szolgálja ki):
| Fájl | Méret | Szerep |
|---|---|---|
| `dist/index.html` | 17 KB | Vékony HTML OG címkékkel |
| `dist/index.htm` | 17 KB | Kompatibilitási alias |
| `dist/app.css` | 78 KB | Tömör stíluslapok |
| `dist/app.js` | 809 KB | Core JS + beágyazott 509 tétel + szimulációk |
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
6. **Service Worker v11 és gyorsítótár-stratégia**:
   - Cache verzió növelése `tsz-cache-v11`-re az új 509 tételes kollekció, SEO és mélyhivatkozási frissítések azonnali élesítéséhez.
   - PWA precache lista szinkronban a moduláris felépítéssel.
7. **Szerkesztőpanel CSS javítása (head-szivárgás megszüntetése)**:
   - A korábban `index_template.html` `<head>`-be tag nélkül bekerült `#editorToggle` / `#editorPanel` nyers CSS átkerült az `app.css`-be.
   - Ezzel véglegesen megszűnt az oldal tetején korábban megjelenő nyers CSS kódblokk, a stílusok most már szabványosan a stíluslapból érvényesülnek.
8. **Informatika szekció kerek 100 tételre bővítése (2. pont)**:
   - 36 új kurátori informatikai tétel és algoritmus beépítése `data/informatika.json`-ba (Quicksort, FFT, Bellman–Ford, Kruskal, Prim, KMP, Boyer–Moore, B-fa, Piros-fekete fa, Heapsort, Mestertétel, Tarjan SCC, Viterbi, Kolmogorov-bonyolultság, Chaitin Omega, Church–Turing tézis, Chomsky-hierarchia, Cook–Levin SAT, Karp 21 NP, Idő/Tér-hierarchia, ECC, ElGamal, AES, SHA-256, Shamir titokmegosztás, Perceptron, Hopfield-háló, Q-tanulás, Word2Vec, ResNet, GAN, Lamport logikai órák, Raft konszenzus, Nakamoto PoW, Kvantum teleportáció).
   - Teljes katalógus mérete: **509 tétel** (202 matek + 207 fizika + 100 informatika).
   - 100% évszám- és SVG illusztráció-kitöltöttség, a validátor 0 hibával fut le.
9. **Vercel gyökér konfiguráció, OpenGraph és mélyhivatkozás (1. pont)**:
   - `vercel.json` létrehozása `"outputDirectory": "dist"` beállítással és 308-as redirectekkel: a Vercel közvetlenül a gyökérből (`tudomanyos-szepsegek.vercel.app`) szolgálja ki az appot, nincs szükség átirányításra a böngészősávban.
   - Teljes OpenGraph és Twitter Card SEO metaadat-készlet (`og:title`, `og:description`, `og:image`, `og:url`) az `index_template.html`-ben a közösségi megosztásokhoz.
   - Fejlett mélyhivatkozás (`handleDeepLink`): dinamikus `hashchange` figyelés, támogatja az `#entry-domain-slug`, `#entry-slug`, közvetlen `#slug` és `#sim-key` formátumokat, automatikusan domain-t és nézetet vált, simán odagörget, pulzáló kiemelést ad és toastot jelenít meg.
   - Közvetlen linkmásoló gomb (`deckLink`) a Lapozó / Deck kártyákon is.

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
- [x] Szerkesztőpanel CSS áthelyezése app.css-be (nyers CSS szöveg javítása)
- [x] 1. pont: Vercel tiszta gyökér (`vercel.json`), OpenGraph/Twitter kártya és fejlett mélyhivatkozás
- [x] 2. pont: Informatika szekció felzárkóztatása kerek 100 tételre (+36 tétel, 509-re bővült katalógus)
- [x] Service Worker v11 cache frissítés
- [x] README és STATUS_REPORT aktualizálása

*A rendszer production-ready, minden funkció működik és ellenőrzött.*
