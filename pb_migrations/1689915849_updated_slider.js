migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ifk200j89xwaa3m")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ktwnnv07",
    "name": "page",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ifk200j89xwaa3m")

  // remove
  collection.schema.removeField("ktwnnv07")

  return dao.saveCollection(collection)
})
