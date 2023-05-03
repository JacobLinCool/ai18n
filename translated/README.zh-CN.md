# ai18n

通过利用 OpenAI 的 GPT-3.5-Turbo (ChatGPT) 自动化文档 I18n。

## 安装

```sh
pnpm i -g @jacoblincool/ai18n
```

> 使用 `npm` 或 `yarn` 安装也可以。

## 用法

> 首先需要设置 `OPENAI_API_KEY` 环境变量。

```sh
# 显示帮助
ai18n --help
```

```sh
ai18n [options] <files...>
```

### 选项

- `-V`, `--version`: 输出 ai18n CLI 工具的版本号。
- `--to <language>`: 指定翻译的目标语言。这可以是单个语言或多个语言的逗号分隔列表。默认情况下，不指定目标语言。
- `--out <directory>`: 指定翻译文件的输出目录。默认情况下，输出文件将保存在当前工作目录中名为“translated”的目录中。
- `--inline`: 启用内联翻译。默认情况下，此选项已禁用。
- `-h`, `--help`: 显示 ai18n CLI 工具的帮助。

### `inline` 模式

如果启用 `inline` 模式，则翻译后的文本将插入到文件中，不会创建新文件。

例如，如果您有一个名为 `README.md` 的文件，其内容如下：

```md
# ai18n

Automate Document I18n by Leveraging OpenAI's GPT-3.5-Turbo (ChatGPT)

<!-- ai18n [zh-tw] --><!-- /ai18n [zh-tw] -->
```

运行以下命令后：

```sh
ai18n --to zh-tw --inline README.md
```

`README.md` 的内容将更改为：

```md
# ai18n

Automate Document I18n by Leveraging OpenAI's GPT-3.5-Turbo (ChatGPT)

<!-- ai18n [zh-tw] -->
# ai18n

透过利用 OpenAI 的 GPT-3.5-Turbo (ChatGPT) 来自动化文件国际化。
<!-- /ai18n [zh-tw] -->
```