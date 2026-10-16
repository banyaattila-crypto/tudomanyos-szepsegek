# Halhatatlan tudományos szépségek (PWA)

Telepíthető webalkalmazás (PWA) — szubjektív, kurátori rangsor a legszebb matematikai, fizikai és informatikai tételekről, formulákról és összefüggésekről.
Obszervatóriumi „Kozmikus aurora” dizájn, interaktív szimulációk, KaTeX formulamegjelenítés, beépített szerkesztőpanel és teljes offline működés.

---

## Fő jellemzők

- **473 tétel** 3 tudományterületen:
  - 202 Matematika
  - 207 Fizika · Kémia · Biológia
  - 64 Informatika
  - Mindegyik tétel egyedi évszámmal (`year`), kategóriával, leírással, képlettel és SVG illusztrációval ellátva.
- **7 gazdag nézet**:
  - **Rangsor**: Teljes katalógus szűrőkkel, keresővel, kártya- és wiki hivatkozásokkal.
  - **Kategóriák**: Tudományterületi csoportosítás és kibontható szekciók.
  - **Idővonal**: Kronológiai rendezés az ókortól (i. e.) napjainkig évszázadok szerint.
  - **Lapozó (Deck)**: Teljes képernyős kártyanézet swipe- és billentyűvezérléssel (`←`/`→`, `F`, `R`).
  - **Kvízjáték**: „Tippeld meg a képletet” 10 körös interaktív tudományos kvíz.
  - **Térkép / Tudás-gráf**: Interaktív csillagtérkép és összefüggéshálózat pinch-zoommal.
  - **Kedvencek**: Mentett kedvencek dedikált nézete és csillagkép-rajzolója.
- **🕹️ Interaktív Tudományos Laboratórium**:
  - *Lorentz-transzformáció és Idődilatáció* (relativisztikus fényóra szimuláció, $v/c$ csúszka)
  - *Kvantum-alagúthatás* (Schrödinger-egyenlet, állítható $E, V_0, a$, hullámcsomag szétválás)
  - *Mandelbrot-halmaz* (élő komplex dinamika, 2.5× kattintásos zoom, 3 színpaletta)
  - *Fourier-sorfejtés* (forgó epiciklusok és szintetizált hullámforma négyszög/fűrészfog/háromszög jelekre)
  - *Conway: Életjáték* (B3/S23 sejt-automata élő rajzolással és sablonokkal)
- **🖨️ Nyomtatható A4 Adatlap**:
  - Nyomtatóbarát, letisztult fehér hátterű A4-es tudományos adatlap generálás minden tételhez (Ctrl+P / PDF mentés).
- **✏️ Beépített szerkesztő panel**:
  - Új tételek felvitele, meglévők szerkesztése, törlése, JSON exportálás és automatikus mentés (localStorage).

---

## Fájlszerkezet

| Fájl | Leírás |
|---|---|
| `data/*.json` | A 473 tétel adatai (`matek.json`, `fizika.json`, `informatika.json`) |
| `index_template.html` | Fejlesztési sablon (HTML váz) |
| `app.css` | Globális és nézetspecifikus stíluslapok, aurora animációk, print CSS |
| `app.js` | Alkalmazáslogika, nézetek, szimulációk, KaTeX és PWA kezelés |
| `editor.js` | Beépített szerkesztőpanel modul |
| `build.py` | Build pipeline: JSON validálás, adatinjektálás és `dist/` előállítás |
| `dist/` | Production build (4 moduláris, függetlenül gyorsítótárazható fájl) |
| `sw.js` | Service Worker v7 (PWA precache, offline támogatás) |
| `manifest.json`, `icon-*.png` | PWA telepíthetőségi metaadatok és ikonok |

---

## Használat

### 1. Build futtatása
```bash
python3 build.py
```
A build lefutásakor a beépített smoke guard szintaktikai és integritási ellenőrzést hajt végre a kilőtt fájlokon.

### 2. Csak validáció (adatellenőrzés)
```bash
python3 build.py --validate-only
```
Ellenőrzi a kötelező mezőket, évszám-tartományokat, TeX szintaxist, duplikátumokat és wiki linkeket.

### 3. Helyi fejlesztői szerver indítása
```bash
python3 -m http.server 8000
```
Nyisd meg a böngészőben:
- Production: [http://localhost:8000/dist/index.html](http://localhost:8000/dist/index.html) *(vagy simán `http://localhost:8000/`)*
- Fejlesztési sablon: [http://localhost:8000/index_template.html](http://localhost:8000/index_template.html)