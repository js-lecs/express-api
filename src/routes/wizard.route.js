import express from 'express';
import { Wizard } from '../models/wizard.model';

let router = express.Router();


// get all wizards
router.get('/', (req, res) => {
    Wizard.find((err, wizards) => {
        if (err)
            res.send(err);

        res.json(wizards);
    });
});

// add wizard
router.post('/', (req, res) => {

    let wizard = new Wizard();
    wizard.name = req.body.name;
    wizard.house = req.body.house;
    wizard.pet = req.body.pet;

    wizard.save((err, data) => {
        if (err)
            res.send(err);

        res.json({
            message: "Wizard added successfully!",
            data: data
        })
    });
});


// view wizard from ID
router.get('/:id', (req, res) => {
    Wizard.findById(req.params.id, (err, wizard) => {
        if (err)
            res.send(err);
        res.json(wizard);
    });
});


// Edit wizard from ID
router.put('/:id', (req, res) => {
    Wizard.findById(req.params.id, (err, wizard) => {
        if (err)
            res.send(err);

        wizard.name = req.body.name;
        wizard.house = req.body.house;
        wizard.pet = req.body.pet;

        wizard.save((err, data) => {
            if (err)
                res.send(err);

            res.json({
                message: "updated successfully",
                data: data
            });
        })
    });
});

// Delete wizard from ID
router.delete('/:id', (req, res) => {
    Wizard.remove({
        _id: req.params.id
    }, (err, data) => {
        if (err)
            res.send(err);

        res.json({
            "message": "Deleted Successfully",
            data: data
        })
    });
});

export const WizardRoutes = router;