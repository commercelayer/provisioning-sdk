import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel } from '../resource'
import type { QueryParamsRetrieve } from '../query'

import type { ApiCredential, ApiCredentialType } from './api_credentials'
import type { Membership, MembershipType } from './memberships'
import type { User, UserType } from './user'
import type { Organization, OrganizationType } from './organizations'
import type { Role, RoleType } from './roles'


type ApplicationMembershipType = 'application_memberships'
type ApplicationMembershipRel = ResourceRel & { type: ApplicationMembershipType }
type ApiCredentialRel = ResourceRel & { type: ApiCredentialType }
type MembershipRel = ResourceRel & { type: MembershipType }
type UserRel = ResourceRel & { type: UserType }
type OrganizationRel = ResourceRel & { type: OrganizationType }
type RoleRel = ResourceRel & { type: RoleType }


interface ApplicationMembership extends Resource {
	
	readonly type: ApplicationMembershipType

	filters?: Record<string, any> | null

	api_credential?: ApiCredential | null
	membership?: Membership | null
	user?: User | null
	organization?: Organization | null
	role?: Role | null

}


interface ApplicationMembershipCreate extends ResourceCreate {
	
	filters?: Record<string, any> | null

	api_credential: ApiCredentialRel
	membership: MembershipRel
	user: UserRel
	organization: OrganizationRel
	role: RoleRel

}


interface ApplicationMembershipUpdate extends ResourceUpdate {
	
	filters?: Record<string, any> | null

	role?: RoleRel | null

}


class ApplicationMemberships extends ApiResource<ApplicationMembership> {

	static readonly TYPE: ApplicationMembershipType = 'application_memberships' as const

	async create(resource: ApplicationMembershipCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ApplicationMembership> {
		return this.resources.create<ApplicationMembershipCreate, ApplicationMembership>({ ...resource, type: ApplicationMemberships.TYPE }, params, options)
	}

	async update(resource: ApplicationMembershipUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ApplicationMembership> {
		return this.resources.update<ApplicationMembershipUpdate, ApplicationMembership>({ ...resource, type: ApplicationMemberships.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: ApplicationMemberships.TYPE } : id, options)
	}

	async api_credential(applicationMembershipId: string | ApplicationMembership, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ApiCredential> {
		const _applicationMembershipId = (applicationMembershipId as ApplicationMembership).id || applicationMembershipId as string
		return this.resources.fetch<ApiCredential>({ type: 'api_credentials' }, `application_memberships/${_applicationMembershipId}/api_credential`, params, options) as unknown as ApiCredential
	}

	async membership(applicationMembershipId: string | ApplicationMembership, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Membership> {
		const _applicationMembershipId = (applicationMembershipId as ApplicationMembership).id || applicationMembershipId as string
		return this.resources.fetch<Membership>({ type: 'memberships' }, `application_memberships/${_applicationMembershipId}/membership`, params, options) as unknown as Membership
	}

	async user(applicationMembershipId: string | ApplicationMembership, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<User> {
		const _applicationMembershipId = (applicationMembershipId as ApplicationMembership).id || applicationMembershipId as string
		return this.resources.fetch<User>({ type: 'user' }, `application_memberships/${_applicationMembershipId}/user`, params, options) as unknown as User
	}

	async organization(applicationMembershipId: string | ApplicationMembership, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Organization> {
		const _applicationMembershipId = (applicationMembershipId as ApplicationMembership).id || applicationMembershipId as string
		return this.resources.fetch<Organization>({ type: 'organizations' }, `application_memberships/${_applicationMembershipId}/organization`, params, options) as unknown as Organization
	}

	async role(applicationMembershipId: string | ApplicationMembership, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Role> {
		const _applicationMembershipId = (applicationMembershipId as ApplicationMembership).id || applicationMembershipId as string
		return this.resources.fetch<Role>({ type: 'roles' }, `application_memberships/${_applicationMembershipId}/role`, params, options) as unknown as Role
	}


	isApplicationMembership(resource: any): resource is ApplicationMembership {
		return resource.type && (resource.type === ApplicationMemberships.TYPE)
	}


	relationship(id: string | ResourceId | null): ApplicationMembershipRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: ApplicationMemberships.TYPE } : { id: id.id, type: ApplicationMemberships.TYPE }
	}


	type(): ApplicationMembershipType {
		return ApplicationMemberships.TYPE
	}

}


export default ApplicationMemberships

export type { ApplicationMembership, ApplicationMembershipCreate, ApplicationMembershipUpdate, ApplicationMembershipType }
