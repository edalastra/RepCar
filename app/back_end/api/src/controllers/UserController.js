const conn = require('../database/connection');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const auth = require('../config/auth.json');


const createUser = (data) => new Promise((resolve, reject) => {


    const { cpf,name,email,password,birthDate,cep,address,neighborhood,cityId,type } = data;

        bcrypt.hash(password, 12)
            .then(hash => {
                conn.query(`INSERT INTO person (cpf,name,email,password,birthDate,cep,address,neighborhood,city_id,type) 
                    VALUES($1, $2, $3,$4,$5,$6,$7,$8,$9, $10) RETURNING *`,
                [cpf,name,email,hash,birthDate,cep,address,neighborhood,cityId,type], 
                (err, newClient) => {
                    if(err) {
                        reject({status:400,msg:err});
                        return;
                    }
                    resolve(newClient.rows[0]);
                });
            });
    });

const userAuthenticate = (data) => new Promise((resolve, reject) => {
    const genreteToken = (id) => jwt.sign({id}, auth.secret, {
        expiresIn: 86400
      
      })

    const { email, password } = data;
    
    conn.query('SELECT * FROM person WHERE email = $1',[email], async (err, person) => {
        
        
        if(err) {
            reject({status:500,msg:err});
            return;
        } else if(person.rowCount == 0) {
            reject({status:400,msg:'Email ou senha incorretos'});
            return;
        }
        

      bcrypt.compare(password, person.rows[0].password, (err, res) => {
          if(err) {
              reject(err);
              return;
            }
            if(res) {
                resolve({
                    user: person.rows[0],
                    token: genreteToken(person.rows[0].id)
                });
            } else {
                reject({status:400,msg:'Email ou senha incorretos'});
                return;
            }
      });


    });

});
module.exports = {createUser, userAuthenticate};