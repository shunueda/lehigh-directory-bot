import { SlashCommandBuilder } from '@discordjs/builders'
import { BaseCommandInteraction, MessageEmbed } from 'discord.js'
import getPersons from '../util/getPersons.js'
import commandOptionsResolver from '../util/commandOptionsResolver.js'
import Person from '../modules/Person.js'
import chunks from '../util/chunks.js'

export default {
	data: new SlashCommandBuilder()
		.setName('firstname')
		.setDescription('Search by first name')
		.addStringOption(option => {
			return option
				.setName('value')
				.setDescription('Enter the first name')
				.setRequired(true)
		})
		.addBooleanOption(option => {
			return option
				.setName('partial')
				.setDescription('Set this option true to enable partial search')
		}),
	async execute(interaction: BaseCommandInteraction) {
		const args = commandOptionsResolver(interaction.options.data)
		let persons: Person[] = []
		if (args.get('partial')) {
			persons = getPersons().filter(({ firstName }) =>
				firstName.includes(args.get('value')!)
			)
		} else {
			persons = getPersons().filter(
				({ firstName }) => firstName === args.get('value')!
			)
		}
		if (persons.length === 0) {
			await interaction.reply({ content: 'No result', ephemeral: true })
		} else {
			if (persons.length > 10) {
				let res = ''
				persons.forEach(person => {
					res += `- ${person.firstName} ${person.lastName}\n`
				})
				await interaction.reply({
					content: `Embed disabled because there are more than 10 results.\n\n ${res}`,
					ephemeral: true
				})
			} else {
				await interaction.reply({
					embeds: persons.map(person => person.toEmbed()),
					ephemeral: true
				})
			}
		}
	}
}
