/**
 * ©2023 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen
 **/

import { CommerceLayerProvisioningClient, Organization } from '../../src'
import { isEqual } from 'lodash'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getClient, TestData, CommonData, handleError, interceptRequest, checkCommon, checkCommonData, checkCommonParamsList, checkCommonParams, currentAccessToken, randomValue } from '../../test/common'



let clp: CommerceLayerProvisioningClient


beforeAll(async () => { clp = await getClient() })


describe('Organizations resource', () => {

  const resourceType = 'organizations'


  /* spec.create.start */
  it(resourceType + '.create', async () => {

    const createAttributes = {
			name: randomValue('string', 'name'),
		}

    const attributes = { ...createAttributes, reference: TestData.reference }
    const params = { fields: { [resourceType]: CommonData.paramsFields } }
    const resData = attributes

    const intId = clp.addRequestInterceptor((config) => {
      expect(config.method).toBe('post')
      checkCommon(config, resourceType)
      checkCommonData(config, resourceType, attributes)
      expect(clp[resourceType].isOrganization(config.data.data)).toBeTruthy()
      return interceptRequest()
    })

    await clp[resourceType].create(resData, params, CommonData.options)
      .catch(handleError)
      .finally(() => clp.removeInterceptor('request', intId))

  })
  /* spec.create.stop */


  /* spec.retrieve.start */
  it(resourceType + '.retrieve', async () => {

    const id = TestData.id
    const params = { fields: {[resourceType]: CommonData.paramsFields } }

    const intId = clp.addRequestInterceptor((config) => {
      expect(config.method).toBe('get')
      checkCommon(config, resourceType, id, currentAccessToken)
      checkCommonParams(config, params)
     return interceptRequest()
    })

    await clp[resourceType].retrieve(id, params, CommonData.options)
      .catch(handleError)
      .finally(() => clp.removeInterceptor('request', intId))

  })
  /* spec.retrieve.stop */


  /* spec.update.start */
  it(resourceType + '.update', async () => {

    const attributes = { reference_origin: TestData.reference_origin, metadata: TestData.metadata }
    const params = { fields: { [resourceType]: CommonData.paramsFields } }
    const resData = { id: TestData.id, ...attributes}

    const intId = clp.addRequestInterceptor((config) => {
      expect(config.method).toBe('patch')
      checkCommon(config, resourceType, resData.id, currentAccessToken)
      checkCommonData(config, resourceType, attributes, resData.id)
      return interceptRequest()
    })

    await clp[resourceType].update(resData, params, CommonData.options)
      .catch(handleError)
      .finally(() => clp.removeInterceptor('request', intId))

  })
  /* spec.update.stop */


  /* spec.list.start */
  it(resourceType + '.list', async () => {

    const params = CommonData.paramsList

    const intId = clp.addRequestInterceptor((config) => {
      expect(config.method).toBe('get')
      checkCommon(config, resourceType)
      checkCommonParamsList(config, params)
      return interceptRequest()
    })

    await clp[resourceType].list(params, CommonData.options)
      .catch(handleError)
      .finally(() => clp.removeInterceptor('request', intId))
    
  })
  /* spec.list.stop */


  /* spec.type.start */
  it(resourceType + '.type', async () => {

    const resource = { id: TestData.id, type: resourceType }
    expect(clp[resourceType].isOrganization(resource)).toBeTruthy()

    const type = clp[resourceType].type()
    expect(type).toBe(resourceType)

  })
  /* spec.type.stop */


  /* spec.relationship.start */
  it(resourceType + '.relationship', async () => {

    const relId = clp[resourceType].relationship(TestData.id)
    expect(isEqual(relId, { id: TestData.id, type: resourceType}))

    const relResId = clp[resourceType].relationship({ id: TestData.id, type: resourceType })
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

    const res = clp[resourceType].parse(payload) as Organization

    expect(res.type).toBe(resourceType)
    expect(res.reference).toBe(reference)

  })
  /* spec.parse.stop */

  

	/* relationship.memberships start */
	it(resourceType + '.memberships', async () => {
	
		const id = TestData.id
		const params = { fields: { memberships: CommonData.paramsFields } }
	
		const intId = clp.addRequestInterceptor((config) => {
			expect(config.method).toBe('get')
			checkCommon(config, resourceType, id, currentAccessToken, 'memberships')
			checkCommonParams(config, params)
			return interceptRequest()
		})
	
		await clp[resourceType].memberships(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => clp.removeInterceptor('request', intId))
	
	})
	/* relationship.memberships stop */
	

	/* relationship.roles start */
	it(resourceType + '.roles', async () => {
	
		const id = TestData.id
		const params = { fields: { roles: CommonData.paramsFields } }
	
		const intId = clp.addRequestInterceptor((config) => {
			expect(config.method).toBe('get')
			checkCommon(config, resourceType, id, currentAccessToken, 'roles')
			checkCommonParams(config, params)
			return interceptRequest()
		})
	
		await clp[resourceType].roles(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => clp.removeInterceptor('request', intId))
	
	})
	/* relationship.roles stop */
	

	/* relationship.permissions start */
	it(resourceType + '.permissions', async () => {
	
		const id = TestData.id
		const params = { fields: { permissions: CommonData.paramsFields } }
	
		const intId = clp.addRequestInterceptor((config) => {
			expect(config.method).toBe('get')
			checkCommon(config, resourceType, id, currentAccessToken, 'permissions')
			checkCommonParams(config, params)
			return interceptRequest()
		})
	
		await clp[resourceType].permissions(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => clp.removeInterceptor('request', intId))
	
	})
	/* relationship.permissions stop */
	

	/* relationship.api_credentials start */
	it(resourceType + '.api_credentials', async () => {
	
		const id = TestData.id
		const params = { fields: { api_credentials: CommonData.paramsFields } }
	
		const intId = clp.addRequestInterceptor((config) => {
			expect(config.method).toBe('get')
			checkCommon(config, resourceType, id, currentAccessToken, 'api_credentials')
			checkCommonParams(config, params)
			return interceptRequest()
		})
	
		await clp[resourceType].api_credentials(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => clp.removeInterceptor('request', intId))
	
	})
	/* relationship.api_credentials stop */
	
  
})
