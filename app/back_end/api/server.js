const app = require('./src/config/express-config');
const hosts = require('./src/config/hosts.js');
const routes = require('./src/routes/index');
const { PORT } = hosts

app.use('/api', routes)
app.listen(PORT, () => console.log('Service running in port '+ PORT));