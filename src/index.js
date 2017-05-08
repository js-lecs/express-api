import express from 'express';
// let us pull POST content from our HTTP request 
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { wizardRoutes } from './routes/wizard';
let Bear = require('./models/bear');
let app = express();


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// get port from command line or default
app.set('port', process.env.PORT || 3000);



// db setup
mongoose.connect('mongodb://root:root@ds133331.mlab.com:33331/hogwarts');

app.get('/', (req, res) => {
    res.json({ msg: 'Hello World' });
})

// app.get('/bear', (req, res) => {

//     var bear = new Bear();      // create a new instance of the Bear model
//     bear.name = req.params.name;  // set the bears name (comes from the request)

//     // save the bear and check for errors
//     bear.save(function (err) {
//         if (err)
//             res.send(err);

//         res.json({ message: 'Bear created!' });
//     });


// });

// app.get('/bears', function (req, res) {
//     Bear.find(function (err, bears) {
//         if (err)
//             res.send(err);

//         res.json(bears);
//     });
// });


// middleware to use for all requests
app.use(function (req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

app.use('/wizards', wizardRoutes);

let server = app.listen(app.get('port'), () => {
    console.log(`Node express server is running on port ${app.get('port')}`);
});