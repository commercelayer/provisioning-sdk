
import { CommerceLayerProvisioningClient } from '../src'
import { Organizations } from '../src/api'
import { ErrorType } from '../src/error'
import { getClient } from '../test/common'


let clp: CommerceLayerProvisioningClient


beforeAll(async () => { clp = await getClient(true) })


describe('SDK:error suite', () => {

	it('ApiError', async () => {
		try {
			await clp.roles.retrieve('fake-id')
		} catch (error) {
			expect(clp.isApiError(error)).toBeTruthy()
			expect(error.status).toBe(404)
		}
	})


	it('ApiError.first', async () => {
		try {
			await clp.roles.create({ name: '', organization: { id: '', type: Organizations.TYPE} })
		} catch (error) {
			expect(error.first()).not.toBeUndefined()
		}
	})


	it('ApiError.type', async () => {
		try {
			clp.config({ domain: 'fake.domain.xx', accessToken: 'fake-access-token' })
			await clp.roles.list({ pageSize: 1})
		} catch (error) {
			expect(error.type).toEqual(ErrorType.CLIENT)
		}
	})

})
