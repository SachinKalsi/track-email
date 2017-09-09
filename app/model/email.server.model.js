'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var emailSchema = new Schema({
    to: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    openedDate: Date,
    html: String,
    error: Schema.Types.Mixed,
    status: {
        type: String,
        enum : ['new','opened', 'failure'],
        default: 'new'
    }
}, { timestamps: true });

var Email = mongoose.model('Email', emailSchema);

module.exports = Email;
