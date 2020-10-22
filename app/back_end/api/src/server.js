const app = require('./config/express-config');
const routes = require('./routes');

require('./database')

app.use(routes)

app.listen(5000, () => console.log('Service running in port '+ 5000));