async list(params?: QueryParamsList<##__RESOURCE_RESPONSE_CLASS__##>, options?: ResourcesConfig): Promise<ListResponse<##__RESOURCE_RESPONSE_CLASS__##>> {
	return this.resources.list<##__RESOURCE_RESPONSE_CLASS__##>({ type: ##__RESOURCE_CLASS__##.TYPE }, params, options)
}