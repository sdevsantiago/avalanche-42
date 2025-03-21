const fs = require("fs/promises");

// .env variables
const brianApiKey = process.env.brianApiKey;
const walletHash = process.env.walletHash;

const brianApiURL = "https://api.brianknows.org/api/v0/agent";
const avalancheId = 43114;

const brianInteraction = async(prompt) => {
	let messages;

	try {
		await fs.access("./context.json");
		let data = await fs.readFile("./context.json", "utf8");
		messages = JSON.parse(data);
	} catch (err) {
		messages = {
			sender: "user",
			content: "",
		};
	}

	const dataFetch = await fetch(brianApiURL, {
		method: "POST",
		headers: {
			"X-Brian-Api-Key": brianApiKey,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			prompt: prompt,
			address: walletHash,
			chainId: avalancheId.toString(),
			kbId: "public-knowledge-box",

		}),
	});

	const data = await dataFetch.json();
	console.log({ data });

	if (data.error || data.response) {
		if (messages.length == 1) {
			messages[0].content = prompt;
		} else {
			messages = [];
		}
		messages.push({
			sender: "brian",
			content: data.error,
		});
		await fs.writeFile("./context.json", JSON.stringify(messages));
	}
};

// brianInteraction("");
