const { Schema, model, default: mongoose } = require("mongoose");

const platformSchema = new Schema({
  name: {
    type: String,
  },
});
const Platform = model("Platform", platformSchema);

module.exports = Platform;
