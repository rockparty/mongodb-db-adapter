import { updateOneInMongodb } from '@/functions'
import { clone, equals, isTruthy, omit } from '@/utils'
import {
  expectToBeTrue,
  collectionName,
  payload,
  modified,
  updateOneArgs,
} from '@/__tests__/__helpers__'
import { mongodbTestHelper } from '@/__tests__/__helpers__/adapter.test-helper'

describe('UpdateOneInMongodb', () => {
  const { doBeforeAll, doBeforeEach, doAfterAll, client } =
    mongodbTestHelper(collectionName)

  beforeAll(async () => await doBeforeAll())

  beforeEach(async () => await doBeforeEach())

  afterAll(async () => await doAfterAll())

  const makeSut = () => {
    return {
      sut: updateOneInMongodb(client()),
      collectionName,
      payload,
      modified,
      args: updateOneArgs,
    }
  }

  it('should update one', async () => {
    const { sut, collectionName, args, payload, modified } = makeSut()

    const { ops } = await client()
      .db()
      .collection(collectionName)
      .insertOne(clone(payload))
    const inserted = ops[0]

    const response = await sut(args)

    const fromDb = await client()
      .db()
      .collection(collectionName)
      .findOne(modified)

    const result =
      isTruthy(response) &&
      isTruthy(fromDb) &&
      equals(response, omit(fromDb, '_id'))
    expectToBeTrue(result, {
      printIfNotTrue: { payload, inserted, response, fromDb },
    })
  })
})
