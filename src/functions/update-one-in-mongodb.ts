import type { UpdateOneFn, UpdateOneFnArgs } from '@rockparty/db-adapter'
import type { MongodbUpdateOneOptions } from '@/protocols'
import type { MongoClient } from 'mongodb'

export function updateOneInMongodb(client: MongoClient): UpdateOneFn {
  return async function <T, U>(
    args: UpdateOneFnArgs<T, U, MongodbUpdateOneOptions>,
  ): Promise<(T & U) | null> {
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
