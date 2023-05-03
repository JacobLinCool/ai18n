# ai18n

Automate Document I18n by Leveraging OpenAI's GPT-3.5-Turbo (ChatGPT)

<!-- ai18n [ignore] -->
<div align="center">

[正體中文](./translated/README.zh-TW.md) | [简体中文](./translated/README.zh-CN.md) | [日本語](./translated/README.ja.md) | [Français](./translated/README.fr.md) | [Deutsch](./translated/README.de.md) | [Español](./translated/README.es.md) | [한국어](./translated/README.ko.md)

^ by `ai18n --to zh-TW --to zh-CN --to ja --to fr --to de --to es --to ko README.md`

</div>
<!-- /ai18n [ignore] -->

## Installation

```sh
pnpm i -g @jacoblincool/ai18n
```

> Use `npm` or `yarn` to install is also fine.

## Usage

> You need to set `OPENAI_API_KEY` environment variable first.

```sh
# Show help
ai18n --help
```

```sh
ai18n [options] <files...>
```

### Options

- `-V`, `--version`: Output the version number of the ai18n CLI tool.
- `--to <language>`: Specify the target language for translation. This can be a single language or a comma-separated list of multiple languages. By default, no target language is specified.
- `--out <directory>`: Specify the output directory for translated files. By default, the output files will be saved in a directory called "translated" in the current working directory.
- `--inline`: Enable inline translation. By default, this option is disabled.
- `-h`, `--help`: Display help for the ai18n CLI tool.

### The `inline` Mode

If you enable the `inline` mode, the translated text will be inserted into the file and no new file will be created.

For example, if you have a file called `README.md` with the following content:

```md
# ai18n

Automate Document I18n by Leveraging OpenAI's GPT-3.5-Turbo (ChatGPT)

<!-- ai18n [zh-tw] --><!-- /ai18n [zh-tw] -->
```

After running the following command:

```sh
ai18n --to zh-tw --inline README.md
```

The content of `README.md` will be changed to:

```md
# ai18n

Automate Document I18n by Leveraging OpenAI's GPT-3.5-Turbo (ChatGPT)

<!-- ai18n [zh-tw] -->
# ai18n

透過利用 OpenAI 的 GPT-3.5-Turbo (ChatGPT) 來自動化文件國際化。
<!-- /ai18n [zh-tw] -->
```
