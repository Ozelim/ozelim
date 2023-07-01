migrate((db) => {
  const collection = new Collection({
    "id": "6zm7vioi7ekbfhq",
    "created": "2023-07-01 09:00:16.111Z",
    "updated": "2023-07-01 09:00:16.111Z",
    "name": "site",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "0ocm4aa4",
        "name": "data",
        "type": "json",
        "required": false,
        "unique": false,
        "options": {}
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("6zm7vioi7ekbfhq");

  return dao.deleteCollection(collection);
})
