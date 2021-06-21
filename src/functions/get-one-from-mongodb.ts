import type { GetOneFn, GetOneFnArgs } from '@rockparty/db-adapter'
import type { MongodbGetOneOptions, MongodbObject } from '@/protocols'
import type { MongoClient } from 'mongodb'

export function getOneFromMongodb(client: MongoClient): GetOneFn {
  return async function <T>(
    args: GetOneFnArgs<T, MongodbGetOneOptions<T>>,
  ): Promise<T | null> {
    const { from: collectionName, by: key, matching: value, opts } = args

    const founded = await client
      .db()
      .collection(collectionName)
      .findOne<MongodbObject<T>>({ [key]: value }, opts)
    delete founded?._id

    return founded
  }
}