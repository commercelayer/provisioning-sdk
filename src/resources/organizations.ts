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


export type OrganizationSort = Pick<Organization, 'id' | 'name' | 'slug' | 'domain'> & ResourceSort
// export type OrganizationFilter = Pick<Organization, 'id' | 'name' | 'slug' | 'domain' | 'contrast_color' | 'region'> & ResourceFilter


interface Organization extends Resource {
	
	readonly type: OrganizationType

	/** 
	 * The organization's internal name.
	 * @example ```"The Blue Brand"```
	 */
	name: string
	/** 
	 * The organization's slug name.
	 * @example ```"the-blue-brand"```
	 */
	slug: string
	/** 
	 * The organization's domain.
	 * @example ```"the-blue-brand.commercelayer.io"```
	 */
	domain: string
	/** 
	 * The organization's support phone.
	 * @example ```"+01 30800857"```
	 */
	support_phone?: Nullable<string>
	/** 
	 * The organization's support email.
	 * @example ```"support@bluebrand.com"```
	 */
	support_email?: Nullable<string>
	/** 
	 * The URL to the organization's logo.
	 * @example ```"https://bluebrand.com/img/logo.svg"```
	 */
	logo_url?: Nullable<string>
	/** 
	 * The URL to the organization's favicon.
	 * @example ```"https://bluebrand.com/img/favicon.ico"```
	 */
	favicon_url?: Nullable<string>
	/** 
	 * The organization's primary color.
	 * @example ```"#C8984E"```
	 */
	primary_color?: Nullable<string>
	/** 
	 * The organization's contrast color. Format is HEX (starts with `#` and is followed by six letters and/or numbers).
	 * @example ```"#FFFFCC"```
	 */
	contrast_color?: Nullable<string>
	/** 
	 * The organization's Google Tag Manager ID.
	 * @example ```"GTM-5FJXX6"```
	 */
	gtm_id?: Nullable<string>
	/** 
	 * The organization's Google Tag Manager ID for test.
	 * @example ```"GTM-5FJXX7"```
	 */
	gtm_id_test?: Nullable<string>
	/** 
	 * The region where the organization is located. The default value is `eu-west-1`.
	 * @example ```"eu-west-1"```
	 */
	region?: Nullable<string>
	/** 
	 * Indicates if the organization can switch to live mode.
	 */
	can_switch_live: boolean
	/** 
	 * Information about the current subscription such as the plan type, limits, and subscription totals counter.
	 * @example ```{"plan_type":"growth","limits":{"markets":5,"skus":10000,"organizations":2,"memberships":5},"totals":{"organizations":1,"markets":0,"memberships":2,"skus":0}}```
	 */
	subscription_info: Record<string, any>
	/** 
	 * The organization's configuration.
	 * @example ```{"mfe":{"default":{"links":{"cart":"https://cart.example.com/:order_id?accessToken=:access_token","checkout":"https://checkout.example.com/:order_id?accessToken=:access_token","identity":"https://example.com/login","microstore":"https://example.com/microstore/?accessToken=:access_token","my_account":"https://example.com/my-custom-account?accessToken=:access_token"},"checkout":{"thankyou_page":"https://example.com/thanks/:lang/:order_id","billing_countries":[{"value":"ES","label":"Espana"},{"value":"IT","label":"Italia"},{"value":"US","label":"Unites States of America"}],"shipping_countries":[{"value":"ES","label":"Espana"},{"value":"IT","label":"Italia"},{"value":"US","label":"Unites States of America"}],"billing_states":{"FR":[{"value":"PA","label":"Paris"},{"value":"LY","label":"Lyon"},{"value":"NI","label":"Nice"},{"value":"MA","label":"Marseille"},{"value":"BO","label":"Bordeaux"}]},"shipping_states":{"FR":[{"value":"PA","label":"Paris"},{"value":"LY","label":"Lyon"},{"value":"NI","label":"Nice"},{"value":"MA","label":"Marseille"},{"value":"BO","label":"Bordeaux"}]},"default_country":"US"},"urls":{"privacy":"https://example.com/privacy/:lang","terms":"https://example.com/terms/:lang"}},"market:id:ZKcv13rT":{"links":{"cart":"https://example.com/custom-cart/:order_id?accessToken=:access_token"},"checkout":{"thankyou_page":"https://example.com/thanks/:order_id"}}}}```
	 */
	config?: Nullable<Record<string, any>>
	/** 
	 * Enables the redirect on the new Auth API.
	 * @example ```"true"```
	 */
	api_auth_redirect: boolean
	/** 
	 * Enables the rules engine for flex promotions and price list rules.
	 */
	api_rules_engine: boolean
	/** 
	 * The fallback maximum number of conditions within a rules payload on a ruleable object, default is 150.
	 * @example ```"150"```
	 */
	api_rules_engine_max_conditions_size: number
	/** 
	 * The fallback maximum number of rules within a rules payload on a ruleable object, default is 15.
	 * @example ```"15"```
	 */
	api_rules_engine_max_rules_size: number
	/** 
	 * Forces the usage of the new Authentication API.
	 * @example ```"true"```
	 */
	api_new_auth: boolean
	/** 
	 * Enables the purge of cached single resources when list is purged.
	 */
	api_purge_single_resource: boolean
	/** 
	 * The maximum length for the regular expressions, default is 5000.
	 * @example ```"5000"```
	 */
	api_max_regex_length: number
	/** 
	 * Indicates if the phone attribute is required for addresses, default is true.
	 * @example ```"true"```
	 */
	addresses_phone_required: boolean
	/** 
	 * The maximum number line items allowed for a test order before disabling the autorefresh option.
	 * @example ```"50"```
	 */
	orders_autorefresh_cutoff_test: number
	/** 
	 * The maximum number line items allowed for a live order before disabling the autorefresh option.
	 * @example ```"500"```
	 */
	orders_autorefresh_cutoff_live: number
	/** 
	 * Enables orders number editing as a string in test (for enterprise plans only).
	 */
	orders_number_editable_test: boolean
	/** 
	 * Enables orders number editing as a string in live (for enterprise plans only).
	 */
	orders_number_editable_live: boolean
	/** 
	 * Enables to use the order number as payment reference on supported gateways.
	 * @example ```"true"```
	 */
	orders_number_as_reference: boolean
	/** 
	 * The maximum number of SKUs allowed for bundles, default is 10.
	 * @example ```"10"```
	 */
	bundles_max_items_count: number
	/** 
	 * The minimum length for coupon code, default is 8.
	 * @example ```"8"```
	 */
	coupons_min_code_length: number
	/** 
	 * The maximum length for coupon code, default is 40.
	 * @example ```"40"```
	 */
	coupons_max_code_length: number
	/** 
	 * The minimum length for gift card code, default is 8.
	 * @example ```"8"```
	 */
	gift_cards_min_code_length: number
	/** 
	 * The maximum length for gift card code, default is 40.
	 * @example ```"40"```
	 */
	gift_cards_max_code_length: number
	/** 
	 * The maximum number of concurrent cleanups allowed for your organization, default is 10.
	 * @example ```"10"```
	 */
	cleanups_max_concurrent_count: number
	/** 
	 * The maximum number of concurrent exports allowed for your organization, default is 10.
	 * @example ```"10"```
	 */
	exports_max_concurrent_count: number
	/** 
	 * The maximum number of concurrent imports allowed for your organization, default is 10.
	 * @example ```"10"```
	 */
	imports_max_concurrent_count: number
	/** 
	 * Enables purging of cached resources upon succeeded imports.
	 * @example ```"true"```
	 */
	imports_purge_cache: boolean
	/** 
	 * Disables the interruption of the import in case its errors exceeds the 10% threshold, default is false.
	 */
	imports_skip_errors: boolean
	/** 
	 * The maximum number of active concurrent promotions allowed for your organization, default is 10.
	 * @example ```"10"```
	 */
	promotions_max_concurrent_count: number
	/** 
	 * The maximum number of conditions within a rules payload on a promotion object, default is 150.
	 * @example ```"150"```
	 */
	promotions_max_conditions_size: number
	/** 
	 * The maximum number of rules within a rules payload on a promotion object, default is 15.
	 * @example ```"15"```
	 */
	promotions_max_rules_size: number
	/** 
	 * The maximum number of conditions within a rules payload on a price list object, default is 150.
	 * @example ```"150"```
	 */
	price_lists_max_conditions_size: number
	/** 
	 * The maximum number of rules within a rules payload on a price list object, default is 15.
	 * @example ```"15"```
	 */
	price_lists_max_rules_size: number
	/** 
	 * Enables triggering of webhooks during imports, default is false.
	 */
	imports_trigger_webhooks: number
	/** 
	 * Enables the use of an external discount engine in place of the standard one, default is false.
	 */
	discount_engines_enabled: boolean
	/** 
	 * Enables raising of API errors in case of discount engine failure, default is false.
	 */
	discount_engines_errors: boolean
	/** 
	 * The maximum length for the tag name, default is 25.
	 * @example ```"25"```
	 */
	tags_max_name_length: number
	/** 
	 * The maximum allowed number of tags for each resource, default is 10.
	 * @example ```"10"```
	 */
	tags_max_allowed_number: number
	/** 
	 * Enables raising of API errors in case of tax calculation failure, default is false.
	 */
	tax_calculators_errors: boolean
	/** 
	 * Enables raising of API errors in case of external promotion failure, default is false.
	 */
	external_promotions_errors: boolean

	memberships?: Nullable<Membership[]>
	roles?: Nullable<Role[]>
	permissions?: Nullable<Permission[]>
	api_credentials?: Nullable<ApiCredential[]>

}


interface OrganizationCreate extends ResourceCreate {
	
	/** 
	 * The organization's internal name.
	 * @example ```"The Blue Brand"```
	 */
	name: string
	/** 
	 * The organization's support phone.
	 * @example ```"+01 30800857"```
	 */
	support_phone?: Nullable<string>
	/** 
	 * The organization's support email.
	 * @example ```"support@bluebrand.com"```
	 */
	support_email?: Nullable<string>
	/** 
	 * The URL to the organization's logo.
	 * @example ```"https://bluebrand.com/img/logo.svg"```
	 */
	logo_url?: Nullable<string>
	/** 
	 * The URL to the organization's favicon.
	 * @example ```"https://bluebrand.com/img/favicon.ico"```
	 */
	favicon_url?: Nullable<string>
	/** 
	 * The organization's primary color.
	 * @example ```"#C8984E"```
	 */
	primary_color?: Nullable<string>
	/** 
	 * The organization's contrast color. Format is HEX (starts with `#` and is followed by six letters and/or numbers).
	 * @example ```"#FFFFCC"```
	 */
	contrast_color?: Nullable<string>
	/** 
	 * The organization's Google Tag Manager ID.
	 * @example ```"GTM-5FJXX6"```
	 */
	gtm_id?: Nullable<string>
	/** 
	 * The organization's Google Tag Manager ID for test.
	 * @example ```"GTM-5FJXX7"```
	 */
	gtm_id_test?: Nullable<string>
	/** 
	 * The region where the organization is located. The default value is `eu-west-1`.
	 * @example ```"eu-west-1"```
	 */
	region?: Nullable<string>
	/** 
	 * The organization's configuration.
	 * @example ```{"mfe":{"default":{"links":{"cart":"https://cart.example.com/:order_id?accessToken=:access_token","checkout":"https://checkout.example.com/:order_id?accessToken=:access_token","identity":"https://example.com/login","microstore":"https://example.com/microstore/?accessToken=:access_token","my_account":"https://example.com/my-custom-account?accessToken=:access_token"},"checkout":{"thankyou_page":"https://example.com/thanks/:lang/:order_id","billing_countries":[{"value":"ES","label":"Espana"},{"value":"IT","label":"Italia"},{"value":"US","label":"Unites States of America"}],"shipping_countries":[{"value":"ES","label":"Espana"},{"value":"IT","label":"Italia"},{"value":"US","label":"Unites States of America"}],"billing_states":{"FR":[{"value":"PA","label":"Paris"},{"value":"LY","label":"Lyon"},{"value":"NI","label":"Nice"},{"value":"MA","label":"Marseille"},{"value":"BO","label":"Bordeaux"}]},"shipping_states":{"FR":[{"value":"PA","label":"Paris"},{"value":"LY","label":"Lyon"},{"value":"NI","label":"Nice"},{"value":"MA","label":"Marseille"},{"value":"BO","label":"Bordeaux"}]},"default_country":"US"},"urls":{"privacy":"https://example.com/privacy/:lang","terms":"https://example.com/terms/:lang"}},"market:id:ZKcv13rT":{"links":{"cart":"https://example.com/custom-cart/:order_id?accessToken=:access_token"},"checkout":{"thankyou_page":"https://example.com/thanks/:order_id"}}}}```
	 */
	config?: Nullable<Record<string, any>>
	
}


interface OrganizationUpdate extends ResourceUpdate {
	
	/** 
	 * The organization's internal name.
	 * @example ```"The Blue Brand"```
	 */
	name?: Nullable<string>
	/** 
	 * The organization's support phone.
	 * @example ```"+01 30800857"```
	 */
	support_phone?: Nullable<string>
	/** 
	 * The organization's support email.
	 * @example ```"support@bluebrand.com"```
	 */
	support_email?: Nullable<string>
	/** 
	 * The URL to the organization's logo.
	 * @example ```"https://bluebrand.com/img/logo.svg"```
	 */
	logo_url?: Nullable<string>
	/** 
	 * The URL to the organization's favicon.
	 * @example ```"https://bluebrand.com/img/favicon.ico"```
	 */
	favicon_url?: Nullable<string>
	/** 
	 * The organization's primary color.
	 * @example ```"#C8984E"```
	 */
	primary_color?: Nullable<string>
	/** 
	 * The organization's contrast color. Format is HEX (starts with `#` and is followed by six letters and/or numbers).
	 * @example ```"#FFFFCC"```
	 */
	contrast_color?: Nullable<string>
	/** 
	 * The organization's Google Tag Manager ID.
	 * @example ```"GTM-5FJXX6"```
	 */
	gtm_id?: Nullable<string>
	/** 
	 * The organization's Google Tag Manager ID for test.
	 * @example ```"GTM-5FJXX7"```
	 */
	gtm_id_test?: Nullable<string>
	/** 
	 * The organization's configuration.
	 * @example ```{"mfe":{"default":{"links":{"cart":"https://cart.example.com/:order_id?accessToken=:access_token","checkout":"https://checkout.example.com/:order_id?accessToken=:access_token","identity":"https://example.com/login","microstore":"https://example.com/microstore/?accessToken=:access_token","my_account":"https://example.com/my-custom-account?accessToken=:access_token"},"checkout":{"thankyou_page":"https://example.com/thanks/:lang/:order_id","billing_countries":[{"value":"ES","label":"Espana"},{"value":"IT","label":"Italia"},{"value":"US","label":"Unites States of America"}],"shipping_countries":[{"value":"ES","label":"Espana"},{"value":"IT","label":"Italia"},{"value":"US","label":"Unites States of America"}],"billing_states":{"FR":[{"value":"PA","label":"Paris"},{"value":"LY","label":"Lyon"},{"value":"NI","label":"Nice"},{"value":"MA","label":"Marseille"},{"value":"BO","label":"Bordeaux"}]},"shipping_states":{"FR":[{"value":"PA","label":"Paris"},{"value":"LY","label":"Lyon"},{"value":"NI","label":"Nice"},{"value":"MA","label":"Marseille"},{"value":"BO","label":"Bordeaux"}]},"default_country":"US"},"urls":{"privacy":"https://example.com/privacy/:lang","terms":"https://example.com/terms/:lang"}},"market:id:ZKcv13rT":{"links":{"cart":"https://example.com/custom-cart/:order_id?accessToken=:access_token"},"checkout":{"thankyou_page":"https://example.com/thanks/:order_id"}}}}```
	 */
	config?: Nullable<Record<string, any>>
	
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
