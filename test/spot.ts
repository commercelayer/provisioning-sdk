
import clProvisioning from '../src'
import { inspect } from 'util'
import getToken from './token'


(async () => {

	const auth = await getToken('user')
	const accessToken = auth ? auth.accessToken : ''

	const clp = clProvisioning({
		accessToken,
		timeout: 5000,
	})

	try {

		const organizations = await clp.organizations.list()
		console.log(organizations)

	} catch (error: any) {
		console.log(inspect(error, false, null, true))
		console.log(error.message)
	}

})()
