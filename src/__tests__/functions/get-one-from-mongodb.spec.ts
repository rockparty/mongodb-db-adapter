import { getOneFromMongodb } from '@/functions/get-one-from-mongodb'
import { clone, equals, isTruthy, omit } from '@/utils'
import {
  expectToBeTrue,
  collectionName,
  payload,
  getOneArgs,
} from '@/__tests__/__helpers__'
import { mongodbTestHelper } from '@/__tests__/__helpers__/adapter.test-helper'

describe('GetOneFromMongodb', () => {
  const { doBeforeAll, doBeforeEach, doAfterAll, client } =
    mongodbTestHelper(collectionName)

  beforeAll(async () => await doBeforeAll())

  beforeEach(async () => await doBeforeEach())

  afterAll(async () => await doAfterAll())

  const makeSut = () => {
    return {
      sut: getOneFromMongodb(client()),
      collectionName,
      payload,
      args: getOneArgs,
    }
  }

  it('should return falsy', async () => {
    const { sut, args, collectionName, payload } = makeSut()

    const fromDb = await client()
      .db()
      .collection(collectionName)
      .findOne(payload)

    const response = await sut(args)

    const result = !isTruthy(response) && !isTruthy(fromDb)
    expectToBeTrue(result, { printIfNotTrue: response })
  })

  it('should return truthy', async () => {
    const { sut, collectionName, payload, args } = makeSut()

    const { ops } = await client()
      .db()
      .collection(collectionName)
      .insertOne(clone(payload))
    const inserted = ops[0]

    const fromDb = await client()
      .db()
      .collection(collectionName)
      .findOne(payload)

    const response = await sut(args)

    const result =
      isTruthy(response) &&
      isTruthy(fromDb) &&
      equals(payload, omit(inserted, '_id'))
    expectToBeTrue(result, { printIfNotTrue: { inserted, response, fromDb } })
  })
})
