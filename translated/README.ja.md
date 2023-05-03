# ai18n

OpenAIのGPT-3.5-Turbo（ChatGPT）を活用して、ドキュメントのI18nを自動化する。

## インストール

```sh
pnpm i -g @jacoblincool/ai18n
```

> `npm`または`yarn`を使用してインストールすることもできます。

## 使い方

> 最初に`OPENAI_API_KEY`環境変数を設定する必要があります。

```sh
# ヘルプを表示
ai18n --help
```

```sh
ai18n [options] <files...>
```

### オプション

- `-V`、`--version`：ai18n CLIツールのバージョン番号を出力します。
- `--to <language>`：翻訳の対象言語を指定します。これは単一の言語または複数の言語のカンマ区切りリストで指定できます。デフォルトでは、対象言語は指定されていません。
- `--out <directory>`：翻訳されたファイルの出力ディレクトリを指定します。デフォルトでは、出力ファイルはカレントディレクトリにある「translated」という名前のディレクトリに保存されます。
- `--inline`：インライン翻訳を有効にします。デフォルトでは、このオプションは無効になっています。
- `-h`、`--help`：ai18n CLIツールのヘルプを表示します。

### `inline`モード

`inline`モードを有効にすると、翻訳されたテキストがファイルに挿入され、新しいファイルは作成されません。

たとえば、次の内容の`README.md`というファイルがある場合：

```md
# ai18n

Automate Document I18n by Leveraging OpenAI's GPT-3.5-Turbo (ChatGPT)

<!-- ai18n [zh-tw] --><!-- /ai18n [zh-tw] -->
```

次のコマンドを実行すると：

```sh
ai18n --to zh-tw --inline README.md
```

`README.md`の内容は次のように変更されます：

```md
# ai18n

Automate Document I18n by Leveraging OpenAI's GPT-3.5-Turbo (ChatGPT)

<!-- ai18n [zh-tw] -->
# ai18n

OpenAIのGPT-3.5-Turbo（ChatGPT）を活用して、ドキュメントのI18nを自動化する。
<!-- /ai18n [zh-tw] -->
```