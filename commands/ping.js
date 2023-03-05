const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    // registration info
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    // functionality
    async execute(interaction) {
        await interaction.reply('Pong!');
    },
};
