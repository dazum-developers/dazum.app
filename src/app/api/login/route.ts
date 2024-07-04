import type { NextRequest } from 'next/server'

import { loginController } from '@/application/controller/login'

// https://www.propelauth.com/post/cookies-in-next-js#:~:text=Cookies%20in%20Route%20Handlers&text=And%20while%20all%20of%20this,const%20viewedWelcomeMessage%20%3D%20cookies().
// https://www.propelauth.com/post/cookies-in-next-js
export async function POST(request: NextRequest) {
  await loginController(request)
}
