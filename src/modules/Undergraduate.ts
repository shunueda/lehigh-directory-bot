import Student from './Student.js'
import { MessageEmbed } from 'discord.js'

export default class Undergraduate extends Student {
	constructor(
		firstName,
		lastName,
		description?,
		email_address?,
		phone_number?,
		title?,
		campus_address?
	) {
		super(
			firstName,
			lastName,
			description,
			email_address,
			phone_number,
			title,
			campus_address
		)
	}
}
