import type { GetAllFn, GetAllFnArgs } from '@rockparty/db-adapter'
import type { MongodbObject } from '@/protocols'
import type { MongoClient } from 'mongodb'

export function getAllFromMongodb<Collection extends string = string>(
  client: MongoClient,
): GetAllFn<undefined, Collection> {
  return async function <T>(
    args: GetAllFnArgs<undefined, Collection>,
  ): Promise<T[]> {
    const { from: collectionName } = args

    const founded = await client
      .db()
      .collection<MongodbObject<T>>(collectionName)
      .find({}, { projection: { _id: 0 } })
      .toArray()

    return founded
  }
}
