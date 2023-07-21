migrate((db) => {
  const collection = new Collection({
    "id": "7e2zxwmzmnxm2ai",
    "created": "2023-07-21 05:05:20.779Z",
    "updated": "2023-07-21 05:05:20.779Z",
    "name": "text",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "kg5wmfdz",
        "name": "page",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "ux1fqr2m",
        "name": "headings",
        "type": "json",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "rtos09sw",
        "name": "text",
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
  const collection = dao.findCollectionByNameOrId("7e2zxwmzmnxm2ai");

  return dao.deleteCollection(collection);
})
