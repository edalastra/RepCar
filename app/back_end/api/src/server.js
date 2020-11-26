const app = require('./config/express-config');
const publicRoutes = require('./routes/publicRoutes');
const privateRoutes = require('./routes/privateRoutes');
const adminRoutes = require('./routes/adminRoutes');


require('./database');

app.use(publicRoutes);
app.use(privateRoutes);
app.use(adminRoutes);

app.listen(5000, () => console.log('Service running in port '+ 5000));