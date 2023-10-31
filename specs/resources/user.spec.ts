/**
 * ©2023 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen
 **/

import { CommerceLayerProvisioningClient, User } from '../../src'
import { isEqual } from 'lodash'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getClient, TestData, CommonData, handleError, interceptRequest, checkCommon, checkCommonData, checkCommonParamsList, checkCommonParams, currentAccessToken, randomValue } from '../../test/common'



let clp: CommerceLayerProvisioningClient


beforeAll(async () => { clp = await getClient() })


describe('Users resource', () => {

  const resourceType = 'user'


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


  /* spec.singleton.start */
  it(resourceType + '.singleton', async () => {

    const params = { fields: { [resourceType]: CommonData.paramsFields } }

    const intId = clp.addRequestInterceptor((config) => {
      expect(config.method).toBe('get')
      checkCommon(config, resourceType)
      checkCommonParams(config, params)
      return interceptRequest()
    })

    await clp[resourceType].retrieve(params, CommonData.options)
      .catch(handleError)
      .finally(() => clp.removeInterceptor('request', intId))
    
  })
  /* spec.singleton.stop */


  /* spec.type.start */
  it(resourceType + '.type', async () => {

    const resource = { id: TestData.id, type: resourceType }
    expect(clp[resourceType].isUser(resource)).toBeTruthy()

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

    const res = clp[resourceType].parse(payload) as User

    expect(res.type).toBe(resourceType)
    expect(res.reference).toBe(reference)

  })
  /* spec.parse.stop */

  
  
})
