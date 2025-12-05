
import { CommerceLayerProvisioning, CommerceLayerProvisioningClient, CommerceLayerProvisioningStatic } from '../src'
import { getClient } from '../test/common'
import getAccessToken from '../test/token'


let clp: CommerceLayerProvisioningClient


beforeAll(async () => { clp = await getClient() }, 10000)


describe('SDK:commercelayer suite', () => {

	it('commercelayer.resources', async () => {

		const resources = CommerceLayerProvisioningStatic.resources()

		expect(resources).not.toBeUndefined()
		expect(Array.isArray(resources)).toBeTruthy()
		expect(resources.length).toBeGreaterThan(0)

		const resourcesInstance = clp.resources()
		expect(resourcesInstance).toStrictEqual(resources)

	})



	it('commercelayer.rawResponse', async () => {

		jest.setTimeout(10000)
		const headers = true

		const cli = await getClient({})

		const reader = cli.addRawResponseReader({ headers })
		expect(reader).not.toBeUndefined()
		expect(reader.id).toBeGreaterThanOrEqual(0)

		await cli.roles.list({ pageSize: 1 })
		expect(reader.rawResponse?.data).not.toBeUndefined()
		if (headers) expect(reader.headers).not.toBeUndefined()
		else expect(reader.headers).toBeUndefined()

		cli.removeRawResponseReader()

		clp = await getClient()

	})


	it('commercelayer.refreshToken', async () => {

		let refreshed = false

		async function refreshToken(old: string): Promise<string> {
			const token = (await getAccessToken('user')).accessToken
			refreshed = true
			return token
		}

		const domain = process.env.CL_SDK_DOMAIN as string
		const expiredToken = process.env.CL_SDK_ACCESS_TOKEN_EXPIRED as string

		const cli = CommerceLayerProvisioning({
			domain,
			accessToken: expiredToken,
			refreshToken
		})

		expect(cli.currentAccessToken).toBe(expiredToken)

		await cli.memberships.list({ pageSize: 1 })

		expect(refreshed).toBeTruthy()
		expect(cli.currentAccessToken).toBeDefined()
		expect(cli.currentAccessToken).not.toBe(expiredToken)
		
		clp = await getClient()

	})

})
