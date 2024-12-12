async update(resource: ##__RESOURCE_REQUEST_CLASS__##, params?: QueryParamsRetrieve<##__RESOURCE_RESPONSE_CLASS__##>, options?: ResourcesConfig): Promise<##__RESOURCE_RESPONSE_CLASS__##> {
	const id = resource.id || (await this.retrieve()).id	// JsonAPI requires id in the request body
	return this.resources.update<##__RESOURCE_REQUEST_CLASS__##, ##__RESOURCE_RESPONSE_CLASS__##>({ ...resource, id, type: ##__RESOURCE_CLASS__##.TYPE }, params, options)
}