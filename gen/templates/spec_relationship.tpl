/* relationship.##__OPERATION_NAME__## start */
it(resourceType + '.##__OPERATION_NAME__##', async () => {

	const id = TestData.id
	const params = { fields: { ##__RELATIONSHIP_TYPE__##: CommonData.paramsFields } }

	const intId = clp.addRequestInterceptor((config) => {
		expect(config.method).toBe('get')
		checkCommon(config, resourceType, id, currentAccessToken, '##__OPERATION_NAME__##')
		checkCommonParams(config, params)
		return interceptRequest()
	})

	await clp[resourceType].##__OPERATION_NAME__##(id, params, CommonData.options)
		.catch(handleError)
		.finally(() => clp.removeInterceptor('request', intId))

})
/* relationship.##__OPERATION_NAME__## stop */