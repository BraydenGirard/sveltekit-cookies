import getDbClient from '$lib/helpers/db'

const db = getDbClient()

export async function get({ context }) {
    if(!context.authenticated) {
        return {
            status: 401,
            body: {
              message: "Unauthorized"
            },
            headers: {
              'Content-Type': 'application/json'
            }
          }
    }
  const user = JSON.parse(await db.get(context.email));
    delete user.password
  return {
    status: 200,
    body: user
  };
}