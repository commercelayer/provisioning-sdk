import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Organization, OrganizationType } from './organizations'
import type { Role, RoleType } from './roles'
import type { ApplicationMembership, ApplicationMembershipType } from './application_memberships'
import type { Version } from './versions'


type MembershipType = 'memberships'
type MembershipRel = ResourceRel & { type: MembershipType }
type OrganizationRel = ResourceRel & { type: OrganizationType }
type RoleRel = ResourceRel & { type: RoleType }
type ApplicationMembershipRel = ResourceRel & { type: ApplicationMembershipType }


interface Membership extends Resource {
	
	readonly type: MembershipType

	user_email: string
	user_first_name: string
	user_last_name: string
	status: 'pending' | 'active'

	organization?: Organization | null
	role?: Role | null
	application_memberships?: ApplicationMembership[] | null
	versions?: Version[] | null

}


interface MembershipCreate extends ResourceCreate {
	
	user_email: string

	organization: OrganizationRel
	role: RoleRel
	application_memberships?: ApplicationMembershipRel[] | null

}


interface MembershipUpdate extends ResourceUpdate {
	
	role?: RoleRel | null
	application_memberships?: ApplicationMembershipRel[] | null

}


class Memberships extends ApiResource<Membership> {

	static readonly TYPE: MembershipType = 'memberships' as const

	async create(resource: MembershipCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Membership> {
		return this.resources.create<MembershipCreate, Membership>({ ...resource, type: Memberships.TYPE }, params, options)
	}

	async update(resource: MembershipUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Membership> {
		return this.resources.update<MembershipUpdate, Membership>({ ...resource, type: Memberships.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: Memberships.TYPE } : id, options)
	}

	async resend(membershipId: string | Membership, options?: ResourcesConfig): Promise<void> {
		const _membershipId = (membershipId as Membership).id || membershipId as string
		await this.resources.action('post', `memberships/${_membershipId}/resend`, {}, options)
	}

	async organization(membershipId: string | Membership, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Organization> {
		const _membershipId = (membershipId as Membership).id || membershipId as string
		return this.resources.fetch<Organization>({ type: 'organizations' }, `memberships/${_membershipId}/organization`, params, options) as unknown as Organization
	}

	async role(membershipId: string | Membership, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Role> {
		const _membershipId = (membershipId as Membership).id || membershipId as string
		return this.resources.fetch<Role>({ type: 'roles' }, `memberships/${_membershipId}/role`, params, options) as unknown as Role
	}

	async application_memberships(membershipId: string | Membership, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<ApplicationMembership>> {
		const _membershipId = (membershipId as Membership).id || membershipId as string
		return this.resources.fetch<ApplicationMembership>({ type: 'application_memberships' }, `memberships/${_membershipId}/application_memberships`, params, options) as unknown as ListResponse<ApplicationMembership>
	}

	async versions(membershipId: string | Membership, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _membershipId = (membershipId as Membership).id || membershipId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `memberships/${_membershipId}/versions`, params, options) as unknown as ListResponse<Version>
	}


	isMembership(resource: any): resource is Membership {
		return resource.type && (resource.type === Memberships.TYPE)
	}


	relationship(id: string | ResourceId | null): MembershipRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: Memberships.TYPE } : { id: id.id, type: Memberships.TYPE }
	}


	type(): MembershipType {
		return Memberships.TYPE
	}

}


export default Memberships

export type { Membership, MembershipCreate, MembershipUpdate, MembershipType }
