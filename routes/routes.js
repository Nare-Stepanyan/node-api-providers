const express = require("express");
const providerController = require("./../controllers/provider.controller");
const clientController = require("./../controllers/client.controller");
const router = express.Router();
const cors = require("cors");

// let options = {
//   //origin: CLIENT_HOST,
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   preflightContinue: false,
//   optionsSuccessStatus: 204,
//   origin: function (origin, callback) {
//     // db.loadOrigins is an example call to load
//     // a list of origins from a backing database
//     db.loadOrigins(function (error, origins) {
//       callback(error, origins);
//     });
//   },
// };

var corsOptionsDelegate = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", CLIENT_HOST);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.header("Access-Control-Allow-Credentials", true);
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  // next();
};

/**
 *  @swagger
 *      components:
 *          schemas:
 *              Clients:
 *                  type: object
 *                  properties:
 *                      _id:
 *                          type: string
 *                          description: The auto-generated id of the client.
 *                      name:
 *                          type: string
 *                          required: true
 *                          description: The name of the client.
 *                      email:
 *                          type: string
 *                          required: true
 *                          description: Email of the client.
 *                      phone:
 *                          type: integer
 *                          required: true
 *                          description: Phone number of the client.
 *                      providers:
 *                          type: array
 *                          items:
 *                              type: string
 *
 */

/**
 *  @swagger
 *      components:
 *          schemas:
 *              Providers:
 *                  type: object
 *                  properties:
 *                      _id:
 *                          type: string
 *                          description: The auto-generated id of the provider.
 *                      name:
 *                          type: string
 *                          required: true
 *                          description: The name of the provider.
 *
 */

/**
 * @swagger
 * tags:
 *  name: Clients
 *  description: Client-serving-API-s
 */

/**
 * @swagger
 * tags:
 *  name: Providers
 *  description: Providers-serving-API-s
 */

/**
 *  @swagger
 *   /client:
 *      get:
 *          summary: Returns a list of clients
 *          tags: [Clients]
 *          description: Get all clients
 *          responses:
 *              200:
 *                  description: The list of clients
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: "#/components/schemas/Clients"
 *
 */

router.get("/client", cors(), clientController.get);

/**
 * @swagger
 *  /client:
 *      post:
 *          summary: Create a new client
 *          tags: [Clients]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#components/schemas/Clients"
 *          responses:
 *              200:
 *                  description: The client was successfully created
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#components/schemas/Clients"
 *              500:
 *                  description: Server error
 */

router.post("/client", cors(corsOptionsDelegate), clientController.create);

/**
 * @swagger
 *  /client/{id}:
 *      put:
 *          summary: Update the client by id
 *          tags: [Clients]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                   type: string
 *                required: true
 *                description: The client id
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#components/schemas/Clients"
 *          responses:
 *              200:
 *                  description: The client was updated
 *                  content:
 *                      application/json:
 *                          schema:
 *                               $ref: "#components/schemas/Clients"
 *              404:
 *                  description: The client was not found
 *              500:
 *                  description: Server error
 *
 */

router.put("/client/:id", cors(corsOptionsDelegate), clientController.update);

/**
 * @swagger
 *  /client/{id}:
 *      delete:
 *          summary: Delete the client by id
 *          tags: [Clients]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                      type: string
 *                required: true
 *                description: The client id
 *          responses:
 *              200:
 *                  description: The client was deleted
 *              404:
 *                  description: The client was not found
 *              500:
 *                  description: Server error
 *
 */

router.delete("/client/:id", cors(), clientController.delete);

/**
 * @swagger
 * /provider:
 *      get:
 *          summary: Returns a list of providers
 *          tags: [Providers]
 *          description: Get all providers
 *          produces:
 *          - application/json
 *          responses:
 *              200:
 *                  description: The list of providers
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: "#components/schemas/Providers"
 *
 */

router.get("/provider", cors(), providerController.get);

/**
 * @swagger
 *  /provider:
 *      post:
 *          summary: Create a new provider
 *          tags: [Providers]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#components/schemas/Providers"
 *          responses:
 *              200:
 *                  description: The provider was successfully created
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#components/schemas/Providers"
 *              500:
 *                  description: Server error
 */

router.post("/provider", cors(corsOptionsDelegate), providerController.create);

/**
 * @swagger
 *  /provider/{id}:
 *      put:
 *          summary: Update the provider by id
 *          tags: [Providers]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                   type: string
 *                required: true
 *                description: The provider id
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#components/schemas/Providers"
 *          responses:
 *              200:
 *                  description: The provider was updated
 *                  content:
 *                      application/json:
 *                          schema:
 *                               $ref: "#components/schemas/Providers"
 *              404:
 *                  description: The provider was not found
 *              500:
 *                  description: Server error
 *
 */

router.put("/provider/:id", cors(), providerController.update);

/**
 * @swagger
 *  /provider/{id}:
 *      delete:
 *          summary: Delete the provider by id
 *          tags: [Providers]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                      type: string
 *                required: true
 *                description: The provider id
 *          responses:
 *              200:
 *                  description: The provider was deleted
 *              404:
 *                  description: The provider was not found
 *              500:
 *                  description: Server error
 *
 */

router.delete("/provider/:id", cors(), providerController.delete);

module.exports = router;
