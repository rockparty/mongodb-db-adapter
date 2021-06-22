import { getOneByIdFromMongodb } from '@/functions/get-one-by-id-from-mongodb'
import { MongodbObject } from '@/protocols'
import { clone, equals, isTruthy, omit } from '@/utils'
import {
  expectToBeTrue,
  collectionName,
  payload,
  value,
  getOneByIdArgs,
} from '@/__tests__/__helpers__'
import { mongodbTestHelper } from '@/__tests__/__helpers__/adapter.test-helper'

describe('GetOneByIdFromMongodb', () => {
  const { doBeforeAll, doBeforeEach, doAfterAll, client } =
    mongodbTestHelper(collectionName)

  beforeAll(async () => await doBeforeAll())

  beforeEach(async () => await doBeforeEach())

  afterAll(async () => await doAfterAll())

  const makeSut = () => {
    return {
      sut: getOneByIdFromMongodb(client()),
      collectionName,
      payload,
      id: value,
      args: getOneByIdArgs,
    }
  }

  it('should return one', async () => {
    const { sut, collectionName, payload, id, args } = makeSut()

    const { ops } = await client()
      .db()
      .collection(collectionName)
      .insertOne({ _id: id, ...clone(payload) })
    const inserted = ops[0]

    const fromDb = await client()
      .db()
      .collection(collectionName)
      .findOne({ _id: id })

    const response = await sut(args)

    const result =
      isTruthy(response) &&
      !isTruthy((response as MongodbObject<unknown>)._id) &&
      isTruthy(fromDb) &&
      equals(payload, omit(inserted, '_id')) &&
      fromDb._id === id
    expectToBeTrue(result, {
      printIfNotTrue: { inserted, response, fromDb, id, dbId: fromDb._id },
    })
  })
})
