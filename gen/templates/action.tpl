async ##__OPERATION_NAME__##(##__RESOURCE_ID__##: string | ##__MODEL_RESOURCE_INTERFACE__##,##__ACTION_PAYLOAD_PARAM__## options?: ResourcesConfig): Promise<void> {
	const _##__RESOURCE_ID__## = (##__RESOURCE_ID__## as ##__MODEL_RESOURCE_INTERFACE__##).id || ##__RESOURCE_ID__## as string
	await this.resources.action('##__ACTION_COMMAND__##', `##__ACTION_PATH__##`, {##__ACTION_PAYLOAD__##}, options)
}