const conn = require('../database/connection');
const {createVehicle} = require('./VehicleController');
// date,
//       time,
//       area,
//       type,
//       description,
//       ps,
//       newVehicle,
//       addVehicle: {
//         owner_id:1,
//         vehicleId,
//         placa,
//         engineDescription

const createScheduling = (data) => new Promise( async (resolve, reject) => {
    const {date, time, vehicleId, area,type,description,ps,newVehicle, addVehicle} = data;
    
    if(newVehicle){
        createVehicle(addVehicle)
            .then(res => vehicleId = res.id)
            .catch(err => reject(err));
    }
});


const createService = (data) => new Promise((resolve, reject) => {
    const { area, type, name, description, baseValue } = data;
   conn.query(`INSERT INTO service (area,type,name,description,base_value)
    VALUES ($1,$2,$3,$4,$5)`, [area, type, name, description, baseValue] , (err, res) => {
        if(err) {
            reject({status:400,msg:err});
            return;
        }
        resolve(res.rows[0]);

    })

});
module.exports = {createService,createScheduling};