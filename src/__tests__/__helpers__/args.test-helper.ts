import {
  DeleteOneByIdFnArgs,
  DeleteOneFnArgs,
  GetAllFnArgs,
  GetManyFnArgs,
  GetOneByIdFnArgs,
  GetOneFnArgs,
  InsertOneByIdFnArgs,
  InsertOneFnArgs,
  UpdateOneByIdFnArgs,
  UpdateOneFnArgs,
} from '@rockparty/db-adapter'

interface Foo {
  foo: string
}

type Collection = 'test'

export const collectionName: Collection = 'test'
export const payload: Foo = { foo: 'bar' }
export const modified: Partial<Foo> = { foo: 'foo' }
export const key: keyof Foo = 'foo'
export const value = payload[key]
export const modifiedValue = modified[key]

export const insertOneArgs: InsertOneFnArgs<undefined, Foo, Collection> = {
  in: collectionName,
  as: payload,
}

export const getOneArgs: GetOneFnArgs<undefined, Foo, Collection> = {
  from: collectionName,
  by: key,
  matching: value,
}

export const updateOneArgs: UpdateOneFnArgs<undefined, Foo, Collection> = {
  from: collectionName,
  by: key,
  matching: value,
  as: modified,
}

export const deleteOneArgs: DeleteOneFnArgs<undefined, Foo, Collection> = {
  from: collectionName,
  by: key,
  matching: value,
}

export const getAllArgs: GetAllFnArgs<undefined, Collection> = {
  from: collectionName,
}

export const getManyArgs: GetManyFnArgs<undefined, Foo, Collection> = {
  from: collectionName,
  by: key,
  matching: value,
}

export const insertOneByIdArgs: InsertOneByIdFnArgs<
  undefined,
  Foo,
  'foo',
  Collection
> = {
  in: collectionName,
  as: payload,
  idKey: key,
}

export const getOneByIdArgs: GetOneByIdFnArgs<
  undefined,
  Foo,
  'foo',
  Collection
> = {
  from: collectionName,
  id: value,
}

export const updateOneByIdArgs: UpdateOneByIdFnArgs<
  undefined,
  Foo,
  'foo',
  Collection
> = {
  from: collectionName,
  id: value,
  as: modified,
}

export const deleteOneByIdArgs: DeleteOneByIdFnArgs<
  undefined,
  Foo,
  'foo',
  Collection
> = {
  from: collectionName,
  id: value,
}
