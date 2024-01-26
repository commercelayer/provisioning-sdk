
import { CommerceLayerProvisioningClient, CommerceLayerProvisioningStatic } from '../src'
import { OPEN_API_SCHEMA_VERSION } from '../src/commercelayer'
import { getClient } from '../test/common'


let clp: CommerceLayerProvisioningClient


beforeAll(async () => { clp = await getClient() })


describe('SDK:static suite', () => {

	it('static.SdkError', async () => {
		const sdkError = CommerceLayerProvisioningStatic.isSdkError({ message: 'SdkError', name: 'SdkError', type: 'request' })
		expect(sdkError).toBeTruthy()
	})


	it('static.ApiError', async () => {
		const apiError = CommerceLayerProvisioningStatic.isApiError({ message: 'ApiError', name: 'ApiError', type: 'response' })
		expect(apiError).toBeTruthy()
	})


	it('static.resources', async () => {
		const resources = CommerceLayerProvisioningStatic.resources()
		expect(Array.isArray(resources)).toBeTruthy()
	})


	it('static.init', async () => {
		const client = CommerceLayerProvisioningStatic.init({ accessToken: 'fake-access-token' })
		expect(client).not.toBeNull()
	})

	it('static.schema', async () => {
		const sver = CommerceLayerProvisioningStatic.schemaVersion
		expect(sver).toBe(OPEN_API_SCHEMA_VERSION)
	})

})
