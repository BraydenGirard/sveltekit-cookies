import stringHash from 'string-hash'
import * as cookie from 'cookie';
import { v4 as uuidv4 } from 'uuid';
import { Tedis } from "tedis";

const db = new Tedis({host: "127.0.0.1", port: 6379})

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
    email: body.email,
    password: stringHash(body.password),
    name: body.name
  }))

  const cookieId = uuidv4()
  await db.set(cookieId, JSON.stringify({
    email: body.email
  }))
  const headers = {
    'Set-Cookie': cookie.serialize('session_id', cookieId, {
                    httpOnly: true,
                    maxAge: 60 * 60 * 24 * 7,
                    sameSite: 'lax',
                    path: '/'
                  })
  }
  return {
    status: 200,
    headers,
    body: {
      message: "Success"
    }
  };
}