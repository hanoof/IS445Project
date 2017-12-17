var express = require('express');
var fs = require('fs');
var router = express.Router();

router.route('/contacts')
    .post(function(req, res) {
        fs.readFile('data.json', function(err, data) {
            var allContacts = JSON.parse(data)
            var size = allContacts.length
            if (size) {
                var newContact = {
                    "id": parseInt(allContacts[size - 1].id) + 1,
                    "name": req.body.name,
                    "email": req.body.email,
                    "phone": req.body.phone
                }
            } else {
                var newContact = {
                    "id": 1,
                    "name": req.body.name,
                    "email": req.body.email,
                    "phone": req.body.phone
                }
            }

            allContacts.push(newContact)
            console.log(allContacts)
            fs.writeFile('data.json', JSON.stringify(allContacts), function(err) {
                if (err) throw err;
                console.log('Saved!');
                fs.readFile('data.json', function(err, data) {
                    return res.send(JSON.parse(data));
                });
            });
        });
    })
    .get(function(req, res) {
        fs.readFile('data.json', function(err, data) {
            return res.send(JSON.parse(data));
        });
    })
    .delete(function(req, res) {
        fs.writeFile('data.json', "[]", function(err) {
            if (err) throw err;
            console.log('Saved!');
            fs.readFile('data.json', function(err, data) {
                return res.send(JSON.parse(data));
            });
        });
    });

router.route('/contacts/:id')
    .delete(function(req, res) {
        fs.readFile('data.json', function(err, data) {
            var allContacts = JSON.parse(data);
            for (var i = 0; i < allContacts.length; i++) {
                if (allContacts[i].id == req.params.id) {
                    allContacts.splice(i, 1)
                    break;
                }
            }
            fs.writeFile('data.json', JSON.stringify(allContacts), function(err) {
                if (err) throw err;
                console.log('Saved!');
                fs.readFile('data.json', function(err, data) {
                    return res.send(JSON.parse(data));
                });
            });
        });
    })
    .put(function(req, res) {
        fs.readFile('data.json', function(err, data) {
            var allContacts = JSON.parse(data);
            for (var i = 0; i < allContacts.length; i++) {
                if (allContacts[i].id == req.params.id) {
                    allContacts[i].name = req.body.name;
                    allContacts[i].email = req.body.email;
                    allContacts[i].phone = req.body.phone;
                    break;
                }
            }
            fs.writeFile('data.json', JSON.stringify(allContacts), function(err) {
                if (err) throw err;
                console.log('Saved!');
                fs.readFile('data.json', function(err, data) {
                    return res.send(JSON.parse(data));
                });
            });
        });
    })


module.exports = router;