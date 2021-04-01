import { Tedis } from "tedis";

const db = new Tedis({host: "127.0.0.1", port: 6379})

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