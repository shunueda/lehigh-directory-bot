import { Collection, CommandInteractionOption } from 'discord.js'

export default function commandOptionsResolver(
	options: readonly CommandInteractionOption[]
): Collection<string, string> {
	const res = new Collection<string, string>()
	options.forEach(option => {
		res.set(option.name, <string>option.value)
	})
	return res
}
