// Import & Instantiate Express & Redis ------------------
const express = require('express');
const app = express();

const redis = require('redis');
const client = redis.createClient();
// -------------------------------------------------------

// Initialize values -------------------------------------
client.mset(
    'header', 0,
    'left', 0,
    'article', 0, 
    'right', 0, 
    'footer', 0
);
// -------------------------------------------------------

// Promise function gets data from Redis datastore -------
function data() {
    return new Promise( (resolve,reject) =>{
        client.mget(['header', 'left', 'article', 'right', 'footer'],    function (err, value){
            const data = {
                'header': Number(value[0]),
                'left': Number(value[1]),
                'article': Number(value[2]),
                'right': Number(value[3]),
                'footer': Number(value[4])
            };
            err ? reject(null) : resolve(data);
        });
    });
};
// -------------------------------------------------------

// Server static files -----------------------------------
app.use(express.static('public'));
// -------------------------------------------------------

// Displays data returned by the promise function --------
app.get('/data', (req, res) => {
    data()
        .then (data => {
            console.log(data);
            res.send(data);
        });
});
// -------------------------------------------------------

// Updates data store & returns updated data -------------
app.get('/update/:key/:value', (req, res) => {
    const key = req.params.key;
    let value = Number(req.params.value);

    client.get(key, (err, reply) =>{
        value = Number(reply) + value;
        client.set(key,value);
    // New Value

        data()
        .then ( data => {
            console.log(data);
            res.send(data);
        });
    // Returns data to client
    });
});
// -------------------------------------------------------

// Starts the server at Port 3000 ------------------------
app.listen(3000, () => {
    console.log(`Running on Port 3000...`)
});
// -------------------------------------------------------
