
import { CommerceLayerProvisioningClient, Role } from '../src'
import { sleep, sortObjectFields } from '../src/util'
import { getClient, TestData } from '../test/common'
import { ObjectType, isResourceType } from '../src/common'


let clp: CommerceLayerProvisioningClient


// eslint-disable-next-line @typescript-eslint/no-unused-vars
beforeAll(async () => { clp = await getClient() })


describe('SDK suite', () => {

	it('util.sleep', async () => {

		const ms = 2000

		const start = Date.now()
		await sleep(ms)
		const stop = Date.now()

		const delay = stop - start

		expect(delay).toBeGreaterThanOrEqual(ms - 10)
		expect(delay).toBeLessThan(ms + 50)

	})


	it('util.sortObjectFields', async () => {

		const obj: ObjectType = {
			beta: 'beta',
			delta: 'delta',
			alfa: 'alfa',
			gamma: 'gamma'			
		}

		const exp: ObjectType = {
			alfa: 'alfa',
			beta: 'beta',
			gamma: 'gamma',
			delta: 'delta'
		}

		const sorted = sortObjectFields(obj)

		expect(sorted).toEqual(exp)

	})


	it('common.type', async () => {

		const customer: Role = {
			id: TestData.id,
			type: 'roles',
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
			name: 'Test Role'
		}

		expect(isResourceType(customer)).toBeTruthy()

	})

})
