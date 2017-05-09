import express from 'express';
import bodyParser from 'body-parser';
import { WizardRoutes } from './routes/wizard.route';
import mongoose from 'mongoose';

import jwt from 'jsonwebtoken'; // used to create, sign, and verify tokens
import { CONFIG } from './config';
import { USER_ROUTES } from './routes/user.route';

// application initialization
let app = express();

// enables POST, PUT Body data to be retrieved as JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// application port
app.set('port', 3000);


// connect to mongoDB instance created on mongoLAbs

mongoose.connect('mongodb://root:root@ds133311.mlab.com:33311/hogwarts');






app.get('/', (req, res) => {
    res.json({ 'message': 'Hello World' });
});

// route middleware to verify a token
app.use('/wizard', function (req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, CONFIG.secret, function (err, decoded) {
            if (err) {
                return res.status(401).json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    } else {
        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
});

app.use(USER_ROUTES);
app.use('/wizard', WizardRoutes);


app.listen(app.get('port'), () => {
    console.log(`Node is running on port  ${app.get('port')}`);
});