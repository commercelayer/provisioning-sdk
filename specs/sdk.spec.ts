
import { CommerceLayerProvisioningClient, Membership, MembershipCreate, Role } from '../src'
import { sleep, sortObjectFields } from '../src/util'
import { getClient, TestData } from '../test/common'
import { isResourceType } from '../src/common'
import type { ObjectType } from '../src/types'


let clp: CommerceLayerProvisioningClient


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
			name: 'Test Role',
			kind: 'custom'
		}

		expect(isResourceType(customer)).toBeTruthy()

	})


	it('response.emptyBody', async () => {

		const cli = await getClient({})

		const organization = (await cli.organizations.list()).first()
		const role = (await cli.roles.list()).first()

		expect(organization).toBeDefined()
		expect(role).toBeDefined()

		if (organization && role) {

		const membershipCreate: MembershipCreate = {
			user_email: String(Date.now()) + '@provisioning.org',
			organization: cli.organizations.relationship(organization),
			role: cli.roles.relationship(role)
		}

		let membership = await cli.memberships.create(membershipCreate)
		expect(membership).toBeDefined()

		await cli.memberships.resend(membership)

		await cli.memberships.delete(membership)

		await cli.memberships.retrieve(membership)
			.catch(error => {
				expect(cli.isApiError(error)).toBeTruthy()
				expect(error.status).toBe(404)
		})

	}

	})

})
