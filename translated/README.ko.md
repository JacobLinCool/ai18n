# ai18n

오픈AI의 GPT-3.5-Turbo (ChatGPT)를 활용하여 문서 I18n 자동화하기



## 설치

```sh
pnpm i -g @jacoblincool/ai18n
```

> `npm` 또는 `yarn`을 사용하여 설치하는 것도 괜찮습니다.

## 사용법

> 먼저 `OPENAI_API_KEY` 환경 변수를 설정해야 합니다.

```sh
# 도움말 표시
ai18n --help
```

```sh
ai18n [options] <files...>
```

### 옵션

- `-V`, `--version`: ai18n CLI 도구의 버전 번호 출력.
- `--to <language>`: 번역 대상 언어를 지정합니다. 단일 언어 또는 쉼표로 구분된 여러 언어를 지정할 수 있습니다. 기본적으로 대상 언어가 지정되지 않습니다.
- `--out <directory>`: 번역된 파일의 출력 디렉토리를 지정합니다. 기본적으로 출력 파일은 현재 작업 디렉토리에 "translated"라는 디렉토리에 저장됩니다.
- `--inline`: 인라인 번역을 활성화합니다. 기본적으로 이 옵션은 비활성화됩니다.
- `-h`, `--help`: ai18n CLI 도구에 대한 도움말을 표시합니다.

### `inline` 모드

`inline` 모드를 활성화하면 번역된 텍스트가 파일에 삽입되고 새 파일이 생성되지 않습니다.

예를 들어, 다음 내용을 가진 `README.md` 파일이 있다고 가정해 보겠습니다.

```md
# ai18n

Automate Document I18n by Leveraging OpenAI's GPT-3.5-Turbo (ChatGPT)

<!-- ai18n [zh-tw] --><!-- /ai18n [zh-tw] -->
```

다음 명령을 실행한 후:

```sh
ai18n --to zh-tw --inline README.md
```

`README.md`의 내용이 다음과 같이 변경됩니다.

```md
# ai18n

Automate Document I18n by Leveraging OpenAI's GPT-3.5-Turbo (ChatGPT)

<!-- ai18n [zh-tw] -->
# ai18n

OpenAI의 GPT-3.5-Turbo (ChatGPT)를 활용하여 문서 I18n을 자동화합니다.
<!-- /ai18n [zh-tw] -->
```

---