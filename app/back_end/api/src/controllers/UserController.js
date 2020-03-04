const conn = require('../database/connection');
const bcrypt = require('bcryptjs');
//const jwt = require("jsonwebtoken");
const auth = require('../config/auth.json')


const createUser = (username, password) => new Promise((resolve, reject) => {
    conn.query('INSERT INTO authenticate (username,password) VALUES($1, $2) RETURNING *',
    [username,password], (err, res) => {
        resolve(res);
        reject(err)
    });
})

     

module.exports = {createUser};