import type {
  UpdateOneByIdFn,
  UpdateOneByIdFnArgs,
} from '@rockparty/db-adapter'
import type { MongodbUpdateOneOptions } from '@/protocols'
import type { MongoClient } from 'mongodb'

export function updateOneByIdInMongodb(client: MongoClient): UpdateOneByIdFn {
  return async function <T, U>(
    args: UpdateOneByIdFnArgs<T, U, MongodbUpdateOneOptions>,
  ): Promise<(T & U) | null> {
    const { from: collectionName, id, as: payload, opts } = args

    const { ok, value: updated } = await client
      .db()
      .collection(collectionName)
      .findOneAndUpdate(
        { _id: id },
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
