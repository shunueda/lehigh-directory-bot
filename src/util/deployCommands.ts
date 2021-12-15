import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v8'
import { Client, Collection, Command } from 'discord.js'

export default async function deployCommands(
	client: Client,
	rest: REST,
	commands: Command[]
): Promise<Collection<string, Command>> {
	const registeredCommands = new Collection<string, Command>()
	commands.forEach(command =>
		registeredCommands.set(command.data.name, command)
	)
	await rest.put(
		Routes.applicationGuildCommands(
			process.env.CLIENT_ID!,
			process.env.GUILD_ID!
		),
		{ body: commands.map(command => command.data.toJSON()) }
	)
	return registeredCommands
}
