import express from 'express';
import { Wizard } from '../models/wizard';

let router = express.Router();



router
    .get('/', (req, res) => {
        Wizard.find((err, wizards) => {
            if (err) {
                res.send(err);
            }

            res.json(wizards);
        });
    })

    .get('/view/:id', (req, res) => {
        Wizard.findById(req.params.id, (err, wizard) => {
            if (err) {
                res.send(err);
            }

            res.json(wizard);
        });
    })

    .get('/search', (req, res) => {


        Wizard.find({ name: req.query.name }, (err, wizards) => {
            if (err)
                res.send(err);

            res.json(wizards);
        })
    })
    .put('/:id', (req, res) => {
        Wizard.findById(req.params.id, (err, wizard) => {
            if (err)
                res.send(err);


            wizard.name = req.body.name;
            wizard.house = req.body.house;
            wizard.pet = req.body.pet;

            wizard.save((err, data) => {
                if (err)
                    res.send(err);

                res.json({ message: 'success', data: data });
            });
        });
    })

    .delete('/:id', function (req, res) {
        Wizard.remove({
            _id: req.params.id
        }, function (err, wizard) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted', data: wizard });
        });
    })

    .post('/', (req, res) => {
        let wizard = new Wizard();
        wizard.name = req.body.name;
        wizard.house = req.body.house;
        wizard.pet = req.body.pet;


        wizard.save(function (err, data) {
            if (err)
                res.send(err);
            res.json({ message: 'Wizard created!', data: data });
        });
    });



export const wizardRoutes = router;