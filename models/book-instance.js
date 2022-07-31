const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const Schema = mongoose.Schema;

const BookInstanceSchema = new Schema({
    book: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    imprint: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'],
        default: 'Maintenance'
    },
    dueBack: {
        type: Date,
        default: Date.now
    }
});

// virtual field for bookinstance's url
BookInstanceSchema
    .virtual('url')
    .get(function () {
        return '/catalog/bookinstance/' + this._id;
    });

// virtual field for formatted due back date
BookInstanceSchema
    .virtual('formattedDueBack')
    .get(function () {
        return DateTime.fromJSDate(this.dueBack).toLocaleString(DateTime.DATE_MED);
    });

module.exports = mongoose.model('BookInstance', BookInstanceSchema);