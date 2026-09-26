# tudomanyos-szepsegek

PWA — szubjektív rangsor a legszebb matematikai, fizikai és informatikai tételekről.
473 tétel, 3 domain, 5 nézet, beépített szerkesztő panel, offline is működik.

## Fájlok

| Fájl | Szerep |
|---|---|
| `data/*.json` | Tartalom (202 + 207 + 64 tétel) |
| `index_template.html` | Sablon (fejlesztési) |
| `build.py` | Build: JSON → `dist/index.html` |
| `dist/index.html` | Production (adatok beágyazva, 689 KB) |
| `sw.js` | Service worker v5 (data JSON cache) |
| `manifest.json`, `icon-*.png` | PWA meta |

## Használat

```bash
# Build
python3 build.py

# Elérés
python3 -m http.server 8000
# http://localhost:8000/dist/index.html
```

## Szerkesztő

Oldal → jobb alsó ✏️ gomb → panel → szerkeszt/add/delete/export JSON.

## Validáció

```bash
python3 build.py --validate-only
```