const mongoose = require('mongoose');
const schema = mongoose.Schema;

const articleSchema = new schema({
  name: { type: String, required: true },
  details: { type: String, required: true },
  beds: { type: Number, required: true },
  livingrooms: { type: Number, required: true },
  toilets: { type: Number, required: true },
  garden: { type: Number, required: true },
  swimmingpools: { type: Number, required: true },
  price: { type: Number, required: true },
  image: { data: Buffer, contentType: String }
});

const Villa = mongoose.model("Villa", articleSchema);

module.exports = Villa;