/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

/**
 * NOTE: This script is only to be used by senior candidates
 */

import Database from 'better-sqlite3'
import { executeQuery } from '@datocms/cda-client'
import 'dotenv/config'

const query = `query {
	allDepartments(first: 100) {
		name
		id
		parent {
			name
			id
		}
	}

	allPeople(first: 100) {
		id
		name
		title
		avatar {
			url
		}
		department {
			name
		}
	}
}`

const DATO_API_TOKEN = process.env.DATO_API_TOKEN // the Dato API token is provided in the Google Doc we shared with you

async function main() {
	// API Docs: https://github.com/WiseLibs/better-sqlite3/blob/master/docs/api.md
	const db = new Database('hashicorp.sqlite')
	db.pragma('journal_mode = WAL')

	//Docs here: https://github.com/datocms/cda-client
	const result = await executeQuery(query, {
		token: DATO_API_TOKEN,
	})

	// Sr. candidate TODO: Insert data into the database
}

main()
