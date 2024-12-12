
import clProvisioning from '../src'
import { inspect } from 'util'
import getToken from './token'
import { getClient } from './common'
// import { } from '../lib/index'


async function refreshToken(old: string): Promise<string> {
	const token = (await getToken('user')).accessToken
	// if (true) throw new Error('Error refreshing test expired access token')
	return token
}


(async () => {

	const domain = process.env.CL_SDK_DOMAIN
	const accessToken = process.env.CL_SDK_ACCESS_TOKEN || ''

	const clp = await getClient({ accessToken, domain })
	clp.config({ refreshToken })

	try {

		let user = await clp.user.retrieve()
		console.log(user)
		user = await clp.user.update(user)

	} catch (error: any) {
		console.log(inspect(error, false, null, true))
		console.log(error.message)
	}

})()
