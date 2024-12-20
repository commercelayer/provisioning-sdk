async retrieve(params?: QueryParamsRetrieve<##__RESOURCE_RESPONSE_CLASS__##>, options?: ResourcesConfig): Promise<##__RESOURCE_RESPONSE_CLASS__##> {
	return this.resources.retrieve<##__RESOURCE_RESPONSE_CLASS__##>({ type: ##__RESOURCE_CLASS__##.TYPE }, params, options, this.path())
}