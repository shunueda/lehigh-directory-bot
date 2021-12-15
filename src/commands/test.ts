import { SlashCommandBuilder } from '@discordjs/builders'
import {BaseCommandInteraction, MessageActionRow, MessageButton} from 'discord.js'

export default {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('test'),
	async execute(interaction: BaseCommandInteraction) {
		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setURL('https://google.com')
					.setCustomId('primary')
					.setLabel('Primary')
					.setStyle('PRIMARY'),
			);
		await interaction.reply({ content: 'Pong!', components: [row] });
	}
}
