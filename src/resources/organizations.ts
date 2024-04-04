import type { Nullable } from '../types'
import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Membership } from './memberships'
import type { Role } from './roles'
import type { Permission } from './permissions'
import type { ApiCredential } from './api_credentials'


type OrganizationType = 'organizations'
type OrganizationRel = ResourceRel & { type: OrganizationType }


export type OrganizationSort = Pick<Organization, 'id'> & ResourceSort
// export type OrganizationFilter = Pick<Organization, 'id'> & ResourceFilter


interface Organization extends Resource {
	
	readonly type: OrganizationType

	name: string
	slug: string
	domain: string
	config?: Nullable<Record<string, any>>
	support_phone?: Nullable<string>
	support_email?: Nullable<string>
	logo_url?: Nullable<string>
	favicon_url?: Nullable<string>
	primary_color?: Nullable<string>
	contrast_color?: Nullable<string>
	gtm_id?: Nullable<string>
	gtm_id_test?: Nullable<string>
	discount_disabled?: Nullable<boolean>
	account_disabled?: Nullable<boolean>
	acceptance_disabled?: Nullable<boolean>
	max_concurrent_promotions: number
	max_concurrent_imports: number
	region?: Nullable<string>
	can_switch_live: boolean
	subscription_info: Record<string, any>

	memberships?: Nullable<Membership[]>
	roles?: Nullable<Role[]>
	permissions?: Nullable<Permission[]>
	api_credentials?: Nullable<ApiCredential[]>

}


interface OrganizationCreate extends ResourceCreate {
	
	name: string
	config?: Nullable<Record<string, any>>
	support_phone?: Nullable<string>
	support_email?: Nullable<string>
	logo_url?: Nullable<string>
	favicon_url?: Nullable<string>
	primary_color?: Nullable<string>
	contrast_color?: Nullable<string>
	gtm_id?: Nullable<string>
	gtm_id_test?: Nullable<string>
	discount_disabled?: Nullable<boolean>
	account_disabled?: Nullable<boolean>
	acceptance_disabled?: Nullable<boolean>
	region?: Nullable<string>
	
}


interface OrganizationUpdate extends ResourceUpdate {
	
	name?: Nullable<string>
	config?: Nullable<Record<string, any>>
	support_phone?: Nullable<string>
	support_email?: Nullable<string>
	logo_url?: Nullable<string>
	favicon_url?: Nullable<string>
	primary_color?: Nullable<string>
	contrast_color?: Nullable<string>
	gtm_id?: Nullable<string>
	gtm_id_test?: Nullable<string>
	discount_disabled?: Nullable<boolean>
	account_disabled?: Nullable<boolean>
	acceptance_disabled?: Nullable<boolean>
	
}


class Organizations extends ApiResource<Organization> {

	static readonly TYPE: OrganizationType = 'organizations' as const

	async create(resource: OrganizationCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Organization> {
		return this.resources.create<OrganizationCreate, Organization>({ ...resource, type: Organizations.TYPE }, params, options)
	}

	async update(resource: OrganizationUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Organization> {
		return this.resources.update<OrganizationUpdate, Organization>({ ...resource, type: Organizations.TYPE }, params, options)
	}

	async transfer_ownership(organizationId: string | Organization, payload: TransferOwnershipDataType, options?: ResourcesConfig): Promise<void> {
		const _organizationId = (organizationId as Organization).id || organizationId as string
		await this.resources.action('PATCH', `organizations/${_organizationId}/transfer_ownership`, { ...payload }, options)
	}

	async memberships(organizationId: string | Organization, params?: QueryParamsList<Membership>, options?: ResourcesConfig): Promise<ListResponse<Membership>> {
		const _organizationId = (organizationId as Organization).id || organizationId as string
		return this.resources.fetch<Membership>({ type: 'memberships' }, `organizations/${_organizationId}/memberships`, params, options) as unknown as ListResponse<Membership>
	}

	async roles(organizationId: string | Organization, params?: QueryParamsList<Role>, options?: ResourcesConfig): Promise<ListResponse<Role>> {
		const _organizationId = (organizationId as Organization).id || organizationId as string
		return this.resources.fetch<Role>({ type: 'roles' }, `organizations/${_organizationId}/roles`, params, options) as unknown as ListResponse<Role>
	}

	async permissions(organizationId: string | Organization, params?: QueryParamsList<Permission>, options?: ResourcesConfig): Promise<ListResponse<Permission>> {
		const _organizationId = (organizationId as Organization).id || organizationId as string
		return this.resources.fetch<Permission>({ type: 'permissions' }, `organizations/${_organizationId}/permissions`, params, options) as unknown as ListResponse<Permission>
	}

	async api_credentials(organizationId: string | Organization, params?: QueryParamsList<ApiCredential>, options?: ResourcesConfig): Promise<ListResponse<ApiCredential>> {
		const _organizationId = (organizationId as Organization).id || organizationId as string
		return this.resources.fetch<ApiCredential>({ type: 'api_credentials' }, `organizations/${_organizationId}/api_credentials`, params, options) as unknown as ListResponse<ApiCredential>
	}


	isOrganization(resource: any): resource is Organization {
		return resource.type && (resource.type === Organizations.TYPE)
	}


	relationship(id: string | ResourceId | null): OrganizationRel {
		return super.relationshipOneToOne<OrganizationRel>(id)
	}

	relationshipToMany(...ids: string[]): OrganizationRel[] {
		return super.relationshipOneToMany<OrganizationRel>(...ids)
	}


	type(): OrganizationType {
		return Organizations.TYPE
	}

}


export default Organizations

export type { Organization, OrganizationCreate, OrganizationUpdate, OrganizationType }
export type TransferOwnershipDataType = { type: 'organizations', id: string, new_owner_email: string }
