import { Client, Command, Intents } from 'discord.js'
import dotenv from 'dotenv'
import download from 'download'
import { writeFileSync, readdirSync } from 'fs'
import deployCommands from './util/deployCommands.js'
import { REST } from '@discordjs/rest'

dotenv.config()

const client = new Client({ intents: [Intents.FLAGS.GUILDS] })
const rest = new REST({ version: '9' }).setToken(process.env.SECRET!)

const commands = await deployCommands(
	client,
	rest,
	await Promise.all(
		readdirSync('./dist/commands')
			.filter(file => file.endsWith('.js'))
			.map(
				async file => (await import(`./commands/${file}`)).default as Command
			)
	)
)

client.once('ready', () => {
	console.log('Ready!')
})

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return
	const command = commands.get(interaction.commandName)
	if (!command) return
	try {
		await command.execute(interaction)
	} catch (error) {
		console.error(error)
		return interaction.reply({
			content: 'There was an error while executing this command!',
			ephemeral: true
		})
	}
})

// writeFileSync(
// 	'assets/directory.db',
// 	await download(
// 		'https://github.com/shun-ueda/lehigh-directory/raw/main/assets/directory.db'
// 	)
// )

await client.login(process.env.SECRET)
