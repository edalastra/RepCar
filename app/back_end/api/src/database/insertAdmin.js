const User = require('../models/User');
const Worker = require('../models/Worker');
const { Address } = require('../models/Address');
const bcrypt = require('bcrypt');


module.exports = (async () => {
    try {    
    await User.findOrCreate({
        where: {name: 'RepCar'},
        defaults :  {
            email: 'contato@repcar.com',
            telephone: '54912345678',
            cpf: '34672541010',
            birth_date: '2000-01-01',
            password: bcrypt.hashSync('admin', 10),
            address: {
                zipcode: "99701000",
                street: "Rua Cabral",
                number: "1500",
                complement:null,
                neighborhood: "Jardim Nova Araras",
                city_id: 3
            },
            worker: {
                clt: "12345672",
                pis: "00475457963",
                genre: "M",
                hour_value: 10.50,
                admission: "2020-11-23",
                admin: true
            }
        },
            include: [{
                model: Worker,
                as: 'worker'
            },
            {
              model: Address,
              as: 'address'
          }]
        
    }).spread((user, created) => {
        console.log("Admin created");
        console.log("Email: contato@repcar.com");
        console.log("Password: admin");
    })
    } catch(err){
        throw(err)
    }}
)();