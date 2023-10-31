
import { CommerceLayerProvisioningClient } from '../src'
import { getClient, CommonData, handleError, interceptRequest } from '../test/common'



let clp: CommerceLayerProvisioningClient


beforeAll(async () => { clp = await getClient(true) })


describe('Test headers', () => {

	it('Request headers', async () => {

		const testHeaderValue = 'test-value'
		const params = { fields: { } }
		const options = {
			...CommonData.options,
			headers: {
				'test-header': testHeaderValue,
				'Content-Type': 'application/json'
			}
		}

		const intId = clp.addRequestInterceptor((config) => {
			expect(config.headers).toBeDefined()
			if (config.headers) {
				expect(config.headers['test-header']).toBe(testHeaderValue)
				expect(config.headers['Content-Type']).toBe('application/vnd.api+json')
			}
			return interceptRequest()
		})

		await clp.user.retrieve(params, options)
			.catch(handleError)
			.finally(() => clp.removeInterceptor('request', intId))

	})


	it('Response headers', async () => {

		const params = { fields: { } }

		const reader = clp.addRawResponseReader({ headers: true })

		await clp.user.retrieve(params, CommonData.options)

		expect(reader.headers).not.toBeUndefined()
		expect(reader.headers?.['x-ratelimit-limit']).not.toBeUndefined()

		clp.removeRawResponseReader(reader)

	})


})
