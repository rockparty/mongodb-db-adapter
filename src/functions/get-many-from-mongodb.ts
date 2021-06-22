import type { GetManyFn, GetManyFnArgs } from '@rockparty/db-adapter'
import type { MongoClient } from 'mongodb'

export function getManyFromMongodb<Collection extends string = string>(
  client: MongoClient,
): GetManyFn<undefined, Collection> {
  return async function <T>(
    args: GetManyFnArgs<undefined, T, Collection>,
  ): Promise<T[]> {
    const { from: collectionName, by: key, matching: value } = args

    const founded = await client
      .db()
      .collection(collectionName)
      .find({ [key]: value }, { projection: { _id: 0 } })
      .toArray()

    return founded
  }
}
