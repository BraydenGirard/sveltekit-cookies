import getDbClient from '$lib/helpers/db'
import * as cookie from 'cookie'

const authenticatedRoutes = [
  '/profile'
]

const db = getDbClient()

export async function getContext({ headers }) {
  const cookies = cookie.parse(headers.cookie || '');
  if(!cookies.session_id) {
    return {
      authenticated: false
    }
  }
  const user = JSON.parse(await db.get(cookies.session_id))
  if(user && user.email) {
    return {
      authenticated: true,
      userEmail: user.email
    }
  } else {
    return {
      authenticated: false
    }
  }
}

export function getSession({ context }) {
	return {
    authorized: context.authenticated
	};
}