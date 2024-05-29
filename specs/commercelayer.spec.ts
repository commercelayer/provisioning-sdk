
import { CommerceLayerProvisioning, CommerceLayerProvisioningClient, CommerceLayerProvisioningStatic } from '../src'
import { getClient } from '../test/common'
import getAccessToken from '../test/token'


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
		const expiredToken = 'eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCIsImtpZCI6IjliN2JiZmVlMzQzZDVkNDQ5ZGFkODhmMjg0MGEyZTM3YzhkZWFlZTg5NjM4MGQ1ODA2YTc4NWVkMWQ1OTc5ZjAifQ.eyJ1c2VyIjp7ImlkIjoiYUVaa3lTQlhMVyJ9LCJhcHBsaWNhdGlvbiI6eyJpZCI6Ik54RFppeUFBa04iLCJraW5kIjoidXNlciIsInB1YmxpYyI6ZmFsc2V9LCJzY29wZSI6InByb3Zpc2lvbmluZy1hcGkiLCJleHAiOjE3MTI3NTU1NzQsInRlc3QiOmZhbHNlLCJyYW5kIjowLjQwNzEwODk4NDE5ODU4NDU0LCJpYXQiOjE3MTI3NDgzNzQsImlzcyI6Imh0dHBzOi8vY29tbWVyY2VsYXllci5pbyJ9.IXs33dY4PcaedryPyU99kxPQfyVQYcLPwK8GRamVY18KQyiOgCXJbqUMQMfk4WzKaiI3HHwSlbqVXSKe4P3gGHHIUXj1Xdc07VtcS9AZpu6QgMoec1lgeK1pcV41DtWaj-QekN61HFr_oLHTjvlcpO31FJB-Zw50C1trj8gK-dtnYbzH9_AIevWnPMzRGRGq2xcPO7Uw0bEa8pSxkl_gO6e4wM55IPB9IQX86qmW9q_tD7T7IwGEB8mbcwMC7E4YtjlwAzZCXbBuMvFKj5Wma3DwM1Z0-dJAbCw6c-YOzCKvXgnmMYaHgWLnTcpJTk3UpJ_SpZn_kwUa31VFhVP3nupfNTr9bg7Z_kQ9120Vrgq0MMB4wr0c8SARz1pcvvqeU4eUHgamQlugbgoYx8Vm-kxNzcdyT8nRDlAdd1-xglghjLZNcQkxD_rJZWyYd234MXPgpshLYENfkh-QvCxdRjCh_iHazufa3taYcuc4KwQ-Vw-oeiBozNh3JgptjUrd3GMavLpDbXEUa8tH2dz7H2yEjH5vKo5pprno5gKQWnIVO0yHcI32TmWIalV8nouyfvOCrRQaCqJJK7NCtbZZMEVarWP09i6wUy1FKI3rfnBmAIHZxcEn1yOS5ESXfXj8Kt4GVmPG7yIDmCw8P37JAi2xb45oXldzyTyk1jbQMq4'

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
