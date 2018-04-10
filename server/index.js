const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = require('./routes/routes')
const db = require('./db/index.js')
const path = require('path');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api', router);
app.use(express.static(path.resolve(__dirname, '../client/dist')));



let PORT = 3000;

app.listen(3000, function() {
    console.log(`Server is listening on ${PORT}`);
})
