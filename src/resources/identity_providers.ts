import type { Nullable } from '../types'
import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve } from '../query'

import type { User } from './user'


type IdentityProviderType = 'identity_providers'
type IdentityProviderRel = ResourceRel & { type: IdentityProviderType }


export type IdentityProviderSort = Pick<IdentityProvider, 'id' | 'name' | 'client_id' | 'client_secret' | 'issuer' | 'status' | 'domains' | 'token_url' | 'authorize_url' | 'jwks_url' | 'txt_record' | 'organization' | 'disabled_at'> & ResourceSort
// export type IdentityProviderFilter = Pick<IdentityProvider, 'id' | 'name' | 'client_id' | 'client_secret' | 'issuer' | 'status' | 'domains' | 'token_url' | 'authorize_url' | 'jwks_url' | 'txt_record' | 'organization' | 'disabled_at'> & ResourceFilter


interface IdentityProvider extends Resource {
	
	readonly type: IdentityProviderType

	/** 
	 * The name of the Identity provider.
	 * @example ```"Org auth0"```
	 */
	name: string
	/** 
	 * The client ID used for the auth workflow.
	 * @example ```"a6CDk5v1ZV99GrtOcfYVEZRnDDt"```
	 */
	client_id: string
	/** 
	 * The client secret used for the auth workflow.
	 * @example ```"s6CD55v1ZV99ArtOcfYVEZRnDDf"```
	 */
	client_secret: string
	/** 
	 * The issuer used for the auth workflow.
	 * @example ```"https://dev.auth987.com/"```
	 */
	issuer: string
	/** 
	 * The identity provider status. One of `pending` (default), `verified` or `error`.
	 * @example ```"pending"```
	 */
	status: 'pending' | 'verified' | 'error'
	/** 
	 * The list of domains in scope (comma-separated).
	 * @example ```"dev.auth987.com,stg.auth987.com"```
	 */
	domains: string
	/** 
	 * The token URL used for the auth workflow.
	 * @example ```"https://dev.auth987.com/oauth/token"```
	 */
	token_url: string
	/** 
	 * The authorize URL used for the auth workflow.
	 * @example ```"https://dev.auth987.com/authorize"```
	 */
	authorize_url: string
	/** 
	 * The JWKS key store URL used for the auth workflow.
	 * @example ```"https://dev.auth987.com/.well-known/jwks.json"```
	 */
	jwks_url: string
	/** 
	 * The TXT record value used to check the domain.
	 * @example ```"cl-verification=a6CDk5v"```
	 */
	txt_record: string
	/** 
	 * The organization identifier for authorize params.
	 * @example ```"org_76gsfs5gd"```
	 */
	organization?: Nullable<string>
	/** 
	 * Time at which this resource was disabled.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	disabled_at: string

	user?: Nullable<User>

}


interface IdentityProviderCreate extends ResourceCreate {
	
	/** 
	 * The name of the Identity provider.
	 * @example ```"Org auth0"```
	 */
	name: string
	/** 
	 * The client ID used for the auth workflow.
	 * @example ```"a6CDk5v1ZV99GrtOcfYVEZRnDDt"```
	 */
	client_id: string
	/** 
	 * The client secret used for the auth workflow.
	 * @example ```"s6CD55v1ZV99ArtOcfYVEZRnDDf"```
	 */
	client_secret: string
	/** 
	 * The issuer used for the auth workflow.
	 * @example ```"https://dev.auth987.com/"```
	 */
	issuer: string
	/** 
	 * The list of domains in scope (comma-separated).
	 * @example ```"dev.auth987.com,stg.auth987.com"```
	 */
	domains: string
	/** 
	 * The token URL used for the auth workflow.
	 * @example ```"https://dev.auth987.com/oauth/token"```
	 */
	token_url: string
	/** 
	 * The authorize URL used for the auth workflow.
	 * @example ```"https://dev.auth987.com/authorize"```
	 */
	authorize_url: string
	/** 
	 * The JWKS key store URL used for the auth workflow.
	 * @example ```"https://dev.auth987.com/.well-known/jwks.json"```
	 */
	jwks_url: string
	/** 
	 * The organization identifier for authorize params.
	 * @example ```"org_76gsfs5gd"```
	 */
	organization?: Nullable<string>
	/** 
	 * Send this attribute if you want to mark this resource as disabled.
	 * @example ```"true"```
	 */
	_disable?: Nullable<boolean>
	/** 
	 * Send this attribute if you want to mark this resource as enabled.
	 * @example ```"true"```
	 */
	_enable?: Nullable<boolean>
	
}


interface IdentityProviderUpdate extends ResourceUpdate {
	
	/** 
	 * The name of the Identity provider.
	 * @example ```"Org auth0"```
	 */
	name?: Nullable<string>
	/** 
	 * The client ID used for the auth workflow.
	 * @example ```"a6CDk5v1ZV99GrtOcfYVEZRnDDt"```
	 */
	client_id?: Nullable<string>
	/** 
	 * The client secret used for the auth workflow.
	 * @example ```"s6CD55v1ZV99ArtOcfYVEZRnDDf"```
	 */
	client_secret?: Nullable<string>
	/** 
	 * The issuer used for the auth workflow.
	 * @example ```"https://dev.auth987.com/"```
	 */
	issuer?: Nullable<string>
	/** 
	 * The list of domains in scope (comma-separated).
	 * @example ```"dev.auth987.com,stg.auth987.com"```
	 */
	domains?: Nullable<string>
	/** 
	 * The token URL used for the auth workflow.
	 * @example ```"https://dev.auth987.com/oauth/token"```
	 */
	token_url?: Nullable<string>
	/** 
	 * The authorize URL used for the auth workflow.
	 * @example ```"https://dev.auth987.com/authorize"```
	 */
	authorize_url?: Nullable<string>
	/** 
	 * The JWKS key store URL used for the auth workflow.
	 * @example ```"https://dev.auth987.com/.well-known/jwks.json"```
	 */
	jwks_url?: Nullable<string>
	/** 
	 * The organization identifier for authorize params.
	 * @example ```"org_76gsfs5gd"```
	 */
	organization?: Nullable<string>
	/** 
	 * Send this attribute if you want to mark this resource as disabled.
	 * @example ```"true"```
	 */
	_disable?: Nullable<boolean>
	/** 
	 * Send this attribute if you want to mark this resource as enabled.
	 * @example ```"true"```
	 */
	_enable?: Nullable<boolean>
	
}


class IdentityProviders extends ApiResource<IdentityProvider> {

	static readonly TYPE: IdentityProviderType = 'identity_providers' as const

	async create(resource: IdentityProviderCreate, params?: QueryParamsRetrieve<IdentityProvider>, options?: ResourcesConfig): Promise<IdentityProvider> {
		return this.resources.create<IdentityProviderCreate, IdentityProvider>({ ...resource, type: IdentityProviders.TYPE }, params, options)
	}

	async update(resource: IdentityProviderUpdate, params?: QueryParamsRetrieve<IdentityProvider>, options?: ResourcesConfig): Promise<IdentityProvider> {
		return this.resources.update<IdentityProviderUpdate, IdentityProvider>({ ...resource, type: IdentityProviders.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: IdentityProviders.TYPE } : id, options)
	}

	async user(identityProviderId: string | IdentityProvider, params?: QueryParamsRetrieve<User>, options?: ResourcesConfig): Promise<User> {
		const _identityProviderId = (identityProviderId as IdentityProvider).id || identityProviderId as string
		return this.resources.fetch<User>({ type: 'user' }, `identity_providers/${_identityProviderId}/user`, params, options) as unknown as User
	}

	async _disable(id: string | IdentityProvider, params?: QueryParamsRetrieve<IdentityProvider>, options?: ResourcesConfig): Promise<IdentityProvider> {
		return this.resources.update<IdentityProviderUpdate, IdentityProvider>({ id: (typeof id === 'string')? id: id.id, type: IdentityProviders.TYPE, _disable: true }, params, options)
	}

	async _enable(id: string | IdentityProvider, params?: QueryParamsRetrieve<IdentityProvider>, options?: ResourcesConfig): Promise<IdentityProvider> {
		return this.resources.update<IdentityProviderUpdate, IdentityProvider>({ id: (typeof id === 'string')? id: id.id, type: IdentityProviders.TYPE, _enable: true }, params, options)
	}


	isIdentityProvider(resource: any): resource is IdentityProvider {
		return resource.type && (resource.type === IdentityProviders.TYPE)
	}


	relationship(id: string | ResourceId | null): IdentityProviderRel {
		return super.relationshipOneToOne<IdentityProviderRel>(id)
	}

	relationshipToMany(...ids: string[]): IdentityProviderRel[] {
		return super.relationshipOneToMany<IdentityProviderRel>(...ids)
	}


	type(): IdentityProviderType {
		return IdentityProviders.TYPE
	}

}


export default IdentityProviders

export type { IdentityProvider, IdentityProviderCreate, IdentityProviderUpdate, IdentityProviderType }
