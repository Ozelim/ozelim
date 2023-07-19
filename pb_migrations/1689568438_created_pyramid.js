migrate((db) => {
  const collection = new Collection({
    "id": "dohznrx4zqairb8",
    "created": "2023-07-17 04:33:58.241Z",
    "updated": "2023-07-17 04:33:58.241Z",
    "name": "pyramid",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "mrliwfr7",
        "name": "sponsor",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": [
            "email"
          ]
        }
      },
      {
        "system": false,
        "id": "waail0fy",
        "name": "b1",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 2,
          "displayFields": [
            "email"
          ]
        }
      },
      {
        "system": false,
        "id": "eipaoazq",
        "name": "b2",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 4,
          "displayFields": [
            "email"
          ]
        }
      },
      {
        "system": false,
        "id": "5vhyvuss",
        "name": "b3",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 8,
          "displayFields": [
            "email"
          ]
        }
      },
      {
        "system": false,
        "id": "rvegqiaf",
        "name": "b4",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 16,
          "displayFields": [
            "email"
          ]
        }
      },
      {
        "system": false,
        "id": "ph7aglks",
        "name": "b5",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 32,
          "displayFields": [
            "email"
          ]
        }
      },
      {
        "system": false,
        "id": "rmpmfjxr",
        "name": "b6",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 64,
          "displayFields": [
            "email"
          ]
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
  const collection = dao.findCollectionByNameOrId("dohznrx4zqairb8");

  return dao.deleteCollection(collection);
})
