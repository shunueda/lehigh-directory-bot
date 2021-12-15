import Person from '../modules/Person.js'
import Database from 'better-sqlite3'
import Student from '../modules/Student.js'
import Graduate from '../modules/Graduate.js'
import Undergraduate from '../modules/Undergraduate.js'
import Faculty from '../modules/Faculty.js'
import Other from '../modules/Other.js'

const persons: Person[] = []
const db = new Database('assets/directory.db')
const stmt = db.prepare('SELECT * FROM directory')

export default function getPersons() {
	if (persons.length === 0) {
		for (const {
			first_name,
			last_name,
			description,
			email_address,
			phone_number,
			title,
			campus_address
		} of stmt.iterate()) {
			let clazz
			if (description.includes('Student')) {
				if (description.includes('Graduate')) {
					clazz = Graduate
				} else {
					clazz = Undergraduate
				}
			} else if (description.includes('Faculty')) {
				clazz = Faculty
			} else {
				clazz = Other
			}
			persons.push(
				new clazz(
					first_name,
					last_name,
					description,
					email_address,
					phone_number,
					title,
					campus_address
				)
			)
		}
	}
	return persons
}
