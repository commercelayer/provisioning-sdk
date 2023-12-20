import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Membership } from './memberships'
import type { Role } from './roles'
import type { Permission } from './permissions'
import type { ApiCredential } from './api_credentials'


type OrganizationType = 'organizations'
type OrganizationRel = ResourceRel & { type: OrganizationType }


interface Organization extends Resource {
	
	readonly type: OrganizationType

	name: string
	slug: string
	domain: string
	support_phone?: string | null
	support_email?: string | null
	logo_url?: string | null
	favicon_url?: string | null
	primary_color?: string | null
	contrast_color?: string | null
	gtm_id?: string | null
	gtm_id_test?: string | null
	discount_disabled?: boolean | null
	account_disabled?: boolean | null
	acceptance_disabled?: boolean | null
	max_concurrent_promotions: number
	max_concurrent_imports: number
	associated_markets: Record<string, any>
	region?: string | null
	can_switch_live: boolean

	memberships?: Membership[] | null
	roles?: Role[] | null
	permissions?: Permission[] | null
	api_credentials?: ApiCredential[] | null

}


interface OrganizationCreate extends ResourceCreate {
	
	name: string
	support_phone?: string | null
	support_email?: string | null
	logo_url?: string | null
	favicon_url?: string | null
	primary_color?: string | null
	contrast_color?: string | null
	gtm_id?: string | null
	gtm_id_test?: string | null
	discount_disabled?: boolean | null
	account_disabled?: boolean | null
	acceptance_disabled?: boolean | null
	region?: string | null
	
}


interface OrganizationUpdate extends ResourceUpdate {
	
	name?: string | null
	support_phone?: string | null
	support_email?: string | null
	logo_url?: string | null
	favicon_url?: string | null
	primary_color?: string | null
	contrast_color?: string | null
	gtm_id?: string | null
	gtm_id_test?: string | null
	discount_disabled?: boolean | null
	account_disabled?: boolean | null
	acceptance_disabled?: boolean | null
	
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
		await this.resources.action('patch', `organizations/${_organizationId}/transfer_ownership`, { ...payload }, options)
	}

	async memberships(organizationId: string | Organization, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Membership>> {
		const _organizationId = (organizationId as Organization).id || organizationId as string
		return this.resources.fetch<Membership>({ type: 'memberships' }, `organizations/${_organizationId}/memberships`, params, options) as unknown as ListResponse<Membership>
	}

	async roles(organizationId: string | Organization, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Role>> {
		const _organizationId = (organizationId as Organization).id || organizationId as string
		return this.resources.fetch<Role>({ type: 'roles' }, `organizations/${_organizationId}/roles`, params, options) as unknown as ListResponse<Role>
	}

	async permissions(organizationId: string | Organization, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Permission>> {
		const _organizationId = (organizationId as Organization).id || organizationId as string
		return this.resources.fetch<Permission>({ type: 'permissions' }, `organizations/${_organizationId}/permissions`, params, options) as unknown as ListResponse<Permission>
	}

	async api_credentials(organizationId: string | Organization, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<ApiCredential>> {
		const _organizationId = (organizationId as Organization).id || organizationId as string
		return this.resources.fetch<ApiCredential>({ type: 'api_credentials' }, `organizations/${_organizationId}/api_credentials`, params, options) as unknown as ListResponse<ApiCredential>
	}


	isOrganization(resource: any): resource is Organization {
		return resource.type && (resource.type === Organizations.TYPE)
	}


	relationship(id: string | ResourceId | null): OrganizationRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: Organizations.TYPE } : { id: id.id, type: Organizations.TYPE }
	}


	type(): OrganizationType {
		return Organizations.TYPE
	}

}


export default Organizations

export type { Organization, OrganizationCreate, OrganizationUpdate, OrganizationType }
export type TransferOwnershipDataType = { new_owner_email: string }
