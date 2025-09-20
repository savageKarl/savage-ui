import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const componentsDir = path.resolve(__dirname, "../src/components");
const outputFile = path.resolve(__dirname, "../src/index.ts");

async function generateExports() {
	try {
		const componentFolders = await fs.readdir(componentsDir, {
			withFileTypes: true,
		});
		const exportStatements = componentFolders
			.filter((dirent) => dirent.isDirectory())
			.map((dirent) => `export * from './components/${dirent.name}';`);

		const fileContent = `// This file is auto-generated. Do not edit.\n\n${exportStatements.join("\n")}\n`;

		await fs.writeFile(outputFile, fileContent, "utf-8");
		console.log("Successfully generated component exports!");
	} catch (error) {
		console.error("Error generating component exports:", error);
		process.exit(1);
	}
}

generateExports();
