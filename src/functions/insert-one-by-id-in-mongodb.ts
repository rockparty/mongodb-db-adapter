import type {
  InsertOneByIdFn,
  InsertOneByIdFnArgs,
} from '@rockparty/db-adapter'
import type { MongodbInsertOneOptions, MongodbObject } from '@/protocols'
import { clone } from '@/utils'
import type { CollectionInsertOneOptions, MongoClient } from 'mongodb'

export function insertOneByIdInMongodb(
  client: MongoClient,
): InsertOneByIdFn<CollectionInsertOneOptions> {
  return async function <T>(
    args: InsertOneByIdFnArgs<T, MongodbInsertOneOptions>,
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
