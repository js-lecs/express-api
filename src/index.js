import express from 'express';
import bodyParser from 'body-parser';
import { WizardRoutes } from './routes/wizard.route';
import mongoose from 'mongoose';

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

// app.post('/example-post', (req, res) => {

//     res.json({
//         message: 'Post successful',
//         payload: req.body,
//         headers: req.headers
//     });
// });

app.use('/wizard', WizardRoutes);


app.listen(app.get('port'), () => {
    console.log(`Node is running on port  ${app.get('port')}`);
});