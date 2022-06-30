const inquirer = require("inquirer");
const inquirerPrompt = require("inquirer-autocomplete-prompt");
const fuzzy = require("fuzzy");
const { readFileSync, writeFileSync } = require("fs");
const { join } = require("path");
const { cwd } = require("process");

const CONFIG_PATH = join(cwd(), "./config.json");

const WEAPONS = [
	"Classic",
	"Shorty",
	"Frenzy",
	"Ghost",
	"Sheriff",

	"Stinger",
	"Spectre",
	"Bucky",
	"Judge",

	"Bulldog",
	"Guardian",
	"Phantom",
	"Vandal",

	"Marshal",
	"Operator",
	"Ares",
	"Odin",
	"Melee",
];

const TABLE_OPTS = {
	skin: "Skin",
	rr: "Ranked Rating",
	leaderboard: "Leaderboard Position",
	peakrank: "Peak Rank",
};

inquirer.registerPrompt("autocomplete", inquirerPrompt);

const readJSONSync = filepath => {
	try {
		const buff = readFileSync(filepath, "utf-8");
		return JSON.parse(buff);
	} catch (error) {
		return;
	}
};

const writeJSONSync = (filepath, data) => {
	try {
		writeFileSync(filepath, JSON.stringify(data, null, 4));
		console.log("Successfully configured vRY");
	} catch {
		console.log(`Error writing ${filepath}`);
	}
};

const searchWeapons = (input = "") =>
	fuzzy.filter(input, WEAPONS).map(el => el.original);

const main = async () => {
	const configDefault = {
		cooldown: 10,
		weapon: "Vandal",
		port: 1100,
		table: {
			skin: true,
			rr: true,
			peakrank: true,
			leaderboard: true,
		},
	};

	let configOriginal = readJSONSync(CONFIG_PATH) || configDefault;

	const config = await inquirer.prompt([
		{
			type: "autocomplete",
			name: "weapon",
			message: "Select weapon to show skin: ",
			source: (answers, input) => searchWeapons(input),
		},
		{
			type: "checkbox",
			name: "table",
			message: "Select table options: ",
			choices: Object.keys(TABLE_OPTS).map(key => ({
				name: TABLE_OPTS[key],
				value: key,
				checked: configOriginal?.table?.[key] ?? true,
			})),
		},
	]);

	config.table = Object.keys(TABLE_OPTS).reduce(
		(obj, key) => ({ ...obj, [key]: config.table.includes(key) }),
		{}
	);

	writeJSONSync(CONFIG_PATH, { ...configOriginal, ...config });

	console.log("Press any key to exit");
	process.stdin.setRawMode(true);
	process.stdin.resume();
	process.stdin.on("data", process.exit.bind(process, 0));
};

main();
