import { deleteOneByIdFromMongodb } from '@/functions/delete-one-by-id-from-mongodb'
import { MongodbObject } from '@/protocols'
import { clone, isTruthy } from '@/utils'
import {
  expectToBeTrue,
  collectionName,
  payload,
  value,
  deleteOneByIdArgs,
} from '@/__tests__/__helpers__'
import { mongodbTestHelper } from '@/__tests__/__helpers__/adapter.test-helper'

describe('DeleteOneByIdFromMongodb', () => {
  const { doBeforeAll, doBeforeEach, doAfterAll, client } =
    mongodbTestHelper(collectionName)

  beforeAll(async () => await doBeforeAll())

  beforeEach(async () => await doBeforeEach())

  afterAll(async () => await doAfterAll())

  const makeSut = () => {
    return {
      sut: deleteOneByIdFromMongodb(client()),
      collectionName,
      payload,
      id: value,
      args: deleteOneByIdArgs,
    }
  }

  it('should delete one', async () => {
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
      response === true &&
      !isTruthy((response as MongodbObject<unknown>)._id) &&
      isTruthy(inserted) &&
      !isTruthy(fromDb)
    expectToBeTrue(result, {
      printIfNotTrue: {
        payload,
        inserted,
        response,
        fromDb,
        id,
      },
    })
  })
})
