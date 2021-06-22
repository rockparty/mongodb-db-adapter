import type { GetOneByIdFn, GetOneByIdFnArgs } from '@rockparty/db-adapter'
import type { MongodbGetOneOptions, MongodbObject } from '@/protocols'
import type { MongoClient } from 'mongodb'

export function getOneByIdFromMongodb<
  Base = any,
  IdKey extends keyof Base & string = any,
  Collection extends string = string,
>(
  client: MongoClient,
): GetOneByIdFn<MongodbGetOneOptions<any>, Base, IdKey, Collection> {
  return async function <T extends Base>(
    args: GetOneByIdFnArgs<MongodbGetOneOptions<T>, T, IdKey, Collection>,
  ): Promise<T | null> {
    const { from: collectionName, id, opts } = args

    const founded = await client
      .db()
      .collection(collectionName)
      .findOne<MongodbObject<T>>(
        { _id: id },
        {
          ...opts,
          projection: { _id: 0 },
        },
      )

    return founded
  }
}
