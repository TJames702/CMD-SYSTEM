 const Discord = require('discord.js')
const bot = new Discord.Client();
const ms = require("ms");
const ss = require("parse-ms")
const moment = require("moment")
const weather = require('weather-js')
const fetch = require('node-fetch');
const randomPuppy = require('random-puppy');
require('events').EventEmitter.defaultMaxListeners = 200;
const querystring = require('querystring')
const ezgames = require('ez-games.js')
const queue = new Map();
const ranimg = require('ranimg');
const yts = require("yt-search");
const { hangman } = require('reconlx')
const Canvacord = require("canvacord")
const api = require('random-stuff-api')
const fs = require("fs");
const emoji = require('discord-emoji-convert');
const db = require("quick.db");
const hastebin = require("hastebin-gen");
const translate = require('@k3rn31p4nic/google-translate-api');
const { TextChannel } = require("discord.js")
const Jumble = require("jumble-words");
const MadnessTikTok = require("tiktok-scraper");
const { Spawn } = require("pokecord");
const Got = require("got");
const shorten = require("isgd");
const { stripIndents } = require("common-tags");
const figlet = require('figlet');
const GameCord = require('gamecord');
const darkrandom = require("random");
const darkemail = require("random-email");
const darkpassword = require("generate-password");
const giphy = require('giphy-api')("W8g6R14C0hpH6ZMon9HV9FTqKs4o4rCk")
const TicTacToe = require('discord-tictactoe');
const PREFIX = '!';
new TicTacToe({
    language: 'en',
    command: '!ttt'
}, bot);

const ownerid = "709356128840187985"

const express = require('express')
const app = express()
const port = 3000
app.get('/', (req, res) => res.send('3ade yaba shnow'))
app.listen(port, () => 
console.log('Server is online!'))



const cheerio = require('cheerio');

const request = require('request')

const { GiveawaysManager } = require("discord-giveaways");

const manager = new GiveawaysManager(bot, {
    storage: "./giveaways.json",
    updateCountdownEvery: 10000,
    default: {
        botsCanWin: false,
        embedColor: "#FF0000",
        reaction: "ðŸŽ‰"
    }
})
bot.giveawaysManager = manager;


bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	bot.commands.set(command.name, command);
}


const cooldowns = new Discord.Collection();
    this.aliases = new Discord.Collection()
    this.description = new Discord.Collection();
    this.usage = new Discord.Collection()

bot.on('message', message => {
 let prefix = db.get(`prefix_${message.guild.id}`)
  if(prefix === null) prefix = PREFIX;
   if(!message.guild) return;
	if (!message.content.startsWith(prefix) || message.author.bot || message.channel.type === "dm") return;

  
	const args = message.content.substring(prefix.length).split(" ");
	const commandName = args[0].toLowerCase();

	const command = bot.commands.get(commandName)
		|| bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;



	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
    
		command.execute(message, args, bot);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command! | Bug Maybe? Report it using the !bug command');
	}
    if (message.content == bot.user.toString()) {

        const embed = new Discord.MessageEmbed()
            .setTitle("Prefix")
            .setDescription(`My Prefix is "${prefix}"`)
            .setFooter('Type !help for more information')
            .setThumbnail(bot.user.displayAvatarURL())
            .setColor('RANDOM')
        message.channel.send(embed)
    }
});



var letters = ["ðŸ‡¦", "ðŸ‡§", "ðŸ‡¨", "ðŸ‡©", "ðŸ‡ª", "ðŸ‡«", "ðŸ‡¬", "ðŸ‡­", "ðŸ‡®", "ðŸ‡¯", "ðŸ‡°", "ðŸ‡±", "ðŸ‡²", "ðŸ‡³", "ðŸ‡´", "ðŸ‡µ", "ðŸ‡¶", "ðŸ‡·", "ðŸ‡¸", "ðŸ‡¹", "ðŸ‡º", "ðŸ‡»", "ðŸ‡¼", "ðŸ‡½", "ðŸ‡¾", "ðŸ‡¿"];
var unicode = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

var games = [];


var stages = [`\`\`\`

/---|
|   o
|
|
|
\`\`\`
`, `\`\`\`
/---|
|   o
|
|
|
\`\`\`
`, `\`\`\`
/---|
|   o
|   |
| 
|
\`\`\`
`, `\`\`\`
/---|
|   o
|  /|
|
|
\`\`\`
`, `\`\`\`
/---|
|   o
|  /|\\
|
|
\`\`\`
`, `\`\`\`
/---|
|   o
|  /|\\
|  /
|
\`\`\`
`, `\`\`\`
/---|
|   o ~ Game Over, You Lost
|  /|\\
|  / \\
|
\`\`\`
`];

function generateMessage(phrase, guesses) {
    var s = "";
    for (var i = 0; i < phrase.length; i++) {
        if (phrase[i] == ' ')
            s += " ";
        else {
            var c = phrase[i];
            if (guesses.indexOf(c) == -1)
                c = "\\_";
            s += "__" + c + "__ ";
        }
    }
    return s;
}

function nextLetter(message, index, word) {
    message.react(letters[index]).then(r => {
        index++;
        if (index < letters.length) {
            if (index == 13) {
                message.channel.send(generateMessage(word, [])).then(m => {
                    games.push({
                        stage: 0,
                        msg0: message,
                        msg1: m,
                        phrase: word,
                        guesses: []
                    });
                    nextLetter(m, index);
                });
            } else {
                nextLetter(message, index, word);
            }
        }
    });
}






var os = require('os');

console.log(os.cpus());
console.log(os.totalmem());
console.log(os.freemem())

bot.login(process.env.token)


