import type { Nullable } from '../types'
import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Organization, OrganizationType } from './organizations'
import type { Role, RoleType } from './roles'
import type { ApplicationMembership, ApplicationMembershipType } from './application_memberships'
import type { MembershipProfile, MembershipProfileType } from './membership_profiles'
import type { Version } from './versions'


type MembershipType = 'memberships'
type MembershipRel = ResourceRel & { type: MembershipType }
type OrganizationRel = ResourceRel & { type: OrganizationType }
type RoleRel = ResourceRel & { type: RoleType }
type ApplicationMembershipRel = ResourceRel & { type: ApplicationMembershipType }
type MembershipProfileRel = ResourceRel & { type: MembershipProfileType }


export type MembershipSort = Pick<Membership, 'id' | 'status'> & ResourceSort
// export type MembershipFilter = Pick<Membership, 'id' | 'user_email' | 'status' | 'owner' | 'access_scope'> & ResourceFilter


interface Membership extends Resource {
	
	readonly type: MembershipType

	/** 
	 * The user email.
	 * @example ```"commercelayer@commercelayer.io"```
	 */
	user_email: string
	/** 
	 * The user first name.
	 * @example ```"John"```
	 */
	user_first_name: string
	/** 
	 * The user last name.
	 * @example ```"Doe"```
	 */
	user_last_name: string
	/** 
	 * The memberships status. One of `pending` (default), `active`.
	 * @example ```"pending"```
	 */
	status: 'pending' | 'active'
	/** 
	 * Indicates if the user it's the owner of the organization.
	 * @example ```"true"```
	 */
	owner: boolean
	/** 
	 * Reflects the organization's access scope, either test_access or all_access.
	 */
	test_enabled: boolean
	/** 
	 * The access scope for applications. One of `live_access` (default), `test_access`, `all_access`.
	 * @example ```"live_access"```
	 */
	access_scope?: Nullable<'live_access' | 'test_access' | 'all_access'>

	organization?: Nullable<Organization>
	role?: Nullable<Role>
	application_memberships?: Nullable<ApplicationMembership[]>
	membership_profile?: Nullable<MembershipProfile>
	versions?: Nullable<Version[]>

}


interface MembershipCreate extends ResourceCreate {
	
	/** 
	 * The user email.
	 * @example ```"commercelayer@commercelayer.io"```
	 */
	user_email: string
	/** 
	 * The access scope for applications. One of `live_access` (default), `test_access`, `all_access`.
	 * @example ```"live_access"```
	 */
	access_scope?: Nullable<'live_access' | 'test_access' | 'all_access'>

	organization: OrganizationRel
	role: RoleRel
	application_memberships?: Nullable<ApplicationMembershipRel[]>
	membership_profile?: Nullable<MembershipProfileRel>

}


interface MembershipUpdate extends ResourceUpdate {
	
	/** 
	 * The access scope for applications. One of `live_access` (default), `test_access`, `all_access`.
	 * @example ```"live_access"```
	 */
	access_scope?: Nullable<'live_access' | 'test_access' | 'all_access'>

	role?: Nullable<RoleRel>
	application_memberships?: Nullable<ApplicationMembershipRel[]>
	membership_profile?: Nullable<MembershipProfileRel>

}


class Memberships extends ApiResource<Membership> {

	static readonly TYPE: MembershipType = 'memberships' as const

	async create(resource: MembershipCreate, params?: QueryParamsRetrieve<Membership>, options?: ResourcesConfig): Promise<Membership> {
		return this.resources.create<MembershipCreate, Membership>({ ...resource, type: Memberships.TYPE }, params, options)
	}

	async update(resource: MembershipUpdate, params?: QueryParamsRetrieve<Membership>, options?: ResourcesConfig): Promise<Membership> {
		return this.resources.update<MembershipUpdate, Membership>({ ...resource, type: Memberships.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: Memberships.TYPE } : id, options)
	}

	async resend(membershipId: string | Membership, options?: ResourcesConfig): Promise<void> {
		const _membershipId = (membershipId as Membership).id || membershipId as string
		await this.resources.action('POST', `memberships/${_membershipId}/resend`, {}, options)
	}

	async organization(membershipId: string | Membership, params?: QueryParamsRetrieve<Organization>, options?: ResourcesConfig): Promise<Organization> {
		const _membershipId = (membershipId as Membership).id || membershipId as string
		return this.resources.fetch<Organization>({ type: 'organizations' }, `memberships/${_membershipId}/organization`, params, options) as unknown as Organization
	}

	async role(membershipId: string | Membership, params?: QueryParamsRetrieve<Role>, options?: ResourcesConfig): Promise<Role> {
		const _membershipId = (membershipId as Membership).id || membershipId as string
		return this.resources.fetch<Role>({ type: 'roles' }, `memberships/${_membershipId}/role`, params, options) as unknown as Role
	}

	async application_memberships(membershipId: string | Membership, params?: QueryParamsList<ApplicationMembership>, options?: ResourcesConfig): Promise<ListResponse<ApplicationMembership>> {
		const _membershipId = (membershipId as Membership).id || membershipId as string
		return this.resources.fetch<ApplicationMembership>({ type: 'application_memberships' }, `memberships/${_membershipId}/application_memberships`, params, options) as unknown as ListResponse<ApplicationMembership>
	}

	async membership_profile(membershipId: string | Membership, params?: QueryParamsRetrieve<MembershipProfile>, options?: ResourcesConfig): Promise<MembershipProfile> {
		const _membershipId = (membershipId as Membership).id || membershipId as string
		return this.resources.fetch<MembershipProfile>({ type: 'membership_profiles' }, `memberships/${_membershipId}/membership_profile`, params, options) as unknown as MembershipProfile
	}

	async versions(membershipId: string | Membership, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _membershipId = (membershipId as Membership).id || membershipId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `memberships/${_membershipId}/versions`, params, options) as unknown as ListResponse<Version>
	}


	isMembership(resource: any): resource is Membership {
		return resource.type && (resource.type === Memberships.TYPE)
	}


	relationship(id: string | ResourceId | null): MembershipRel {
		return super.relationshipOneToOne<MembershipRel>(id)
	}

	relationshipToMany(...ids: string[]): MembershipRel[] {
		return super.relationshipOneToMany<MembershipRel>(...ids)
	}


	type(): MembershipType {
		return Memberships.TYPE
	}

}


export default Memberships

export type { Membership, MembershipCreate, MembershipUpdate, MembershipType }
