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

	name: string
	kind: string
	confidential: boolean
	redirect_uri?: Nullable<string>
	client_id: string
	client_secret: string
	scopes: string
	expires_in?: Nullable<number>
	mode?: Nullable<string>
	custom?: Nullable<boolean>

	organization?: Nullable<Organization>
	role?: Nullable<Role>

}


interface ApiCredentialCreate extends ResourceCreate {
	
	name: string
	kind: string
	redirect_uri?: Nullable<string>
	expires_in?: Nullable<number>
	mode?: Nullable<string>
	custom?: Nullable<boolean>

	organization: OrganizationRel
	role?: Nullable<RoleRel>

}


interface ApiCredentialUpdate extends ResourceUpdate {
	
	name?: Nullable<string>
	redirect_uri?: Nullable<string>
	expires_in?: Nullable<number>

	role?: Nullable<RoleRel>

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
