import type { InsertOneFn, InsertOneFnArgs } from '@rockparty/db-adapter'
import type { MongodbInsertOneOptions } from '@/protocols'
import { clone } from '@/utils'
import type { MongoClient } from 'mongodb'

export function insertOneInMongodb<Collection extends string = string>(
  client: MongoClient,
): InsertOneFn<MongodbInsertOneOptions, Collection> {
  return async function <T>(
    args: InsertOneFnArgs<MongodbInsertOneOptions, T, Collection>,
  ): Promise<T> {
    const { in: collectionName, as: payload, opts } = args

    await client.db().collection(collectionName).insertOne(clone(payload), opts)

    return payload
  }
}
