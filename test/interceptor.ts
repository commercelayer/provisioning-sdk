
import clProvisioning, { ErrorObj, RequestObj, ResponseObj } from '../src'
import getToken from './token'


const requestInterceptor = (request: RequestObj): RequestObj => {
	console.log('INSIDE REQUEST INTERCEPTOR')
	return request
}

const responseInterceptor = (response: ResponseObj): ResponseObj => {
	console.log('INSIDE RESPONSE INTERCEPTOR')
	console.log(response)
	return response
}

const errorInterceptor = (error: ErrorObj): ErrorObj => {
	console.log('INSIDE RESPONSE INTERCEPTOR')
	console.log(error)
	return error
}



(async () => {

	const organization = process.env.CL_SDK_ORGANIZATION || ''
	const auth = await getToken('user')
	const accessToken = process.env.CL_SDK_ACCESS_TOKEN || (auth? auth.accessToken+'x' : '')

	const cl = clProvisioning({
		accessToken,
		timeout: 5000,
	})

	const rrr = cl.addRawResponseReader({ headers: true })
	const reqInt = cl.addRequestInterceptor(requestInterceptor)
	cl.addResponseInterceptor(responseInterceptor, errorInterceptor)

	const organizations = await cl.organizations.list({ pageSize: 1 }).catch(error => console.log(error.message))

	cl.removeInterceptor('request', reqInt)

	console.log(organizations)
	console.log(rrr.rawResponse)
	console.log(rrr.headers)

})()
