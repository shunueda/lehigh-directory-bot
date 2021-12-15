import Person from './Person.js'

export default class Faculty extends Person {
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
