
import clProvisioning from '../src'
import { inspect } from 'util'
import getToken from './token'


(async () => {

	const organization = process.env.CL_SDK_ORGANIZATION || ''
	const auth = await getToken('user')
	const accessToken = auth ? auth.accessToken : ''

	const cl = clProvisioning({
		accessToken,
		timeout: 5000,
	})

	try {



	} catch (error: any) {
		console.log(inspect(error, false, null, true))
		console.log(error.message)
	}

})()
