const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String },
    img: { type: String },
    imgTitle: { type: String },
    imgSm: { type: String },
    trailer: { type: String },
    video: { type: String },
    year: { type: String },
    limit: { type: Number },
    duration: { type: String },
    genre: { type: String },
    isSeries: { type: Boolean, default: false },
    episode: {
      type: Array,
      defaut: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", MovieSchema);
