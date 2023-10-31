
import * as api from './api'
import { SdkError, ApiError} from './error'
import CommerceLayerProvisioning, { OPEN_API_SCHEMA_VERSION } from './commercelayer'
import type { CommerceLayerProvisioningClient, CommerceLayerInitConfig } from './commercelayer'


/* Static functions */
export const CommerceLayerProvisioningStatic = {

	resources: (): readonly string[] => {
		return api.resourceList
	},

	isSdkError: (error: unknown): error is SdkError => {
		return SdkError.isSdkError(error)
	},

	isApiError: (error: unknown): error is ApiError => {
		return ApiError.isApiError(error)
	},

	init: (config: CommerceLayerInitConfig): CommerceLayerProvisioningClient => {
		return CommerceLayerProvisioning(config)
	},

	get schemaVersion(): string { return OPEN_API_SCHEMA_VERSION }

}
