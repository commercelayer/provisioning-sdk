import type { Nullable } from '../types'
import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Organization } from './organizations'
import type { Role, RoleType } from './roles'
import type { Version } from './versions'


type PermissionType = 'permissions'
type PermissionRel = ResourceRel & { type: PermissionType }
type RoleRel = ResourceRel & { type: RoleType }


export type PermissionSort = Pick<Permission, 'id'> & ResourceSort
// export type PermissionFilter = Pick<Permission, 'id'> & ResourceFilter


interface Permission extends Resource {
	
	readonly type: PermissionType

	/** 
	 * Determines if the permission have access to create rights..
	 */
	can_create: boolean
	/** 
	 * Determines if the permission have access to read rights..
	 */
	can_read: boolean
	/** 
	 * Determines if the permission have access to update rights..
	 */
	can_update: boolean
	/** 
	 * Determines if the permission have access to destroy rights..
	 */
	can_destroy: boolean
	/** 
	 * The resource where this permission is applied..
	 */
	subject: string
	/** 
	 * An object that contains additional restrictions..
	 * @example ```"[object Object]"```
	 */
	restrictions: Record<string, any>

	organization?: Nullable<Organization>
	role?: Nullable<Role>
	versions?: Nullable<Version[]>

}


interface PermissionCreate extends ResourceCreate {
	
	/** 
	 * Determines if the permission have access to create rights..
	 */
	can_create: boolean
	/** 
	 * Determines if the permission have access to read rights..
	 */
	can_read: boolean
	/** 
	 * Determines if the permission have access to update rights..
	 */
	can_update: boolean
	/** 
	 * Determines if the permission have access to destroy rights..
	 */
	can_destroy: boolean
	/** 
	 * The resource where this permission is applied..
	 */
	subject: string

	role: RoleRel

}


interface PermissionUpdate extends ResourceUpdate {
	
	/** 
	 * Determines if the permission have access to create rights..
	 */
	can_create?: Nullable<boolean>
	/** 
	 * Determines if the permission have access to read rights..
	 */
	can_read?: Nullable<boolean>
	/** 
	 * Determines if the permission have access to update rights..
	 */
	can_update?: Nullable<boolean>
	/** 
	 * Determines if the permission have access to destroy rights..
	 */
	can_destroy?: Nullable<boolean>
	
}


class Permissions extends ApiResource<Permission> {

	static readonly TYPE: PermissionType = 'permissions' as const

	async create(resource: PermissionCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Permission> {
		return this.resources.create<PermissionCreate, Permission>({ ...resource, type: Permissions.TYPE }, params, options)
	}

	async update(resource: PermissionUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Permission> {
		return this.resources.update<PermissionUpdate, Permission>({ ...resource, type: Permissions.TYPE }, params, options)
	}

	async organization(permissionId: string | Permission, params?: QueryParamsRetrieve<Organization>, options?: ResourcesConfig): Promise<Organization> {
		const _permissionId = (permissionId as Permission).id || permissionId as string
		return this.resources.fetch<Organization>({ type: 'organizations' }, `permissions/${_permissionId}/organization`, params, options) as unknown as Organization
	}

	async role(permissionId: string | Permission, params?: QueryParamsRetrieve<Role>, options?: ResourcesConfig): Promise<Role> {
		const _permissionId = (permissionId as Permission).id || permissionId as string
		return this.resources.fetch<Role>({ type: 'roles' }, `permissions/${_permissionId}/role`, params, options) as unknown as Role
	}

	async versions(permissionId: string | Permission, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _permissionId = (permissionId as Permission).id || permissionId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `permissions/${_permissionId}/versions`, params, options) as unknown as ListResponse<Version>
	}


	isPermission(resource: any): resource is Permission {
		return resource.type && (resource.type === Permissions.TYPE)
	}


	relationship(id: string | ResourceId | null): PermissionRel {
		return super.relationshipOneToOne<PermissionRel>(id)
	}

	relationshipToMany(...ids: string[]): PermissionRel[] {
		return super.relationshipOneToMany<PermissionRel>(...ids)
	}


	type(): PermissionType {
		return Permissions.TYPE
	}

}


export default Permissions

export type { Permission, PermissionCreate, PermissionUpdate, PermissionType }
