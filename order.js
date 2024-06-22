const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: false },
    address: { type: String, required: true },
    telephone: { type: String, required: true },
    city: { type: String, required: false },
    priceOption: { type: String, required: false },
    cardName: { type: String, required: false },
    cardNumber: { type: String, required: false },
    expMonth: { type: String, required: false },
    expYear: { type: String, required: false },
    cvv: { type: String, required: false },
});

const Payment = mongoose.model('Payment', PaymentSchema);

module.exports = Payment;




