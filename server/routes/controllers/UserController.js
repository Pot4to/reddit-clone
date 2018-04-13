const Users = require('../../db/schemas/user.js');
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');


const UserController = {
    Login: (req, res) => {
        console.log('Here in req. params', req.params);
        Users.find({username: req.params.username})
          .then( data => {
              if (data.length) {
                  if (req.params.password === data[0].password) {
                      console.log(req.session);
                      res.status(202).send(data[0]._id);
                  } else {
                      res.status(200).send('Invalid password');  
                  }
                //   bcrypt.compare(req.params.password, data[0].password, (err, results) => {
                //       if (results) {
                //           res.status(202).send(data[0]._id);
                //       } else {
                //           res.status(200).send('Invalid password');
                //       }
                //   })
              } else {
                  res.status(200).send('User not found');
              }
          })
          .catch(err => {
              console.log('Failed Login ', err);
              res.status(400).send('Login failed');
          })
    }
}

module.exports = UserController;