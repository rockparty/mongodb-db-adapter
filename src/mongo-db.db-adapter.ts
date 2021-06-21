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

type MongodbDbAdapter = InsertOneAdapter<MongodbInsertOneOptions> &
  GetOneAdapter<MongodbGetOneOptions<unknown>> &
  UpdateOneAdapter<MongodbUpdateOneOptions> &
  DeleteOneAdapter<MongodbDeleteOneOptions<unknown>> &
  GetAllAdapter &
  GetManyAdapter &
  InsertOneByIdAdapter &
  GetOneByIdAdapter &
  UpdateOneByIdAdapter &
  DeleteOneByIdAdapter

export async function mongodbDbAdapter(opts: {
  uri: string
  clientOpts?: MongoClientOptions
}): Promise<MongodbDbAdapter> {
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
