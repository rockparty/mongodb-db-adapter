import type {
  ObjectID,
  CollectionInsertOneOptions,
  FindOneOptions,
  UpdateOneOptions,
  FindOneAndDeleteOption,
} from 'mongodb'

export type MongodbObject<T> = T & { _id?: ObjectID }

export type MongodbInsertOneOptions = CollectionInsertOneOptions
export type MongodbGetOneOptions<T> = FindOneOptions<T>
export type MongodbUpdateOneOptions = Omit<UpdateOneOptions, 'returnDocument'>
export type MongodbDeleteOneOptions<T> = FindOneAndDeleteOption<T>
