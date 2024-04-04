import type { Nullable } from '../types'
import { ApiSingleton } from '../resource'
import type { Resource, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve } from '../query'



type UserType = 'user'
type UserRel = ResourceRel & { type: UserType }


export type UserSort = Pick<User, 'id'> & ResourceSort
// export type UserFilter = Pick<User, 'id'> & ResourceFilter


interface User extends Resource {
	
	readonly type: UserType

	email: string
	first_name: string
	last_name: string
	time_zone?: Nullable<string>
	otp_required_for_login: boolean
	
}


interface UserUpdate extends ResourceUpdate {
	
	email?: Nullable<string>
	first_name?: Nullable<string>
	last_name?: Nullable<string>
	time_zone?: Nullable<string>
	
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
		return super.relationshipOneToOne<UserRel>(id)
	}

	relationshipToMany(...ids: string[]): UserRel[] {
		return super.relationshipOneToMany<UserRel>(...ids)
	}


	type(): UserType {
		return Users.TYPE
	}

}


export default Users

export type { User, UserUpdate, UserType }
