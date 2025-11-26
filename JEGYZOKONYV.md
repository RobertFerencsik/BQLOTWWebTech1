# Jegyzőkönyv

**Elkészített projekt:** BQLOTWWebTech1

---

## Előlap

- **Cím:** Jegyzőkönyv az elkészített webes projekt dokumentációjához
- **Projekt:** `BQLOTWWebTech1`
- **Szerző:** (szerkesztheti) RobertFerencsik
- **Dátum:** 2025-11-26

---

## Tartalomjegyzék

- [Feladat leírása](#feladat-le%C3%ADr%C3%A1sa)
- [Projekt struktúra (mappa és fájlok)](#projekt-strukt%C3%BAra-mappa-%C3%A9s-f%C3%A1jlok)
- [Módosítások és fontos lépések](#m%C3%B3dos%C3%ADt%C3%A1sok-%C3%A9s-fontos-l%C3%A9p%C3%A9sek)
- [Felhasználói felület bemutatása](#felhaszn%C3%A1l%C3%B3i-fel%C3%BClet-bemutat%C3%A1sa)
- [Kód áttekintés és rövid magyarázat](#k%C3%B3d-%C3%A1ttekint%C3%A9s-%C3%A9s-r%C3%B6vid-magyarázat)
  - [JavaScript modulok](#javascript-modulok)
  - [CSS modulok](#css-modulok)
- [Fontos fájlok és elérési utak](#fontos-f%C3%A1jlok-%C3%A9s-el%C3%A9r%C3%A9si-utak)
- [Futtatás / megnyitás (local)](#futtat%C3%A1s--megnyit%C3%A1s-local)
- [Következtetések, további teendők](#k%C3%B6vetkeztet%C3%A9sek-tov%C3%A1bbi-teend%C5%91k)
- [Melléklet: rövid kódrészletek / példák](#mell%C3%A9klet-r%C3%B6vid-k%C3%B3dr%C3%A9szletek--p%C3%A9ld%C3%A1k)

---

## Feladat leírása

A projekt célja egy egyszerű oktató weboldal (LSTM neural networks témájú) létrehozása, amely több aloldalt tartalmaz (index, history, architecture, example, contact), valamint egy `src` mappastruktúrát stílusokkal, képekkel, adatokkal és JavaScript logikával.

Feladatként a projekt során a következő feladatokat végeztük el (példák):
- HTML fájlok karbantartása és linkek javítása (stílus és script elérési utak frissítése).
- JavaScript logika modulokra bontása (`src/script/` könyvtárban).
- CSS fájl modularizálása (`src/styles/` alá több részfájl létrehozása és a `styles.css` importálása).
- Új funkció (video vezérlők) hozzáadása az `example.html` oldalon.
- Több kisebb fájlmozgatás (pl. áthelyezés és átnevezés a `neptunkod_*` fájlok esetében a `BQLOTW_1008` mappába).

---

## Projekt struktúra (mappa és fájlok)

Az alábbiakban a projekt legfontosabb mappái és fájljai (rövidített, releváns lista):

- `BQLOTWWebTech1/`
  - `README.md`
  - `BQLOTW_0910/` ... (több oktatási mappa)
  - `BQLOTW_1008/`
    - `BQLOTW_color_font_size.html` (átnevezett korábbi neptunkod fájlok)
    - `BQLOTW_border.html`
    - `BQLOTW_padding.html`
    - `BQLOTW_margin.html`
    - `BQLOTW_display.html`
  - `neptunkod_5.html`, `neptunkod_5.js` (példafájlok)
  - `neptunkod_4.html` (másik példa)
  - `szamologep.html` (jquery számológép)
  - `neptunkod_*` eredeti fájlok (néhány át lett helyezve)
  - `BQLOTWWebTech/` (fő web app rész)
    - `index.html`
    - `history.html`
    - `architecture.html`
    - `example.html`
    - `contact.html`
    - `src/`
      - `styles/`
        - `styles.css` (fő fájl, most importálja a modulokat)
        - `global.css`
        - `header.css`
        - `main-content.css`
        - `home.css`
        - `history.css`
        - `architecture.css`
        - `example.css`
        - `sequences.css`
        - `forms.css`
        - `buttons.css`
        - `footer.css`
        - `responsive.css`
      - `script/`
        - `script.js` (fő inicializáló)
        - `animations.js` (animációk)
        - `form-validation.js` (contact form validáció)
        - `data-loader.js` (AJAX data.json betöltés, `src/data/data.json` új elérési úttal)
        - `dom-manipulation.js` (dinamikus DOM műveletek)
        - `video-controls.js` (videó gombok logikája)
      - `data/`
        - `data.json` (sequence adatok)
      - `img/` (képek, videó fájlok pl. `how-lstm-works.mp4`)

> Megjegyzés: a fenti struktúra a jelenlegi munkamappából és a legutóbbi módosításokból lett összeállítva; ha további fájlok vannak (pl. régebbi `neptunkod_*`), azok is a repo gyökérben vagy almappákban megtalálhatók.

---

## Módosítások és fontos lépések

Röviden összefoglalva a fontos változtatások, amelyeket a projektben elvégeztünk:

- Átnevezés és áthelyezés: a `neptunkod_*` fájlok át lettek helyezve és `BQLOTW_*` névvel elmentve a `BQLOTW_1008` mappába.
- JavaScript modulokra bontása: a korábbi egyetlen `script.js` nagy fájl részekre bontva a `src/script/` mappában:
  - `animations.js`, `form-validation.js`, `data-loader.js`, `dom-manipulation.js`, `video-controls.js` és egy kis `script.js` amely most csak inicializál.
- CSS modularizálása: a `src/styles/styles.css` tartalma felosztásra került több modulra (`global.css`, `header.css`, `home.css`, ...), a `styles.css` pedig importálja ezeket.
- `example.html` bővítése: videó alá vezérlő gombok kerültek (play/pause, mute/unmute, speed select, fullscreen) és a `src/script/video-controls.js` fájl készült hozzá.
- Link-frissítések: a HTML fájlokban a `styles.css` és `script.js` hivatkozások frissítve lettek úgy, hogy a `src/styles/styles.css` és `src/script/*.js` helyes elérési utakat használják.

---

## Felhasználói felület bemutatása

A weboldal több aloldalt tartalmaz. A központi navigáció a fejlécben található (fixen):

- Fő menü (fejléc): `HOME`, `HISTORY`, `ARCHITECTURE`, `EXAMPLE`, `CONTACT` — a menüpontok a gyökér HTML fájlokra mutatnak (pl. `index.html`, `history.html`, stb.).
- Példa oldalon (`example.html`) található a videó és az alatta lévő vezérlők:
  - Play / Pause gombok
  - Mute / Unmute gomb (állapottal jelzi a némítást)
  - Sebesség választó (`0.5x`, `1x`, `1.5x`, `2x`)
  - Fullscreen gomb
- Kapcsolati űrlap (`contact.html`) a `src/script/form-validation.js` által kezelt validációval (név, e-mail, üzenet, rádió/checkbox ellenőrzések, időpont ellenőrzés).
- Az `index.html` oldalon nagy hero szekció animált háttérrel.
- A `architecture.html` és `example.html` oldalakon dinamikusan generált elemek is megjelennek (például a `data.json` alapján betöltött sequence kártyák).

---

## Kód áttekintés és rövid magyarázat

### JavaScript modulok

- `src/script/script.js` — fő inicializáló. Dokument ready-kor meghívja a többi modult:
  - `initializeAnimations()` — animációs inicializáció (navigáció, scroll effektek stb.).
  - `initializeFormValidation()` — űrlap ellenőrzés inicializálása.
  - `loadSequenceData()` — betölti a `src/data/data.json`-t és megjeleníti.
  - `initializeDOMManipulation()` — dinamikus DOM műveletek (pl. kártya highlight).

- `src/script/animations.js` — tartalmazza a vizuális animációk logikáját (hover, scroll és egyéb effektek).

- `src/script/form-validation.js` — a kapcsolat űrlaphoz kötött validációs logikát tartalmazza: mezőellenőrzések, hibajelzések, kis rázó animáció hiba esetén.

- `src/script/data-loader.js` — AJAX kérést indít a `src/data/data.json` fájlhoz, majd a választ feldolgozva felépíti az ún. sequence-kártyákat és animációkat.

- `src/script/dom-manipulation.js` — néhány segédfüggvény és példa a DOM dinamikus frissítésére (pl. loading indicator, highlight overlay).

- `src/script/video-controls.js` — a `example.html`-ben elhelyezett videóvezérlők működését valósítja meg (play/pause, mute, playbackRate, fullscreen), eseményfigyeléssel és gombállapot-szinkronizációval.

Rövid kódrészlet (példa - hogyan inicializáljuk a modulokat):

```javascript
// src/script/script.js (init rész)
$(document).ready(function () {
  initializeAnimations();
  initializeFormValidation();
  loadSequenceData();
  initializeDOMManipulation();
});
```

### CSS modulok

A `src/styles/` mappában a nagy `styles.css` most különálló részeket importál:

- `global.css` — reset és alapstílusok (`body`, `.container`, `a`)
- `header.css` — fejléc és navigáció
- `main-content.css` — a `main` elem elhelyezése és margin kezelése
- `home.css` — kezdőlap hero animációk
- `history.css` — history oldal stílusai
- `architecture.css` — architecture oldal stílusai
- `example.css` — example oldal (videó, demo) stílusai
- `sequences.css` — sequence kártyák vizuális megjelenítése
- `forms.css` — űrlap elemek és hibajelzések
- `buttons.css` — gomb stílusok
- `footer.css` — lábléc
- `responsive.css` — media queries és segédosztályok

Ez a felosztás megkönnyíti az egyes oldal-specifikus stílusok karbantartását.

---

## Fontos fájlok és elérési utak (összegzés)

- `BQLOTWWebTech/index.html` — kezdőlap (CSS: `src/styles/styles.css`) 
- `BQLOTWWebTech/example.html` — példa oldal (videó és `src/script/video-controls.js`)
- `BQLOTWWebTech/src/script/` — JavaScript modulok
- `BQLOTWWebTech/src/styles/` — moduláris CSS fájlok
- `BQLOTWWebTech/src/data/data.json` — a `data-loader.js` által használt JSON
- `BQLOTW_1008/` — átnevezett oktatási példák (`BQLOTW_*` fájlok)

---

## Futtatás / megnyitás (local)

A weboldalt egyszerűen a fájlok böngészőben való megnyitásával lehet tesztelni (nem szükséges szerver, mert csak statikus fájlok vannak, kivéve AJAX hívásoknál: `file://` alatt a `$.ajax` hívások bizonyos böngészőkben (pl. Chrome) CORS/Local file tiltás miatt hibázhatnak). Ajánlott egy egyszerű lokális szerver:

Például PowerShell-ben (Windows) a projekt gyökérből:

```powershell
# Windows PowerShell
cd R:\uni\BQLOTWWebTech1\BQLOTWWebTech
python -m http.server 8000
# majd böngészőben: http://localhost:8000/index.html
```

(Az `python -m http.server` parancs Python 3-at használ; alternatívaként használható `npx http-server .` vagy bármilyen egyszerű HTTP szerver.)

---

## Következtetések, további teendők

- A projekt a modularizálás felé mozdult el — mind JS, mind CSS szinten — ez javítja a karbantarthatóságot.
- Javasolt ellenőrizni a `src/data/data.json` helyes elérhetőségét, és futtatni a weboldalt helyi szerveren, hogy az AJAX hívások működjenek.
- További lépések:
  - Unit / integrációs tesztek (pl. egyszerű JS tesztek a form validációhoz)
  - Minifikálás / build lépések bevezetése (pl. egy egyszerű `package.json` + Gulp/webpack, ha a projekt nőni fog)
  - Dokumentáció frissítése: ha további fájlmozgások történnek, frissíteni a `JEGYZOKONYV.md`-t.

---

## Melléklet: rövid kódrészletek / példák

Például: videóvezérlő kezdeti rész (`src/script/video-controls.js`):

```javascript
const video = $('#lstm-video')[0];
$('#playBtn').on('click', function () { video.play(); });
$('#pauseBtn').on('click', function () { video.pause(); });
$('#muteBtn').on('click', function () { video.muted = !video.muted; });
$('#speedSelect').on('change', function () { video.playbackRate = parseFloat($(this).val()); });
```

---

Készen áll a részletesebb kiegészítésre (pl. teljes fájllista generálása, képernyőképek beillesztése vagy PDF export). Ha szeretné, elkészítem a PDF-et vagy kiegészítem a jegyzőkönyvet a teljes fájllistával és részletes kódrészletekkel minden fontos fájlból.
