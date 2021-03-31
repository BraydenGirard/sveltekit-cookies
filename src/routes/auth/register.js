import getDbClient from '$lib/helpers/db'
import stringHash from 'string-hash'
import { v4 as uuidv4 } from 'uuid';

const db = getDbClient()

export async function post({ body }) {
  const user = JSON.parse(await db.get(body.email));
  if(user) {
    return {
      status: 409,
      body: {
        message: "User with that email already exists"
      }
    }
  }

  await db.set(body.email, JSON.stringify({
    password: stringHash(body.password),
    name: body.name
  }))

  const cookieId = uuidv4()
  await db.set('session_id', JSON.stringify({
    cookieId,
    email: user.email
  }))
  const headers = {
    'Set-Cookie': cookie.serialize('session_id', cookieId, {
                    httpOnly: true,
                    maxAge: 60 * 60 * 24 * 7 // 1 week
                  })
  }
  console.log(headers)
  console.log('Hello!')
  return {
    status: 200,
    headers,
    body: {
      message: "Success"
    }
  };
}