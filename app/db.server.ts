import { PrismaClient } from '@prisma/client'

import singleton from '~/app/singleton.server'

function getPrismaClient() {
  // eslint-disable-next-line n/no-process-env
  const DATABASE_URL: string = process.env.DATABASE_URL as string

  const databaseUrl = new URL(DATABASE_URL)

  const client = new PrismaClient({
    datasources: {
      db: { url: databaseUrl.toString() },
    },
  })

  // connect eagerly
  client.$connect()

  return client
}

// Hard-code a unique key, so we can look up the client when this module gets re-imported
export const prisma = singleton('prisma', getPrismaClient)

process.on('beforeExit', () => {
  prisma.$disconnect()
})
