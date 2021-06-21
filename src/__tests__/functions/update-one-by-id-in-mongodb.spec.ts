import { updateOneByIdInMongodb } from '@/functions/update-one-by-id-in-mongodb'
import { clone, equals, isTruthy, omit } from '@/utils'
import {
  expectToBeTrue,
  collectionName,
  payload,
  value,
  updateOneByIdArgs,
} from '@/__tests__/__helpers__'
import { mongodbTestHelper } from '@/__tests__/__helpers__/adapter.test-helper'

describe('UpdateOneByIdInMongodb', () => {
  const { doBeforeAll, doBeforeEach, doAfterAll, client } =
    mongodbTestHelper(collectionName)

  beforeAll(async () => await doBeforeAll())

  beforeEach(async () => await doBeforeEach())

  afterAll(async () => await doAfterAll())

  const makeSut = () => {
    return {
      sut: updateOneByIdInMongodb(client()),
      collectionName,
      payload,
      id: value,
      args: updateOneByIdArgs,
    }
  }

  it('should update one', async () => {
    const { sut, collectionName, args, payload, id } = makeSut()

    const { ops } = await client()
      .db()
      .collection(collectionName)
      .insertOne({ _id: id, ...clone(payload) })
    const inserted = ops[0]

    const response = await sut(args)

    const fromDb = await client()
      .db()
      .collection(collectionName)
      .findOne({ _id: id })

    const result =
      isTruthy(response) &&
      isTruthy(fromDb) &&
      equals(response, omit(fromDb, '_id')) &&
      fromDb._id === id
    expectToBeTrue(result, {
      printIfNotTrue: {
        payload,
        inserted,
        response,
        fromDb,
        id,
        dbId: fromDb._id,
      },
    })
  })
})
