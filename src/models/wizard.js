let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let wizardSchema = new Schema({
    name: String,
    house: String,
    pet: String
});

export const Wizard = mongoose.model('Wizard', wizardSchema);