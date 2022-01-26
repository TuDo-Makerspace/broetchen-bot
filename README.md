# Brötchenbot

Dieser Telegram-Bot trackt die Zeiten, in denen der Brötchenmann erschienen ist und berechnet daraus die Zeit, zu der er am Wahrscheinlichsten nächstes Mal erscheinen könnte.

Dieser Bot basiert auf Node.js mit npm und SQLite 3. Er ist dazu designed, damit er nahtlos mit Yunis' iOS Shortcut zusammenarbeitet (https://www.icloud.com/shortcuts/0e9914618f8f49fdba4dfc13bc94af5d).

Der Original-Bot von Ecki ist hier zu finden: https://t.me/broetchen_bot

---

## Usage

### Voraussetzungen

Der Code enthält keine sensiblen Daten, wie den Bot-Token. Du musst dir deinen eigenen Telegram-Bot erstellen und deine eigenen Daten eintragen.

Wie du einen Telegram-Bot erstellen kannst: https://core.telegram.org/bots#6-botfather

Desweiteren muss npm auf deinem Rechner installiert sein: https://docs.npmjs.com/cli/v7/configuring-npm/install

### Run

Nachdem du die Repo geklont hast, musst du nur noch die folgenden Schritte ausführen, und schon läuft dein Bot auf deiner Maschine:

1. Benenne die example.env in .env um und fülle die entsprechenden Felder aus
2. Führe "npm i" aus
3. Führe "npm start" aus

---

## Commands

Diese Commands unterstütz der Bot von Haus aus, und kann so auch ohne den iOS Shortcut verwendet werden.

### /start

Begrüßung, wenn der Bot das erste Mal gestartet wird.

### /hunger

Gibt die Durchschnittliche Uhrzeit des Erscheinens des Brötchenmannes aus.

### /warda

Speichert einen neuen Erscheinungszeitpunkt in der Datenbank, der für zukünftige Berechnungen genutzt wird.

---

## API

### localhost:5000/warda

API Endpoint für iOS Shortcut. Macht das gleiche wie /warda in Telegram.
