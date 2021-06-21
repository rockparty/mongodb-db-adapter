import { deleteOneFromMongodb } from '@/functions'
import { clone, isTruthy } from '@/utils'
import {
  expectToBeTrue,
  collectionName,
  payload,
  modified,
  deleteOneArgs,
} from '@/__tests__/__helpers__'
import { mongodbTestHelper } from '@/__tests__/__helpers__/adapter.test-helper'

describe('DeleteOneFromMongodb', () => {
  const { doBeforeAll, doBeforeEach, doAfterAll, client } =
    mongodbTestHelper(collectionName)

  beforeAll(async () => await doBeforeAll())

  beforeEach(async () => await doBeforeEach())

  afterAll(async () => await doAfterAll())

  const makeSut = () => {
    return {
      sut: deleteOneFromMongodb(client()),
      collectionName,
      payload,
      modified,
      args: deleteOneArgs,
    }
  }

  it('should delete one', async () => {
    const { sut, collectionName, args, payload } = makeSut()

    const { ops } = await client()
      .db()
      .collection(collectionName)
      .insertOne(clone(payload))
    const inserted = ops[0]

    const response = await sut(args)

    const fromDb = await client()
      .db()
      .collection(collectionName)
      .findOne(payload)

    const result = response === true && isTruthy(inserted) && !isTruthy(fromDb)
    expectToBeTrue(result, {
      printIfNotTrue: { payload, inserted, response, fromDb },
    })
  })
})
