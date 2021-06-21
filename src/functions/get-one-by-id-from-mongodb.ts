import type { GetOneByIdFn, GetOneByIdFnArgs } from '@rockparty/db-adapter'
import type { MongodbGetOneOptions, MongodbObject } from '@/protocols'
import type { MongoClient } from 'mongodb'

export function getOneByIdFromMongodb(client: MongoClient): GetOneByIdFn {
  return async function <T>(
    args: GetOneByIdFnArgs<MongodbGetOneOptions<T>>,
  ): Promise<T | null> {
    const { from: collectionName, id, opts } = args

    const founded = await client
      .db()
      .collection(collectionName)
      .findOne<MongodbObject<T>>({ _id: id }, opts)
    delete founded?._id

    return founded
  }
}
