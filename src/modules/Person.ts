import { MessageEmbed } from 'discord.js'

export default abstract class Person {
	firstName: string
	lastName: string
	description: string | undefined
	email_address: string | undefined
	phone_number: string | undefined
	title: string | undefined
	campus_address: string | undefined
	protected constructor(
		firstName,
		lastName,
		description?,
		email_address?,
		phone_number?,
		title?,
		campus_address?
	) {
		this.firstName = firstName
		this.lastName = lastName
		this.description = description
		this.email_address = email_address
		this.phone_number = phone_number
		this.title = title
		this.campus_address = campus_address
	}
	public toEmbed(): MessageEmbed {
		return new MessageEmbed()
			.setColor('#DEB887')
			.setTitle(`${this.firstName} ${this.lastName}`)
			.addFields({
				name: 'Email',
				value: this.email_address?.replace('@lehigh.edu', '') || 'Unknown',
				inline: true
			})
	}
}
