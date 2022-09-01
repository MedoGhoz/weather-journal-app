// Setup empty JS object to act as endpoint for all routes
projectData = {};

const bodyParser = require('body-parser');

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;
const server = app.listen(port, () => {
    console.log('starting server...');
    console.log(`listening on port: ${port}`);
});

app.get('/all', getData);

function getData(request, response) {
    response.send(projectData);
}

app.post('/feeling', addFeeling);

function addFeeling(request, response) {
     projectData = request.body;
     console.log(projectData);
}