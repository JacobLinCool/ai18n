import fs from "node:fs";
import path from "node:path";
import { program } from "commander";
import debug from "debug";
import { config } from "dotenv";
import { OpenAIApi, Configuration } from "openai";
import { cleanup, detect, inject } from "./inline";
import { pkg } from "./pkg";
import { translate } from "./translate";

const log = debug("ai18n:cli");

program
	.name("ai18n")
	.description(pkg.description)
	.version(pkg.version)
	.option(
		"--to <language>",
		"target language",
		(lang, prev) => prev.concat([lang]),
		[] as string[],
	)
	.option("--out <directory>", "output directory", "./translated/")
	.option("--inline", "inline translation", false)
	.argument("<files...>", "input files to translate")
	.action(async (files: string[], options: { to: string[]; out: string; inline: boolean }) => {
		log({ files, options });

		if (files.length === 0) {
			console.error("Error: No input files specified.");
			process.exit(1);
		}

		if (options.to.length === 0) {
			console.error("Error: No target languages specified.");
			process.exit(1);
		}

		if (!options.inline && !fs.existsSync(options.out)) {
			fs.mkdirSync(options.out, { recursive: true });
		}

		try {
			config();
		} catch {}

		if (!process.env.OPENAI_API_KEY) {
			console.error("Error: No OpenAI API key specified.");
			process.exit(1);
		}

		const openai = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY }));

		try {
			for (const file of files) {
				const raw = fs.readFileSync(file, "utf-8");
				const content = options.inline ? cleanup(raw) : cleanup(raw, "ignore");
				let translated_content = raw;

				const pool: Promise<void>[] = [];
				for (const lang of options.to) {
					if (options.inline && detect(raw, lang) === 0) {
						console.warn(
							`Skipping ${file} for ${lang} because inline mode is enabled but no tags were found.`,
						);
						continue;
					}

					pool.push(
						(async () => {
							const translated = await translate(openai, content, lang);

							if (!options.inline) {
								const out = path.join(
									options.out,
									`${path.basename(
										file,
										path.extname(file),
									)}.${lang}${path.extname(file)}`,
								);

								fs.writeFileSync(out, translated, "utf-8");
								console.log(`Translated ${file} to ${out}`);
							} else {
								translated_content = inject(translated_content, lang, translated);
								console.log(`Translated ${file} to ${lang} [inline]`);
							}
						})(),
					);
				}
				await Promise.all(pool);

				if (options.inline && translated_content !== content) {
					fs.writeFileSync(file, translated_content, "utf-8");
				}
			}
		} catch (err) {
			console.error(err);
			process.exit(1);
		}
	});

export default program;
