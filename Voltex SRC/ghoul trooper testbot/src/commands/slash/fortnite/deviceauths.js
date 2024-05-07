const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const config = require('../../../config');
const userInfo = require('../../../schemas/UserInfoSchema');

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('deviceauths')
        .setDescription('Creates device auths for your account'),
        options: {
            fortnite: true,
        },
    /**
     * @param {ExtendedClient} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    run: async (client, interaction, loginData, mongodb) => {

        if (!config.handler?.mongodb?.toggle) {
            await message.reply({
                content: 'Database is not ready; this command cannot be executed.'
            });

            return;
        }

        let userId = interaction?.user?.id || interaction?.member?.id;
        if (!loginData) {
            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle('Login data not found')
                        .setDescription(`You don't have any accounts saved.`)
                        .setColor('Red')
                ],
                components: []
            });
            return;
        } else {
            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle("Success!")
                        .setDescription(`I have successfully generated deviceauths for the account: ${loginData.displayName}!\n\nAccountId: ${loginData.accountId}\nDeviceID: ${loginData.deviceId}\nSecret: ${loginData.secret}`)
                        .setColor("Green")
                        .setTimestamp()
                ],
                ephemeral: true
            })
        }
    }
};