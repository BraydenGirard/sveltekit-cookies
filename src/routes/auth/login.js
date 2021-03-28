
import * from '@replit/database';
import { stringHash } from 'string-hash'
import * as cookie from 'cookie';
import { v4 as uuidv4 } from 'uuid';

export async function post({ body }) {
	const client = new Client();
  const user = await Client.get(body.email);
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
  await Client.set('session_id', {
    cookieId,
    email: user.email
  })

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