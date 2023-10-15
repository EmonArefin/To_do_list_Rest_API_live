const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(

  {
    title: { type: String },
    short_des: { type: String },
    price: { type: Number },
    discount: { type: Number },
    image: { type: String },
    stock: { type: String },
    star: { type: String },
    remark: { type: String },
  }, {versionKey: false, timestamps: true}

);

const productModel = mongoose.model("products", DataSchema);
module.exports = productModel;