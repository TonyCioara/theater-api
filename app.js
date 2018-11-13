const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const theater = {
//   "_id" : "5500632d2dc02be024ba5c66",
//  "theaterId" : 1,
//  "name" : "Action Movie 5",
//  "description" : "Another action movie",
//  "start" : "2015-03-11T15:45:49.103Z",
//  "end" : "2015-03-11T15:45:49.103Z",
//  "price" : 10,
//  "seatsAvailable" : 80,
//  "seats" : [[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
//             [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
//             [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
//             [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
//             [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]]
// }

/** 
 * The user shall see:
 * POST: reserveSeat
 * GET: seeSeatings
 * PATCH: updateReservation
 * DELETE: cancelReservation
*/
mongoose.connect('//mongodb://localhost/theater-db', { useNewUrlParser: true }, { useMongoClient: true });

const Theater = require('./theater');

const port = 3000;

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/', (req, res) => {
  console.log("BODY:", req.body);
  const theater = new Theater(req.body);

  theater.save().then(savedTheater => {
    res.json({"data" : savedTheater});
  }).catch(err => {
    console.log("ERROR:", err.message);
    res.json({"ERROR": err.message});
  })
})

app.get('/theater/:id/seats', (req, res) => {
  Theater.findById(req.params.id)
  .then(theater => {
    res.json({'seats': theater.seats});
  }).catch(err => {
    res.json({"error": err.message});
  })
})

app.post('/theater/:id/reserve', (req, res) => {
  Theater.findById(req.params.id)
  .then(theater => {
    theater.seats[req.body.row][req.body.collumn] = 1
  }).catch(err => {
    res.json({"error": err.message});
  })
})

app.listen(3000, function() {

  console.log('App listening on 3000');
})

