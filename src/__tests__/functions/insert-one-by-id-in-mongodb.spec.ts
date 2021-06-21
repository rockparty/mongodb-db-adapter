import { insertOneByIdInMongodb } from '@/functions/insert-one-by-id-in-mongodb'
import { isTruthy } from '@/utils'
import {
  expectToBeTrue,
  collectionName,
  payload,
  value,
  insertOneByIdArgs,
} from '@/__tests__/__helpers__'
import { mongodbTestHelper } from '@/__tests__/__helpers__/adapter.test-helper'

describe('InsertOneByIdInMongodb', () => {
  const { doBeforeAll, doBeforeEach, doAfterAll, client } =
    mongodbTestHelper(collectionName)

  beforeAll(async () => await doBeforeAll())

  beforeEach(async () => await doBeforeEach())

  afterAll(async () => await doAfterAll())

  const makeSut = () => {
    return {
      sut: insertOneByIdInMongodb(client()),
      collectionName,
      payload,
      id: value,
      args: insertOneByIdArgs,
    }
  }

  it('should insert one', async () => {
    const { sut, collectionName, args, id } = makeSut()

    const response = await sut(args)

    const fromDb = await client()
      .db()
      .collection(collectionName)
      .findOne({ _id: id })

    const result = isTruthy(response) && isTruthy(fromDb) && fromDb._id === id
    expectToBeTrue(result, {
      printIfNotTrue: { response, id, dbId: fromDb._id },
    })
  })
})
