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

	/** 
	 * The user email..
	 * @example ```"user@commercelayer.io"```
	 */
	email: string
	/** 
	 * The user first name..
	 * @example ```"John"```
	 */
	first_name: string
	/** 
	 * The user last name..
	 * @example ```"Doe"```
	 */
	last_name: string
	/** 
	 * The user preferred timezone..
	 * @example ```"UTC"```
	 */
	time_zone?: Nullable<string>
	/** 
	 * The user 2FA setting..
	 */
	otp_required_for_login: boolean
	
}


interface UserUpdate extends ResourceUpdate {
	
	/** 
	 * The user email..
	 * @example ```"user@commercelayer.io"```
	 */
	email?: Nullable<string>
	/** 
	 * The user first name..
	 * @example ```"John"```
	 */
	first_name?: Nullable<string>
	/** 
	 * The user last name..
	 * @example ```"Doe"```
	 */
	last_name?: Nullable<string>
	/** 
	 * The user preferred timezone..
	 * @example ```"UTC"```
	 */
	time_zone?: Nullable<string>
	
}


class Users extends ApiSingleton<User> {

	static readonly TYPE: UserType = 'user' as const

	async update(resource: UserUpdate, params?: QueryParamsRetrieve<User>, options?: ResourcesConfig): Promise<User> {
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
