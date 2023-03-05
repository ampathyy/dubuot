const { Client, SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const ecoSchema = require('../ecoSchema');
module.exports = {
    data: new SlashCommandBuilder()
    .setName('bal')
    .setDescription('check your balance'),

    async execute(interaction) {
        const {user, guild} = interaction;
        let Data = await ecoSchema.findOne({ Guild: interaction.guild.id, User: user.id })
        if (!Data) return await interaction.reply({content: "You must have an account first.", ephemeral: true})
        const bank = Math.round(Data.Bank);
        const wallet = Math.round(Data.Wallet);
        const total = Math.round(Data.Wallet + Data.Bank);
        

        const embed = new EmbedBuilder()
        .setColor('Blue')
        .setTitle(`Account Balance`)
        .addFields({ name: "Balance", value: `**Bank:** $${bank}\n**Wallet:** $${wallet}\n**Total:** $${total}`})
        
        await interaction.reply({embeds: [embed]});

    }
}