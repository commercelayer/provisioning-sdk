
import { CommerceLayerProvisioningClient, Membership, Role } from '../src'
import { ListResponse } from '../src/resource'
import { getClient } from '../test/common'


let clp: CommerceLayerProvisioningClient
let memberships: ListResponse<Membership>
let tempId: string


beforeAll(async () => {
	clp = await getClient(true)
	memberships = await clp.memberships.list({ pageSize: 1})
})


describe('SDK:resource suite', () => {

	it('resource.first', async () => {
		const first = memberships.first()
		expect(first?.id).not.toBeUndefined()
	})


	it('resource.last', async () => {
		const first = memberships.first()
		const last = memberships.last()
		expect(last?.id).not.toBeUndefined()
		expect(first).toEqual(last)
	})


	it('resource.get', async () => {
		const role = memberships.get(0)
		expect(role?.id).not.toBeUndefined()
	})


	it('resource.retrieve', async () => {
		const id = memberships.first()?.id as string
		const user = await clp.memberships.retrieve(id)
		expect(user.id).toEqual(id)
	})


	it('resource.update', async () => {
		const id = memberships.first()?.id as string
		const reference = String(Date.now())
		const role = await clp.memberships.update({ id, reference })
		expect(role.reference).toEqual(reference)
	})


	it('resource.singleton', async () => {
		const user = await clp.user.retrieve()
		expect(user.id).not.toBeNull()
		expect(user.id).not.toBeUndefined()
	})


	it('resource.create', async () => {
		const user_email = 'spec@provisioning-sdk-test.org-role'
		const org = (await clp.organizations.list()).first()
		const role = (await clp.roles.list()).first()
		if (!org || !role) return
		const ms = await clp.memberships.create({
			user_email,
			organization: clp.organizations.relationship(org),
			role: clp.roles.relationship(role)
		})
		expect(ms.id).not.toBeUndefined()
		expect(ms.user_email).toEqual(user_email)
		tempId = ms.id
	})


	it('resource.delete', async () => {
		await clp.memberships.delete(tempId)
		try {
			await clp.memberships.retrieve(tempId)
		} catch (error) {
			expect(error.code).toEqual("404")
			expect(error.status).toEqual(404)
		}
	})


	it('resource.fetch', async () => {
		const org = (await clp.organizations.list({ pageSize: 1 })).first()
		if (!org) return
		const mships = await clp.organizations.memberships(org.id)
		expect (mships.length).toBeGreaterThan(0)
		const o = await clp.memberships.organization(mships.first()?.id || '')
		expect (o.id).toBe(org.id)
	})

})
