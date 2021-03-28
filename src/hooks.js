import * as cookie from 'cookie';
import * from '@replit/database';

const authenticatedRoutes = [
  '/profile'
]


/** @type {import('@sveltejs/kit').GetContext} */
export async function getContext({ headers }) {
  const cookies = cookie.parse(headers.cookie || '');
  const client = new Client();
  const userEmail = await Client.get(cookies.session_id)
  if(userEmail) {
    return {
      authenticated: true,
      userEmail
    }
  } else {
    return {
      authenticated: false
    }
  }
}

/** @type {import('@sveltejs/kit').Handle} */
export async function handle(request, render) {
	const response = await render(request);
  console.log(request.path)
  if(!request.context.authenticated && authenticatedRoutes.includes(request.path)) {
    response.status = 401,
    response.body = {},
    response.headers = {}
  }
	return {
		...response,
		headers: {
			...response.headers
		}
	};
}