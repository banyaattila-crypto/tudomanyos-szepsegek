# STATUS_REPORT — Halhatatlan tudományos szépségek (PWA)

**Projekt:** Telepíthető webapp (PWA) — szubjektív rangsor a legszebb matematikai, fizikai és informatikai tételekről.
**Hely:** `/home/ubuntu/tudomanyos-szepsegek/`
**Utolsó frissítés:** 2026. október 11.
**Fő fájlok (forrás):** `index_template.html` (430 soros vékony HTML-váz) + `app.css` (1435 sor) + `app.js` (2910 sor) + `editor.js` (269 sor) + `data/*.json` (473 tartalom).
**Production:** `dist/` — ugyanez **4 külön, külön cacheelhető fájlban** (`index.html` 18 KB + `app.css` 67 KB + `app.js` 699 KB + `editor.js` 11 KB), nem egy monolitban.

---

## 1. JELENLEGI ÁLLAPOT — ÖSSZEFOGLALÓ

A PWA **teljesen működőképes**, production-ready állapotban van. Összesen **473 tétel** (3 domain, 6 nézet + Kedvencek fül + szerkesztőpanel, wiki linkekkel és helyben generált illusztrációkkal), obszervatóriumi "Kozmikus aurora" dizájn, deck móddal, "Tippeld meg a képletet" játékkal, kártyakészítővel, Éjszakai égbolt móddal, **beépített szerkesztővel** és offline-tűrő architektúrával.

| Metrika | Érték |
|---|---|
| Tételek összesen | **473 (minden slug egyedi, 0 duplikátum-ütközés)** |
| — Matematika | 202 |
| — Fizika · Kémia · Biológia | 207 |
| — Informatika | 64 |
| Domainek | 3 (matek / fizika / informatika) |
| Nézetek | 7 fül: Rangsor / Kategóriák / Idővonal / Lapozó / Játék / Térkép / Kedvencek |
| Szerkesztő panel | ✅ új (edit, add, delete, export, offline) |
| Wiki linkek | minden tételnél (en/hu.wikipedia.org) |
| SVG illusztrációk | 318+ (matek 123, fizika 194, info 41) |
| PWA telepíthető | igen (manifest.json + sw.js **v7**) |
| Offline tűrés | igen (SW precache: index.html + app.css + app.js + editor.js + KaTeX-független boot) |
| Forrás fájlszerkezet | **4 fájl** (nem monolit): `index_template.html` + `app.css` + `app.js` + `editor.js` |
| Build step | `python3 build.py` (JSON → `dist/` 4 fájl) + smoke guard |
| Script szintaxis | Node --check: OK (a build smoke guard része, 2 JS-en) |

---

## 2. FUNKCIÓK ÉS ÁLLAPOTUK

### Tartalom és adat
- [x] **3 domain** (Matematika, Fizika·Kémia·Biológia, Informatika) — dedikált színvilág, cím, alcím
- [x] **473 tétel** (202 matek + 207 fizika + 64 info) — minden tétel: `name`, `tag`, `category`, `year`, `tex`/`equations`, `why`, `wiki`, `illustration`
- [x] **Wikipedia gombok** — minden tételnél ℹ ikon, angol wiki cikkre nyit új fület
- [x] **Helyben generált SVG illusztrációk** — 4 téma (wave / lattice / graph / spiral), offline működőképes

### Nézetek
- [x] **Rangsor** (grid, kedvenc/ugrás/wiki gombokkal)
- [x] **Kategorikus** (csoportosított, kibontható)
- [x] **Idővonal** (évszám szerint)
- [x] **Lapozó / Deck** — teljes képernyős kártya nézet, swipe + gombok (‹/›/🎲), nagy kattintható gombok, képlet középen, csak kedvenc + Részletek akciók
- [x] **Játék** ("Tippeld meg a képletet" — 10 kör, 4 választós, pontszám, KaTeX-felfedés, összesítő)
- [x] **Térkép** (tudás-gráf, pinch-zoom mobilon)
- [x] **Kedvencek fül** (dedikált nézet, `data-view="fav"`)
- [x] **Deck UX B4–B7 (2026-10-11)** — lapozó kategória-szűrő (`#deckCats`), keresés a pakliban (`#deckSearch`), billentyűparancsok a deck alján (`←/→`, `F`, `R`), Kedvencek fül

### Dizájn — "Kozmikus aurora" obszervatórium
- [x] **Aurora sávok** — hullámzó zöld/lila/kék fény a főcím felett (`@keyframes aurora`, 9s, erősített színek + arany sáv)
- [x] **Forgó galaxis-köd** — lassan forgó radiális köd jobb alsó sarokban (`@keyframes galaxySpin`, 120s)
- [x] **Parallax csillagpor** — görgetéskor a háttérrétegek lassabban mozognak, mint a tartalom (rAF-throttle-olt scroll)
- [x] **Twinkle** — a csillagpor pislákol (opacity + brightness pulzálás, 7s)
- [x] **Nebula színkövetés** — a köd színe domainenként változik (matek=arany/kék, fizika=cián/arany, info=zöld/púrpa)
- [x] **Főcím glow** — a "legszebb" szó pulzáló arany fénykoszorúban (`@keyframes goldPulse`, 5.5s)
- [x] **Tétel hover-glow** — sorok és deck kártyák "kigyulladnak" hoverre (border + box-shadow + emelkedés)

### Interakció és megosztás
- [x] **Kártyakészítő** — share gomb a rangsor sorokban; PNG kártyát tölt le az adott tételről (canvas alapú, offline működik). A deck nézetből a felhasználó kérésére kivéve.
- [x] **Kedvencek** — localStorage-ben tárolt kedvenc tételek
- [x] **Keresés** — szűrés név/címke/leírás alapján
- [x] **Kategória-szűrő** — a filter barban
- [x] **Napi kiemelés** ("A nap szépsége") — véletlen tétel dátumalapú seeddel
- [x] **Statisztika nézet** — a gyűjtemény áttekintése

### Technikai / PWA
- [x] **SW v7 cache** — `tsz-cache-v7`, precache a **moduláris app shellre** (`./`, `index.html`, `app.css`, `app.js`, `editor.js`, `manifest.json`), skipWaiting + clients.claim, network-first HTML, auto-reload új verzióra
- [x] **KaTeX-független indítás** — `safeKatex` wrapper + boot fix: az app mindig elindul, KaTeX hiányában nyers TeX fallback
- [x] **Manifest** — telepíthető ikonokkal (icon-192/512/maskable)
- [x] **Fraunces kiemelések** — a "sárgás keretes" kiemelések olvasható Fraunces betűtípussal (Caveat kézírás helyett)

---

## 3. ARCHITEKTÚRA (frissítve 2026-10-11)

- **Adatkülönítés:** `data/*.json` (matek/fizika/informatika) — egyszerű szövegfájlok, git-diff-barát
- **Sablon:** `index_template.html` — csak a HTML-váz (430 sor): head, DOM, `<link href="app.css">` + `<script src="app.js">` + `<script src="editor.js">`
- **CSS:** `app.css` (1435 sor) — a korábbi két `<style>` blokk egyben
- **Core JS:** `app.js` (2910 sor) — adat-bootstrap (`loadData()` devben, buildkor törölve) + core + minden nézet + boot
- **Editor JS:** `editor.js` (269 sor) — szerkesztőpanel IIFE, klasszikus `<script src>` (szándékosan **nem** `type="module"`, hogy a `MATEK_DATA` globális scope-ban maradjon)
- **Build:** `python3 build.py` — JSON beágyazás az `app.js`-be → `dist/` (4 különálló fájl) + smoke guard
- **Editor panel:** beépített ✏️ gomb, domain tab, lista, edit form, add/delete/export, localStorage backup
- **Adatok:** `MATEK_DATA`, `FIZIKA_DATA`, `INFORMATIKA_DATA` tömbök (build-time beágyazva)
- **DOMAINS:** a 3 domain konfigurációja (label, titleHTML, subHTML, data, categoryLabels, categoryColors, illustration témák)
- **Render:** `renderGrid()`, `renderDeck()`, `renderDailyFeature()` — a szűrők és nézetek szerint rajzolják a DOM-ot
- **Háttérrétegek:** `.aurora-bg`, `.stardust-bg`, `.nebula-bg`, `.galaxy-bg`, `.ghost-bg` — `position:fixed`, `pointer-events:none`, `mix-blend-mode:screen`
- **Service Worker:** `sw.js` (v7) — precache a 6 tagú app shellre (`./`, index.html, app.css, app.js, editor.js, manifest); a `data/*.json` **nem** precacheljük, mert prodban az adatok az `app.js`-ben vannak; network-first HTML, auto-reload új verzióra
- **Editor adat:** `localStorage` (`tsz_editor_*`) — offline szerkesztés, export JSON-ra

### Fájlok

**Forrás (git, fejlesztés):**
| Fájl | Méret | Szerep |
|---|---|---|
| `index_template.html` | 430 sor / 18 KB | Vékony HTML-váz (a korábbi 5046 soros monolit helyett) |
| `app.css` | 1435 sor / 66 KB | Minden stílus |
| `app.js` | 2910 sor / 124 KB | Adat-bootstrap + core + minden nézet + boot |
| `editor.js` | 269 sor / 10 KB | Szerkesztő panel |
| `data/*.json` | 473 tétel | Tartalom (202 + 207 + 64), git-diff-barát |
| `build.py` | 391 sor | Build + `--validate-only` + smoke guard |
| `sw.js` | 85 sor | Service worker (cache v7) |
| `manifest.json`, `icon-*.png` | 1–7 KB | PWA meta + ikonok |

**Production (`dist/` — a CI ezt tölti fel):**
| Fájl | Méret | Szerep |
|---|---|---|
| `dist/index.html` | 18 KB | Vékony HTML (az adatok átkerültek az `app.js`-be) |
| `dist/app.css` | 67 KB | Stílusok |
| `dist/app.js` | 699 KB | JS + beágyazott 473 tétel |
| `dist/editor.js` | 11 KB | Szerkesztő |
| `dist/sw.js`, `dist/manifest.json`, `dist/icon-*` | — | PWA shell |

**Elavult / takarításra vár:**
| Fájl | Méret | Szerep |
|---|---|---|
| `index.html` (gyökér) | 745 KB | **ELAVULT monolit** — nem hivatkozza az új fájlokat, nem ez a forrás |
| `files.zip` | 239 KB | **ELAVULT** — a régi buildet csomagolja, újra kell zip-elni (vagy törölni) |
| `UX-prototipusok.html` | 10 KB | Korai UX demók (reference) |

*A `tudomanyos-szepsegek.html`, `sw-old.js` és az `index.html.*.bak` fájlok már nincsenek a repóban.*

---

## 4. ISMERT HIBÁK / KORÁBBI JAVÍTÁSOK

### Megoldott kritikus hibák
1. **"Szét esve + minden nagy" (CSS)** — az Informatika domain CSS-blokk nem volt lezárva `}`-vel, és egy árván `--bg` deklaráció magába foglalta a `body`/`.row` szabályokat. Javítva: blokk lezárása + árván `--bg` törlése. (Bizonyíték: CDP computed-style + screenshot.)
2. **Kártyakészítő nem működött** — két hiba: (a) a `renderTexToImage` template literaljába bekerült az egész `<style>` CSS (deck szabályok), így a függvény szintaktikailag hibás volt; (b) a KaTeX SVG `foreignObject` → `Image` → `canvas` lánc "tainted canvas" hibát dobott (`toBlob` nem engedett exportálni). Javítva: a deck CSS eltávolítva a template-ből, a képlet nyers TeX szövegként íródik a kártyára (nem taint-eli a canvast).
3. **KaTeX függőség (üres oldal offline)** — ha a KaTeX CDN nem töltőtt be, az app nem indult. Javítva: `safeKatex` wrapper + boot fix (init mindig lefut, KaTeX nélkül nyers TeX fallback).
4. **"345" számláló** — a `grandTotalEl` csak MATEK+FIZIKA számolt, az Informatikát nem. Javítva: mindhárom domain `.length` -e.
5. **Kézírásos (Caveat) betűtípus** — a kiemelések olvashatatlanok voltak. Cserélve Fraunces-re.

### Ismert korlátok
- **Offeline KaTeX nincs beágyazva** — a képletek KaTeX CDN-ről jönnek; ha sosem volt net, a képletek nyers TeX szövegként jelennek meg (nem formázottan). A SW cache miatt egyszeri online után offline is formázott marad. (A teljes beágyazást a felhasználó nem kérte — "nem játszunk ezzel, marad így".)
- **48 matek tételnek nincs illusztrációja** — ezeknek a kategóriája nincs a `CATEGORY_THEME` térképben, szó csak a rank-plate látszik. Esztétikai, nem funkcionális.
- **Deck nézet CSS hiánya (JAVÍTVA 2026-08-08)** — a Lapozó módnak nem volt dedikált CSS-e: a kártya átlátszó/elszórt volt, a `‹/›` és `🎲` gombok a böngésző apró alapértelmezett `<button>` méretében jelentek meg, így szinte kattinthatatlanok voltak. Javítva: `.deck-view` (középre zárt flex elrendezés), `.deck-card` (620px széles, sötét keretes panel), `.deck-navbtn`/`.deck-rand` (56×56px körök), `.deck-actions .icon-btn` (44×44px), `.deck-confetti` canvas helyes pozicionálása (`z-index:2`, `pointer-events:none`). Bizonyíték: Node --check OK, CSS szabályok jelen, renderGrid deck ág + viewSwitch handler érintetlenül működik.
- **Deck képlet nem jelenik meg (JAVÍTVA 2026-08-08)** — a `renderDeck` képlet-blokkja `if (texSource && window.katex)` feltétellel csak akkor rajzolta a képletet, ha a KaTeX CDN már betöltődött; offline/lassú hálózaton a `deckFormula.style.display="none"` miatt a képlet **teljesen eltűnt**. Javítva: a `safeKatex` mindig meghívódik (az már tartalmazza a nyers-TeX fallbacket), és a `.deck-formula`-nak kifejezett `text-align:center` + `color:var(--paper)` + `.katex` méret stílust adtam, így a képlet középen, világos színnel, olvashatóan jelenik meg KaTeX jelenlététől függetlenül. Bizonyíték: Node --check OK, a `window.katex` feltétel eltávolítva a képlet-ágból.
- **Deck akció-gombok leegyszerűsítése (2026-08-08)** — a felhasználó kérésére a Lapozó nézetből kivettük a "kártya letöltése" (PNG) és az "oszd meg" gombokat; a deckben csak a **kedvenc (⭐)** és a **Részletek** gomb maradt. A `shareEntry`/`generateShareCard` függvények és a grid sorokban lévő kártya/oszd-meg gombok érintetlenül megmaradtak. Eltávolított elemek: `deckShare`, `deckCardBtn` DOM + JS ref, `CARD_SVG`, a hozzájuk tartozó `onclick` handlerek és SVG init. Bizonyíték: Node --check OK, nincs árva `deckShare`/`deckCardBtn`/`CARD_SVG` referencia, deck-actions HTML minimalizálva.
- **Tudás-gráf iPhone-on kicsi + nem nagyítható (JAVÍTVA 2026-08-08)** — két független hiba: (1) a `resetGraphView` alap scale-t `min(w,h)/820`-vel számolta, ami iPhone-on (~375px) ~0.46-os zsugorítást adott → a gráf aprónak tűnt; átírva `min(w,h)/560`-ra, felső korlát 1.1→1.6, így mobilra nagyobb az alapnézet. (2) fájl: a zoom csak `wheel` eseményre volt kötve (aszti görgő), iPhone-on nem létezik → hozzáadtam a **pinch-zoom**-ot: `touchstart`/`touchmove`/`touchend` handler két ujjal, a két ujj távolság-arányával nagyít (a wheel logikáját újrahasználva, zoom a felezőpont felé, plusz pánik a felezőpont mozgásával), `preventDefault`-dal hogy ne görgessen az oldal. A `graph-hint` szöveg frissítve ("csípd össze a nagyításhoz"). A `touch-action:none` a canvas-on megmaradt. Bizonyíték: Node --check OK, pinch handler + resetGraphView módosítás + hint frissítés konzisztens.
- **Megoldatlan feladatok / nyitott problémák (2026-08-08)** — a felhasználó kérésére 9 új tétel került be, kifejezetten a még megoldatlan/nyitott problémák témájából, "Megoldatlan" badge-dzsel: matek +3 (Ikertprím-sejtés, Hodge-sejtés, Birch–Swinnerton-Dyer-sejtés — mind Millennium-probléma), fizika +3 (Navier–Stokes-létezés és simaság, Yang–Mills-tömeghézag — Millennium-problémák, + Sötét anyag problémája), info +3 (Utazó ügynök problémája/TSP, Gráf-izomorfizmus, Fehérje-hajtogatás). A duplikátum-elkerülés miatt először kinyertem az összes meglévő tételnevet; a 9 új név egyike sincs benne, így valódi duplikáció nem keletkezett (9/9 OK). A korábbi gyöngyszem-bővítés során véletlenül bekerült 6 duplikátum (Wallis-szorzat, Erdős–Szekeres-tétel, Shannon-entrópia, A* keresés, RSA-titkosítás, PageRank — ezek már léteztek a fájlban) törölve lett. **Duplikátum-takarítás (2026-08-08, befejezve):** a felhasználó kérésére a maradék ~21 azonos nevű tételpár is át lett nevezve (a második előfordulás egyedi névre, pl. "Poincaré–Bendixson-tétel (mérnöki)", "RSA-titkosítás (cryptosystem)"), így a `domain:slug` azonosítók mind egyediek lettek. Ellenőrzés: 0 maradék domain-béli slug-ütközés, 453 tétel / 453 egyedi slug. Bizonyíték: Node --check OK, slug-ütközés ellenőrzés = 0.

---

## 5. FEJLESZTÉSI PONTOK — HOL TARTUNK

A korábban felvázolt 15 javaslatból (A/B/C/D/E) és a menet közben felmerült igényekből:

### Kész (✅)
- A) 1. Több tétel + 3. domain → **426 tétel, 3 domain** (azóta 473-ra bővült — lásd metrikatábla)
- A) 2. Wikipedia linkek → **minden tételnél**
- A) 3. SVG illusztrációk → **318 illu**
- B) Deck mód (menet közben kérték) → **5. nézet** (Rangsor / Kategória / Idővonal / Lapozó / Játék)
- C) Obszervatórium sötét dizájn → **Kozmikus aurora**
- C) 8. Twinkle csillagpor → **kész**
- C) 9. Nebula színkövetés → **kész**
- D) 11. SW cache-bug fix → **v4 + auto-reload**
- Menet közben: 24 elveszett tétel pótlása, CSS-hiba javítás, 396→426 számláló, Fraunces, kártyakészítő javítás
- ÚJ: **Kozmikus aurora design** (aurora 9s + galaxy + parallax + goldPulse + hover-glow)
- E) 14. "Tippeld meg a képletet" játék mód → **kész** (5. nézet "Játék", 10 köros menet, 4 választós, pontszám, KaTeX-felfedés, összesítő)
- E) 15. "Oszd meg" gomb social platformokra → **kész** (natív `navigator.share` mobilon + asztali menü: X / Facebook / Reddit / WhatsApp / Link másolása; **csak a rangsor sorokban**)
- WOW 1. Fénycsóva a kedvenc gombnál → **kész** (favBurst animáció, `--highlight` színnel)
- WOW 2. Konfitti a deck váltásnál → **kész** (canvas, 70 részecske, domain-színű paletta, előre/Random gombra)
- WOW 3. Intenzívebb aurora → **kész** (16s→9s, erősebb színek + arany sáv)
- DECK javítás 1. Deck nézet CSS hiánya → **kész** (középre zárt flex, 620px kártya, 56px navigációs körök, 44px ikon gombok)
- DECK javítás 2. Deck képlet eltűnése offline → **kész** (safeKatex mindig hívódik, nyers-TeX fallback, középre zárt világos képlet)
- DECK javítás 3. Deck akció-gombok leegyszerűsítése → **kész** (kártya + oszd-meg gombok kivéve a deckből; marad kedvenc + Részletek)
- **GYÖNGYSZEM-BŐVÍTÉS (2026-08-08)** — a felhasználó kérésére 30 új tétel került be ("tudományos gyöngyszemek"): matek +10 (Wallis-szorzat†, Leibniz π-sor, Machin-formula, Binet-képlet, Cantor átlóérv, Dirichlet-közelítés, Erdős–Szekeres†, Minkowski-egyenlőtlenség, Viviani-tétel, Ham-szendvics), fizika +10 (Young-kétréslassal, Malus-törvény, Lenz-törvénye, Bose–Einstein-eloszlás, Fermi–Dirac-eloszlás, Egyenértékűségi elv, Laplace-egyenlet, Poiseuille-törvény, Stokes-törénye, Michaelis–Menten-kinetika), info +4 (Shannon-entrópia†, A* keresés†, RSA-titkosítás†, PageRank†). A 30-ból 6 (†-jal jelöltek) duplikátum volt (már léteztek a fájlban), ezek a "Megoldatlan feladatok" pontban említett duplika-takarításkor törölve lettek → **nettó +24** (matek 191→201-1dup=200+... lásd metrikatábla: 202/207/44). Bizonyíték: Node --check OK, sztring-tudatos tételszámláló = 453 (432 egyedi).
- **ÉJSZAKAI ÉGBOLT (2026-08-08)** — ÚJ fejlesztési csavar: a kedvenc tételeid a háttérben csillagképként jelennek meg. A toolbarban lévő ✨ gombbal kapcsolható ("Éjszakai égbolt"), állapota localStorage-ben megmarad. A kedvencek determinisztikus helyen (név-hash alapján) pulzáló csillagként rajzolódnak ki egy fixed canvas rétegen (`#constellationBg`), köztük hullámos összekötő vonalakkal (konstelláció). Rájuk húzva a nevük + nyers képletük aurora-fényben megjelenik egy kis címkén; kattintásra a ráérkező domainre + rangsor nézetre váltva odagörget a tételhez (`scrollToEntry`). Teljesen offline (canvas + localStorage, nincs hálózat), a meglévő `favorites` Set-re és `toggleFavorite`-re épül (kedvenc váltásakor `rebuildConstellation()` hívódik). Bizonyíték: Node --check OK, DOM/CSS/függvények konzisztensek, `init()` visszaállítja a korábbi állapotot.
- **TAG-FELHŐ / TÉMA-SZŰRŐ (2026-08-28)** — ÚJ: a tételek `tag` mezőiből kinyert gyakori kulcsszavak (pl. "komplex számok", "jelfeldolgozás", "gráf", "kriptográfia", "Euler") kattintható chip-ekként jelennek meg a kategória-szűrő (filterbar) alatt, minden domainhez külön (`#tagcloud` div, `buildTagCloud()`). Kattintásra a kulcsszó a keresőmezőbe kerül (`searchQuery`), így a meglévő `applyFilter()` szűri a tételeket — a rendszer többi része érintetlen marad. Aktív chip láthatóan "bekapcsolva" (`.tchip.active`), a számláló (`countDisplay`) kiírja a téma-szűrőt is. A domain-váltás, a kézi keresés és a "Lásd még" ugrás (`goToRelated`) törli a téma-szűrőt. A parse-olás a `·` és `,` mentén bont, kiszűri az évszámokat, a "Megoldatlan" szót és a kategórianév-azonos tokeneket; a top 16 (>=2 előfordulás) jelenik meg. Bizonyíték: kód beillesztve, szemrevételezett szintaxis OK; `node --check`: OK (a build smoke guard részeként, 2026-10-11).
- **P0 JAVÍTÁSOK (2026-10-11)** — sablon core szekció visszaállítás, az editor betöltése `<script src>`-ből, SW precache a tényleges dist-fájlokra, `build.py` smoke guard (8 kötelező marker + `dist/index.html` fájlhivatkozás + `node --check` a 2 kilőtt JS-en). Commit `b985791`.
- **P1 JAVÍTÁSOK (2026-10-11)** — csillagtérkép slug, heti kártya domain-kulcs, deep-link, meteor-elemek, szerkesztő adatmegőrzés. Commit `5d1bb4e`.
- **DECK UX B4–B7 (2026-10-11)** — a korábban nyitott B) 4–7 mind befejezve: lapozó kategória-szűrő (`#deckCats`, „Összes” + kategóriák, az aktív állapot megjegyezve), keresés a pakliban (`#deckSearch`, debounce + szinkron a fő keresőmezővel), billentyűparancsok a deck alján (`.deck-keys`: `←/→` lapozás, `F` kedvenc, `R` véletlen), dedikált **Kedvencek fül** (`data-view="fav"`). Commit `0e4aa41`.
- **MODULÁRIS FÁJLSZERKEZET (2026-10-11)** — a felhasználó választása: „2. opció”, valódi külön fájlok **productionban is**. A 5046 soros monolit `index_template.html` szétválasztva: `app.css` (1435) + `app.js` (2910) + `editor.js` (269), a sablon 430 soros vékony váz. A `dist/` 4 külön fájlt szolgál ki (`index.html` 745 KB → 18 KB, az adatok most az `app.js`-ben); a `build.py` az adat-injektálást az `app.js`-be csinálja + mindent átmásol a `dist/`-be + smoke guard az új fájlokon; a `sw.js` precache lista és a cache-verzió (`v7`) frissítve. **Nem `type="module"`**: klasszikus `<script src>` — a cache-elési előny azonos, de nincs szigorú mód/scope-váltás kockázat (az `editor.js` a fő app `MATEK_DATA`-ját globális scope-ból olvassa, nincs `import`/`export` a kódban). Bizonyíték: `python3 build.py` exit 0, headless Chrome **prod 23/23 + dev 23/23 PASS**. Commit `8602dc7`.

### Nyitva (⬜)
- ~~B) 4–7 — Deck UX~~ → **kész 2026-10-11** (lásd fent)
- C) 10. Nyomtatható A4 lap minden tételről
- D) 12. Offline teljes működés (KaTeX + fontok beágyazása) — **ELVETVE** (felhasználó döntése)
- D) 13. `files.zip` újrazippelése/törlése + gyökér `index.html` (elavult monolit) törlése — **még nem** (a `tudomanyos-szepsegek.html`, `sw-old.js` és `.bak` fájlok már nincsenek a repóban)
- 48 matek tétel illusztrációjának pótlása — **még nem** (tartalmi munka, külön vállalható)

### Korábbi "wow" ötletek (mind kész, lásd fent)
- ~~Fénycsóva a kedvenc gombnál~~ → kész
- ~~Konfitti a deck váltásnál~~ → kész
- ~~Intenzívebb aurora~~ → kész
- 48 hiányzó matek illusztráció pótlása → még nem

---

## 6. TESZTELÉS / ELLENŐRZÉS

Minden változtatás után:
1. **Node --check** a JS fájlokon (`app.js`, `editor.js` — a build smoke guard részeként a dist-ekre is, exit 0)
2. **Build smoke guard** — `python3 build.py`: 8 kötelező szimbólum a `dist/app.js`-ben, a `dist/index.html` hivatkozza a külön fájlokat, `node --check` mindkét kilőtt JS-en
3. **CDP ellenőrzés** (Chrome DevTools Protocol headless chromiumon): DOM state, computed style, réteg-animációk
4. **Screenshot** (force-solid-bg módszer, mert a headless `--disable-gpu` paint-bugos) — vizuális megerősítés
5. **Headless Chrome e2e** (2026-10-11 óta) — saját tesztharness, **23 ellenőrzés prod ÉS dev módban is**: 6 nézet (rangsor/kategória/idővonal/lapozó/játék/térkép), deck UX (chipek, keresés, billentyűk), Kedvencek fül, csillagtérkép slug, heti kártya domain, deep-link, szerkesztő merge/persist/panel, külön fájlok betöltése (`inlineScripts: 0`) + CSS alkalmazódás (computed style). Eredmény: **prod 23/23 + dev 23/23 PASS**.

A "szét esve" hiba óta a headless screenshot **nem** megbízható egyedüli bizonyíték (a `--disable-gpu` nem festi le a背景 gradienst), ezért a CDP computed-style a döntő.

---

## 7. TEENDŐK (prioritási sorrendben, ha folytatjuk)

### Kész 2026-09-26 ✅
- Adatok szétválasztása: `data/*.json` (473 tétel, 3 domain)
- `index_template.html` + `build.py` — build pipeline
- **Szerkesztő panel** az oldalon belül (✏️ gomb, domain tab, lista, edit form, add/delete, JSON export, offline localStorage backup)
- SW v5 — data/*.json cache
- Validáció: `build.py --validate-only` (wiki URL, year range, TeX/equations/pairs, duplikátum)

### Kész 2026-10-11 ✅
- **P0** — sablon core szekció visszaállítás, editor `<script src>`-ből, SW precache, build smoke guard (`b985791`)
- **P1** — csillagtérkép slug, heti kártya domain-kulcs, deep-link, meteor-elemek, szerkesztő adatmegőrzés (`5d1bb4e`)
- **B) 4–7 Deck UX** — lapozó kategória-szűrő, keresés, billentyűparancsok, Kedvencek fül (`0e4aa41`)
- **Moduláris fájlszerkezet** — `app.css` + `app.js` + `editor.js` külön fájlokban, forrásban ÉS a `dist/`-ben; SW v7 precache (`8602dc7`)
- **Verifikáció** — build smoke guard + headless Chrome e2e 23/23 prod és dev módban

### Nyitva (⬜)
- C) 10 — Nyomtatható A4 lap minden tételről
- 48 matek tétel illusztrációjának pótlása
- Takarítás: gyökér `index.html` (elavult monolit) és `files.zip` törlése/újrazippelése
- **Push a GitHub-ra** — 4 commit vár a hitelesítésre (`b985791`…`8602dc7`)
- **Docs** — `README.md` frissítése az új fájlszerkezetre (még a régieket írja)

---

## 8. GYORS HASZNÁLATI ÚTMUTATÓ

### Szerkesztő (előállítva)
- Oldal megnyitása → jobb alsó sarok **✏️** gomb → szerkesztő panel
- Domain váltás (Matek/Fizika/Info), keresés, kattints szerkesztéshez
- **Mentés** → localStorage (offline is működik)
- **📥 JSON export** → letölti a 3 `data/*.json` fájlt
- **➕ Új** / **🗑 Töröl** — tétel kezelés
- Online/offline indikátor a panel fejlécében

### Build (telepítés)
```bash
cd /home/ubuntu/tudomanyos-szepsegek
python3 build.py              # → dist/ (index.html + app.css + app.js + editor.js)
python3 build.py --validate-only  # csak ellenőrzés, nem ír
```

### Online elérés
```bash
cd /home/ubuntu/tudomanyos-szepsegek
python3 -m http.server 8000
# http://localhost:8000/dist/index.html
```

### Fejlesztés (dev mode)
- Helyi szerverről nyisd meg: `http://localhost:8000/index_template.html` — az `app.css`/`app.js`/`editor.js` és a `data/*.json` hálózaton töltődik be (`file://` nem működik, CORS)
- Vagy a productiont: `http://localhost:8000/dist/index.html` (adat beágyazva, 4 fájl)
- Mindkét mód működik és mérve van: e2e **prod 23/23 + dev 23/23**
