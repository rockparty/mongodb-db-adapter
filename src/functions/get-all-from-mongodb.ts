import type { GetAllFn, GetAllFnArgs } from '@rockparty/db-adapter'
import type { MongodbObject } from '@/protocols'
import type { MongoClient } from 'mongodb'

export function getAllFromMongodb(client: MongoClient): GetAllFn {
  return async function <T>(args: GetAllFnArgs<T>): Promise<T[]> {
    const { from: collectionName } = args

    const founded = await client
      .db()
      .collection<MongodbObject<T>>(collectionName)
      .find()
      .toArray()

    const mapped = founded.map((o) => {
      delete o._id
      return o
    })

    return mapped
  }
}
