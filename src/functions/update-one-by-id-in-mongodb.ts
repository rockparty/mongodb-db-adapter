import type {
  UpdateOneByIdFn,
  UpdateOneByIdFnArgs,
} from '@rockparty/db-adapter'
import type { MongodbUpdateOneOptions } from '@/protocols'
import type { MongoClient } from 'mongodb'

export function updateOneByIdInMongodb<
  Base = any,
  IdKey extends keyof Base & string = any,
  Collection extends string = string,
>(
  client: MongoClient,
): UpdateOneByIdFn<MongodbUpdateOneOptions, Base, IdKey, Collection> {
  return async function <T extends Base>(
    args: UpdateOneByIdFnArgs<MongodbUpdateOneOptions, T, IdKey, Collection>,
  ): Promise<T | null> {
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
