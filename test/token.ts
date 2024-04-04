import { AuthenticateOptions, authenticate } from '@commercelayer/js-auth'
import dotenv from 'dotenv'

dotenv.config()


type TokenType = 'user'

export type AuthScope = string | string[]

type AuthData = {
	clientId: string
	clientSecret?: string
	domain?: string
}


export type AccessToken = {
	accessToken: string
	tokenType: 'bearer' | 'Bearer'
	expiresIn: number
	expires: Date
	scope: AuthScope
	createdAt: number
	error?: string
	errorDescription?: string
}


const domain = process.env.CL_SDK_DOMAIN
const clientId = process.env.CL_SDK_CLIENT_ID || ''
const clientSecret = process.env.CL_SDK_CLIENT_SECRET || ''


export default async (type: TokenType): Promise<AccessToken> => {
	switch (type) {
		case 'user':
		default: return getAccessToken({ clientId, clientSecret, domain })
	}
}





const getAccessToken = async (auth: AuthData): Promise<AccessToken> => {

	const credentials: AuthenticateOptions<'client_credentials'> = {
		clientId: auth.clientId,
		clientSecret: auth.clientSecret,
		domain: auth.domain || undefined
	}

	return authenticate('client_credentials', credentials)

}
