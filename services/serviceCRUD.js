const ObjectId = require("mongodb").ObjectId;
const db = require("../configs/config");
const crypto = require("crypto");

async function checkApi(req, res, next) {
  try {
    const collection = await db.collection("apikey");
    const apiKey = req.query.apiKey;
    const findApi = await collection.findOne({ _id: apiKey });
    if (findApi) {
      next();
    } else {
      const error = new Error("Invalid API key");
      error.statusCode = 401;
      throw error;
    }
  } catch (err) {
    next(err);
  }
}

async function newDate(body) {
  const collection = await db.collection("models");
  const currentDate = new Date();
  body.created_at = currentDate;
  body.updated_at = currentDate;
  await collection.insertOne(body);
}

async function insertMod(req, res, next) {
  try {
    const collection = await db.collection("models");
    if (req.headers["content-type"] === "application/json") {
      body = req.body;
      if (
        !body.name ||
        !body.modelname ||
        !body.type ||
        !body.object ||
        !body.overview ||
        !body.comment ||
        body === "" ||
        Object.keys(body).length !== 6
      ) {
        const error = new Error("Invalid request body");
        error.statusCode = 400;
        throw error;
      } else {
        await newDate(body);
        const find = await collection.find().toArray();
        res.send(find);
      }
    } else {
      const error = new Error("Invalid content-type");
      error.statusCode = 400;
      throw error;
    }
  } catch (err) {
    next(err);
  }
}

async function updateMod(req, res, next) {
  try {
    const collection = await db.collection("models");
    if (req.headers["content-type"] === "application/json") {
      body = req.body;
      if (
        !body.name ||
        !body.modelname ||
        !body.type ||
        !body.object ||
        !body.overview ||
        !body.comment ||
        body === "" ||
        Object.keys(body).length !== 6
      ) {
        const error = new Error("Invalid request body");
        error.statusCode = 400;
        throw error;
      } else {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const updateDoc = {
          $set: {
            name: body.name,
            modelname: body.modelname,
            type: body.type,
            object: body.object,
            overview: body.overview,
            comment: body.comment,
            updated_at: new Date(),
          },
        };
        const result = await collection.updateOne(filter, updateDoc);
        if (result.modifiedCount === 0) {
          const error = new Error(`Object with id ${id} not found`);
          error.statusCode = 404;
          throw error;
        } else {
          const find = await collection.find().toArray();
          res.send(find);
        }
      }
    } else {
      const error = new Error("Invalid content type");
      error.statusCode = 400;
      throw error;
    }
  } catch (err) {
    next(err);
  }
}

async function deleteMod(req, res, next) {
  try {
    const collection = await db.collection("models");
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const foundObject = await collection.findOne(filter);
    if (!foundObject) {
      const error = new Error(`Object with id: "${id}" not found`);
      error.statusCode = 404;
      throw error;
    } else {
      await collection.deleteOne(filter);
      res.send(`Object with id: "${id}" deleted successfully`);
    }
  } catch (err) {
    next(err);
  }
}

async function newApi(body) {
  try {
    const collection = await db.collection("apikey");
    const newapikey = crypto.randomBytes(8).toString("hex");
    if (!body || Object.keys(body).length === 0) {
      const error = new Error("Request body cannot be empty");
      error.status = 404;
      throw error;
    } else {
      body._id = newapikey;
      await collection.insertOne(body);
      const findApi = await collection.findOne({ _id: newapikey });
      return findApi;
    }
  } catch (err) {
    throw err;
  }
}

async function postApi(req, res, next) {
  try {
    if (req.headers["content-type"] === "application/json") {
      const body = req.body;
      if (!body.name || body.name === "" || Object.keys(body).length !== 1) {
        const error = new Error("Invalid request body");
        error.statusCode = 400;
        throw error;
      } else {
        const findApi = await newApi(body);
        res.send(findApi);
      }
    } else {
      const error = new Error("Invalid content type");
      error.statusCode = 400;
      throw error;
    }
  } catch (err) {
    next(err);
  }
}

async function deleteApi(req, res, next) {
  try {
    const collection = await db.collection("apikey");
    const apikey = req.params.id;
    const filter = { _id: apikey };
    const foundObject = await collection.findOne(filter);
    if (!foundObject) {
      const error = new Error(`ApiKey "${id}" not found`);
      error.statusCode = 404;
      throw error;
    } else {
      await collection.deleteOne(filter);
      res.send(`ApiKey "${apikey}" deleted successfully`);
    }
  } catch (err) {
    next(err);
  }
}

async function findMod(req, res, next) {
  try {
    const collection = await db.collection("models");
    const findAll = await collection
      .find({}, { projection: { _id: 1, name: 1 } })
      .toArray();
    if (findAll === 0) {
      const error = new Error("No models found");
      error.statusCode = 404;
      throw error;
    } else {
      res.send(findAll);
    }
  } catch (err) {
    next(err);
  }
}

async function findOneMod(req, res, next) {
  try {
    const collection = await db.collection("models");
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const foundObject = await collection.findOne(filter);
    if (!foundObject) {
      const error = new Error("No models found");
      error.statusCode = 404;
      throw error;
    } else {
      res.send(foundObject);
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  postApi,
  checkApi,
  insertMod,
  updateMod,
  deleteMod,
  findMod,
  findOneMod,
  deleteApi,
};
