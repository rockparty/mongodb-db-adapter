import type {
  DeleteOneByIdFn,
  DeleteOneByIdFnArgs,
} from '@rockparty/db-adapter'
import type { MongodbDeleteOneOptions } from '@/protocols'
import type { MongoClient } from 'mongodb'

export function deleteOneByIdFromMongodb(client: MongoClient): DeleteOneByIdFn {
  return async function <T>(
    args: DeleteOneByIdFnArgs<MongodbDeleteOneOptions<T>>,
  ): Promise<boolean> {
    const { from: collectionName, id, opts } = args

    const { ok } = await client
      .db()
      .collection(collectionName)
      .findOneAndDelete({ _id: id }, opts)

    return ok === 1
  }
}
