import { MongoClient } from 'mongodb'
import { MongoMemoryServer } from 'mongodb-memory-server'

export function mongodbTestHelper(collectionName: string) {
  let mongoMemoryServer: MongoMemoryServer
  let client: MongoClient
  let dbUri: string

  const doBeforeAll = async (): Promise<void> => {
    mongoMemoryServer = new MongoMemoryServer()
    dbUri = await mongoMemoryServer.getUri()
    client = await new MongoClient(dbUri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }).connect()
  }

  const doBeforeEach = async (): Promise<void> => {
    const collections = await client.db().collections()
    if (!collections.some((c) => c.collectionName === collectionName)) return
    await client.db().dropCollection(collectionName)
  }

  const doAfterAll = async (): Promise<void> => {
    await client.close()
    await mongoMemoryServer.stop()
  }

  return {
    client: () => client,
    dbUri: () => dbUri,
    doBeforeAll,
    doBeforeEach,
    doAfterAll,
  }
}
