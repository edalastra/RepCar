const conn = require('../database/connection');
const bcrypt = require('bcryptjs');
//const jwt = require("jsonwebtoken");

const createUser = (data) => new Promise((resolve, reject) => {


    const { cpf,name,email,password,birthDate,cep,address,neighborhood,city,uf,type } = data;
    try {
        conn.query('SELECT * FROM city WHERE upper(name) = $1', [city.toUpperCase()] , (err, resCity) => {
            
            let city_id
            if(resCity.rowCount < 1) {
            conn.query('INSERT INTO city (name, uf) VALUES($1, $2) RETURNING *', 
                [city.toUpperCase(), uf.toUpperCase()], (err, newCity) => {
                    if(err) {
                        reject(err);
                        return;
                    }
                    
                    city_id = newCity.rows[0].id;
                });
        } else {
            conn.query('SELECT id FROM city WHERE name = $1', 
                [city.toUpperCase()], (err, resCityId) => {
                    if(err) {
                        reject(err);
                        return;
                    };
                    city_id = resCityId.rows[0].id;
                });
        }

        bcrypt.hash(password, 12)
            .then(hash => {
                conn.query('INSERT INTO person (cpf,name,email,password,birthDate,cep,address,neighborhood,city_id,type) VALUES($1, $2, $3,$4,$5,$6,$7,$8,$9,$10) RETURNING *',
                [cpf,name,email,hash,birthDate,cep,address,neighborhood,city_id,type], (err, newClient) => {
                    if(err) {
                        reject(err);
                        return;
                    }
                    resolve(newClient.rows[0]);
                });
            })


        })

    } catch(err) {
        reject(err);
        return;
    }
})

    
module.exports = {createUser};