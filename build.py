#!/usr/bin/env python3
"""
build.py — tudomanyos-szepsegek
-------------------------------
Összerakja a PWA-t: data/*.json → index_template.html → dist/index.html

Használat:
    python3 build.py                  # normál build
    python3 build.py --validate-only  # csak validáció, nem ír fájlt
"""

import json, re, sys, shutil, subprocess
from pathlib import Path

BASE = Path(__file__).parent
DATA_DIR = BASE / "data"
TEMPLATE = BASE / "index_template.html"
OUTPUT = BASE / "dist" / "index.html"

DOMAIN_MAP = {
    "matek": {"file": "matek.json", "label": "Matematika"},
    "fizika": {"file": "fizika.json", "label": "Fizika/Kémia/Biológia"},
    "informatika": {"file": "informatika.json", "label": "Informatika"},
}

# Kötelező mezők minden tételnek
REQUIRED = ["name", "tag", "category", "tex", "wiki", "why"]
# Opcionális mezők, ha hiányoznak: year, illustration
# year: lehet null vagy -500..2030 intervallum
# illustration: wave|lattice|graph|spiral, alapértelmezett: "wave"
# Opcionális, de ha vannak, akkor formatumukat ellenőrzi
OPTIONAL_VALID = {"wiki": lambda v: v.startswith("https://en.wikipedia.org/wiki/"),
                  "year": lambda v: isinstance(v, int) and -500 <= v <= 2030}

errors = []
warnings = []
stats = {}

def validate_entry(entry, domain, idx):
    """Egy tétel validációja. Hibákat gyűjti."""
    name = entry.get("name", f"<nincs név #{idx}>")
    prefix = f"[{domain}] {name}: "

    # Kötelező mezők
    for field in REQUIRED:
        if field not in entry or entry[field] is None or entry[field] == "":
            # Kivételek: year lehet hiányzó (sejtéseknek), tex helyett equations
            if field == "tex" and ("equations" in entry and entry["equations"]):
                continue  # equations van, tex nincs — OK
            if field == "tex" and "pairs" in entry and entry["pairs"]:
                continue  # pairs struktúra, tex helyett — OK
            errors.append(f"{prefix}hiányzó kötelező mező: '{field}'")

    # wiki URL formátum
    if "wiki" in entry and entry["wiki"]:
        if not (entry["wiki"].startswith("https://en.wikipedia.org/wiki/") or
                entry["wiki"].startswith("https://hu.wikipedia.org/wiki/")):
            errors.append(f"{prefix}rossz wiki URL: {entry['wiki']}")

    # year: opcionális, ha hiányzik warning
    if "year" not in entry or entry["year"] is None:
        warnings.append(f"{prefix}hiányzik 'year'")
    elif not (-500 <= entry["year"] <= 2030):
        errors.append(f"{prefix}year kívül: {entry['year']}")

    # illustration: opcionális, ha hiányzik warning, ha van érték ellenőrzés
    if "illustration" not in entry or not entry.get("illustration"):
        warnings.append(f"{prefix}hiányzik 'illustration' (defaults('wave'))")
    elif entry.get("illustration") not in {"wave", "lattice", "graph", "spiral"}:
        warnings.append(f"{prefix}ismeretlen illustration: {entry['illustration']}")


def main():
    validate_only = "--validate-only" in sys.argv

    # 1. Betöltés
    data = {}
    for domain, info in DOMAIN_MAP.items():
        path = DATA_DIR / info["file"]
        if not path.exists():
            errors.append(f"Hiányzik: {path}")
            continue
        with open(path, encoding="utf-8") as f:
            try:
                entries = json.load(f)
            except json.JSONDecodeError as e:
                errors.append(f"{info['file']}: JSON hiba: {e}")
                continue
        data[domain] = entries
        stats[domain] = len(entries)
        print(f"Betöltve: {info['file']} → {len(entries)} tétel")

    if not data:
        print("NINCS adat!")
        sys.exit(1)

    # 2. Validáció
    for domain, entries in data.items():
        for idx, entry in enumerate(entries):
            validate_entry(entry, domain, idx)

    # Duplikátum ellenőrzés (név+year egyediség)
    for domain, entries in data.items():
        seen = {}
        for entry in entries:
            key = (entry.get("name",""), entry.get("year", None))
            if key in seen:
                errors.append(f"[{domain}] duplikátum: {key[0]} ({key[1]})")
            else:
                seen[key] = True

    # Összesítés
    total = sum(stats.values())
    print(f"\n{'='*50}")
    print(f"Teljes: {total} tétel ({', '.join(f'{v} {k}' for k,v in stats.items())})")
    print(f"Figyelmeztetések: {len(warnings)}")
    print(f"Hibák: {len(errors)}")

    if warnings:
        print("\n⚠ FIGYELMEZTETÉSEK:")
        for w in warnings[:15]:
            print(f"  • {w}")
        if len(warnings) > 15:
            print(f"  ... és {len(warnings)-15} db további")

    if errors:
        print("\n✗ HIBÁK:")
        for e in errors[:20]:
            print(f"  ✗ {e}")
        if len(errors) > 20:
            print(f"  ... és {len(errors)-20} db további")
        print("\nBUILD SIKERTELEN — javítsd a hiányzó mezőket.")
        sys.exit(1)

    if validate_only:
        print("\n✅ Validáció lefutott, nincs hiba.")
        return

    # 3. Forrásfájlok (moduláris szerkezet: app.css + app.js + editor.js)
    APP_CSS = BASE / "app.css"
    APP_JS = BASE / "app.js"
    EDITOR_JS = BASE / "editor.js"
    for p in (TEMPLATE, APP_CSS, APP_JS, EDITOR_JS):
        if not p.exists():
            print(f"Hiányzik a forrásfájl: {p}")
            sys.exit(1)

    with open(APP_JS, encoding="utf-8") as f:
        app_js = f.read()

    # A dev bootstrap konstansait cseréljük a beágyazott adatra
    dev_bootstrap_start = "// ==== ADATOK: Dinamikus betöltés (dev mode) ===="
    if dev_bootstrap_start not in app_js:
        print("❌ app.js nem tartalmaz dev bootstrapot!")
        sys.exit(1)

    for domain in DOMAIN_MAP:
        const_name = f"{domain.upper()}_DATA"
        entries = data[domain]
        js_array = json.dumps(entries, ensure_ascii=False, indent=2)
        old = f"const {const_name} = [];"
        new = f"const {const_name} = {js_array};"
        if old in app_js:
            app_js = app_js.replace(old, new, 1)
            print(f"  Beágyazva: {const_name} ({len(entries)} tétel)")
        else:
            print(f"  ❌ Nem találtam: {old}")
            sys.exit(1)

    # Töröljük a dev loadData() bootstrapot (a beágyazott adat nem async)
    pattern = r"async function loadData\(\) \{.*?loadData\(\);\s*\n"
    match = re.search(pattern, app_js, re.DOTALL)
    if match:
        app_js = app_js[:match.start()] + app_js[match.end():]
        print("  Törölve: dev bootstrap (loadData)")
    else:
        print("  ⚠ loadData blokk nem található")

    # 4. dist/ összeállítása
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    with open(TEMPLATE, encoding="utf-8") as f:
        tmpl = f.read()
    with open(OUTPUT, "w", encoding="utf-8") as f:
        f.write(tmpl)
    with open(OUTPUT.parent / "index.htm", "w", encoding="utf-8") as f:
        f.write(tmpl)
    with open(OUTPUT.parent / "app.js", "w", encoding="utf-8") as f:
        f.write(app_js)

    # statikus fájlok átmásolása (app.css, editor.js, sw.js, manifest, ikonok)
    for extra in ("app.css", "editor.js", "sw.js", "manifest.json",
                  "icon-192.png", "icon-512.png", "icon-512-maskable.png"):
        src_path = BASE / extra
        if src_path.exists():
            shutil.copy2(src_path, OUTPUT.parent / extra)
            print(f"  Másolva: dist/{extra}")
        elif extra in ("app.css", "editor.js"):
            print(f"  ❌ Hiányzik: {src_path}")
            sys.exit(1)

    # ==== SMOKE GUARD: szemantikus ellenőrzés a kilőtt fájlokon ====
    with open(OUTPUT, encoding="utf-8") as f:
        out_html = f.read()
    with open(OUTPUT.parent / "app.js", encoding="utf-8") as f:
        out_js = f.read()
    with open(OUTPUT.parent / "editor.js", encoding="utf-8") as f:
        out_editor = f.read()

    # A sablon hivatkozzon a külön fájlokra
    ref_missing = [r for r in ('href="app.css"', 'src="app.js"', 'src="editor.js"')
                   if r not in out_html]
    if ref_missing:
        print("\n✗ SMOKE GUARD: dist/index.html nem hivatkozza a külön fájlokat:")
        for r in ref_missing:
            print(f"  ✗ {r}")
        sys.exit(1)

    required_markers = [
        "const DOMAINS",
        "function safeKatex",
        "function buildRow",
        "function renderGrid",
        "function applyFilter",
        "function toggleFavorite",
        "const grandTotalEl",
        "function boot(",
    ]
    missing = [m for m in required_markers if m not in out_js]
    if missing:
        print("\n✗ SMOKE GUARD: a kilőtt dist/app.js HIBÁS — hiányzó szimbólumok:")
        for m in missing:
            print(f"  ✗ {m}")
        print("  (valószínűleg a core szekció sérült — a fájl NEM adható ki)")
        sys.exit(1)
    if "EDITOR LOGIC" not in out_editor:
        print("\n✗ SMOKE GUARD: dist/editor.js hibás — nincs EDITOR LOGIC blokk")
        sys.exit(1)

    # node --check a kilőtt JS fájlokon (ha van node a gépen)
    node = shutil.which("node")
    if node:
        for jsfile in (OUTPUT.parent / "app.js", OUTPUT.parent / "editor.js"):
            r = subprocess.run([node, "--check", str(jsfile)], capture_output=True, text=True)
            if r.returncode != 0:
                print(f"\n✗ SMOKE GUARD: node --check hiba ({jsfile.name}):")
                print(r.stderr[:2000])
                sys.exit(1)
        print(f"Smoke guard OK: {len(required_markers)} marker + fájlhivatkozások + node --check (2 JS) ✔")
    else:
        print("Smoke guard OK: szimbólum-ellenőrzés ✔ (node nincs, a szintaxis-ellenőrzés kimaradt)")

    dist_files = ("index.html", "app.css", "app.js", "editor.js")
    sizes = {n: (OUTPUT.parent / n).stat().st_size for n in dist_files}
    total_size = sum(sizes.values())
    print(f"\n{'='*50}")
    print(f"✅ BUILD KESZ: dist/ ({len(dist_files)} fájl)")
    for n in dist_files:
        print(f"   {n}: {sizes[n]:,} bytes")
    print(f"   Összesen: {total_size:,} bytes ({total_size//1024} KB)")
    print(f"   Tételek: {total} ({', '.join(f'{v} {k}' for k,v in stats.items())})")

if __name__ == "__main__":
    main()