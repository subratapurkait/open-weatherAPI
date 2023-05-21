const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const router = require('./routes/router');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', router);
console.log("Subrata Purkait");
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`server is responding at port ${PORT}`);
});