import { ApiSingleton } from '../resource'
import type { Resource, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel } from '../resource'
import type { QueryParamsRetrieve } from '../query'



type UserType = 'user'
type UserRel = ResourceRel & { type: UserType }


interface User extends Resource {
	
	readonly type: UserType

	email: string
	first_name: string
	last_name: string
	time_zone?: string | null
	otp_required_for_login: boolean
	
}


interface UserUpdate extends ResourceUpdate {
	
	email?: string | null
	first_name?: string | null
	last_name?: string | null
	time_zone?: string | null
	
}


class Users extends ApiSingleton<User> {

	static readonly TYPE: UserType = 'user' as const

	async update(resource: UserUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<User> {
		const res = await this.retrieve(params, options)	// JsonAPI requires id in the request body
		return this.resources.update<UserUpdate, User>({ ...resource, id: res.id, type: Users.TYPE }, params, options)
	}


	isUser(resource: any): resource is User {
		return resource.type && (resource.type === Users.TYPE)
	}


	relationship(id: string | ResourceId | null): UserRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: Users.TYPE } : { id: id.id, type: Users.TYPE }
	}


	type(): UserType {
		return Users.TYPE
	}

}


export default Users

export type { User, UserUpdate, UserType }
