const conn = require('../database/connection');

const createVehicle = data => new Promise((resolve, reject) => {
  
    
        const  {placa, modelId, year, engineDescription, ownerId} = data;
        conn.query(`INSERT INTO vehicle (placa,model_id,year,description,owner_id)
        VALUES($1,$2,$3,$4,$5) RETURNING *`,[placa, modelId, year, engineDescription, ownerId] ,(err,res) => {
            if(err) {
                reject({status:400,msg:err});
                return;
            }
            resolve(res.rows[0]);
        });
    });

const listVehiclesRegistred = (userId) => new Promise((resolve, reject) => {
    conn.query(`SELECT m.name as model, b.name as brand, v.year as year FROM vehicle v 
                JOIN model m on m.id = v.model_id
                JOIN brand b on b.id = m.brand_id
                WHERE v.owner_id = $1`,
        [userId], (err, res) => {
        if(err) {
            reject({status:400,msg:err});
            return;
        }
        resolve(res.rows);
    });
});

const listBrands = () => new Promise((resolve, reject) => {
    conn.query(`SELECT * FROM brand`, (err, res) => {
        if(err) {
            reject({status:400,msg:err});
            return;
        }
        resolve(res.rows);
    });
});


const listModels = (brandId) => new Promise((resolve, reject) => {
    conn.query(`SELECT * FROM model WHERE brand_id = $1`, [brandId], (err, res) => {
        if(err) {
            reject({status:400,msg:err});
            return;
        }
        resolve(res.rows);
    });
});


module.exports = { listVehiclesRegistred, listBrands, listModels, createVehicle };