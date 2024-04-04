
import clProvisioning from '../src'
import { inspect } from 'util'
import getToken from './token'


(async () => {

	const auth = await getToken('user')

	const domain = process.env.CL_SDK_DOMAIN
	const accessToken = auth ? auth.accessToken : ''

	const clp = clProvisioning({
		accessToken,
		domain
	})

	try {

		const organizations = await clp.organizations.list()
		const org = organizations.first()

		if (org) {
			const reader = clp.addRawResponseReader()
			await clp.organizations.transfer_ownership(org.id, { id: '123', type: 'organizations', new_owner_email: 'pierluigi@commercelayer.io'})
			console.log(reader.rawResponse)
		}

	} catch (error: any) {
		console.log(inspect(error, false, null, true))
		console.log(error.message)
	}

})()
