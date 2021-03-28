
import * from '@replit/database';
import { stringHash } from 'string-hash'

export async function post({ body }) {
	const client = new Client();
  const user = await Client.get(body.email);
  if(user) {
    return {
      status: 409,
      body: {
        message: "User with that email already exists"
      }
    }
  }

  await Client.set(body.email, {
    password: stringHash(body.password)
  })

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