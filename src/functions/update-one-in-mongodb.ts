import type { UpdateOneFn, UpdateOneFnArgs } from '@rockparty/db-adapter'
import type { MongodbUpdateOneOptions } from '@/protocols'
import type { MongoClient } from 'mongodb'

export function updateOneInMongodb<Collection extends string = string>(
  client: MongoClient,
): UpdateOneFn<MongodbUpdateOneOptions, Collection> {
  return async function <T>(
    args: UpdateOneFnArgs<MongodbUpdateOneOptions, T, Collection>,
  ): Promise<T | null> {
    const {
      from: collectionName,
      by: key,
      matching: value,
      as: payload,
      opts,
    } = args

    const { ok, value: updated } = await client
      .db()
      .collection(collectionName)
      .findOneAndUpdate(
        { [key]: value },
        { $set: payload },
        {
          ...opts,
          returnDocument: 'after',
          projection: { _id: 0 },
        },
      )

    if (ok !== 1) return null

    return updated
  }
}
