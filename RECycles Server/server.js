// server.js

const express = require('express');
const server = express();

const body_parser = require("body-parser");

server.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// parse JSON (application/json content-type)
server.use(body_parser.json());

const port = 4000;

// << db setup >>
const db = require("./db");
const dbName = "WebshopData";
const collectionName = "products";

db.initialize(dbName, collectionName, function (dbCollection) { // successCallback
    // get all items
    dbCollection.find().toArray(function (err, result) {
        if (err) throw err;
      console.log(result);

        // << return response to client >>
    });

    // << db CRUD routes >>
    server.post("/items", (request, response) => {
        const item = request.body;
        dbCollection.insertOne(item, (error, result) => { // callback of insertOne
            if (error) throw error;
            // return updated list
            dbCollection.find().toArray((_error, _result) => { // callback of find
                if (_error) throw _error;
                response.json(_result);
            });
        });
    });

    server.get("/items/:id", (request, response) => {
        const itemId = request.params.id;

        dbCollection.findOne({ id: itemId }, (error, result) => {
            if (error) throw error;
            // return item
            response.json(result);
        });
    });

    server.get("/items", (request, response) => {
        // return updated list
        dbCollection.find().toArray((error, result) => {
            if (error) throw error;
            response.json(result);
            console.log(result);
        });
    });

    server.put("/items/:id", (request, response) => {
        const itemId = request.params.id;
        const item = request.body;
        console.log("Editing item: ", itemId, " to be ", item);

        dbCollection.updateOne({ id: itemId }, { $set: item }, (error, result) => {
            if (error) throw error;
            // send back entire updated list, to make sure frontend data is up-to-date
            dbCollection.find().toArray(function (_error, _result) {
                if (_error) throw _error;
                response.json(_result);
            });
        });
    });

    server.delete("/items/:id", (request, response) => {
        const itemId = request.params.id;
        console.log("Delete item with id: ", itemId);

        dbCollection.deleteOne({ id: itemId }, function (error, result) {
            if (error) throw error;
            // send back entire updated list after successful request
            dbCollection.find().toArray(function (_error, _result) {
                if (_error) throw _error;
                response.json(_result);
            });
        });
    });
}, function (err) { // failureCallback
    throw (err);
});


const dbName1 = "Login";
const collectionName1 = "User";

db.initialize(dbName1, collectionName1, function (dbCollection1) { // successCallback
    // get all items
    dbCollection1.find().toArray(function (err, result) {
        if (err) throw err;
       // console.log(result);

        // << return response to client >>
    });

    // << db CRUD routes >>
    server.post("/Users", (request, response) => {
        const item = request.body;
        dbCollection1.insertOne(item, (error, result) => { // callback of insertOne
            if (error) throw error;
            // return updated list
            dbCollection1.find().toArray((_error, _result) => { // callback of find
                if (_error) throw _error;
                response.json(_result);
            });
        });
    });

    server.get("/Users/:id", (request, response) => {
        const itemId = request.params.id;

        dbCollection1.findOne({ id: itemId }, (error, result) => {
            if (error) throw error;
            // return item
            response.json(result);
        });
    });

    server.get("/Users", (request, response) => {
        // return updated list
        dbCollection1.find().toArray((error, result) => {
            if (error) throw error;
            response.json(result);
            console.log(result);
        });
    });

    server.put("/Users/:id", (request, response) => {
        const itemId = request.params.id;
        const item = request.body;
        console.log("Editing User: ", itemId, " to be ", item);

        dbCollection1.updateOne({ id: itemId }, { $set: item }, (error, result) => {
            if (error) throw error;
            // send back entire updated list, to make sure frontend data is up-to-date
            dbCollection1.find().toArray(function (_error, _result) {
                if (_error) throw _error;
                response.json(_result);
            });
        });
    });

    server.delete("/Users/:id", (request, response) => {
        const itemId = request.params.id;
        console.log("Delete User with id: ", itemId);

        dbCollection1.deleteOne({ id: itemId }, function (error, result) {
            if (error) throw error;
            // send back entire updated list after successful request
            dbCollection1.find().toArray(function (_error, _result) {
                if (_error) throw _error;
                response.json(_result);
            });
        });
    });
}, function (err) { // failureCallback
    throw (err);
});

server.listen(port, () => {
    console.log(`Server listening at ${port}`);
});