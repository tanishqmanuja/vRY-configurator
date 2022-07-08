const { basicQuestions } = require("./basic.ques.js");

const portRegex =
	/^((6553[0-5])|(655[0-2][0-9])|(65[0-4][0-9]{2})|(6[0-4][0-9]{3})|([1-5][0-9]{4})|([0-5]{0,5})|([0-9]{1,4}))$/gi;

const questions = configOriginal => [
	{
		type: "number",
		name: "port",
		message: "Please enter port for server to run:",
		default: configOriginal.port,
		validate: port => portRegex.test(port),
	},
	{
		type: "number",
		name: "cooldown",
		message: "Please enter cooldown time in seconds:",
		default: configOriginal.cooldown,
	},
	...basicQuestions(configOriginal),
];

module.exports = {
	advanceQuestions: questions,
};
