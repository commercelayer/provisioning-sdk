/**
 * ©2024 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen
 **/

import { CommerceLayerProvisioningClient, Version } from '../../src'
import isEqual from 'lodash.isequal'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getClient, TestData, CommonData, handleError, interceptRequest, checkCommon, checkCommonData, checkCommonParamsList, checkCommonParams, currentAccessToken, randomValue } from '../../test/common'



let clp: CommerceLayerProvisioningClient


beforeAll(async () => { clp = await getClient() })


describe('Versions resource', () => {

  const resourceType = 'versions'
  const resourcePath = 'versions'


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
      .then((res: Version) =>  expect(res).not.toBeNull())
      .catch(handleError)
      .finally(() => clp.removeInterceptor('request', intId))

  })
  /* spec.retrieve.stop */


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
    expect(clp[resourcePath].isVersion(resource)).toBeTruthy()

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

    const res = clp[resourcePath].parse(payload) as Version

    expect(res.type).toBe(resourceType)
    expect(res.reference).toBe(reference)

  })
  /* spec.parse.stop */

  
  
})
