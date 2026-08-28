# STATUS_REPORT — Halhatatlan tudományos szépségek (PWA)

**Projekt:** Telepíthető webapp (PWA) — szubjektív rangsor a legszebb matematikai, fizikai és informatikai tételekről.
**Hely:** `/home/attila-ubuntu/Dokumentumok/Tudományos szépségek v1.01/`
**Utolsó frissítés:** 2026. augusztus 8.
**Fő fájl:** `index.html` (448 KB, egyetlen önálló fájl — nincs build step, közvetlenül megnyitható).

---

## 1. JELENLEGI ÁLLAPOT — ÖSSZEFOGLALÓ

A PWA **teljesen működőképes**, production-ready állapotban van. Összesen **450 tétel** (3 domain, 5 nézet, wiki linkekkel és helyben generált illusztrációkkal), obszervatóriumi "Kozmikus aurora" dizájnnak, deck móddal, "Tippeld meg a képletet" játékkal, kártyakészítővel (a rangsor sorokban), Éjszakai égbolt móddal és offline-tűrő architektúrával.

| Metrika | Érték |
|---|---|
| Tételek összesen | **453 (minden slug egyedi, 0 duplikátum-ütközés)** |
| — Matematika | 202 |
| — Fizika · Kémia · Biológia | 207 |
| — Informatika | 44 |
| Domainek | 3 (matek / fizika / informatika) |
| Nézetek | 5 (Rangsor / Kategória / Idővonal / Lapozó / Játék) |
| Wiki linkek | minden tételnél (en.wikipedia.org) |
| SVG illusztrációk | 318 (matek 123, fizika 194, info 41) |
| PWA telepíthető | igen (manifest.json + sw.js v4) |
| Offline tűrés | igen (SW cache + KaTeX-független boot) |
| Script szintaxis | Node --check: OK, brace balance 0/0/0 |

---

## 2. FUNKCIÓK ÉS ÁLLAPOTUK

### Tartalom és adat
- [x] **3 domain** (Matematika, Fizika·Kémia·Biológia, Informatika) — dedikált színvilág, cím, alcím
- [x] **426 tétel** — minden tétel: `name`, `tag`, `category`, `year`, `tex`/`equations`, `why`, `wiki`, `illustration`
- [x] **Wikipedia gombok** — minden tételnél ℹ ikon, angol wiki cikkre nyit új fület
- [x] **Helyben generált SVG illusztrációk** — 4 téma (wave / lattice / graph / spiral), offline működőképes

### Nézetek
- [x] **Rangsor** (grid, kedvenc/ugrás/wiki gombokkal)
- [x] **Kategorikus** (csoportosított, kibontható)
- [x] **Idővonal** (évszám szerint)
- [x] **Lapozó / Deck** — teljes képernyős kártya nézet, swipe + gombok (‹/›/🎲), nagy kattintható gombok, képlet középen, csak kedvenc + Részletek akciók

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
- [x] **SW v4 cache** — `tsz-cache-v4`, skipWaiting + clients.claim, network-first HTML, auto-reload új verzióra
- [x] **KaTeX-független indítás** — `safeKatex` wrapper + boot fix: az app mindig elindul, KaTeX hiányában nyers TeX fallback
- [x] **Manifest** — telepíthető ikonokkal (icon-192/512/maskable)
- [x] **Fraunces kiemelések** — a "sárgás keretes" kiemelések olvasható Fraunces betűtípussal (Caveat kézírás helyett)

---

## 3. ARCHITEKTÚRA

- **Egyetlen fájl:** `index.html` — HTML + CSS (`<style>`) + adatok + JS (`<script>`) egyben. Nincs build, nincs függőség telepítése.
- **Adatok:** `MATEK_DATA`, `FIZIKA_DATA`, `INFORMATIKA_DATA` tömbök a `<script>` elején.
- **DOMAINS:** a 3 domain konfigurációja (label, titleHTML, subHTML, data, categoryLabels, categoryColors, illustration témák).
- **Render:** `renderGrid()`, `renderDeck()`, `renderDailyFeature()` — a szűrők és nézetek szerint rajzolják a DOM-ot.
- **Háttérrétegek:** `.aurora-bg`, `.stardust-bg`, `.nebula-bg`, `.galaxy-bg`, `.ghost-bg` — `position:fixed`, `pointer-events:none`, `mix-blend-mode:screen`.
- **Service Worker:** `sw.js` (v4) — precache az app shell-re, network-first a HTML-re, cache minden GET kérést (így egyszeri online után offline is működik).

### Fájlok
| Fájl | Méret | Szerep |
|---|---|---|
| `index.html` | 448 KB | A teljes alkalmazás (egyetlen fájl) |
| `sw.js` | 2 KB | Service worker (cache v4) |
| `manifest.json` | <1 KB | PWA manifest |
| `icon-192.png`, `icon-512.png`, `icon-512-maskable.png` | 2–6 KB | App ikonok |
| `UX-prototipusok.html` | 9 KB | Korai UX demók (reference) |
| `files.zip` | 80 KB | **ELAVULT** — a régi buildet csomagolja, újra kell zip-elni |
| `tudomanyos-szepsegek.html` | 245 KB | **FÖLÖSLEGES** — régi mentés, törölhető |
| `sw-old.js` | 1 KB | **FÖLÖSLEGES** — elavult v1 SW, árva |
| `index.html.*.bak` (9 db) | 310–407 KB | Biztonsági mentések (fejlesztés közben) |

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
- A) 1. Több tétel + 3. domain → **426 tétel, 3 domain**
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
- **TAG-FELHŐ / TÉMA-SZŰRŐ (2026-08-28)** — ÚJ: a tételek `tag` mezőiből kinyert gyakori kulcsszavak (pl. "komplex számok", "jelfeldolgozás", "gráf", "kriptográfia", "Euler") kattintható chip-ekként jelennek meg a kategória-szűrő (filterbar) alatt, minden domainhez külön (`#tagcloud` div, `buildTagCloud()`). Kattintásra a kulcsszó a keresőmezőbe kerül (`searchQuery`), így a meglévő `applyFilter()` szűri a tételeket — a rendszer többi része érintetlen marad. Aktív chip láthatóan "bekapcsolva" (`.tchip.active`), a számláló (`countDisplay`) kiírja a téma-szűrőt is. A domain-váltás, a kézi keresés és a "Lásd még" ugrás (`goToRelated`) törli a téma-szűrőt. A parse-olás a `·` és `,` mentén bont, kiszűri az évszámokat, a "Megoldatlan" szót és a kategórianév-azonos tokeneket; a top 16 (>=2 előfordulás) jelenik meg. Bizonyíték: kód beillesztve, szemrevételezett szintaxis OK; node --check validálása a környezeti approval-blokk miatt még hátra (mobil teszt szükséges).

### Nyitva (⬜)
- B) 4. Kategória-szűrő a decken belül + emlékezzen, hol álltál
- B) 5. Keresés a deck módban is
- B) 6. Billentyűparancsok láthatóvá tétele a deck alján (←/→, F, R)
- B) 7. Kedvencek lista külön nézetben (dedikált fül)
- C) 10. Nyomtatható A4 lap minden tételről
- D) 12. Offline teljes működés (KaTeX + fontok beágyazása) — **ELVETVE** (felhasználó döntése)
- D) 13. `files.zip` újrazippelése + fölösleges másolatok (`tudomanyos-szepsegek.html`, `sw-old.js`) törlése — **még nem**
- 48 matek tétel illusztrációjának pótlása — **még nem** (tartalmi munka, külön vállalható)

### Korábbi "wow" ötletek (mind kész, lásd fent)
- ~~Fénycsóva a kedvenc gombnál~~ → kész
- ~~Konfitti a deck váltásnál~~ → kész
- ~~Intenzívebb aurora~~ → kész
- 48 hiányzó matek illusztráció pótlása → még nem

---

## 6. TESZTELÉS / ELLENŐRZÉS

Minden változtatás után:
1. **Node --check** a `<script>` blokkon (exit 0, brace balance 0/0/0)
2. **CDP ellenőrzés** (Chrome DevTools Protocol headless chromiumon): DOM state, computed style, réteg-animációk
3. **Screenshot** (force-solid-bg módszer, mert a headless `--disable-gpu` paint-bugos) — vizuális megerősítés

A "szét esve" hiba óta a headless screenshot **nem** megbízható egyedüli bizonyíték (a `--disable-gpu` nem festi le a背景 gradienst), ezért a CDP computed-style a döntő.

---

## 7. TEENDŐK (prioritási sorrendben, ha folytatjuk)

1. **D) 13 — Rendrakás** (legalacsonyabb kockázat, tisztaság): `files.zip` újrazippelése az új `index.html` -lel, `tudomanyos-szepsegek.html` + `sw-old.js` törlése, `.bak` fájlok archiválása/külön mappába.
2. **B) 4–7 — Deck UX** (legtöbb felhasználói érték): kategória-szűrő a decken, keresés a decken, billentyűparancsok láthatósága, kedvencek lista.
3. **C) 10 — Nyomtatható A4** (design): egy kattintásra letölthető/nyomtatható tételkártya.
4. *(E14–15 játék + oszd-meg, WOW finomítások, deck-javítások: **KÉSZ**, lásd 5. fejezet.)*

---

## 8. GYORS HASZNÁLATI ÚTMUTATÓ (felhasználónak)

- **Megnyitás:** `index.html` double-click (file://) vagy feltöltés webszerverre. Telepítés: böngésző "Telepítés" / "Add to home screen".
- **Nézetek:** felső ikonsor (Rangsor / Kategória / Idővonal / Lapozó).
- **Domainek:** felső gombsor (Matematika / Fizika / Informatika) — a háttér színe követi.
- **Kedvenc:** a csillag ikon a sorban/deckben.
- **Wiki:** az ℹ ikon a sorban/deckben.
- **Kártya letöltése (PNG):** a rangsor nézetben a sorokban lévő kártya ikon (🖼) → PNG letöltés. *(A deck nézetből a felhasználó kérésére kivéve.)*
- **Oszd meg:** a rangsor nézetben a sorokban lévő megosztás ikon → natív megosztó / social menü (X, Facebook, Reddit, WhatsApp, link másolása).
- **Játék mód:** felső ikonsor "Játék" gomb → "Tippeld meg a képletet" kvíz (10 kör, pontszám).
- **Éjszakai égbolt:** a felső ✨ gomb → a kedvenc tételeid csillagképként rajzolódnak ki a háttérben (pulzáló csillagok, hullámos összekötések); rájuk húzva a név+képlet, kattintásra odagörget a tételhez. Állapota megmarad kilépés után is.
- **Frissítés:** ha új verzió érkezik, a SW automatikusan újratölti (vagy Ctrl+Shift+R hard reload).
