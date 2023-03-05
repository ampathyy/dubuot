const { Client, SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const ecoSchema = require('../ecoSchema');
module.exports = {
    data: new SlashCommandBuilder()
    .setName('beg')
    .setDescription('beg for money'),

    async execute(interaction) {
        const {user, guild} = interaction;
        let Data = await ecoSchema.findOne({ Guild: interaction.guild.id, User: interaction.user.id });
        
        let negative = Math.round((Math.random() * -300) - 10)
        let positive = Math.round((Math.random() * 300) + 10)

        const posN = [negative, positive];
        
        const amount = Math.round((Math.random() * posN.length));
        const value = posN[amount];

        if(!value) return await interaction.reply({content: 'no money for you!'});

        if (Data) {
            Data.Wallet += value;
            await Data.save();
        }

     
        if (value > 0) {
            const positiveChoices = [
                "God gave you some money",
                "You hit the jackpot!",
                "Today's your lucky day!",
            ]

            const posName = Math.round((Math.random) * positiveChoices.length);

            const embed1 = new EmbedBuilder()
            .setColor("Blue")
            .setTitle(`Beg for money`)
            .addFields({name: 'beg result', value: `${positiveChoices[[posName]]} ${value}`})

            await interaction.reply({embeds: [embed1]});
        } else {
            const negativeChoices = [
                "God took your money, and you lost",
                "You lost the jackpot, and lost ",
                "Today's your unlucky day, and you lost "
            ]

            const negName = Math.round((Math.random() * negativeChoices.length));

            const stringV = `${value}`;

            const nonSymbol = await stringV.slice(1);

            const embed2 = new EmbedBuilder()
            .setColor('Blue')
            .setTitle(`Beg Command`)
            .addFields({name: "Beg Result", value: `${negativeChoices[[negName]]} $${nonSymbol}` })

            await interaction.reply({ embeds: [embed2]});
        }


    }
}