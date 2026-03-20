
import { beforeAll, describe, expect, test } from 'vitest'
import type { CommerceLayerProvisioningClient } from '../src'
import { Organizations } from '../src/api'
import { ErrorType } from '../src/error'
import { getClient } from '../test/common'


let clp: CommerceLayerProvisioningClient


beforeAll(async () => { clp = await getClient({}) })


describe('SDK:error suite', () => {

	test('ApiError', async () => {
		try {
			await clp.roles.retrieve('fake-id')
		} catch (error: any) {
			expect(clp.isApiError(error)).toBeTruthy()
			expect(error.status).toBe(404)
		}
	})


	test('ApiError.first', async () => {
		try {
			await clp.roles.create({ name: '', organization: { id: '', type: Organizations.TYPE} })
		} catch (error: any) {
			expect(error.first()).not.toBeUndefined()
		}
	})


	test('ApiError.type', async () => {
		try {
			clp.config({ domain: 'fake.domain.xx', accessToken: 'fake-access-token' })
			await clp.roles.list({ pageSize: 1})
		} catch (error: any) {
			expect(error.type).toEqual(ErrorType.CLIENT)
		}
	})

})
