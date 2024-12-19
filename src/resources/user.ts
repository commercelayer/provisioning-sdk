import type { Nullable } from '../types'
import { ApiSingleton } from '../resource'
import type { Resource, SingletonUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { IdentityProvider } from './identity_providers'


type UserType = 'user'
type UserRel = ResourceRel & { type: UserType }


export type UserSort = Pick<User, 'id' | 'email' | 'first_name' | 'last_name'> & ResourceSort
// export type UserFilter = Pick<User, 'id' | 'email' | 'first_name' | 'last_name' | 'time_zone'> & ResourceFilter


interface User extends Resource {
	
	readonly type: UserType

	/** 
	 * The user email.
	 * @example ```"user@commercelayer.io"```
	 */
	email: string
	/** 
	 * The user first name.
	 * @example ```"John"```
	 */
	first_name: string
	/** 
	 * The user last name.
	 * @example ```"Doe"```
	 */
	last_name: string
	/** 
	 * The user preferred timezone.
	 * @example ```"UTC"```
	 */
	time_zone?: Nullable<string>
	/** 
	 * The user 2FA setting.
	 */
	otp_required_for_login: boolean

	identity_providers?: Nullable<IdentityProvider[]>

}


interface UserUpdate extends SingletonUpdate {
	
	/** 
	 * The user email.
	 * @example ```"user@commercelayer.io"```
	 */
	email?: Nullable<string>
	/** 
	 * The user first name.
	 * @example ```"John"```
	 */
	first_name?: Nullable<string>
	/** 
	 * The user last name.
	 * @example ```"Doe"```
	 */
	last_name?: Nullable<string>
	/** 
	 * The user preferred timezone.
	 * @example ```"UTC"```
	 */
	time_zone?: Nullable<string>
	
}


class Users extends ApiSingleton<User> {

	static readonly TYPE: UserType = 'user' as const

	async update(resource: UserUpdate, params?: QueryParamsRetrieve<User>, options?: ResourcesConfig): Promise<User> {
		return this.resources.update<UserUpdate, User>({ ...resource, type: Users.TYPE }, params, options)
	}

	async identity_providers(userId: string | User, params?: QueryParamsList<IdentityProvider>, options?: ResourcesConfig): Promise<ListResponse<IdentityProvider>> {
		const _userId = (userId as User).id || userId as string
		return this.resources.fetch<IdentityProvider>({ type: 'identity_providers' }, `user/${_userId}/identity_providers`, params, options) as unknown as ListResponse<IdentityProvider>
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

	path(): string {
		return 'user'
	}

}


export default Users

export type { User, UserUpdate, UserType }
