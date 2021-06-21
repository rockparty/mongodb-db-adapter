# Mongodb database adapter

## Mongodb database adapter for javascript/typescript

### Requirements

Node.js

### Install

You can install '@rockparty/mongodb-db-adapter' by entering this command

```
npm install @rockparty/mongodb-db-adapter
```

### Example

```ts
import mongodbDbAdapter from '@rockparty/mongodb-db-adapter'

mongodbDbAdapter({
  uri: '<mongo-db-uri>',
  clientOpts: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
}).then(async (db) => {
  const inserted = await db.insertOne({
    in: 'test',
    as: {
      foo: 'bar',
    },
  })

  const all = await db.getAll({
    from: 'test',
  })

  console.log(inserted, all) // { foo: 'bar' } [ { foo: 'bar' } ]
})
```

## License

Licensed under [MIT](./LICENSE).
