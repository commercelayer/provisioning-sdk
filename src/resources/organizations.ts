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
// export type OrganizationFilter = Pick<Organization, 'id' | 'name' | 'slug' | 'domain' | 'support_phone' | 'support_email' | 'logo_url' | 'favicon_url' | 'primary_color' | 'contrast_color' | 'discount_disabled' | 'account_disabled' | 'acceptance_disabled' | 'max_concurrent_promotions' | 'max_concurrent_imports' | 'region'> & ResourceFilter


interface Organization extends Resource {
	
	readonly type: OrganizationType

	/** 
	 * The organization's internal name..
	 * @example ```"The Blue Brand"```
	 */
	name: string
	/** 
	 * The organization's slug name..
	 * @example ```"the-blue-brand"```
	 */
	slug: string
	/** 
	 * The organization's domain..
	 * @example ```"the-blue-brand.commercelayer.io"```
	 */
	domain: string
	/** 
	 * The organization's configuration..
	 * @example ```"[object Object]"```
	 */
	config?: Nullable<Record<string, any>>
	/** 
	 * The organization's support phone..
	 * @example ```"+01 30800857"```
	 */
	support_phone?: Nullable<string>
	/** 
	 * The organization's support email..
	 * @example ```"support@bluebrand.com"```
	 */
	support_email?: Nullable<string>
	/** 
	 * The URL to the organization's logo..
	 * @example ```"https://bluebrand.com/img/logo.svg"```
	 */
	logo_url?: Nullable<string>
	/** 
	 * The URL to the organization's favicon..
	 * @example ```"https://bluebrand.com/img/favicon.ico"```
	 */
	favicon_url?: Nullable<string>
	/** 
	 * The organization's primary color. Format is HEX (starts with `#` and it's followed by six letters and/or numbers)..
	 * @example ```"#C8984E"```
	 */
	primary_color?: Nullable<string>
	/** 
	 * The organization's contrast color. Format is HEX (starts with `#` and it's followed by six letters and/or numbers)..
	 * @example ```"#FFFFCC"```
	 */
	contrast_color?: Nullable<string>
	/** 
	 * The organization's Google Tag Manager ID..
	 * @example ```"GTM-5FJXX6"```
	 */
	gtm_id?: Nullable<string>
	/** 
	 * The organization's Google Tag Manager ID for test..
	 * @example ```"GTM-5FJXX7"```
	 */
	gtm_id_test?: Nullable<string>
	/** 
	 * Indicates if organization has discount disabled..
	 */
	discount_disabled?: Nullable<boolean>
	/** 
	 * Indicates if organization has account disabled..
	 */
	account_disabled?: Nullable<boolean>
	/** 
	 * Indicates if organization has acceptance disabled..
	 */
	acceptance_disabled?: Nullable<boolean>
	/** 
	 * The maximum number of active concurrent promotions allowed for your organization..
	 * @example ```"10"```
	 */
	max_concurrent_promotions: number
	/** 
	 * The maximum number of concurrent imports allowed for your organization..
	 * @example ```"30"```
	 */
	max_concurrent_imports: number
	/** 
	 * The region where the organization it's located, default value it's `eu-west-1`..
	 * @example ```"eu-west-1"```
	 */
	region?: Nullable<string>
	/** 
	 * Indicates if the organization can switch to live mode..
	 */
	can_switch_live: boolean
	/** 
	 * Information about the current subscription such as the plan type, limits and subscription totals counter..
	 * @example ```"[object Object]"```
	 */
	subscription_info: Record<string, any>

	memberships?: Nullable<Membership[]>
	roles?: Nullable<Role[]>
	permissions?: Nullable<Permission[]>
	api_credentials?: Nullable<ApiCredential[]>

}


interface OrganizationCreate extends ResourceCreate {
	
	/** 
	 * The organization's internal name..
	 * @example ```"The Blue Brand"```
	 */
	name: string
	/** 
	 * The organization's configuration..
	 * @example ```"[object Object]"```
	 */
	config?: Nullable<Record<string, any>>
	/** 
	 * The organization's support phone..
	 * @example ```"+01 30800857"```
	 */
	support_phone?: Nullable<string>
	/** 
	 * The organization's support email..
	 * @example ```"support@bluebrand.com"```
	 */
	support_email?: Nullable<string>
	/** 
	 * The URL to the organization's logo..
	 * @example ```"https://bluebrand.com/img/logo.svg"```
	 */
	logo_url?: Nullable<string>
	/** 
	 * The URL to the organization's favicon..
	 * @example ```"https://bluebrand.com/img/favicon.ico"```
	 */
	favicon_url?: Nullable<string>
	/** 
	 * The organization's primary color. Format is HEX (starts with `#` and it's followed by six letters and/or numbers)..
	 * @example ```"#C8984E"```
	 */
	primary_color?: Nullable<string>
	/** 
	 * The organization's contrast color. Format is HEX (starts with `#` and it's followed by six letters and/or numbers)..
	 * @example ```"#FFFFCC"```
	 */
	contrast_color?: Nullable<string>
	/** 
	 * The organization's Google Tag Manager ID..
	 * @example ```"GTM-5FJXX6"```
	 */
	gtm_id?: Nullable<string>
	/** 
	 * The organization's Google Tag Manager ID for test..
	 * @example ```"GTM-5FJXX7"```
	 */
	gtm_id_test?: Nullable<string>
	/** 
	 * Indicates if organization has discount disabled..
	 */
	discount_disabled?: Nullable<boolean>
	/** 
	 * Indicates if organization has account disabled..
	 */
	account_disabled?: Nullable<boolean>
	/** 
	 * Indicates if organization has acceptance disabled..
	 */
	acceptance_disabled?: Nullable<boolean>
	/** 
	 * The region where the organization it's located, default value it's `eu-west-1`..
	 * @example ```"eu-west-1"```
	 */
	region?: Nullable<string>
	
}


interface OrganizationUpdate extends ResourceUpdate {
	
	/** 
	 * The organization's internal name..
	 * @example ```"The Blue Brand"```
	 */
	name?: Nullable<string>
	/** 
	 * The organization's configuration..
	 * @example ```"[object Object]"```
	 */
	config?: Nullable<Record<string, any>>
	/** 
	 * The organization's support phone..
	 * @example ```"+01 30800857"```
	 */
	support_phone?: Nullable<string>
	/** 
	 * The organization's support email..
	 * @example ```"support@bluebrand.com"```
	 */
	support_email?: Nullable<string>
	/** 
	 * The URL to the organization's logo..
	 * @example ```"https://bluebrand.com/img/logo.svg"```
	 */
	logo_url?: Nullable<string>
	/** 
	 * The URL to the organization's favicon..
	 * @example ```"https://bluebrand.com/img/favicon.ico"```
	 */
	favicon_url?: Nullable<string>
	/** 
	 * The organization's primary color. Format is HEX (starts with `#` and it's followed by six letters and/or numbers)..
	 * @example ```"#C8984E"```
	 */
	primary_color?: Nullable<string>
	/** 
	 * The organization's contrast color. Format is HEX (starts with `#` and it's followed by six letters and/or numbers)..
	 * @example ```"#FFFFCC"```
	 */
	contrast_color?: Nullable<string>
	/** 
	 * The organization's Google Tag Manager ID..
	 * @example ```"GTM-5FJXX6"```
	 */
	gtm_id?: Nullable<string>
	/** 
	 * The organization's Google Tag Manager ID for test..
	 * @example ```"GTM-5FJXX7"```
	 */
	gtm_id_test?: Nullable<string>
	/** 
	 * Indicates if organization has discount disabled..
	 */
	discount_disabled?: Nullable<boolean>
	/** 
	 * Indicates if organization has account disabled..
	 */
	account_disabled?: Nullable<boolean>
	/** 
	 * Indicates if organization has acceptance disabled..
	 */
	acceptance_disabled?: Nullable<boolean>
	
}


class Organizations extends ApiResource<Organization> {

	static readonly TYPE: OrganizationType = 'organizations' as const

	async create(resource: OrganizationCreate, params?: QueryParamsRetrieve<Organization>, options?: ResourcesConfig): Promise<Organization> {
		return this.resources.create<OrganizationCreate, Organization>({ ...resource, type: Organizations.TYPE }, params, options)
	}

	async update(resource: OrganizationUpdate, params?: QueryParamsRetrieve<Organization>, options?: ResourcesConfig): Promise<Organization> {
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
