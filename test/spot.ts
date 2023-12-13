
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

		clp.memberships.resend('id')
		clp.organizations.transfer_ownership('id', { new_owner_email: '' })

	} catch (error: any) {
		console.log(inspect(error, false, null, true))
		console.log(error.message)
	}

})()
