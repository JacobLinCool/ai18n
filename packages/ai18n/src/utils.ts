import path from "node:path";

export function common_base(pathes: string[]) {
	pathes = pathes
		.map((p) => path.resolve(p).split(path.sep).slice(0, -1).join(path.sep))
		.sort((a, b) => a.length - b.length);

	let base = pathes[0] || "";
	for (const p of pathes) {
		while (!p.startsWith(base)) {
			base = path.dirname(base);
		}
	}

	return base;
}
