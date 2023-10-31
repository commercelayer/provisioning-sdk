
import { CommerceLayerProvisioningClient } from '../src'
import { getClient, TestData } from '../test/common'
import { normalize, denormalize } from '../src/jsonapi'
import { ResourceTypeLock } from '../src/api'
import { isEqual } from 'lodash'


let clp: CommerceLayerProvisioningClient


beforeAll(async () => { clp = await getClient() })


describe('SDK:jsonapi suite', () => {

	it('jsonapi.normalize', async () => {

		const type: ResourceTypeLock = 'memberships'

		const resource = {
			id: TestData.id,
			type,
			reference: TestData.reference,
			reference_origin: TestData.reference_origin,
			metadata: TestData.metadata,
			user_email: 'user@sdk-test.org',
			organization: clp.organizations.relationship(TestData.id),
			role: clp.roles.relationship(TestData.id)
		}

		const expected = {
			id: resource.id,
			type,
			attributes: {
				reference: resource.reference,
				reference_origin: resource.reference_origin,
				metadata: resource.metadata,
				user_email: resource.user_email
			},
			relationships: {
				organization: {
					data: resource.organization
				},
				role: {
					data: resource.role
				}
			}
		}

		const normalized = normalize(resource)

		expect(isEqual(normalized, expected)).toBeTruthy()

	})


	it('jsonapi.denormalize', async () => {

		const jsonApi = {
			data: {
				id: TestData.id + '00',
				type: 'users',
				attributes: {
					user_email: 'user@sdk-test.org',
					reference: TestData.reference,
					reference_origin: TestData.reference_origin,
					metadata: TestData.metadata
				},
				relationships: {
					organization: { data: { type: 'organizations', id: TestData.id } },
					role: { data: null }
				}
			},
			included: [{ id: TestData.id, type: 'organizations', attributes: { name: 'Org_Name' } }],
			links: { self: 'link' },
		}

		const expected = {
			id: TestData.id + '00',
			type: 'users',
			user_email: 'user@sdk-test.org',
			reference: TestData.reference,
			reference_origin: TestData.reference_origin,
			metadata: TestData.metadata,
			organization: { type: 'organizations', id: TestData.id, name: 'Org_Name' },
			role: null
		}

		const denormalized = denormalize(jsonApi)

		expect(isEqual(expected, denormalized)).toBeTruthy()

	})

})
