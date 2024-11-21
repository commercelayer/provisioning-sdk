/* trigger.##__OPERATION_NAME__## start */
it(resourceType + '.##__OPERATION_NAME__##', async () => {

	let triggerAttr = '##__OPERATION_NAME__##'
	if (!triggerAttr.startsWith('_')) triggerAttr = `_${triggerAttr}`

	const triggerValue = ##__TRIGGER_VALUE__##
	const attributes = { [triggerAttr]: triggerValue }
    const id = TestData.id

	const intId = clp.addRequestInterceptor((request) => {
		expect(request.options.method).toBe('PATCH')
		checkCommon(request, resourcePath, id, currentAccessToken)
		checkCommonData(request, resourceType, attributes, id)
		return interceptRequest()
	})

	await clp[resourcePath].##__OPERATION_NAME__##(##__TRIGGER_PARAMS__##, {}, CommonData.options)
		.catch(handleError)
		.finally(() => clp.removeInterceptor('request', intId))

})
/* trigger.##__OPERATION_NAME__## stop */