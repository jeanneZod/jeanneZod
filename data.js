module.exports = function () { 

        var express = require('express');
        var mongodb = require('mongodb');
        var app = express();
        var assert = require('assert');
        var MongoClient = require('mongodb').MongoClient;
        var bodyParser = require('body-parser');
        var ObjectId = require('mongodb').ObjectID;
        var fs = require('fs');
        var gfs;
        var Grid = require('gridfs-stream');
        var db;
        var jwt = require("jsonwebtoken");
        var APP_SECRET = "admin"; 
        var user_secret = "user";

    // Add BodyParser for express

    app.use(bodyParser.json({limit: '50mb'}));
    app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
    // Add headers
    app.use(function (req, res, next) {

        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Auth-Token,X-Requested-With,content-type, content-type/json,image/*, Authorization');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);
       
        // Pass to next layer of middleware
        next();
    });
    var uri = "mongodb://localhost:27017";
    
    
        // Initialize connection once
    var db = new mongodb.Db('zodiaqueDB', new mongodb.Server("127.0.0.1", 27017));
    
    MongoClient.connect(uri, function (err, database) {
        if (err) throw err;

        db = database.db('zodiaqueDB');

        gfs = Grid(db, mongodb);

            // Start the application after the database connection is ready
            app.listen(3500);
            console.log('connected');
        
      //  source.pipe(target);

    });
    //


    app.get("/products",  function (req, res) {
           db.collection("products").find({}).toArray(function (err, prods) {
                return res.jsonp(prods);
            });
    });

    app.get("/clients", function (req, res) {
            db.collection("clients").find({}).toArray(function (err, cli) {
                return res.jsonp(cli);
                
                
            });
    });
    app.get("/products/:id",  function (req, res) {
        db.collection("products").findOne({ "_id": ObjectId(req.params.id) }, function (err, prod) {

            if (err) return res.status(400).send();
            if (prod != null) {
                return res.json(prod);
            } else {
                return false;
            }

        });
    });
    
    app.post("/login", function (req, res) {
        db.collection("clients").findOne({ email: req.body.email, password: req.body.pass}, function (err, user) {

            if (err) return res.status(400).send();
           
            if (user != null) {
                var token = jwt.sign({ data: req.body.email, expiresIn: "2h" }, user_secret);
                var success = res.jsonp({ success: true, token: token });
                
            } else {
                res.json({ success: false });
            }

            return success;

        });
        
    });

    app.post("/loginAdmin", function (req, res) {
        db.collection("clients").findOne({ email: req.body.email, password: req.body.pass, access: true}, function (err, user) {
            
            if (err) return res.status(400).send();
            if (user != null){
                var token = jwt.sign({ data: req.body.email, expiresIn: "2h" }, APP_SECRET);
                var success = res.jsonp({ success: true, token: token });  
            } else {
                res.json({ success: false });
            } 
            return success;
        });

    });

    
    app.post("/clients", function (req, res) {
            db.collection("clients").insertOne(req.body , function (err, user) {

                if (err) return res.status(400).send();
              
            });
    });
    app.put("/clients/:_id", function (req, res) {
        db.collection("clients").updateOne({ "_id": ObjectId(req.body._id) },
            {$set: {
                name:req.body.name,
                surname:req.body.surname,
                address:req.body.address,
                city:req.body.city,
                zip:req.body.zip,
                country:req.body.country
            }
            },false, function (err, user) {

           if (err) return res.status(400).send();
              return res.json(user);

        });
    });
    app.get("/clients/:email", function (req, res) {
        var client;
        db.collection("clients").findOne({ "email": req.params.email }, function (err, user) {

                if (err) return res.status(400).send();
                if (user != null){
                    return res.json(user);
                } else {
                    client = undefined;
                    return res.json(user);
                }

            });
    });
    
    app.post("/orders", function (req, res) {
        db.collection("orders").insertOne(req.body, function (err, ord) {

            if (err) return res.status(400).send();
            var order = res.jsonp(ord)

        });
    });
    app.get("/orders", function (req, res) {

        db.collection("orders").find({}).toArray(function (err, ord) {
            var orders = res.json(ord);
            return orders;

        });
    });
    app.get("/orders/:id", function (req, res) {
        var client;
        db.collection("orders").findOne({ "_id": ObjectId(req.params.id) }, function (err, ord) {

            if (err) return res.status(400).send();
                return res.json(ord);
        });
    });
    app.put("/orders/:id", function (req, res) {
        db.collection("orders").updateOne({ "_id": ObjectId(req.body._id) },
            {
                $set: {
                    shipped: req.body.shipped,
                    payed:req.body.payed,
                    payement:req.body.payement,
                    modified:req.body.modified
                },
            }, false, function (err, order) {

                if (err) return res.status(400).send();
                   return res.json(order);
            });
    });

    app.get("/clientsOrders/:id", function(req, res){
        db.collection("orders").find({ "client._id": req.params.id}).toArray(function (err, orders) {
           if (err) return res.status(400).send();
           if(orders !=null){
               var ords = res.jsonp(orders);
              return ords;
           }
        });
        
    })
    app.get("/products/:id", function (req, res) {
        db.collection("products").findOne({ "_id": ObjectId(req.params.id) }, function (err, prod) {

            if (err) return res.status(400).send();
            return res.json(prod);
        });
    });
    app.post("/photos/:name",function(req, res) {
        var fileId = new mongodb.ObjectId();
        db.collection("fs.files").findOne({filename:req.params.name}, function (err, item) {
            if (item == null){
                var target = gfs.createWriteStream({
                    _id: fileId,
                    filename: req.params.name,
                    mode: 'w',
                    content_type: 'binary/octet-stream'
                })
                fs.createReadStream(`src/assets/pictures/${req.params.name}`).pipe(target);
                res.status(200).send(true);
                 //res.send();
            } else {
                res.json(req.params.name)
            }
           
        });
        

    })
    app.get('/photos/:name',function(req,res){
        db.collection("fs.files").findOne({filename:req.params.name}, function (err, item) {
            /* res.writeHead(200, { 'Content-Type': 'image/*',
                "Content-Disposition": "inline;filename=" + item.filename });
            */
            if(item != null) {
                var readstream = gfs.createReadStream({
                    filename: item.filename
                 });
                readstream.on('data', function (data) {
                    // We got a buffer of data...
                  
                   var buf2 = new Buffer(data).toString('base64'); 
                   res.send(buf2.toString());
                  });
                  
            }
                
        });
    })
    app.get("/photos", function (req, res) {

        db.collection("db.files").find({}).toArray(function (err, photo) {
            var clients = res.jsonp(photo);
            return clients;

        });
    });
    app.put("/products/:id",  function (req, res) {
        db.collection("products").updateOne({ "_id": ObjectId(req.body._id) },
            {
                $set: {
                    name: req.body.name,
                    category: req.body.category,
                    description: req.body.description,
                    price: req.body.price,
                    images: req.body.images,
                    image1:req.body.image1,
                    available: req.body.available
                },
            }, false, function (err, product) {

                if (err) return res.status(400).send();
                return res.json(product);
            });
    });
    app.post("/products", function (req, res) {
        db.collection("products").findOne({name: req.body.name} , function (err, found) {
            if (found != null){
                res.send(false);
            }else{
                db.collection("products").insertOne(req.body , function (err, product) {

                    if (err) return res.status(400).send();
                    var newProd = res.jsonp(product)
                });
            }

        });
        
    });


    app.delete("/products/:id", function (req, res) {
        db.collection("products").deleteOne({_id: ObjectId(req.params.id)} , function (err, prod) {
            if (err) return res.status(400).send();
            res.json(true);

        });
        
    });
    }