export function cleanup(raw: string, lang?: string): string {
	if (lang) {
		lang = lang.toLowerCase();
		return raw.replace(
			new RegExp(`<!-- ai18n \\[${lang}\\] -->.*?<!-- \\/ai18n \\[${lang}\\] -->`, "gis"),
			"",
		);
	}
	return raw.replace(/<!-- ai18n \[[^\]]+\] -->.*?<!-- \/ai18n \[[^\]]+\] -->/gis, "");
}

export function inject(raw: string, lang: string, translated: string): string {
	lang = lang.toLowerCase();
	return raw.replace(
		new RegExp(`<!-- ai18n \\[${lang}\\] -->.*?<!-- \\/ai18n \\[${lang}\\] -->`, "gis"),
		`<!-- ai18n [${lang}] -->\n${translated}\n<!-- /ai18n [${lang}] -->`,
	);
}

export function detect(raw: string, lang: string): number {
	lang = lang.toLowerCase();
	const regex = new RegExp(
		`<!-- ai18n \\[${lang}\\] -->.*?<!-- \\/ai18n \\[${lang}\\] -->`,
		"gis",
	);
	const matches = raw.match(regex);
	return matches ? matches.length : 0;
}
