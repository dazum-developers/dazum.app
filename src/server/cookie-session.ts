import { createCookieFactory } from './server-runtime'

import { createCookieSessionStorageFactory } from './cookie-storage'
import { sign, unsign } from './crypto'

export const createCookie = createCookieFactory({ sign, unsign })
export const createCookieSessionStorage = createCookieSessionStorageFactory(createCookie)
