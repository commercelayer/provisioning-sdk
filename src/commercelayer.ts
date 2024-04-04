
import * as api from './api'
import type { ApiError } from './error'
import type { ErrorInterceptor, InterceptorType, RawResponseReader, RequestInterceptor, ResponseInterceptor, ResponseObj, HeadersObj, InterceptorManager } from './interceptor'
import { CommerceLayerProvisioningStatic } from './static'
import ResourceAdapter, { type ResourcesInitConfig } from './resource'

import Debug from './debug'
const debug = Debug('commercelayer')


// Autogenerated schema version number, do not remove this line
const OPEN_API_SCHEMA_VERSION = '1.0.4'
export { OPEN_API_SCHEMA_VERSION }


// SDK local configuration
type SdkConfig = {
	// abc?: string
}

type CommerceLayerInitConfig = SdkConfig & ResourcesInitConfig
type CommerceLayerConfig = Partial<CommerceLayerInitConfig>



class CommerceLayerProvisioningClient {

	// static get openApiSchemaVersion(): string { return OPEN_API_SCHEMA_VERSION }
	readonly openApiSchemaVersion = OPEN_API_SCHEMA_VERSION

	readonly #adapter: ResourceAdapter
	// #environment: ApiMode = sdkConfig.default.environment

	// ##__CL_RESOURCES_DEF_START__##
	// ##__CL_RESOURCES_DEF_TEMPLATE:: ##__TAB__#####__RESOURCE_TYPE__##?: api.##__RESOURCE_CLASS__##
	#api_credentials?: api.ApiCredentials
	#application_memberships?: api.ApplicationMemberships
	#memberships?: api.Memberships
	#organizations?: api.Organizations
	#permissions?: api.Permissions
	#roles?: api.Roles
	#user?: api.Users
	#versions?: api.Versions
	// ##__CL_RESOURCES_DEF_STOP__##


	constructor(config: CommerceLayerInitConfig) {

		debug('new commercelayer provisioning instance %O', config)

		this.#adapter = new ResourceAdapter(config)
		// this.#environment = 'test'

		// ##__CL_RESOURCES_INIT_START__##
		// ##__CL_RESOURCES_INIT_TEMPLATE:: ##__TAB__####__TAB__##this.##__RESOURCE_TYPE__## = new api.##__RESOURCE_CLASS__##(this.#adapter)
		// ##__CL_RESOURCES_INIT_STOP__##

	}

	// ##__CL_RESOURCES_LEAZY_LOADING_START__##
	// ##__CL_RESOURCES_LEAZY_LOADING_TEMPLATE:: ##__TAB__##get ##__RESOURCE_TYPE__##(): api.##__RESOURCE_CLASS__## { return this.###__RESOURCE_TYPE__## || (this.###__RESOURCE_TYPE__## = new api.##__RESOURCE_CLASS__##(this.#adapter)) }
	get api_credentials(): api.ApiCredentials { return this.#api_credentials || (this.#api_credentials = new api.ApiCredentials(this.#adapter)) }
	get application_memberships(): api.ApplicationMemberships { return this.#application_memberships || (this.#application_memberships = new api.ApplicationMemberships(this.#adapter)) }
	get memberships(): api.Memberships { return this.#memberships || (this.#memberships = new api.Memberships(this.#adapter)) }
	get organizations(): api.Organizations { return this.#organizations || (this.#organizations = new api.Organizations(this.#adapter)) }
	get permissions(): api.Permissions { return this.#permissions || (this.#permissions = new api.Permissions(this.#adapter)) }
	get roles(): api.Roles { return this.#roles || (this.#roles = new api.Roles(this.#adapter)) }
	get user(): api.Users { return this.#user || (this.#user = new api.Users(this.#adapter)) }
	get versions(): api.Versions { return this.#versions || (this.#versions = new api.Versions(this.#adapter)) }
	// ##__CL_RESOURCES_LEAZY_LOADING_STOP__##
	// get environment(): ApiMode { return this.#environment }
	private get interceptors(): InterceptorManager { return this.#adapter.client.interceptors }


	private localConfig(config: SdkConfig): void {
		//
	}


	config(config: CommerceLayerConfig): this {

		debug('config %o', config)

		// CommerceLayer config
		this.localConfig(config)
		// ResourceAdapter config
		this.#adapter.config(config)

		return this

	}

	
	resources(): readonly string[] {
		return CommerceLayerProvisioningStatic.resources()
	}

	singletons(): readonly string[] {
		return CommerceLayerProvisioningStatic.singletons()
	}

	isSingleton(resource: api.ResourceTypeLock): boolean {
		return CommerceLayerProvisioningStatic.isSingleton(resource)
	}
	

	isApiError(error: any): error is ApiError {
		return CommerceLayerProvisioningStatic.isApiError(error)
	}


	addRequestInterceptor(onSuccess?: RequestInterceptor, onFailure?: ErrorInterceptor): number {
		this.interceptors.request = { onSuccess, onFailure }
		return 1
	}

	addResponseInterceptor(onSuccess?: ResponseInterceptor, onFailure?: ErrorInterceptor): number {
		this.interceptors.response = { onSuccess, onFailure }
		return 1
	}

	removeInterceptor(type: InterceptorType, id: number = 1): void {
		this.interceptors[type] = undefined
	}


	addRawResponseReader(options?: { headers: boolean }): RawResponseReader {

		const reader: RawResponseReader = {
			id: 0,
			rawResponse: undefined,
			headers: undefined,
			ok: true
		}

		async function rawResponseInterceptor(response: ResponseObj): Promise<ResponseObj> {
			reader.rawResponse = await response?.clone().json().catch(() => {})
			reader.ok = response.ok
			if (options?.headers) {
				const ho: HeadersObj = {}
				response.headers.forEach((value, key) => { ho[key] = value })
				reader.headers = ho
			}
			return response
		}
		
		/* const interceptor = */this.interceptors.rawReader = { onSuccess: rawResponseInterceptor, onFailure: rawResponseInterceptor }
		reader.id = 1 // interceptor

		return reader

	}

	removeRawResponseReader(reader: number | RawResponseReader = 1): void {
		/*
		const id = (typeof reader === 'number') ? reader : reader?.id
		if (id && (id >= 0)) this.removeInterceptor('response', id)
		*/
		this.interceptors.rawReader = undefined
	}

}



const CommerceLayerProvisioning = (config: CommerceLayerInitConfig): CommerceLayerProvisioningClient => {
	return new CommerceLayerProvisioningClient(config)
}


export default CommerceLayerProvisioning
export { CommerceLayerProvisioning }

export type { CommerceLayerProvisioningClient, CommerceLayerConfig, CommerceLayerInitConfig }
