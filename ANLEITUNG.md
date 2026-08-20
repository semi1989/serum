# Serum online stellen und installieren

Die App braucht eine HTTPS-Adresse, sonst startet der Service Worker nicht und du kannst sie
nicht installieren. Beides bekommst du kostenlos. Wähle einen der beiden Wege.

---

## Weg A — Netlify Drop (schnellster Weg, keine Anmeldung nötig)

1. Auf **app.netlify.com/drop** gehen.
2. Den kompletten Ordner `serum-app` ins Browserfenster ziehen.
3. Nach wenigen Sekunden bekommst du eine Adresse wie `https://kluger-name-123.netlify.app`.

Die Adresse ist sofort nutzbar. Ohne Anmeldung verfällt sie nach einiger Zeit — für einen
Test genügt das. Willst du sie behalten, legst du ein kostenloses Konto an und benennst die
Seite unter *Site settings → Change site name* um.

**Aktualisieren:** neuen Ordner erneut auf dieselbe Seite ziehen.

---

## Weg B — GitHub Pages (dauerhaft, unter deinem Namen)

1. Auf github.com ein neues Repository anlegen, zum Beispiel `serum`. Sichtbarkeit **public**
   (Pages ist nur bei öffentlichen Repositories kostenlos).
2. Auf *Add file → Upload files* klicken und den **Inhalt** des Ordners `serum-app` hochladen —
   also `index.html`, `manifest.webmanifest`, `sw.js` und den Ordner `icons`. Nicht den
   Ordner `serum-app` selbst, sonst liegt alles eine Ebene zu tief.
3. *Commit changes* drücken.
4. In *Settings → Pages* unter **Source** den Eintrag `Deploy from a branch` wählen,
   Branch `main`, Ordner `/ (root)`, dann *Save*.
5. Nach ein bis zwei Minuten läuft die App unter
   `https://DEINNAME.github.io/serum/`

**Aktualisieren:** geänderte Datei im Repository hochladen, fertig.

> Wenn du bei Schritt 2 den Unterordner behältst, lautet die Adresse
> `https://DEINNAME.github.io/serum/serum-app/`. Funktioniert auch, ist nur länger.

---

## Installieren

Die App läuft auf jedem aktuellen Gerät — iPhone, iPad, Android, Mac, Windows und Linux.
Es ist derselbe Link für alle. Nur der Weg zum Installieren unterscheidet sich.

| Gerät | So geht es |
|---|---|
| iPhone, iPad | Adresse in **Safari** öffnen (Chrome kann es dort nicht), Teilen-Symbol, „Zum Home-Bildschirm“ |
| Android | Adresse in **Chrome** öffnen, Menü oben rechts, „App installieren“ |
| Mac (Safari) | *Ablage → Zum Dock hinzufügen* |
| Windows, Mac, Linux (Chrome, Edge) | Installations-Symbol rechts in der Adressleiste, sonst Menü → *Installieren* |

Im Dashboard von Serum steht dafür auch der Eintrag „Serum als App installieren“. Auf Android
und in Chrome öffnet er den Installationsdialog direkt, auf Apple-Geräten zeigt er die Schritte.

Danach startet Serum im Vollbild ohne Adressleiste und läuft auch ohne Internet.

**Freunden weitergeben:** einfach den Link schicken. Niemand außer dir braucht ein GitHub-Konto,
und niemand muss etwas herunterladen. Die Werte deiner Freunde bleiben auf deren Geräten —
bei dir kommt nichts an.

## Warum installieren, nicht nur als Lesezeichen speichern

iOS löscht bei normalen Webseiten den lokalen Speicher nach sieben Tagen ohne Besuch.
Installierte Web-Apps sind davon ausgenommen. Deine Blutwerte liegen im Gerätespeicher —
als installierte App bleiben sie erhalten, als Lesezeichen möglicherweise nicht.

**Trotzdem regelmäßig exportieren.** Unter *Daten → Exportieren* bekommst du eine JSON-Datei.
Auf dem Handy öffnet sich dabei das Teilen-Menü — dort „In Dateien sichern“ wählen und in
iCloud Drive ablegen. Am Rechner wird die Datei normal heruntergeladen.

Der Import unter *Daten → Importieren* **führt zusammen, statt zu überschreiben**: Befunde, die
auf diesem Gerät fehlen, kommen dazu; vorhandene Werte bleiben unangetastet. Du kannst also auf
mehreren Geräten eintragen, ohne etwas zu verlieren. Weichen zwei Zahlen zum selben Datum
voneinander ab, behält das Gerät seine eigene und meldet dir die Abweichung.

Der API-Key wird beim Export **nie** mitgeschrieben. Eine Sicherungsdatei kann also gefahrlos in
der Cloud liegen oder weitergegeben werden.

---

## Nach einer Änderung an index.html

In `sw.js` die Zeile

```js
const CACHE = "serum-v1";
```

auf `serum-v2` und so weiter hochzählen. Sonst zeigen bereits installierte Geräte
weiter die alte Fassung aus ihrem Zwischenspeicher.

---

## Was wohin geht

Alles bleibt auf deinem Gerät. Die einzige Ausnahme sind Anfragen an die Claude-API,
und die passieren nur, wenn du im Profil einen API-Key hinterlegst und „Direkt fragen“
oder die Foto-Erkennung benutzt. Ohne Key verlässt kein Blutwert dein Gerät —
„Prompt kopieren“ legt den Text nur in die Zwischenablage, eingefügt wird er von dir.
