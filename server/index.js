const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('static'));

const corsMiddleware = require('./middleware/cors.middleware');
app.use(fileUpload({}));
app.use(corsMiddleware);
const db = require('./models');
db.sequelize.sync();

require('./routes/auth.routes')(app);
require('./routes/file.routes')(app);
require('./routes/profile.routes')(app);
require('./routes/search.routes')(app);
require('./routes/data.routes')(app);
require('./routes/dealer.routes')(app);
require('./routes/customer.routes')(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
module.exports = app;
