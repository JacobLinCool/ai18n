import { cleanup, detect, inject } from "../src/inline";

describe("inline cleanup", () => {
	// Tests that the function removes all ai18n tags that match the regex when given a raw string with ai18n tags that match the regex.
	it("cleanup matching tags", () => {
		const raw = "<!-- ai18n [en] -->This is some text<!-- /ai18n [en] -->";
		const expected = "";
		const result = cleanup(raw);
		expect(result).toEqual(expected);
	});

	// Tests that the function removes no tags when given a raw string with no ai18n tags.
	it("cleanup no ai18n tags", () => {
		const raw = "This is some text";
		const expected = "This is some text";
		const result = cleanup(raw);
		expect(result).toEqual(expected);
	});

	// Tests that the function removes all ai18n tags that match the regex when given a raw string with multiple ai18n tags that match the regex.
	it("cleanup multiple matching tags", () => {
		const raw =
			"head <!-- ai18n [en] -->This is some text<!-- /ai18n [en] --> body <!-- ai18n [fr] -->ceci est du texte<!-- /ai18n [fr] --> tail";
		const expected = "head  body  tail";
		const result = cleanup(raw);
		expect(result).toEqual(expected);
	});

	// Tests that the function removes no tags when given a raw string with ai18n tags that don't match the regex.
	it("cleanup non matching tags", () => {
		const raw = "<!-- i18n [en] -->This is some text<!-- /i18n [en] -->";
		const expected = "<!-- i18n [en] -->This is some text<!-- /i18n [en] -->";
		const result = cleanup(raw);
		expect(result).toEqual(expected);
	});

	// Tests that the function returns an empty string when given an empty string input.
	it("cleanup empty string", () => {
		const raw = "";
		const expected = "";
		const result = cleanup(raw);
		expect(result).toEqual(expected);
	});

	// Tests that the function is case insensitive when matching the regex.
	it("cleanup case insensitivity", () => {
		const raw = "<!-- AI18N [test] -->This is a string<!-- /ai18n [test] -->";
		const expected = "";
		const result = cleanup(raw);
		expect(result).toEqual(expected);
	});
});

describe("inline inject", () => {
	// Tests that the function is case-insensitive when searching for the language tag.
	it("inject case insensitive", () => {
		const raw = "<!-- ai18n [EN] -->Hello<!-- /ai18n [EN] -->";
		const lang = "en";
		const translated = "Hola";
		const expected = "<!-- ai18n [en] -->\nHola\n<!-- /ai18n [en] -->";
		expect(inject(raw, lang, translated)).toEqual(expected);
	});

	// Tests that the function replaces a single instance of the language tag with the translated text.
	it("inject single instance", () => {
		const raw = "<!-- ai18n [EN] -->Hello<!-- /ai18n [EN] -->";
		const lang = "EN";
		const translated = "Hola";
		const expected = "<!-- ai18n [en] -->\nHola\n<!-- /ai18n [en] -->";
		expect(inject(raw, lang, translated)).toEqual(expected);
	});

	// Tests that the function can handle special characters in the translated string that may interfere with the regular expression.
	it("inject special characters", () => {
		const raw = "<!-- ai18n [EN] -->Hello<!-- /ai18n [EN] -->";
		const lang = "EN";
		const translated = "Hóla!@#$%^&*() +";
		const expected = "<!-- ai18n [en] -->\nHóla!@#$%^&*() +\n<!-- /ai18n [en] -->";
		expect(inject(raw, lang, translated)).toEqual(expected);
	});

	// Tests that the function returns the original string if the raw string does not contain the language tag.
	it("inject no tag", () => {
		const raw = "Hello world!";
		const lang = "EN";
		const translated = "Hola mundo!";
		const expected = "Hello world!";
		expect(inject(raw, lang, translated)).toEqual(expected);
	});

	// Tests that the function replaces multiple instances of the language tag with the translated text.
	it("inject multiple instances", () => {
		const raw =
			"<!-- ai18n [EN] -->Hello<!-- /ai18n [EN] --> <!-- ai18n [EN] -->world<!-- /ai18n [EN] -->";
		const lang = "EN";
		const translated = "Hola";
		const expected =
			"<!-- ai18n [en] -->\nHola\n<!-- /ai18n [en] --> <!-- ai18n [en] -->\nHola\n<!-- /ai18n [en] -->";
		expect(inject(raw, lang, translated)).toEqual(expected);
	});

	// Tests that the function returns the original string if the language tag is not in the correct format.
	it("inject incorrect format", () => {
		const raw = "<!-- ai18n EN -->Hello<!-- /ai18n EN -->";
		const lang = "EN";
		const translated = "Hola";
		const expected = "<!-- ai18n EN -->Hello<!-- /ai18n EN -->";
		expect(inject(raw, lang, translated)).toEqual(expected);
	});

	// Tests that the function replaces multiple different language tags with the translated text.
	it("inject multiple languages", () => {
		const raw =
			"<!-- ai18n [EN] -->Hello<!-- /ai18n [EN] --> <!-- ai18n [FR] -->world<!-- /ai18n [FR] -->";
		expect(inject(raw, "EN", "X")).toEqual(
			"<!-- ai18n [en] -->\nX\n<!-- /ai18n [en] --> <!-- ai18n [FR] -->world<!-- /ai18n [FR] -->",
		);
		expect(inject(raw, "FR", "Y")).toEqual(
			"<!-- ai18n [EN] -->Hello<!-- /ai18n [EN] --> <!-- ai18n [fr] -->\nY\n<!-- /ai18n [fr] -->",
		);
	});
});

describe("inline detect", () => {
	// Tests that detect function returns the correct number of matches when given a raw string containing one or more valid language tags and a valid language tag.
	it("detect with valid raw and lang", () => {
		const raw =
			"<!-- ai18n [en] -->Hello<!-- /ai18n [en] --> <!-- ai18n [en] -->World<!-- /ai18n [en] -->";
		const lang = "en";
		expect(detect(raw, lang)).toBe(2);
	});

	// Tests that detect function returns the correct number of matches when given a raw string containing language tags for other languages and a valid language tag.
	it("detect with other language tags", () => {
		const raw =
			"<!-- ai18n [fr] -->Bonjour<!-- /ai18n [fr] --> <!-- ai18n [es] -->Hola<!-- /ai18n [es] -->";
		const lang = "fr";
		expect(detect(raw, lang)).toBe(1);
	});

	// Tests that detect function returns 0 when given an empty raw string.
	it("detect with empty raw", () => {
		const raw = "";
		const lang = "en";
		expect(detect(raw, lang)).toBe(0);
	});

	// Tests that detect function returns 0 when given an empty lang parameter.
	it("detect with empty lang", () => {
		const raw = "<!-- ai18n [en] -->Hello<!-- /ai18n [en] -->";
		const lang = "";
		expect(detect(raw, lang)).toBe(0);
	});

	// Tests that detect function returns 0 when given a raw string that does not contain any language tags.
	it("detect with no language tags", () => {
		const raw = "Hello World";
		const lang = "en";
		expect(detect(raw, lang)).toBe(0);
	});

	// Tests that detect function returns 0 when given an invalid lang parameter.
	it("detect with invalid lang", () => {
		const raw = "<!-- ai18n [en] -->Hello<!-- /ai18n [en] -->";
		const lang = "invalid";
		expect(detect(raw, lang)).toBe(0);
	});

	// Tests that detect function returns 1 when given a raw string containing one valid language tag in one line.
	it("detect with one line", () => {
		const raw =
			"# ai18n\n\nAutomate Document I18n by Leveraging OpenAI's GPT-3.5-Turbo (ChatGPT)\n\n<!-- ai18n [zh-tw] --><!-- /ai18n [zh-tw] -->\n";
		const lang = "zh-TW";
		expect(detect(raw, lang)).toBe(1);
	});
});
