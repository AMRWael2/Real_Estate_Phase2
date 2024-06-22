const mongoose = require('mongoose');

const meetingRequestSchema = new mongoose.Schema({
    phoneNumber: {
        type: String,
        required: true
    },
    
    meetingDate: {
        type: Date,
        required: true
    },
    meetingTime: {
        type: String,
        required: true
    }
},{timestamps:true});

module.exports = mongoose.model('MeetingRequest', meetingRequestSchema);
