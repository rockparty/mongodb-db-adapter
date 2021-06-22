import type {
  ObjectID,
  CollectionInsertOneOptions,
  FindOneOptions,
  UpdateOneOptions,
  FindOneAndDeleteOption,
} from 'mongodb'

export type MongodbObject<T, TId = ObjectID> = T & { _id?: TId }

export type MongodbInsertOneOptions = CollectionInsertOneOptions
export type MongodbGetOneOptions<T> = Omit<FindOneOptions<T>, 'projection'>
export type MongodbUpdateOneOptions = Omit<
  UpdateOneOptions,
  'returnDocument' | 'projection'
>
export type MongodbDeleteOneOptions<T> = FindOneAndDeleteOption<T>
