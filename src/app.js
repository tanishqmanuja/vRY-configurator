const { prompt, registerPrompt } = require("inquirer");
const inquirerPrompt = require("inquirer-autocomplete-prompt");
const { join } = require("path");
const { cwd, stdin } = require("process");
const { basicQuestions } = require("./questions/basic.ques.js");
const { advanceQuestions } = require("./questions/advance.ques.js");
const { readJSONSync, writeJSONSync } = require("./utils/file.util.js");

const CONFIG_PATH = join(cwd(), "./config.json");

registerPrompt("autocomplete", inquirerPrompt);

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

	const configOriginal = readJSONSync(CONFIG_PATH) || configDefault;

	const menuChoices = [
		"Basic Config (Suitable for most users)",
		"Advance Config (I know what i am doing!)",
	];

	const { menuChoice } = await prompt([
		{
			type: "list",
			name: "menuChoice",
			message: "Please select type of configuration:",
			default: 0,
			choices: menuChoices,
			filter: choice => menuChoices.indexOf(choice),
		},
	]);

	let config;
	if (menuChoice === 0) {
		config = await prompt(basicQuestions(configOriginal));
	} else if (menuChoice === 1) {
		config = await prompt(advanceQuestions(configDefault));
	}

	writeJSONSync(CONFIG_PATH, { ...configOriginal, ...config });

	console.log("Press any key to exit");
	stdin.setRawMode(true);
	stdin.resume();
	stdin.on("data", process.exit.bind(process, 0));
};

main();
