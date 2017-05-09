import express from 'express';
import { User } from '../models/user.model';
import { CONFIG } from '../config';
import jwt from 'jsonwebtoken'; // used to create, sign, and verify tokens
let router = express.Router();


router.post('/register', (req, res) => {
    var user = new User({
        name: req.body.name,
        password: req.body.password,
        admin: req.body.admin
    });
    user.save((err, data) => {
        if (err)
            res.status(400).send(err);
        res.json({
            status: "success",
            data: data
        })
    });
});


router.get('/authenticate', (req, res) => {


    User.findOne({
        name: req.query.name
    }, (err, user) => {
        if (err)
            res.status(400).json({ success: false, message: 'Authentication failed. Server Error.' });

        if (!user) {

            res.status(400).json({ success: false, message: 'Authentication failed. Username wrong123.' });
        } else {
            if (user.password !== req.query.password) {
                res.status(400).json({ success: false, message: 'Authentication failed. Password wrong.' });
            } else {
                // if user is found and password is right
                // create a token
                var token = jwt.sign(user, CONFIG.secret, {
                    expiresIn: 1440 // expires in 24 hours
                });

                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            }
        }
    });
});


export const USER_ROUTES = router;