import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Organization } from './organizations'
import type { Role, RoleType } from './roles'
import type { Version } from './versions'


type PermissionType = 'permissions'
type PermissionRel = ResourceRel & { type: PermissionType }
type RoleRel = ResourceRel & { type: RoleType }


interface Permission extends Resource {
	
	readonly type: PermissionType

	can_create: boolean
	can_read: boolean
	can_update: boolean
	can_destroy: boolean
	subject: string
	restrictions: Record<string, any>

	organization?: Organization | null
	role?: Role | null
	versions?: Version[] | null

}


interface PermissionCreate extends ResourceCreate {
	
	can_create: boolean
	can_read: boolean
	can_update: boolean
	can_destroy: boolean
	subject: string

	role: RoleRel

}


interface PermissionUpdate extends ResourceUpdate {
	
	can_create?: boolean | null
	can_read?: boolean | null
	can_update?: boolean | null
	can_destroy?: boolean | null
	
}


class Permissions extends ApiResource<Permission> {

	static readonly TYPE: PermissionType = 'permissions' as const

	async create(resource: PermissionCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Permission> {
		return this.resources.create<PermissionCreate, Permission>({ ...resource, type: Permissions.TYPE }, params, options)
	}

	async update(resource: PermissionUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Permission> {
		return this.resources.update<PermissionUpdate, Permission>({ ...resource, type: Permissions.TYPE }, params, options)
	}

	async organization(permissionId: string | Permission, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Organization> {
		const _permissionId = (permissionId as Permission).id || permissionId as string
		return this.resources.fetch<Organization>({ type: 'organizations' }, `permissions/${_permissionId}/organization`, params, options) as unknown as Organization
	}

	async role(permissionId: string | Permission, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Role> {
		const _permissionId = (permissionId as Permission).id || permissionId as string
		return this.resources.fetch<Role>({ type: 'roles' }, `permissions/${_permissionId}/role`, params, options) as unknown as Role
	}

	async versions(permissionId: string | Permission, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _permissionId = (permissionId as Permission).id || permissionId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `permissions/${_permissionId}/versions`, params, options) as unknown as ListResponse<Version>
	}


	isPermission(resource: any): resource is Permission {
		return resource.type && (resource.type === Permissions.TYPE)
	}


	relationship(id: string | ResourceId | null): PermissionRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: Permissions.TYPE } : { id: id.id, type: Permissions.TYPE }
	}


	type(): PermissionType {
		return Permissions.TYPE
	}

}


export default Permissions

export type { Permission, PermissionCreate, PermissionUpdate, PermissionType }
