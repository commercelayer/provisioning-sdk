/**
 * ©2025 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen
 **/

import { CommerceLayerProvisioningClient, Role } from '../../src'
import { isDeepStrictEqual } from 'node:util'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getClient, TestData, CommonData, handleError, interceptRequest, checkCommon, checkCommonData, checkCommonParamsList, checkCommonParams, currentAccessToken, randomValue } from '../../test/common'



let clp: CommerceLayerProvisioningClient


beforeAll(async () => { clp = await getClient() })


describe('Roles resource', () => {

  const resourceType = 'roles'
  const resourcePath = 'roles'


  /* spec.create.start */
  it(resourceType + '.create', async () => {

    const createAttributes = {
			name: randomValue('string', 'name'),
			organization: clp.organizations.relationship(TestData.id),
		}

    const attributes = { ...createAttributes, reference: TestData.reference }
    const params = { fields: { [resourceType]: CommonData.paramsFields } }
    const resData = attributes

    const intId = clp.addRequestInterceptor((request) => {
      const data = JSON.parse(String(request.options.body))
      expect(request.options.method).toBe('POST')
      checkCommon(request, resourcePath)
      checkCommonData(data, resourceType, attributes)
      expect(clp[resourcePath].isRole(data.data)).toBeTruthy()
      return interceptRequest()
    })

    await clp[resourcePath].create(resData, params, CommonData.options)
      .then((res: Role) => expect(res).not.toBeNull())
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
      .then((res: Role) => expect(res).not.toBeNull())
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
      .then((res: Role) => expect(res).not.toBeNull())
      .catch(handleError)
      .finally(() => clp.removeInterceptor('request', intId))

  })
  /* spec.update.stop */


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
    expect(clp[resourcePath].isRole(resource)).toBeTruthy()

    const type = clp[resourcePath].type()
    expect(type).toBe(resourceType)

  })
  /* spec.type.stop */


  /* spec.relationship.start */
  it(resourceType + '.relationship', async () => {

    const relId = clp[resourcePath].relationship(TestData.id)
    expect(isDeepStrictEqual(relId, { id: TestData.id, type: resourceType}))

    const relResId = clp[resourcePath].relationship({ id: TestData.id, type: resourceType })
    expect(isDeepStrictEqual(relResId, { id: TestData.id, type: resourceType}))

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

    const res = clp[resourcePath].parse(payload) as Role

    expect(res.type).toBe(resourceType)
    expect(res.reference).toBe(reference)

  })
  /* spec.parse.stop */

  

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
	

	/* relationship.permissions start */
	it(resourceType + '.permissions', async () => {
	
		const id = TestData.id
		const params = { fields: { permissions: CommonData.paramsFields } }
	
		const intId = clp.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'permissions')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await clp[resourcePath].permissions(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => clp.removeInterceptor('request', intId))
	
	})
	/* relationship.permissions stop */
	

	/* relationship.memberships start */
	it(resourceType + '.memberships', async () => {
	
		const id = TestData.id
		const params = { fields: { memberships: CommonData.paramsFields } }
	
		const intId = clp.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'memberships')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await clp[resourcePath].memberships(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => clp.removeInterceptor('request', intId))
	
	})
	/* relationship.memberships stop */
	

	/* relationship.api_credentials start */
	it(resourceType + '.api_credentials', async () => {
	
		const id = TestData.id
		const params = { fields: { api_credentials: CommonData.paramsFields } }
	
		const intId = clp.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'api_credentials')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await clp[resourcePath].api_credentials(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => clp.removeInterceptor('request', intId))
	
	})
	/* relationship.api_credentials stop */
	

	/* relationship.versions start */
	it(resourceType + '.versions', async () => {
	
		const id = TestData.id
		const params = { fields: { versions: CommonData.paramsFields } }
	
		const intId = clp.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'versions')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await clp[resourcePath].versions(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => clp.removeInterceptor('request', intId))
	
	})
	/* relationship.versions stop */
	
  

	/* trigger._add_missing_base_permissions start */
	it(resourceType + '._add_missing_base_permissions', async () => {
	
		let triggerAttr = '_add_missing_base_permissions'
		if (!triggerAttr.startsWith('_')) triggerAttr = `_${triggerAttr}`
	
		const triggerValue = true
		const attributes = { [triggerAttr]: triggerValue }
	  const id = TestData.id
	
		const intId = clp.addRequestInterceptor((request) => {
			const data = JSON.parse(String(request.options.body))
			expect(request.options.method).toBe('PATCH')
			checkCommon(request, resourcePath, id, currentAccessToken)
			checkCommonData(data, resourceType, attributes, id)
			return interceptRequest()
		})
	
		await clp[resourcePath]._add_missing_base_permissions(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => clp.removeInterceptor('request', intId))
	
	})
	/* trigger._add_missing_base_permissions stop */
	
})
