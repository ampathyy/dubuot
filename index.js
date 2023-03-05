// prerequisites 
const fs = require('node:fs');
const path = require('node:path');
const { token } = require('./config.json');
const { Client, codeBlock, Collection, GatewayIntentBits, Events } = require('discord.js');


const currency = new Collection();
const mongoose = require('mongoose');
const { mongodburl } = require('./config.json')
// new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, , GatewayIntentBits.GuildMessages] });

// access commands 	
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

// loop into array to join all files
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

// access events
const eventsPath = path.join(__dirname, 'events');
const eventsFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventsFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}






client.once(Events.ClientReady, async () => {
	
	
	if (!mongodburl) return;
	await mongoose.connect(mongodburl || '', {
		keepAlive : true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	if (mongoose.connect) {
		console.log('database ready.')
	}
	console.log(`Logged in as ${client.user.tag}!`);
});

// login with token
client.login(token);