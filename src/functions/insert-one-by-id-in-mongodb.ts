import type {
  InsertOneByIdFn,
  InsertOneByIdFnArgs,
} from '@rockparty/db-adapter'
import type { MongodbInsertOneOptions, MongodbObject } from '@/protocols'
import { clone } from '@/utils'
import type { MongoClient } from 'mongodb'

export function insertOneByIdInMongodb<
  Base = any,
  IdKey extends keyof Base & string = any,
  Collection extends string = string,
>(
  client: MongoClient,
): InsertOneByIdFn<MongodbInsertOneOptions, Base, IdKey, Collection> {
  return async function <T extends Base>(
    args: InsertOneByIdFnArgs<MongodbInsertOneOptions, T, IdKey, Collection>,
  ): Promise<T> {
    const { in: collectionName, as: payload, idKey, opts } = args

    const id = payload[idKey]

    const mongodbObj: MongodbObject<T, typeof id> = Object.assign(
      {},
      clone(payload),
      {
        _id: id,
      },
    )

    await client.db().collection(collectionName).insertOne(mongodbObj, opts)

    return payload
  }
}
