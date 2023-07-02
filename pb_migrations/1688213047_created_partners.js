migrate((db) => {
  const collection = new Collection({
    "id": "ty023348izzzjbo",
    "created": "2023-07-01 12:04:07.329Z",
    "updated": "2023-07-01 12:04:07.329Z",
    "name": "partners",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "wtiotu52",
        "name": "images",
        "type": "file",
        "required": false,
        "unique": false,
        "options": {
          "maxSelect": 99,
          "maxSize": 5242880,
          "mimeTypes": [],
          "thumbs": [],
          "protected": false
        }
      },
      {
        "system": false,
        "id": "drhvw0nz",
        "name": "name",
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
        "id": "mjtnkkmo",
        "name": "description",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
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
  const collection = dao.findCollectionByNameOrId("ty023348izzzjbo");

  return dao.deleteCollection(collection);
})
