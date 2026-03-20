
import { beforeAll, describe, expect, test } from 'vitest'
import { type CommerceLayerProvisioningClient, CommerceLayerProvisioningStatic } from '../src'
import { OPEN_API_SCHEMA_VERSION } from '../src/commercelayer'
import { getClient } from '../test/common'


// biome-ignore lint/correctness/noUnusedVariables: variable used later inside functions
let clp: CommerceLayerProvisioningClient


beforeAll(async () => { clp = await getClient() })


describe('SDK:static suite', () => {

	test('static.SdkError', async () => {
		const sdkError = CommerceLayerProvisioningStatic.isSdkError({ message: 'SdkError', name: 'SdkError', type: 'request' })
		expect(sdkError).toBeTruthy()
	})


	test('static.ApiError', async () => {
		const apiError = CommerceLayerProvisioningStatic.isApiError({ message: 'ApiError', name: 'ApiError', type: 'response' })
		expect(apiError).toBeTruthy()
	})


	test('static.resources', async () => {
		const resources = CommerceLayerProvisioningStatic.resources()
		expect(Array.isArray(resources)).toBeTruthy()
	})


	test('static.init', async () => {
		const client = CommerceLayerProvisioningStatic.init({ accessToken: 'fake-access-token' })
		expect(client).not.toBeNull()
	})

	test('static.schema', async () => {
		const sver = CommerceLayerProvisioningStatic.schemaVersion
		expect(sver).toBe(OPEN_API_SCHEMA_VERSION)
	})

})
