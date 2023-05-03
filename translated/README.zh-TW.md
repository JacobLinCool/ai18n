# ai18n

透過利用 OpenAI 的 GPT-3.5-Turbo (ChatGPT) 來自動化文件國際化。

## 安裝

```sh
pnpm i -g @jacoblincool/ai18n
```

> 使用 `npm` 或 `yarn` 安裝也可以。

## 使用

> 首先，您需要設置 `OPENAI_API_KEY` 環境變量。

```sh
# 顯示幫助
ai18n --help
```

```sh
ai18n [options] <files...>
```

### 選項

- `-V`, `--version`: 輸出 ai18n CLI 工具的版本號。
- `--to <language>`: 指定翻譯的目標語言。這可以是單個語言或多個語言的逗號分隔列表。默認情況下，不指定目標語言。
- `--out <directory>`: 指定翻譯文件的輸出目錄。默認情況下，輸出文件將保存在當前工作目錄中名為“translated”的目錄中。
- `--inline`: 啟用內嵌翻譯。默認情況下，此選項被禁用。
- `-h`, `--help`: 顯示 ai18n CLI 工具的幫助信息。

### `inline` 模式

如果啟用了 `inline` 模式，翻譯的文本將插入到文件中，並且不會創建新文件。

例如，如果您有一個名為 `README.md` 的文件，其內容如下：

```md
# ai18n

Automate Document I18n by Leveraging OpenAI's GPT-3.5-Turbo (ChatGPT)

<!-- ai18n [zh-tw] --><!-- /ai18n [zh-tw] -->
```

運行以下命令後：

```sh
ai18n --to zh-tw --inline README.md
```

`README.md` 的內容將更改為：

```md
# ai18n

透過利用 OpenAI 的 GPT-3.5-Turbo (ChatGPT) 來自動化文件國際化。

<!-- ai18n [zh-tw] -->
# ai18n

透過利用 OpenAI 的 GPT-3.5-Turbo (ChatGPT) 來自動化文件國際化。
<!-- /ai18n [zh-tw] -->
```