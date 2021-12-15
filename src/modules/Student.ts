import Person from './Person.js'
import { MessageEmbed } from 'discord.js'

export default class Student extends Person {
	year: string
	college:
		| 'EN'
		| 'AS'
		| 'BU'
		| 'ED'
		| 'IC'
		| 'RO'
		| 'SS'
		| 'HE'
		| 'GC'
		| 'AE'
		| 'VS'
		| 'LV'
	major: string
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
		this.year = email_address.substring(4, 6)
		const i = description.indexOf('/')
		this.college = description.substring(i - 2, i)
		this.major = description.substring(i + 1)
	}
	public toEmbed(): MessageEmbed {
		return super.toEmbed().addFields(
			{
				name: 'College',
				value: (this.college as string) || 'Unknown',
				inline: true
			},
			{ name: 'Major', value: this.major || 'Unknown', inline: true },
			{ name: 'Year', value: this.year || 'Unknown', inline: true }
		)
	}
}
