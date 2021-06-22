import type {
  DeleteOneByIdFn,
  DeleteOneByIdFnArgs,
} from '@rockparty/db-adapter'
import type { MongodbDeleteOneOptions } from '@/protocols'
import type { MongoClient } from 'mongodb'

export function deleteOneByIdFromMongodb<
  Base = any,
  IdKey extends keyof Base & string = any,
  Collection extends string = string,
>(
  client: MongoClient,
): DeleteOneByIdFn<MongodbDeleteOneOptions<any>, Base, IdKey, Collection> {
  return async function <T extends Base>(
    args: DeleteOneByIdFnArgs<MongodbDeleteOneOptions<T>, T, IdKey, Collection>,
  ): Promise<boolean> {
    const { from: collectionName, id, opts } = args

    const { ok } = await client
      .db()
      .collection(collectionName)
      .findOneAndDelete({ _id: id }, opts)

    return ok === 1
  }
}
