import type {
  InsertOneAdapter,
  GetOneAdapter,
  UpdateOneAdapter,
  DeleteOneAdapter,
  GetAllAdapter,
  GetManyAdapter,
  InsertOneByIdAdapter,
  GetOneByIdAdapter,
  UpdateOneByIdAdapter,
  DeleteOneByIdAdapter,
} from '@rockparty/db-adapter'
import type {
  MongodbDeleteOneOptions,
  MongodbGetOneOptions,
  MongodbInsertOneOptions,
  MongodbUpdateOneOptions,
} from './protocols'
import {
  insertOneInMongodb,
  getOneFromMongodb,
  updateOneInMongodb,
  deleteOneFromMongodb,
  getAllFromMongodb,
  getManyFromMongodb,
  insertOneByIdInMongodb,
  getOneByIdFromMongodb,
  updateOneByIdInMongodb,
  deleteOneByIdFromMongodb,
} from './functions'
import type { MongoClientOptions } from 'mongodb'
import { MongoClient } from 'mongodb'

type MongodbDbAdapter<
  Base = any,
  IdKey extends keyof Base & string = any,
  Collection extends string = string,
> = InsertOneAdapter<MongodbInsertOneOptions, Collection> &
  GetOneAdapter<MongodbGetOneOptions<any>, Collection> &
  UpdateOneAdapter<MongodbUpdateOneOptions, Collection> &
  DeleteOneAdapter<MongodbDeleteOneOptions<any>, Collection> &
  GetAllAdapter<undefined, Collection> &
  GetManyAdapter<undefined, Collection> &
  InsertOneByIdAdapter<undefined, Base, IdKey, Collection> &
  GetOneByIdAdapter<undefined, Base, IdKey, Collection> &
  UpdateOneByIdAdapter<undefined, Base, IdKey, Collection> &
  DeleteOneByIdAdapter<undefined, Base, IdKey, Collection>

export async function mongodbDbAdapter<
  Base = any,
  IdKey extends keyof Base & string = any,
  Collection extends string = string,
>(opts: {
  uri: string
  clientOpts?: MongoClientOptions
}): Promise<MongodbDbAdapter<Base, IdKey, Collection>> {
  const { uri, clientOpts } = opts

  const client = await MongoClient.connect(uri, clientOpts)

  return {
    insertOne: insertOneInMongodb(client),
    getOne: getOneFromMongodb(client),
    updateOne: updateOneInMongodb(client),
    deleteOne: deleteOneFromMongodb(client),
    getAll: getAllFromMongodb(client),
    getMany: getManyFromMongodb(client),
    insertOneById: insertOneByIdInMongodb(client),
    getOneById: getOneByIdFromMongodb(client),
    updateOneById: updateOneByIdInMongodb(client),
    deleteOneById: deleteOneByIdFromMongodb(client),
  }
}
