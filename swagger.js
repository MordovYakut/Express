const swaggerJSDoc = require("swagger-jsdoc");

/**
 * @swagger
 * /models:
 *  get:
 *    tags:
 *      - models
 *    summary: Retrieve all models
 *    operationId: findMod
 *    responses:
 *      '200':
 *        description: Successful operation
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Model'
 *      '404':
 *        description: No models found
 *      '500':
 *        description: Internal server error
 *  post:
 *    tags:
 *      - models
 *    summary: Create a new model
 *    operationId: insertMod
 *    requestBody:
 *      description: Request parameters
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *              modelname:
 *                type: string
 *              type:
 *                type: string
 *              object:
 *                type: string
 *              overview:
 *                type: string
 *              comment:
 *                type: string
 *            required:
 *              - name
 *              - modelname
 *              - type
 *              - object
 *              - overview
 *              - comment
 *    responses:
 *      '200':
 *        description: Successful operation
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Model'
 *      '400':
 *        description: Invalid request body
 *      '401':
 *        description: Invalid API key
 *      '500':
 *        description: Internal server error
 *    security:
 *      - apiKey: []
 * /models/{id}:
 *  get:
 *    tags:
 *      - models
 *    summary: Find model by ID
 *    operationId: findOneMod
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: ID of the model to retrieve
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: Successful operation
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Model'
 *      '404':
 *        description: No models found
 *      '500':
 *        description: Internal server error
 *  put:
 *    tags:
 *      - models
 *    summary: Change model by ID
 *    operationId: updateMod
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: ID of the model to retrieve
 *        schema:
 *          type: string
 *    requestBody:
 *      description: Request parameters
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *              modelname:
 *                type: string
 *              type:
 *                type: string
 *              object:
 *                type: string
 *              overview:
 *                type: string
 *              comment:
 *                type: string
 *            required:
 *              - name
 *              - modelname
 *              - type
 *              - object
 *              - overview
 *              - comment
 *    responses:
 *      '200':
 *        description: Successful operation
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Model'
 *      '400':
 *        description: Invalid request body
 *      '404':
 *        description: Model not found
 *      '500':
 *        description: Internal server error
 *    security:
 *      - apiKey: []
 *  delete:
 *    tags:
 *      - models
 *    summary: Delete model by ID
 *    operationId: deleteMod
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: ID of the model to retrieve
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: Model deleted successfully
 *      '401':
 *        description: Invalid API key
 *      '404':
 *        description: Model not found
 *      '500':
 *        description: Internal server error
 *    security:
 *      - apiKey: []
 * /api:
 *  post:
 *    tags:
 *      - apiKey
 *    summary: Create new apiKey
 *    operationId: postApi
 *    requestBody:
 *      description: Request parameters
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *            required:
 *              - name
 *    responses:
 *      '200':
 *        description: Successful operation
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/apiKey'
 *      '400':
 *        description: Invalid request body
 *      '500':
 *        description: Internal server error
 * /api/{id}:
 *  delete:
 *    tags:
 *      - apiKey
 *    summary: Delete ApiKey
 *    operationId: deleteApi
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: ID of the model to retrieve
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: ApiKey deleted successfully
 *      '404':
 *        description: ApiKey not found
 *      '500':
 *        description: Internal server error
 *    security:
 *      - apiKey: []
 */

const swaggerDefinition = {
  openapi: "3.0.3",
  info: {
    title: "Express Server - OpenAPI 3.0",
    version: "1.0.0",
    description: "CRUD operations for managing models",
  },
  servers: [
    {
      url: "http://127.0.0.1:3000/db",
    },
  ],
  tags: [
    {
      name: "apiKey",
      description: "Everything about apiKey",
    },
    {
      name: "models",
      description: "Everything about models",
    },
  ],
  components: {
    schemas: {
      Model: {
        type: "object",
        properties: {
          _id: {
            type: "string",
            description: "ID of the model",
            example: "6144f9a4ec72c63a1a4a54c4",
          },
          name: {
            type: "string",
            description: "Name of the human",
            example: "Pavel",
          },
          modelname: {
            type: "string",
            description: "Name of the model",
            example: "Track",
          },
          type: {
            type: "string",
            description: "Type of the model",
            example: "Car",
          },
          object: {
            type: "string",
            description: "Object itself",
            example: "Track",
          },
          overview: {
            type: "string",
            description: "Description of the model",
            example: "This is a track",
          },
          comment: {
            type: "string",
            description: "Commentary to the model",
            example: "Nice track",
          },
        },
      },
      apiKey: {
        type: "object",
        properties: {
          _id: {
            type: "string",
            description: "ApiKey",
            example: "6144f9a4ec72c63a1a4a54c4",
          },
          name: {
            type: "string",
            description: "Name of the human",
            example: "Pavel",
          },
        },
      },
    },
    securitySchemes: {
      apiKey: {
        type: "apiKey",
        name: "apiKey",
        in: "query",
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ["./*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
