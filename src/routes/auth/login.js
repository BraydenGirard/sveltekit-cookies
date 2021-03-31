import getDbClient from '$lib/helpers/db'
import stringHash from 'string-hash'
import * as cookie from 'cookie';
import { v4 as uuidv4 } from 'uuid';

const db = getDbClient()

export async function post({ body }) {
  const user = JSON.parse(await db.get(body.email));
  if(!user) {
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
  if(user.password !== stringHash(body.password)) {
    return {
      status: 401,
      body: {
        message: "Unauthorized"
      }
    }
  }

  const cookieId = uuidv4()
  await db.set('session_id', JSON.stringify({
    cookieId,
    email: user.email
  }))

  return {
    status: 200,
    headers: {
      'Set-Cookie': cookie.serialize('session_id', cookieId, {
                      httpOnly: true,
                      maxAge: 60 * 60 * 24 * 7 // 1 week
                    })
    },
    body: {
      message: "Success"
    }
  };
}