# ai18n

Automatice la internacionalización de documentos aprovechando el GPT-3.5-Turbo (ChatGPT) de OpenAI.

## Instalación

```sh
pnpm i -g @jacoblincool/ai18n
```

> También es válido usar `npm` o `yarn` para la instalación.

## Uso

> Primero, debe establecer la variable de entorno `OPENAI_API_KEY`.

```sh
# Mostrar ayuda
ai18n --help
```

```sh
ai18n [opciones] <archivos...>
```

### Opciones

- `-V`, `--version`: Muestra la versión de la herramienta CLI ai18n.
- `--to <idioma>`: Especifique el idioma de destino para la traducción. Esto puede ser un solo idioma o una lista separada por comas de varios idiomas. Por defecto, no se especifica ningún idioma de destino.
- `--out <directorio>`: Especifique el directorio de salida para los archivos traducidos. Por defecto, los archivos de salida se guardarán en un directorio llamado "translated" en el directorio de trabajo actual.
- `--inline`: Habilita la traducción en línea. Por defecto, esta opción está deshabilitada.
- `-h`, `--help`: Muestra la ayuda para la herramienta CLI ai18n.

### El modo `inline`

Si habilita el modo `inline`, el texto traducido se insertará en el archivo y no se creará un nuevo archivo.

Por ejemplo, si tiene un archivo llamado `README.md` con el siguiente contenido:

```md
# ai18n

Automate Document I18n by Leveraging OpenAI's GPT-3.5-Turbo (ChatGPT)

<!-- ai18n [zh-tw] --><!-- /ai18n [zh-tw] -->
```

Después de ejecutar el siguiente comando:

```sh
ai18n --to zh-tw --inline README.md
```

El contenido de `README.md` cambiará a:

```md
# ai18n

Automatice la internacionalización de documentos aprovechando el GPT-3.5-Turbo (ChatGPT) de OpenAI.

<!-- ai18n [zh-tw] -->
# ai18n

透過利用 OpenAI 的 GPT-3.5-Turbo (ChatGPT) 來自動化文件國際化。
<!-- /ai18n [zh-tw] -->
```