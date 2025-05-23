import type { Nullable } from '../types'
import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Organization, OrganizationType } from './organizations'
import type { ApplicationMembership, ApplicationMembershipType } from './application_memberships'


type MembershipProfileType = 'membership_profiles'
type MembershipProfileRel = ResourceRel & { type: MembershipProfileType }
type OrganizationRel = ResourceRel & { type: OrganizationType }
type ApplicationMembershipRel = ResourceRel & { type: ApplicationMembershipType }


export type MembershipProfileSort = Pick<MembershipProfile, 'id' | 'name'> & ResourceSort
// export type MembershipProfileFilter = Pick<MembershipProfile, 'id' | 'name' | 'test_enabled'> & ResourceFilter


interface MembershipProfile extends Resource {
	
	readonly type: MembershipProfileType

	/** 
	 * The membership profile name.
	 * @example ```"Marketing group"```
	 */
	name: string
	/** 
	 * Used to enable test mode on the accessible apps.
	 */
	test_enabled: boolean

	organization?: Nullable<Organization>
	application_memberships?: Nullable<ApplicationMembership[]>

}


interface MembershipProfileCreate extends ResourceCreate {
	
	/** 
	 * The membership profile name.
	 * @example ```"Marketing group"```
	 */
	name: string
	/** 
	 * Used to enable test mode on the accessible apps.
	 */
	test_enabled: boolean

	organization: OrganizationRel
	application_memberships?: Nullable<ApplicationMembershipRel[]>

}


interface MembershipProfileUpdate extends ResourceUpdate {
	
	/** 
	 * The membership profile name.
	 * @example ```"Marketing group"```
	 */
	name?: Nullable<string>
	/** 
	 * Used to enable test mode on the accessible apps.
	 */
	test_enabled?: Nullable<boolean>

	application_memberships?: Nullable<ApplicationMembershipRel[]>

}


class MembershipProfiles extends ApiResource<MembershipProfile> {

	static readonly TYPE: MembershipProfileType = 'membership_profiles' as const

	async create(resource: MembershipProfileCreate, params?: QueryParamsRetrieve<MembershipProfile>, options?: ResourcesConfig): Promise<MembershipProfile> {
		return this.resources.create<MembershipProfileCreate, MembershipProfile>({ ...resource, type: MembershipProfiles.TYPE }, params, options)
	}

	async update(resource: MembershipProfileUpdate, params?: QueryParamsRetrieve<MembershipProfile>, options?: ResourcesConfig): Promise<MembershipProfile> {
		return this.resources.update<MembershipProfileUpdate, MembershipProfile>({ ...resource, type: MembershipProfiles.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: MembershipProfiles.TYPE } : id, options)
	}

	async organization(membershipProfileId: string | MembershipProfile, params?: QueryParamsRetrieve<Organization>, options?: ResourcesConfig): Promise<Organization> {
		const _membershipProfileId = (membershipProfileId as MembershipProfile).id || membershipProfileId as string
		return this.resources.fetch<Organization>({ type: 'organizations' }, `membership_profiles/${_membershipProfileId}/organization`, params, options) as unknown as Organization
	}

	async application_memberships(membershipProfileId: string | MembershipProfile, params?: QueryParamsList<ApplicationMembership>, options?: ResourcesConfig): Promise<ListResponse<ApplicationMembership>> {
		const _membershipProfileId = (membershipProfileId as MembershipProfile).id || membershipProfileId as string
		return this.resources.fetch<ApplicationMembership>({ type: 'application_memberships' }, `membership_profiles/${_membershipProfileId}/application_memberships`, params, options) as unknown as ListResponse<ApplicationMembership>
	}


	isMembershipProfile(resource: any): resource is MembershipProfile {
		return resource.type && (resource.type === MembershipProfiles.TYPE)
	}


	relationship(id: string | ResourceId | null): MembershipProfileRel {
		return super.relationshipOneToOne<MembershipProfileRel>(id)
	}

	relationshipToMany(...ids: string[]): MembershipProfileRel[] {
		return super.relationshipOneToMany<MembershipProfileRel>(...ids)
	}


	type(): MembershipProfileType {
		return MembershipProfiles.TYPE
	}

}


export default MembershipProfiles

export type { MembershipProfile, MembershipProfileCreate, MembershipProfileUpdate, MembershipProfileType }
