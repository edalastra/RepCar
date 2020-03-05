const conn = require('../database/connection');


const listUfs = () => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT id, uf FROM state' , (err, res) => {
            if(err) {
                reject(err);
                return;
            }
            resolve(res.rows);
        })
    })
}

const listCitys = (uf) => {
    return new Promise((resolve, reject) => {
        conn.query(
            `SELECT c.id, c.name FROM city c
            JOIN state s ON c.state_id = s.id
            WHERE s.uf = $1`, [uf], (err, res) => {
                if(err) {
                    reject(err);
                    return;
                }
                resolve(res.rows);
            })
    })
}

module.exports = {listUfs, listCitys};