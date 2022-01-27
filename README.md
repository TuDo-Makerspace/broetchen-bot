# Brötchen-Bot

Diese Software trackt die Zeiten, in denen der Brötchenmann erschienen ist und berechnet daraus die Zeit, zu der er am Wahrscheinlichsten nächstes Mal erscheinen könnte.

Es handelt sich hierbei um einen Telegram-Bot + REST API. Die API ist für Anfragen via iOS Shortcuts ausgelegt.

Der Bot basiert auf Node.js mit npm und PostgreSQL, die API baut auf Express auf. Er ist dazu designed, damit er nahtlos mit Yunis' iOS Shortcut zusammenarbeitet (https://www.icloud.com/shortcuts/957fd2e03046455aaae933540beabe7c).

Der Original-Bot von Ecki ist hier zu finden: https://t.me/broetchen_bot

Der Original-Bot und die API werden hier gehostet: https://broetchen-bot.herokuapp.com/

---

## Usage

### Voraussetzungen

Der Code enthält keine sensiblen Daten, wie den Bot-Token. Du musst dir deinen eigenen Telegram-Bot erstellen und deine eigenen Daten eintragen.

Wie du einen Telegram-Bot erstellen kannst: https://core.telegram.org/bots#6-botfather

Desweiteren muss npm auf deinem Rechner installiert sein: https://docs.npmjs.com/cli/v7/configuring-npm/install, sowie PostgreSQL: https://www.postgresql.org/download/

### Run

Nachdem du die Repo geklont hast, musst du nur noch die folgenden Schritte ausführen, und schon läuft dein Bot auf deiner Maschine:

1. Benenne die example.env in .env um und fülle die entsprechenden Felder aus
2. Führe "npm i" aus
3. Führe "npm start" aus

### Test

Zum aktuellen Zeitpunkt sind keine automatisierten Tests implementiert. Du kannst aber die API per HTTP Requests und den Bot per Telegram testen. Alle HTTP Requests findest du in local.requests.http.

Mit VS Code und dem Plugin "REST Client" (https://marketplace.visualstudio.com/items?itemName=humao.rest-client) kannst du diese auch direkt in der IDE ausführen.

---

## Telegram Bot-Commands

Diese Commands unterstütz der Bot von Haus aus, und kann so auch ohne den iOS Shortcut verwendet werden.

### /start

Begrüßung, wenn der Bot das erste Mal gestartet wird.

### /hunger

Gibt die Durchschnittliche Uhrzeit des Erscheinens des Brötchenmannes aus.

### /warda

Speichert einen neuen Erscheinungszeitpunkt in der Datenbank, der für zukünftige Berechnungen genutzt wird.

---

## API Endpoints

### /

Healthcheck.

### /warda

API Endpoint für iOS Shortcut. Macht das gleiche wie /warda in Telegram.

### /hunger

API Endpoint für iOS Shortcut. Macht das gleiche wie /hunger in Telegram.
