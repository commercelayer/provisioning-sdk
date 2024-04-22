
import { CommerceLayerProvisioningClient, CommerceLayerProvisioningStatic } from '../src'
import { getClient } from '../test/common'
import { RawResponseReader } from '../src/interceptor'


let clp: CommerceLayerProvisioningClient


beforeAll(async () => { clp = await getClient() })


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

		const cli = await getClient(true)

		const reader = cli.addRawResponseReader({ headers })
		expect(reader).not.toBeUndefined()
		expect(reader.id).toBeGreaterThanOrEqual(0)

		await cli.roles.list({ pageSize: 1 })
		expect(reader.rawResponse?.data).not.toBeUndefined()
		if (headers) expect(reader.headers).not.toBeUndefined()
		else expect(reader.headers).toBeUndefined()

		cli.removeRawResponseReader(reader.id as number)
		cli.removeRawResponseReader(reader)
		cli.removeRawResponseReader(0)
		cli.removeRawResponseReader({ id: 1, ok: true } as RawResponseReader)

		clp = await getClient()

	})

})
