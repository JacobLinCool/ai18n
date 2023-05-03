# ai18n

Automatisieren Sie die Dokumenten-I18n durch Nutzung von OpenAI's GPT-3.5-Turbo (ChatGPT).

## Installation

```sh
pnpm i -g @jacoblincool/ai18n
```

> Die Verwendung von `npm` oder `yarn` zur Installation ist ebenfalls in Ordnung.

## Verwendung

> Sie müssen zuerst die Umgebungsvariable `OPENAI_API_KEY` festlegen.

```sh
# Hilfe anzeigen
ai18n --help
```

```sh
ai18n [Optionen] <Dateien...>
```

### Optionen

- `-V`, `--version`: Gibt die Versionsnummer des ai18n CLI-Tools aus.
- `--to <Sprache>`: Geben Sie die Zielsprache für die Übersetzung an. Dies kann eine einzelne Sprache oder eine durch Kommas getrennte Liste von mehreren Sprachen sein. Standardmäßig ist keine Zielsprache angegeben.
- `--out <Verzeichnis>`: Geben Sie das Ausgabeverzeichnis für übersetzte Dateien an. Standardmäßig werden die Ausgabedateien in einem Verzeichnis namens "translated" im aktuellen Arbeitsverzeichnis gespeichert.
- `--inline`: Aktivieren Sie die Inline-Übersetzung. Standardmäßig ist diese Option deaktiviert.
- `-h`, `--help`: Zeigt die Hilfe für das ai18n CLI-Tool an.

### Der `inline`-Modus

Wenn Sie den `inline`-Modus aktivieren, wird der übersetzte Text in die Datei eingefügt und es wird keine neue Datei erstellt.

Wenn Sie beispielsweise eine Datei namens `README.md` mit dem folgenden Inhalt haben:

```md
# ai18n

Automate Document I18n by Leveraging OpenAI's GPT-3.5-Turbo (ChatGPT)

<!-- ai18n [zh-tw] --><!-- /ai18n [zh-tw] -->
```

Nach Ausführung des folgenden Befehls:

```sh
ai18n --to zh-tw --inline README.md
```

Wird der Inhalt von `README.md` wie folgt geändert:

```md
# ai18n

Automatisieren Sie die Dokumenten-I18n durch Nutzung von OpenAI's GPT-3.5-Turbo (ChatGPT).

<!-- ai18n [zh-tw] -->
# ai18n

透過利用 OpenAI 的 GPT-3.5-Turbo (ChatGPT) 來自動化文件國際化。
<!-- /ai18n [zh-tw] -->
```