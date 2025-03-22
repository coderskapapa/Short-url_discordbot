// Import required modules
const { Client, GatewayIntentBits } = require('discord.js');
const dotenv = require('dotenv');
const axios = require('axios');
const validator = require('validator');
const { shortenUrl } = require('./Backend/url');

// Load environment variables
dotenv.config();

// Create a new Discord client
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

// Event: When the bot is ready
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// Event: When a message is sent
client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    if (message.content.startsWith('!shorten')) {
        // Split the message content into parts
        const args = message.content.split(' ');
        const url = args[1]; // The URL to shorten
        const customShortId = args[2]; // Optional custom short ID

        // Check if a URL was provided
        if (!url) {
            return message.reply('Please provide a URL to shorten.');
        }

        // Validate the URL
        if (!validator.isURL(url)) {
            return message.reply('Please provide a valid URL.');
        }

        // Validate custom short ID
        if (customShortId) {
            if (!validator.isAlphanumeric(customShortId) || customShortId.length > 10) {
            return message.reply('Custom short ID must be alphanumeric and have a maximum length of 10 characters.');
            }
        }

        // Call the shortenUrl function with the URL and customShortId
        const shortUrl = await shortenUrl(url, customShortId);



        // Send the response back to the user
        message.reply(`Here's your short URL: ${shortUrl}`);
    }
});


// Log in to Discord
client.login(process.env.DISCORD_BOT_TOKEN);