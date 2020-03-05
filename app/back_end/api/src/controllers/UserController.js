const conn = require('../database/connection');
const bcrypt = require('bcryptjs');

const createUser = (data) => new Promise((resolve, reject) => {


    const { cpf,name,email,password,birthDate,cep,address,neighborhood,city_id,type } = data;

        bcrypt.hash(password, 12)
            .then(hash => {
                conn.query(`INSERT INTO person (cpf,name,email,password,birthDate,cep,address,neighborhood,city_id,type) 
                    VALUES($1, $2, $3,$4,$5,$6,$7,$8,$9, $10) RETURNING *`,
                [cpf,name,email,hash,birthDate,cep,address,neighborhood,city_id,type], 
                (err, newClient) => {
                    if(err) {
                        reject(err);
                        return;
                    }
                    resolve(newClient.rows[0]);
                });
            });
    });
module.exports = {createUser};