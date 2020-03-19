const conn = require('../database/connection');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const auth = require('../config/auth.json');


const createUser = (data) => new Promise((resolve, reject) => {


    const { cpf,name,email,password,birthDate,cep,address,num,neighborhood,cityId,type } = data;
        bcrypt.hash(password, 12)
            .then(hash => {
                conn.query(`INSERT INTO person (cpf,name,email,password,birthDate,cep,address,neighborhood,city_id,type) 
                    VALUES($1, $2, $3,$4,$5,$6,$7,$8,$9, $10) RETURNING *`,
                [cpf,name,email,hash,birthDate,cep,`${address}, ${num}`,neighborhood,cityId,type], 
                (err, newClient) => {
                    if(err) {
                        return reject({status:400,msg:err});
                    }
                    resolve(newClient.rows[0]);
                });
            })
            .catch(err => reject({status:400,msg:err}));
    });

const userAuthenticate = (data) => new Promise((resolve, reject) => {
    const genreteToken = (id) => jwt.sign({id}, auth.secret, {
        expiresIn: 86400
      
      })

    const { email, password } = data;
    
    conn.query('SELECT * FROM person WHERE email = $1',[email], async (err, person) => {
        
        
        if(err) {
            return reject({status:500,msg:err});
           
        } else if(person.rowCount == 0) {
            reject({status:401,msg:'Email ou senha incorretos'});
            return;
        }
        

      bcrypt.compare(password, person.rows[0].password, (err, res) => {
          if(err) {
            return reject({status:400,msg:err});
              
            }
            if(res) {
                resolve({
                    user: person.rows[0],
                    token: genreteToken(person.rows[0].id)
                });
            } else {
                reject({status:401,msg:'Email ou senha incorretos'});
                return;
            }
      });


    });

});

const uniqueCpf = cpf => new Promise((resolve, reject) => {
    conn.query('SELECT id FROM person WHERE cpf = $1',[cpf], (err, res) => {
        if(err) return reject({status:500, msg:err});
        resolve({unique:res.rowCount == 0});
    });
});
module.exports = {createUser, userAuthenticate, uniqueCpf};