import type { Resource, ResourceRel } from './resource'
import type { VersionType } from './resources/versions'
import type * as models from './model'

// ##__API_RESOURCES_START__##
// ##__API_RESOURCES_TEMPLATE:: export { default as ##__RESOURCE_CLASS__## } from './resources/##__RESOURCE_TYPE__##'
/**
 * ©2025 Commerce Layer Inc.
 **/
export { default as ApiCredentials } from './resources/api_credentials'
export { default as ApplicationMemberships } from './resources/application_memberships'
export { default as IdentityProviders } from './resources/identity_providers'
export { default as Memberships } from './resources/memberships'
export { default as Organizations } from './resources/organizations'
export { default as Permissions } from './resources/permissions'
export { default as Roles } from './resources/roles'
export { default as Users } from './resources/users'
export { default as Versions } from './resources/versions'
// ##__API_RESOURCES_STOP__##


export type ResourceTypeLock =
// ##__API_RESOURCE_TYPES_START__##
	'api_credentials'
|	'application_memberships'
|	'identity_providers'
|	'memberships'
|	'organizations'
|	'permissions'
|	'roles'
|	'users'
|	'versions'
// ##__API_RESOURCE_TYPES_STOP__##


export const resourceList: ResourceTypeLock[] = [
// ##__API_RESOURCE_LIST_START__##
	'api_credentials',
	'application_memberships',
	'identity_providers',
	'memberships',
	'organizations',
	'permissions',
	'roles',
	'users',
	'versions'
// ##__API_RESOURCE_LIST_STOP__##
] as const


export const singletonList: ResourceTypeLock[] = [
// ##__API_RESOURCE_SINGLETON_START__##
	'users'
// ##__API_RESOURCE_SINGLETON_STOP__##
] as const


// Retrievable resources
export type RetrievableResourceType = ResourceTypeLock

export type RetrievableResource = Resource & {
	type: RetrievableResourceType
}


// Listable resources
export type ListableResourceType = Exclude<ResourceTypeLock,
	// ##__API_RESOURCE_NOT_LISTABLE_START__##
	'users'
	// ##__API_RESOURCE_NOT_LISTABLE_STOP__##
>

export type ListableResource = Resource & {
	type: ListableResourceType
}


// Creatable resources
export type CreatableResourceType =
	// ##__API_RESOURCE_CREATABLE_START__##
	'api_credentials'
|	'application_memberships'
|	'identity_providers'
|	'memberships'
|	'organizations'
|	'permissions'
|	'roles'
	// ##__API_RESOURCE_CREATABLE_STOP__##

export type CreatableResource = Resource & {
	type: CreatableResourceType
}


// Updatable resources
export type UpdatableResourceType =
	// ##__API_RESOURCE_UPDATABLE_START__##
	'api_credentials'
|	'application_memberships'
|	'identity_providers'
|	'memberships'
|	'organizations'
|	'permissions'
|	'roles'
	// ##__API_RESOURCE_UPDATABLE_STOP__##

export type UpdatableResource = Resource & {
	type: UpdatableResourceType
}


// Deletable resources
export type DeletableResourceType =
	// ##__API_RESOURCE_DELETABLE_START__##
	'api_credentials'
|	'application_memberships'
|	'identity_providers'
|	'memberships'
	// ##__API_RESOURCE_DELETABLE_STOP__##

export type DeletableResource = Resource & {
	type: DeletableResourceType
}


// Versionable resources
export type VersionableResourceType = 
	// ##__API_RESOURCE_VERSIONABLE_START__##
	'memberships'
|	'permissions'
|	'roles'
	// ##__API_RESOURCE_VERSIONABLE_STOP__##

export type VersionableResource = Resource & {
	type: VersionableResourceType,
	versions?: Array<ResourceRel & { type: VersionType }> | null
}



export type ResourceFields = {
	// ##__API_RESOURCE_FIELDS_START__##
	api_credentials: models.ApiCredential,
	application_memberships: models.ApplicationMembership,
	identity_providers: models.IdentityProvider,
	memberships: models.Membership,
	organizations: models.Organization,
	permissions: models.Permission,
	roles: models.Role,
	users: models.User,
	versions: models.Version
	// ##__API_RESOURCE_FIELDS_STOP__##
}


export type ResourceSortFields = {
	// ##__API_RESOURCE_SORTABLE_FIELDS_START__##
	api_credentials: models.ApiCredentialSort,
	application_memberships: models.ApplicationMembershipSort,
	identity_providers: models.IdentityProviderSort,
	memberships: models.MembershipSort,
	organizations: models.OrganizationSort,
	permissions: models.PermissionSort,
	roles: models.RoleSort,
	users: models.UserSort,
	versions: models.VersionSort
	// ##__API_RESOURCE_SORTABLE_FIELDS_STOP__##
}
