async update(resource: ##__RESOURCE_REQUEST_CLASS__##, params?: QueryParamsRetrieve<##__RESOURCE_RESPONSE_CLASS__##>, options?: ResourcesConfig): Promise<##__RESOURCE_RESPONSE_CLASS__##> {
	const res = await this.retrieve(params, options)	// JsonAPI requires id in the request body
	return this.resources.update<##__RESOURCE_REQUEST_CLASS__##, ##__RESOURCE_RESPONSE_CLASS__##>({ ...resource, id: res.id, type: ##__RESOURCE_CLASS__##.TYPE }, params, options)
}