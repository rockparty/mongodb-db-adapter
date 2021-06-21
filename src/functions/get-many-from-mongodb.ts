import type { GetManyFn, GetManyFnArgs } from '@rockparty/db-adapter'
import type { MongodbObject } from '@/protocols'
import type { MongoClient } from 'mongodb'

export function getManyFromMongodb(client: MongoClient): GetManyFn {
  return async function <T>(args: GetManyFnArgs<T>): Promise<T[]> {
    const { from: collectionName, by: key, matching: value } = args

    const founded = await client
      .db()
      .collection(collectionName)
      .find({ [key]: value })
      .toArray()

    const mapped = (founded as MongodbObject<T>[]).map((o) => {
      delete o._id
      return o
    })

    return mapped
  }
}
