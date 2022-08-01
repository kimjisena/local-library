const mongoose = require('mongoose');
const {DateTime} = require('luxon');

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    firstName: {
        type: String, 
        required: true, 
        maxLength: 100
    },
    familyName: {
        type: String,
        required: true,
        maxLength: 100
    },
    dateOfBirth: {
        type: Date
    },
    dateOfDeath: {
        type: Date
    }
});

// virtual field for author's full name
AuthorSchema
    .virtual('name')
    .get(function () {

        // return empty string in case where either name is missing
        let fullName = '';
        if (this.firstName && this.familyName) {
            fullName = this.familyName + ', ' + this.firstName;
        }

        return fullName;
    });

// virtual field for author's lifespan
AuthorSchema
    .virtual('lifespan')
    .get(function () {
        let lifetimeString = '';
        if (this.dateOfBirth) {
            lifetimeString = DateTime.fromJSDate(this.dateOfBirth).toLocaleString(DateTime.DATE_MED);
        }
        lifetimeString += ' - ';
        if (this.dateOfDeath) {
            lifetimeString += DateTime.fromJSDate(this.dateOfDeath).toLocaleString(DateTime.DATE_MED);
        }
        return lifetimeString;
    });

// virtual field for author's url
AuthorSchema
    .virtual('url')
    .get(function () {
        return '/catalog/author/' + this._id;
    });

module.exports = mongoose.model('Author', AuthorSchema);