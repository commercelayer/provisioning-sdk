import type { Nullable } from '../types'
import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve } from '../query'

import type { Organization, OrganizationType } from './organizations'
import type { Role, RoleType } from './roles'


type ApiCredentialType = 'api_credentials'
type ApiCredentialRel = ResourceRel & { type: ApiCredentialType }
type OrganizationRel = ResourceRel & { type: OrganizationType }
type RoleRel = ResourceRel & { type: RoleType }


export type ApiCredentialSort = Pick<ApiCredential, 'id' | 'mode'> & ResourceSort
// export type ApiCredentialFilter = Pick<ApiCredential, 'id' | 'mode'> & ResourceFilter


interface ApiCredential extends Resource {
	
	readonly type: ApiCredentialType

	/** 
	 * The API credential internal name..
	 * @example ```"My app"```
	 */
	name: string
	/** 
	 * The API credential kind, can be one of: `webapp`, `sales_channel`, `integration` or the kind of app you want to fork (e.g. `orders`, `imports`, etc.)..
	 * @example ```"sales_channel"```
	 */
	kind: string
	/** 
	 * Indicates if the API credential it's confidential..
	 * @example ```"true"```
	 */
	confidential: boolean
	/** 
	 * The API credential redirect URI..
	 * @example ```"https://bluebrand.com/img/logo.svg"```
	 */
	redirect_uri?: Nullable<string>
	/** 
	 * The API credential unique ID..
	 * @example ```"xxxx-yyyy-zzzz"```
	 */
	client_id: string
	/** 
	 * The API credential unique secret..
	 * @example ```"xxxx-yyyy-zzzz"```
	 */
	client_secret: string
	/** 
	 * The API credential scopes..
	 * @example ```"market:all market:9 market:122 market:6 stock_location:6 stock_location:33"```
	 */
	scopes: string
	/** 
	 * The lifetime of the access token in seconds (min. `7200`, max. `31536000`. Default is `14400` for Sales channels and `7200` for other client types)..
	 * @example ```"7200"```
	 */
	expires_in?: Nullable<number>
	/** 
	 * Indicates the environment the resource belongs to (one of `test` or `live`)..
	 * @example ```"test"```
	 */
	mode?: Nullable<string>
	/** 
	 * Indicates if the API credential is used to create a custom app (e.g. fork a hosted app)..
	 */
	custom?: Nullable<boolean>

	organization?: Nullable<Organization>
	role?: Nullable<Role>

}


interface ApiCredentialCreate extends ResourceCreate {
	
	/** 
	 * The API credential internal name..
	 * @example ```"My app"```
	 */
	name: string
	/** 
	 * The API credential kind, can be one of: `webapp`, `sales_channel`, `integration` or the kind of app you want to fork (e.g. `orders`, `imports`, etc.)..
	 * @example ```"sales_channel"```
	 */
	kind: string
	/** 
	 * The API credential redirect URI..
	 * @example ```"https://bluebrand.com/img/logo.svg"```
	 */
	redirect_uri?: Nullable<string>
	/** 
	 * The lifetime of the access token in seconds (min. `7200`, max. `31536000`. Default is `14400` for Sales channels and `7200` for other client types)..
	 * @example ```"7200"```
	 */
	expires_in?: Nullable<number>
	/** 
	 * Indicates the environment the resource belongs to (one of `test` or `live`)..
	 * @example ```"test"```
	 */
	mode?: Nullable<string>
	/** 
	 * Indicates if the API credential is used to create a custom app (e.g. fork a hosted app)..
	 */
	custom?: Nullable<boolean>

	organization: OrganizationRel
	role?: Nullable<RoleRel>

}


interface ApiCredentialUpdate extends ResourceUpdate {
	
	/** 
	 * The API credential internal name..
	 * @example ```"My app"```
	 */
	name?: Nullable<string>
	/** 
	 * The API credential redirect URI..
	 * @example ```"https://bluebrand.com/img/logo.svg"```
	 */
	redirect_uri?: Nullable<string>
	/** 
	 * The lifetime of the access token in seconds (min. `7200`, max. `31536000`. Default is `14400` for Sales channels and `7200` for other client types)..
	 * @example ```"7200"```
	 */
	expires_in?: Nullable<number>

	role?: Nullable<RoleRel>

}


class ApiCredentials extends ApiResource<ApiCredential> {

	static readonly TYPE: ApiCredentialType = 'api_credentials' as const

	async create(resource: ApiCredentialCreate, params?: QueryParamsRetrieve<ApiCredential>, options?: ResourcesConfig): Promise<ApiCredential> {
		return this.resources.create<ApiCredentialCreate, ApiCredential>({ ...resource, type: ApiCredentials.TYPE }, params, options)
	}

	async update(resource: ApiCredentialUpdate, params?: QueryParamsRetrieve<ApiCredential>, options?: ResourcesConfig): Promise<ApiCredential> {
		return this.resources.update<ApiCredentialUpdate, ApiCredential>({ ...resource, type: ApiCredentials.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: ApiCredentials.TYPE } : id, options)
	}

	async organization(apiCredentialId: string | ApiCredential, params?: QueryParamsRetrieve<Organization>, options?: ResourcesConfig): Promise<Organization> {
		const _apiCredentialId = (apiCredentialId as ApiCredential).id || apiCredentialId as string
		return this.resources.fetch<Organization>({ type: 'organizations' }, `api_credentials/${_apiCredentialId}/organization`, params, options) as unknown as Organization
	}

	async role(apiCredentialId: string | ApiCredential, params?: QueryParamsRetrieve<Role>, options?: ResourcesConfig): Promise<Role> {
		const _apiCredentialId = (apiCredentialId as ApiCredential).id || apiCredentialId as string
		return this.resources.fetch<Role>({ type: 'roles' }, `api_credentials/${_apiCredentialId}/role`, params, options) as unknown as Role
	}


	isApiCredential(resource: any): resource is ApiCredential {
		return resource.type && (resource.type === ApiCredentials.TYPE)
	}


	relationship(id: string | ResourceId | null): ApiCredentialRel {
		return super.relationshipOneToOne<ApiCredentialRel>(id)
	}

	relationshipToMany(...ids: string[]): ApiCredentialRel[] {
		return super.relationshipOneToMany<ApiCredentialRel>(...ids)
	}


	type(): ApiCredentialType {
		return ApiCredentials.TYPE
	}

}


export default ApiCredentials

export type { ApiCredential, ApiCredentialCreate, ApiCredentialUpdate, ApiCredentialType }
