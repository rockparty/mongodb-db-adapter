import type { DeleteOneFn, DeleteOneFnArgs } from '@rockparty/db-adapter'
import type { MongodbDeleteOneOptions } from '@/protocols'
import type { MongoClient } from 'mongodb'

export function deleteOneFromMongodb<Collection extends string = string>(
  client: MongoClient,
): DeleteOneFn<MongodbDeleteOneOptions<any>, Collection> {
  return async function <T>(
    args: DeleteOneFnArgs<MongodbDeleteOneOptions<T>, T, Collection>,
  ): Promise<boolean> {
    const { from: collectionName, by: key, matching: value, opts } = args

    const { ok } = await client
      .db()
      .collection(collectionName)
      .findOneAndDelete({ [key]: value }, opts)

    return ok === 1
  }
}
