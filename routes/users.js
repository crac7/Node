var express = require('express');
var router = express.Router();
////Cliente 



router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('user');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

/*
 * POST to adduser.
 */
router.post('/adduser', function(req, res) {
    var db = req.db;
    var collection = db.get('user');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});


router.post('/updateuser/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('user');
     var udpatecollection=req.params.id;
    collection.update({ '_id' :udpatecollection}, req.body, function(err) {
    //collection.insert(req.body)
    console.log("lo encontro"+req.params.id);
    //collection.insert(req.body);           
    res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    
    });
});/*
router.post('/updatestudent/:id', function(req, res) {
    var db = req.db;
    var studentToUpdate=req.params.id;
    console.log("llego"+req.params.id);
    db.collection('user').update({id:studentToUpdate},req.body, function(err, result){

        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});*/
 
router.delete('/deleteuser/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('user');
    var userToDelete = req.params.id;
    collection.remove({ '_id' : userToDelete }, function(err) {
        console.log("lo encontro"+req.params.id);
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});



//Nutricionista
/*
 * GET userlist.
 */
router.get('/NutriList', function(req, res) {
    var db = req.db;
    var collection = db.get('userNutri');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

/*
 * POST to adduser.
 */
router.post('/addNutri', function(req, res) {
    var db = req.db;
    var collection = db.get('userNutri');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});


router.post('/updateNutri/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('userNutri');
     var udpatecollection=req.params.id;
    collection.update({ '_id' :udpatecollection}, req.body, function(err) {
    //collection.insert(req.body)
    console.log("lo encontro"+req.params.id);
    //collection.insert(req.body);           
    res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    
    });
});/*
router.post('/updatestudent/:id', function(req, res) {
    var db = req.db;
    var studentToUpdate=req.params.id;
    console.log("llego"+req.params.id);
    db.collection('user').update({id:studentToUpdate},req.body, function(err, result){

        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});*/
 
router.delete('/deleteNutri/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('userNutri');
    var userToDelete = req.params.id;
    collection.remove({ '_id' : userToDelete }, function(err) {
        console.log("lo encontro"+req.params.id);
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});



//Coach
/*
 * GET userlist.
 */
router.get('/ListCoach', function(req, res) {
    var db = req.db;
    var collection = db.get('userCoach');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

/*
 * POST to adduser.
 */
router.post('/addCoach', function(req, res) {
    var db = req.db;
    var collection = db.get('userCoach');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});


router.post('/updateCoach/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('userCoach');
     var udpatecollection=req.params.id;
    collection.update({ '_id' :udpatecollection}, req.body, function(err) {
    //collection.insert(req.body)
    console.log("lo encontro"+req.params.id);
    //collection.insert(req.body);           
    res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    
    });
});/*
router.post('/updatestudent/:id', function(req, res) {
    var db = req.db;
    var studentToUpdate=req.params.id;
    console.log("llego"+req.params.id);
    db.collection('user').update({id:studentToUpdate},req.body, function(err, result){

        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});*/
 
router.delete('/deleteCoach/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('userCoach');
    var userToDelete = req.params.id;
    collection.remove({ '_id' : userToDelete }, function(err) {
        console.log("lo encontro"+req.params.id);
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});


module.exports = router;



