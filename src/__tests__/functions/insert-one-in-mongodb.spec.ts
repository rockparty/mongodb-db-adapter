import { insertOneInMongodb } from '@/functions'
import { equals, isTruthy, omit } from '@/utils'
import {
  expectToBeTrue,
  collectionName,
  payload,
  insertOneArgs,
} from '@/__tests__/__helpers__'
import { mongodbTestHelper } from '@/__tests__/__helpers__/adapter.test-helper'

describe('InsertOneInMongodb', () => {
  const { doBeforeAll, doBeforeEach, doAfterAll, client } =
    mongodbTestHelper(collectionName)

  beforeAll(async () => await doBeforeAll())

  beforeEach(async () => await doBeforeEach())

  afterAll(async () => await doAfterAll())

  const makeSut = () => {
    return {
      sut: insertOneInMongodb(client()),
      collectionName,
      payload,
      args: insertOneArgs,
    }
  }

  it('should insert one', async () => {
    const { sut, collectionName, args } = makeSut()

    const response = await sut(args)

    const fromDb = await client()
      .db()
      .collection(collectionName)
      .findOne(response)

    const result =
      isTruthy(response) &&
      isTruthy(fromDb) &&
      equals(response, omit(fromDb, '_id'))
    expectToBeTrue(result, { printIfNotTrue: response })
  })
})
