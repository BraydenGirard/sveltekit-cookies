import stringHash from 'string-hash'
import * as cookie from 'cookie';
import { v4 as uuidv4 } from 'uuid';
import { Tedis } from "tedis";

const db = new Tedis({host: "127.0.0.1", port: 6379})

export async function post({ body }) {
  const user = JSON.parse(await db.get(body.email));
  if(!user) {
    return {
      status: 401,
      body: {
        message: "Unauthorized"
      }
    }
  }
  if(user.password !== stringHash(body.password)) {
    return {
      status: 401,
      body: {
        message: "Unauthorized"
      }
    }
  }

  const cookieId = uuidv4()
  await db.set(cookieId, JSON.stringify({
    email: user.email
  }))

  return {
    status: 200,
    headers: {
      'Set-Cookie': cookie.serialize('session_id', cookieId, {
                      httpOnly: true,
                      maxAge: 60 * 60 * 24 * 7,
                      sameSite: 'lax',
                      path: '/'
                    })
    },
    body: {
      message: "Success"
    }
  };
}