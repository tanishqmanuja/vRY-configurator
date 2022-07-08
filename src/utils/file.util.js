const { readFileSync, writeFileSync } = require("fs");

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

module.exports = {
	readJSONSync,
	writeJSONSync,
};
