import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel } from '../resource'
import type { QueryParamsRetrieve } from '../query'

import type { Organization, OrganizationType } from './organizations'
import type { Role, RoleType } from './roles'


type ApiCredentialType = 'api_credentials'
type ApiCredentialRel = ResourceRel & { type: ApiCredentialType }
type OrganizationRel = ResourceRel & { type: OrganizationType }
type RoleRel = ResourceRel & { type: RoleType }


interface ApiCredential extends Resource {
	
	readonly type: ApiCredentialType

	name: string
	kind: string
	confidential?: boolean | null
	redirect_uri?: string | null
	client_id?: string | null
	client_secret?: string | null
	scopes?: string | null
	expires_in?: number | null

	organization?: Organization | null
	role?: Role | null

}


interface ApiCredentialCreate extends ResourceCreate {
	
	name: string
	kind: string
	redirect_uri?: string | null
	expires_in?: number | null

	organization: OrganizationRel
	role?: RoleRel | null

}


interface ApiCredentialUpdate extends ResourceUpdate {
	
	name?: string | null
	redirect_uri?: string | null
	expires_in?: number | null

	role?: RoleRel | null

}


class ApiCredentials extends ApiResource<ApiCredential> {

	static readonly TYPE: ApiCredentialType = 'api_credentials' as const

	async create(resource: ApiCredentialCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ApiCredential> {
		return this.resources.create<ApiCredentialCreate, ApiCredential>({ ...resource, type: ApiCredentials.TYPE }, params, options)
	}

	async update(resource: ApiCredentialUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ApiCredential> {
		return this.resources.update<ApiCredentialUpdate, ApiCredential>({ ...resource, type: ApiCredentials.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: ApiCredentials.TYPE } : id, options)
	}

	async organization(apiCredentialId: string | ApiCredential, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Organization> {
		const _apiCredentialId = (apiCredentialId as ApiCredential).id || apiCredentialId as string
		return this.resources.fetch<Organization>({ type: 'organizations' }, `api_credentials/${_apiCredentialId}/organization`, params, options) as unknown as Organization
	}

	async role(apiCredentialId: string | ApiCredential, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Role> {
		const _apiCredentialId = (apiCredentialId as ApiCredential).id || apiCredentialId as string
		return this.resources.fetch<Role>({ type: 'roles' }, `api_credentials/${_apiCredentialId}/role`, params, options) as unknown as Role
	}


	isApiCredential(resource: any): resource is ApiCredential {
		return resource.type && (resource.type === ApiCredentials.TYPE)
	}


	relationship(id: string | ResourceId | null): ApiCredentialRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: ApiCredentials.TYPE } : { id: id.id, type: ApiCredentials.TYPE }
	}


	type(): ApiCredentialType {
		return ApiCredentials.TYPE
	}

}


export default ApiCredentials

export type { ApiCredential, ApiCredentialCreate, ApiCredentialUpdate, ApiCredentialType }
