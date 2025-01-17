/**
 * ©2025 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen
 **/

import { CommerceLayerProvisioningClient, ApplicationMembership } from '../../src'
import isEqual from 'lodash.isequal'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getClient, TestData, CommonData, handleError, interceptRequest, checkCommon, checkCommonData, checkCommonParamsList, checkCommonParams, currentAccessToken, randomValue } from '../../test/common'



let clp: CommerceLayerProvisioningClient


beforeAll(async () => { clp = await getClient() })


describe('ApplicationMemberships resource', () => {

  const resourceType = 'application_memberships'
  const resourcePath = 'application_memberships'


  /* spec.create.start */
  it(resourceType + '.create', async () => {

    const createAttributes = {
			api_credential: clp.api_credentials.relationship(TestData.id),
			membership: clp.memberships.relationship(TestData.id),
			organization: clp.organizations.relationship(TestData.id),
			role: clp.roles.relationship(TestData.id),
		}

    const attributes = { ...createAttributes, reference: TestData.reference }
    const params = { fields: { [resourceType]: CommonData.paramsFields } }
    const resData = attributes

    const intId = clp.addRequestInterceptor((request) => {
      const data = JSON.parse(String(request.options.body))
      expect(request.options.method).toBe('POST')
      checkCommon(request, resourcePath)
      checkCommonData(data, resourceType, attributes)
      expect(clp[resourcePath].isApplicationMembership(data.data)).toBeTruthy()
      return interceptRequest()
    })

    await clp[resourcePath].create(resData, params, CommonData.options)
      .then((res: ApplicationMembership) => expect(res).not.toBeNull())
      .catch(handleError)
      .finally(() => clp.removeInterceptor('request', intId))

  })
  /* spec.create.stop */


  /* spec.retrieve.start */
  it(resourceType + '.retrieve', async () => {

    const id = TestData.id
    const params = { fields: {[resourceType]: CommonData.paramsFields } }

    const intId = clp.addRequestInterceptor((request) => {
      expect(request.options.method).toBe('GET')
      checkCommon(request, resourcePath, id, currentAccessToken)
      checkCommonParams(request, params)
     return interceptRequest()
    })

    await clp[resourcePath].retrieve(id, params, CommonData.options)
      .then((res: ApplicationMembership) => expect(res).not.toBeNull())
      .catch(handleError)
      .finally(() => clp.removeInterceptor('request', intId))

  })
  /* spec.retrieve.stop */


  /* spec.update.start */
  it(resourceType + '.update', async () => {

    const attributes = { reference_origin: TestData.reference_origin, metadata: TestData.metadata }
    const params = { fields: { [resourceType]: CommonData.paramsFields } }
    const resData = { id: TestData.id, ...attributes}

    const intId = clp.addRequestInterceptor((request) => {
      if (request.options.method !== 'GET') {
        const data = JSON.parse(String(request.options.body))
        expect(request.options.method).toBe('PATCH')
        const id = clp.isSingleton(resourceType)? undefined : resData.id
        checkCommon(request, resourcePath, id, currentAccessToken)
        checkCommonData(data, resourceType, attributes, resData.id)
      }
       return interceptRequest()
    })

    await clp[resourcePath].update(resData, params, CommonData.options)
      .then((res: ApplicationMembership) => expect(res).not.toBeNull())
      .catch(handleError)
      .finally(() => clp.removeInterceptor('request', intId))

  })
  /* spec.update.stop */


  /* spec.delete.start */
  it(resourceType + '.delete', async () => {

    const id = TestData.id

    const intId = clp.addRequestInterceptor((request) => {
      expect(request.options.method).toBe('DELETE')
      checkCommon(request, resourcePath, id, currentAccessToken)
      return interceptRequest()
    })

    await clp[resourcePath].delete(id, CommonData.options)
      .catch(handleError)
      .finally(() => clp.removeInterceptor('request', intId))

  })
  /* spec.delete.stop */


  /* spec.list.start */
  it(resourceType + '.list', async () => {

    const params = CommonData.paramsList

    const intId = clp.addRequestInterceptor((request) => {
      expect(request.options.method).toBe('GET')
      checkCommon(request, resourcePath)
      checkCommonParamsList(request, params)
      return interceptRequest()
    })

    await clp[resourcePath].list(params, CommonData.options)
      .catch(handleError)
      .finally(() => clp.removeInterceptor('request', intId))
    
  })
  /* spec.list.stop */


  /* spec.type.start */
  it(resourceType + '.type', async () => {

    const resource = { id: TestData.id, type: resourceType }
    expect(clp[resourcePath].isApplicationMembership(resource)).toBeTruthy()

    const type = clp[resourcePath].type()
    expect(type).toBe(resourceType)

  })
  /* spec.type.stop */


  /* spec.relationship.start */
  it(resourceType + '.relationship', async () => {

    const relId = clp[resourcePath].relationship(TestData.id)
    expect(isEqual(relId, { id: TestData.id, type: resourceType}))

    const relResId = clp[resourcePath].relationship({ id: TestData.id, type: resourceType })
    expect(isEqual(relResId, { id: TestData.id, type: resourceType}))

  })
  /* spec.relationship.stop */


  /* spec.parse.start */
  it(resourceType + '.parse', async () => {

    const reference = 'myReferenceId'

    const payload = `
    {
	    "data": {
        "id": "AbcdEfgHiL",
        "meta": {
          "mode": "test",
          "organization_id": "myOrgId"
        },
        "type": "${resourceType}",
        "links": {
          "self": "/api/${resourceType}/AbcdEfgHiL"
        },
        "attributes": {
          "metadata": {},
          "reference": "${reference}",
          "created_at": "2023-10-01T05:53:29.296Z",
          "updated_at": "2023-10-10T08:52:13.251Z"
        }
      }
    }
    `

    const res = clp[resourcePath].parse(payload) as ApplicationMembership

    expect(res.type).toBe(resourceType)
    expect(res.reference).toBe(reference)

  })
  /* spec.parse.stop */

  

	/* relationship.api_credential start */
	it(resourceType + '.api_credential', async () => {
	
		const id = TestData.id
		const params = { fields: { api_credentials: CommonData.paramsFields } }
	
		const intId = clp.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'api_credential')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await clp[resourcePath].api_credential(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => clp.removeInterceptor('request', intId))
	
	})
	/* relationship.api_credential stop */
	

	/* relationship.membership start */
	it(resourceType + '.membership', async () => {
	
		const id = TestData.id
		const params = { fields: { memberships: CommonData.paramsFields } }
	
		const intId = clp.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'membership')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await clp[resourcePath].membership(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => clp.removeInterceptor('request', intId))
	
	})
	/* relationship.membership stop */
	

	/* relationship.organization start */
	it(resourceType + '.organization', async () => {
	
		const id = TestData.id
		const params = { fields: { organizations: CommonData.paramsFields } }
	
		const intId = clp.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'organization')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await clp[resourcePath].organization(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => clp.removeInterceptor('request', intId))
	
	})
	/* relationship.organization stop */
	

	/* relationship.role start */
	it(resourceType + '.role', async () => {
	
		const id = TestData.id
		const params = { fields: { roles: CommonData.paramsFields } }
	
		const intId = clp.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'role')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await clp[resourcePath].role(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => clp.removeInterceptor('request', intId))
	
	})
	/* relationship.role stop */
	
  
})
