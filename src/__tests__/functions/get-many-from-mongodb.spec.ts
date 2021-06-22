import { getManyFromMongodb } from '@/functions/get-many-from-mongodb'
import { MongodbObject } from '@/protocols'
import { clone, isTruthy } from '@/utils'
import {
  expectToBeTrue,
  collectionName,
  payload,
  key,
  value,
  getManyArgs,
} from '@/__tests__/__helpers__'
import { mongodbTestHelper } from '@/__tests__/__helpers__/adapter.test-helper'

describe('GetAllFromMongodb', () => {
  const { doBeforeAll, doBeforeEach, doAfterAll, client } =
    mongodbTestHelper(collectionName)

  beforeAll(async () => await doBeforeAll())

  beforeEach(async () => await doBeforeEach())

  afterAll(async () => await doAfterAll())

  const makeSut = () => {
    return {
      sut: getManyFromMongodb(client()),
      collectionName,
      payload,
      key,
      value,
      args: getManyArgs,
    }
  }

  it('should return many', async () => {
    const { sut, collectionName, payload, args, key, value } = makeSut()

    const { ops } = await client()
      .db()
      .collection(collectionName)
      .insertOne(clone(payload))
    const inserted = ops[0]

    const fromDb = await client()
      .db()
      .collection(collectionName)
      .find({ [key]: value })
      .toArray()

    const response = await sut(args)

    const result =
      isTruthy(inserted) &&
      response.length === 1 &&
      !isTruthy((response[0] as MongodbObject<unknown>)._id) &&
      fromDb.length === 1
    expectToBeTrue(result, { printIfNotTrue: { inserted, response, fromDb } })
  })
})
