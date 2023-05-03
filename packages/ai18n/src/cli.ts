import fs from "node:fs";
import path from "node:path";
import { program } from "commander";
import debug from "debug";
import { config } from "dotenv";
import { OpenAIApi, Configuration } from "openai";
import { cleanup, detect, inject } from "./inline";
import { pkg } from "./pkg";
import { translate } from "./translate";
import { common_base } from "./utils";

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
	.option("--mode <mode>", "output mode (postfix, subdir, inline)", "postfix")
	.option("--inline", "inline translation (short form for --mode inline)")
	.option("--dry", "dry run (no translation)")
	.argument("<files...>", "input files to translate")
	.action(
		async (
			files: string[],
			options: { to: string[]; out: string; inline: boolean; mode: string; dry: boolean },
		) => {
			log({ files, options });

			if (files.length === 0) {
				console.error("Error: No input files specified.");
				process.exit(1);
			}

			if (options.to.length === 0) {
				console.error("Error: No target languages specified.");
				process.exit(1);
			}

			let mode = options.mode;
			if (options.inline) {
				mode = "inline";
			}

			if (mode !== "postfix" && mode !== "subdir" && mode !== "inline") {
				console.error("Error: Invalid mode specified.");
				process.exit(1);
			}

			try {
				config();
			} catch {}

			if (!process.env.OPENAI_API_KEY) {
				console.error("Error: No OpenAI API key specified.");
				process.exit(1);
			}

			const openai = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY }));

			files = files.map((file) => path.resolve(file));
			const base = common_base(files);
			log({ base });

			try {
				for (const file of files) {
					const raw = fs.readFileSync(file, "utf-8");
					const content = mode === "inline" ? cleanup(raw) : cleanup(raw, "ignore");
					let translated_content = raw;

					const pool: Promise<void>[] = [];
					for (const lang of options.to) {
						if (mode === "inline" && detect(raw, lang) === 0) {
							console.warn(
								`Skipping ${file} for ${lang} because inline mode is enabled but no tags were found.`,
							);
							continue;
						}

						pool.push(
							(async () => {
								if (options.dry) {
									if (mode === "inline") {
										console.log(`Translated ${file} to ${lang} [inline]`);
									} else if (mode === "postfix") {
										const rel = file.replace(base, "");
										const ext = path.extname(rel);
										const out = path.join(
											options.out,
											path.dirname(rel),
											`${path.basename(rel, ext)}.${lang}${ext}`,
										);

										console.log(`Translated ${file} to ${out}`);
									} else if (mode === "subdir") {
										const out = path.join(
											options.out,
											lang,
											file.replace(base, ""),
										);

										console.log(`Translated ${file} to ${out}`);
									}
									return;
								}

								const translated = await translate(openai, content, lang);

								if (mode === "inline") {
									translated_content = inject(
										translated_content,
										lang,
										translated,
									);
									console.log(`Translated ${file} to ${lang} [inline]`);
								} else if (mode === "postfix") {
									const rel = file.replace(base, "");
									const ext = path.extname(rel);
									const out = path.join(
										options.out,
										path.dirname(rel),
										`${path.basename(rel, ext)}.${lang}${ext}`,
									);

									if (!fs.existsSync(path.dirname(out))) {
										fs.mkdirSync(path.dirname(out), { recursive: true });
									}

									fs.writeFileSync(out, translated, "utf-8");
									console.log(`Translated ${file} to ${out}`);
								} else if (mode === "subdir") {
									const out = path.join(
										options.out,
										lang,
										file.replace(base, ""),
									);

									if (!fs.existsSync(path.dirname(out))) {
										fs.mkdirSync(path.dirname(out), { recursive: true });
									}

									fs.writeFileSync(out, translated, "utf-8");
									console.log(`Translated ${file} to ${out}`);
								}
							})(),
						);
					}
					await Promise.all(pool);

					if (mode === "inline" && translated_content !== content) {
						fs.writeFileSync(file, translated_content, "utf-8");
					}
				}
			} catch (err) {
				console.error(err);
				process.exit(1);
			}
		},
	);

export default program;
