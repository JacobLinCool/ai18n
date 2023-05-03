# ai18n

Automatisez la localisation de documents en utilisant le GPT-3.5-Turbo (ChatGPT) d'OpenAI.

## Installation

```sh
pnpm i -g @jacoblincool/ai18n
```

> L'utilisation de `npm` ou de `yarn` pour l'installation est également possible.

## Utilisation

> Vous devez d'abord définir la variable d'environnement `OPENAI_API_KEY`.

```sh
# Afficher l'aide
ai18n --help
```

```sh
ai18n [options] <fichiers...>
```

### Options

- `-V`, `--version`: Afficher le numéro de version de l'outil CLI ai18n.
- `--to <langue>`: Spécifiez la langue cible pour la traduction. Il peut s'agir d'une seule langue ou d'une liste de langues séparées par des virgules. Par défaut, aucune langue cible n'est spécifiée.
- `--out <répertoire>`: Spécifiez le répertoire de sortie pour les fichiers traduits. Par défaut, les fichiers de sortie seront enregistrés dans un répertoire appelé "translated" dans le répertoire de travail actuel.
- `--inline`: Activez la traduction en ligne. Par défaut, cette option est désactivée.
- `-h`, `--help`: Afficher l'aide pour l'outil CLI ai18n.

### Le mode `inline`

Si vous activez le mode `inline`, le texte traduit sera inséré dans le fichier et aucun nouveau fichier ne sera créé.

Par exemple, si vous avez un fichier appelé `README.md` avec le contenu suivant :

```md
# ai18n

Automate Document I18n by Leveraging OpenAI's GPT-3.5-Turbo (ChatGPT)

<!-- ai18n [zh-tw] --><!-- /ai18n [zh-tw] -->
```

Après avoir exécuté la commande suivante :

```sh
ai18n --to zh-tw --inline README.md
```

Le contenu de `README.md` sera modifié comme suit :

```md
# ai18n

Automatisez la localisation de documents en utilisant le GPT-3.5-Turbo (ChatGPT) d'OpenAI.

<!-- ai18n [zh-tw] -->
# ai18n

透過利用 OpenAI 的 GPT-3.5-Turbo (ChatGPT) 來自動化文件國際化。
<!-- /ai18n [zh-tw] -->
```