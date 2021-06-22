import type { GetOneFn, GetOneFnArgs } from '@rockparty/db-adapter'
import type { MongodbGetOneOptions, MongodbObject } from '@/protocols'
import type { MongoClient } from 'mongodb'

export function getOneFromMongodb<Collection extends string = string>(
  client: MongoClient,
): GetOneFn<undefined, Collection> {
  return async function <T>(
    args: GetOneFnArgs<MongodbGetOneOptions<T>, T, Collection>,
  ): Promise<T | null> {
    const { from: collectionName, by: key, matching: value, opts } = args

    const founded = await client
      .db()
      .collection(collectionName)
      .findOne<MongodbObject<T>>(
        { [key]: value },
        {
          ...opts,
          projection: { _id: 0 },
        },
      )

    return founded
  }
}
