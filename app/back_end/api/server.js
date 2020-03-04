const app = require('./src/config/express-config');
const hosts = require('./src/config/hosts.js');
const routes = require('./src/routes');
const { PORT } = hosts

routes(app);

app.listen(PORT, () => console.log('Service running in port '+ PORT));