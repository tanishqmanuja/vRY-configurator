const { filter } = require("fuzzy");
const { WEAPONS } = require("../constants/weapons.const.js");

const TABLE_OPTS = {
	skin: "Skin",
	rr: "Ranked Rating",
	leaderboard: "Leaderboard Position",
	peakrank: "Peak Rank",
};

const searchWeapons = (input = "") =>
	filter(input, WEAPONS).map(el => el.original);

const questions = configOriginal => [
	{
		type: "autocomplete",
		name: "weapon",
		message: "Please select a weapon to show skin for:",
		source: (answers, input) => searchWeapons(input),
	},
	{
		type: "checkbox",
		name: "table",
		message: "Please select table columns to display:",
		choices: Object.keys(TABLE_OPTS).map(key => ({
			name: TABLE_OPTS[key],
			value: key,
			checked: configOriginal?.table?.[key] ?? true,
		})),
		filter: table =>
			Object.keys(TABLE_OPTS).reduce(
				(obj, key) => ({ ...obj, [key]: table.includes(key) }),
				{}
			),
	},
];

module.exports = {
	basicQuestions: questions,
};
