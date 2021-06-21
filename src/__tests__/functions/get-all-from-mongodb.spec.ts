import { getAllFromMongodb } from '@/functions/get-all-from-mongodb'
import { clone, isTruthy } from '@/utils'
import {
  expectToBeTrue,
  collectionName,
  payload,
  getAllArgs,
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
      sut: getAllFromMongodb(client()),
      collectionName,
      payload,
      args: getAllArgs,
    }
  }

  it('should return all', async () => {
    const { sut, collectionName, payload, args } = makeSut()

    const { ops } = await client()
      .db()
      .collection(collectionName)
      .insertOne(clone(payload))
    const inserted = ops[0]

    const fromDb = await client()
      .db()
      .collection(collectionName)
      .find()
      .toArray()

    const response = await sut(args)

    const result =
      isTruthy(inserted) && response.length === 1 && fromDb.length === 1
    expectToBeTrue(result, { printIfNotTrue: { inserted, response, fromDb } })
  })
})
