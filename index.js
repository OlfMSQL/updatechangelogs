const {Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions} = require('discord.js');
const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]});
const fetch = require('node-fetch');
const fs = require('fs');

client.on("ready", () => {
    console.log("Bot is ready to go");
    client.user.setActivity("Grinding for Coffeespeak");
    const GITHUB_PERSONAL_ACCESS_TOKEN = 'myTOKEN'; // Replace with your actual PAT
    const DISCORD_CHANNEL_ID = 'channelID';
    const owner = '';
    const repo = '';
    const path = 'changelog.json';
    const apiURL = "APIURL";

    client.on("messageCreate", (message) => {
        const content = message.content.toLowerCase();
        if (content.includes("help") && !message.author.bot) {
            message.reply(`help`);
        }
    });

    client.on("messageCreate", (message) => {
        if (message.content.includes("hello") && !message.author.bot) {
            message.reply("Hiii");
        }
    });

    client.on("messageCreate", (message) => {
        const content = message.content.toLowerCase();
        const userId = "409742476736331776";

        if (content.includes("wer bist du?") && !message.author.bot) {
            message.reply(`Ich bin ein Computer gesteuertes Programm, welches von <@${userId}> programmiert wurde. Ich bin verantwortlich dafür, die neusten Changelogs von CoffeeSpeak zu veröffentlichen.`);
        }
    });
})

client.on('messageCreate', async (message) => {
    if (message.channel.id === DISCORD_CHANNEL_ID && message.content.toLowerCase() === 'changelog') {
        fetchChangelogAndPost(message.channel);
    }
});

client.login('myTOKEN'); 

async function fetchChangelogContent() {
    try {
        const response = await fetch('https://api.github.com/repos/CoffeeSpeak/Chat-UI/contents/changelog.json', {
            headers: {
                'Authorization': `Bearer ${GITHUB_PERSONAL_ACCESS_TOKEN}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            const changelogContent = Buffer.from(data.content, 'base64').toString('utf-8');
            return changelogContent;
        } else {
            console.error('Failed to fetch changelog content from GitHub');
            return null;
        }
    } catch (error) {
        console.error('Error fetching changelog content:', error);
        return null;
    }
}

async function fetchChangelogAndPost(channel) {
    try {
        const changelogContent = await fetchChangelogContent();
        if (!changelogContent) {
            channel.send('Changelog content not available.');
            return;
        }

        // Send the changelog content to the Discord channel
        channel.send(`**Changelog Content**:\n${changelogContent}`);
    } catch (error) {
        console.error('Error posting changelog to Discord:', error);
    }
}
