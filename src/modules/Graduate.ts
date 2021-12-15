import Student from './Student.js'
import { MessageEmbed } from 'discord.js'

export default class Graduate extends Student {
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
