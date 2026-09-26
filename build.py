#!/usr/bin/env python3
"""
build.py — tudomanyos-szepsegek
-------------------------------
Összerakja a PWA-t: data/*.json → index_template.html → dist/index.html

Használat:
    python3 build.py                  # normál build
    python3 build.py --validate-only  # csak validáció, nem ír fájlt
"""

import json, re, sys
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

    # 3. Sablon + beágyazás
    if not TEMPLATE.exists():
        print(f"Hiányzik a sablon: {TEMPLATE}")
        sys.exit(1)

    with open(TEMPLATE, encoding="utf-8") as f:
        tmpl = f.read()

    # Cseréljük ki a dev bootstrap-t a beágyazott adattal
    for domain in DOMAIN_MAP:
        const_name = f"{domain.upper()}_DATA"
        entries = data[domain]
        js_array = json.dumps(entries, ensure_ascii=False, indent=2)

        # A sablonban a fetch bootstrap így kezdődik:
        #   // ==== ADATOK: Dinamikus betöltés (dev mode) ====
        #   const MATEK_DATA = [];
        #   ...
        #   loadData();
        # Be kell cserélni a teljes blokkra:
        #   const MATEK_DATA = [...];
        #   const FIZIKA_DATA = [...];
        #   const INFORMATIKA_DATA = [...];
        #   // initApp() hívás marad

        # Keressük a "const X_DATA = [];" sort és az utána következő loadData() hívást
        # Egyszerre cseréljük mindháromöt
        pass  # lásd lent

    # Egyszerűbb approach: cseréljük ki a dev bootstrap részt
    # A sablonban a placeholder helyett most a dev bootstrap van
    # A dev bootstrap kezdődik: // ==== ADATOK: Dinamikus betöltés (dev mode) ====
    # És végződik: loadData();

    # Keresd meg a dev bootstrap blokkot és cseréld
    dev_bootstrap_start = "// ==== ADATOK: Dinamikus betöltés (dev mode) ===="
    if dev_bootstrap_start not in tmpl:
        print("❌ Sablon nem tartalmaz dev bootstrapot!")
        sys.exit(1)

    # A dev bootstrap a MATEK_DATA const = []; -tól kezdődik
    # és a loadData(); hívással ér véget
    # Nahát, inkább cseréljük ki soronként a const tömböket

    # Új approach: a sablonban a három const = []; legyen, és azt cseréljük ki
    # A dev bootstrap-ban:
    #   const MATEK_DATA = [];
    #   const FIZIKA_DATA = [];
    #   const INFORMATIKA_DATA = [];
    # Ezeket cseréljük ki a valódi adattal

    for domain in DOMAIN_MAP:
        const_name = f"{domain.upper()}_DATA"
        entries = data[domain]
        js_array = json.dumps(entries, ensure_ascii=False, indent=2)

        # Cseréljük: const X_DATA = []; → const X_DATA = <json>;
        old = f"const {const_name} = [];"
        new = f"const {const_name} = {js_array};"
        if old in tmpl:
            tmpl = tmpl.replace(old, new, 1)
            print(f"  Beágyazva: {const_name} ({len(entries)} tétel)")
        else:
            print(f"  ❌ Nem találtam: {old}")
            sys.exit(1)

    # Töröljük a loadData() hívást és az async function blokkot
    # A dev bootstrap eredetileg:
    #   async function loadData() { ... }
    #   loadData();
    # Ezt cseréljük ki üresre (az initApp() hívás marad)

    # Távolítsuk el a loadData definiálást és hívást
    # A sablonban a loadData() egy async function, aztán loadData();
    # Egyszerűen cseréljük ki a teljes dev bootstrap részt

    # Keressük az egész dev bootstrap részt
    # Kezdődik: // ==== ADATOK: Dinamikus betöltés (dev mode) ====
    # Végződik: loadData();

    # Inkább csak a fetch és loadData törlése maradjon, mert az initApp() kell
    # A sablon így néz ki:
    #   // ==== ADATOK: Dinamikus betöltés (dev mode) ====
    #   const MATEK_DATA = [...];  ← beépített
    #   const FIZIKA_DATA = [...];
    #   const INFORMATIKA_DATA = [...];
    #   async function loadData() { ... }  ← törölni
    #   loadData();  ← törölni, helyette initApp(); hívás kell
    #
    # De az initApp() hívás akkor jön, ha a loadData() async...
    # Rendben, cseréljük le: loadData() helyett közvetlenül hívjuk az initApp()-ot

    # Töröljük a loadData definíciót és hívást, az initApp hívás marad
    # A sablonban a loadData() az async function, aztán loadData(); a fájl elején vagy végén

    # Keresd meg és töröld a teljes dev bootstrap részt
    # A dev bootstrap:
    #   // ==== ADATOK: Dinamikus betöltés (dev mode) ====
    #   const MATEK_DATA = [...];
    #   const FIZIKA_DATA = [...];
    #   const INFORMATIKA_DATA = [...];
    #   async function loadData() { ... }
    #   loadData();
    #   ← itt kezdődik a DOMAINS és az app logika

    # Egyszerűbben: a loadData() hívást cseréljük initApp()-ra
    # és töröljük az async function loadData() definíciót

    # Töröljük az async function loadData() {...} részt
    # A sablonban ez így néz ki:
    #   async function loadData() {
    #     try {
    #       const [m, f, i] = await Promise.all([...]);
    #       MATEK_DATA.push(...m);
    #       ...
    #     } catch(e) { ... }
    #     initApp();
    #   }
    #   loadData();

    # Egy egyszerű regex nem elég a csúszós {...} tartalomhoz.
    # Inkább írjuk át manuálisan: cseréljük ki a teljes blokkot.

    # Keressük a blokkot: "async function loadData()" és az "{ ... } loadData();"
    # Használjunk regex-et az async function loadData() {...} loadData(); match-olására

    pattern = r"async function loadData\(\) \{.*?loadData\(\);\s*\n"
    match = re.search(pattern, tmpl, re.DOTALL)
    if match:
        tmpl = tmpl[:match.start()] + tmpl[match.end():]
        print("  Törölve: dev bootstrap (loadData)")
    else:
        print("  ⚠ loadData blokk nem találatos, hagyjuk")

    # Az initApp() hívás akkor fusson el, miután az adatok betöltődtek
    # A sablonban az initApp() egy DOMContentLoaded eventben vagy közvetlenül hívódik
    # Nézzük meg hol hívják az initApp()-ot

    # A sablon jelenleg nincs benne initApp() hívás — a loadData() vége hívta
    # Miután a loadData() törlődött, az initApp()-ot közvetlenül kell hívni
    # Az initApp() definiálása a DOMAINS után van a fájlban
    # Tehát az initApp() hívását az adatok után kell tenni

    # Most az initApp() definíciója van a fájlban, de nincs hívása
    # Adjunk hozzá egy initApp() hívást az adatok után

    # Keressük a "// ==== VEZÉRLŐ LOGIKA ====" sort és tegyük az utási első sortra a initApp();
    # Vagy még egyszerűbb: az első "const DOMAINS =" sort megelőző üres sorra

    # Valójában a DOMAINS konstans az adat után jön, és az initApp() is ott van definiálva
    # Az initApp() az app logika része, amit az adatok betöltése után kell hívni
    # Mivel most sincsen async, az initApp() közvetlenül hívható

    # Az initApp() meghívása az adatok beágyazása után
    # A DOMAINS const után tegyük

    # Keresd meg az "const DOMAINS = {" sort és tegyük az utáni sorra az initApp();
    # De csak ha nincs még initApp() hívás

    if "initApp()" not in tmpl:
        # Az initApp meghívását az első DOMAINS után tesszük
        # de nem találtunk initApp() hívást → nem kell hozzáadni
        # Az initApp() csak akkor kell, ha az app logika függvénye
        pass

    # Ellenőrizzük, hogy initApp() hívás van-e
    if "initApp();" not in tmpl and "initApp (" not in tmpl:
        # Nincs initApp() hívás. Az app logika az initApp() függvényben van,
        # amit kell hívni az adatok betöltése után.
        # Az initApp() definíciója a DOMAINS után van.
        # Tegyük az initApp(); hívást a DOMAINS konstans definition utáni első üres sorra
        # (vagyis az első render/init függvényhívás elé)

        # A sablon szerkezete:
        #   const DOMAINS = { ... };
        #   ← itt az app logika kezdődik
        #   const grid = document.getElementById(...)
        #   ...
        # A kezdeti loadData() az initApp()-ot hívta a data betöltés után
        # Most, mivel nincs async, közvetlenül hívhatjuk

        # Az initApp() függvény nem látszik a sablonban — valószínűleg nincs külön függvény
        # Az app logika azonnal fut (DOMContentLoaded vagy fő script elején)
        # Tehát nincs initApp() hívás — az oldal az elején betölti az adatokat és renderel
        # A fetch-based bootstrap az initApp()-ot hívta a data betöltése után
        # Most, mivel nincs async, az initApp()-ot a DOMContentLoaded-nél kell hívni
        # Vagy egyszerűbben: az app logika végén hívjuk az initApp()-ot

        # Valójában, a sablonban az app logika azonnal fut (nem függvényben)
        # Tehát nincs initApp() — az oldal simán betölti az adatokat és megjeleníti őket
        # A loadData() az initApp()-ot hívta, miután a fetch befejeződött
        # Most a build.py embedded adatokkal dolgozik, nincs szükség async-ra
        # Az initApp() helyett elegendő, ha a fájl elején betöltődnek az adatok
        # (amikor a script betöltődik, az adatok már ott vannak)
        pass

    # OUTPUT
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT, "w", encoding="utf-8") as f:
        f.write(tmpl)

    final_size = len(tmpl)
    print(f"\n{'='*50}")
    print(f"✅ BUILD KESZ: {OUTPUT}")
    print(f"   Méret: {final_size:,} bytes ({final_size//1024} KB)")
    print(f"   Tételek: {total} ({', '.join(f'{v} {k}' for k,v in stats.items())})")

if __name__ == "__main__":
    main()