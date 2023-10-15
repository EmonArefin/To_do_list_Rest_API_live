const productModel = require("../models/productModel");

exports.createProduct = async (req, res) => {
  try {
      const productData = req.body;
      const result = await productModel.create(productData);
      res.status(200).json({
          status: "Success",
          data: result
      });
  } catch (error) {
      res.status(404).json({
          status: "Fail",
          data: error.toString()
      })
  }
};

exports.readProduct = async(req, res)=>{
  try {
      const productId = req.params.id;
      const result = await productModel.find({id: productId});
      res.status(200).json({
          status: "Success",
          data: result
      });
  } catch (error) {
      res.status(404).json({
          status: "Fail",
          data: error.toString()
      })
  }
};



exports.updateProduct = async (req, res) => {
  try {
      const productId = req.params.id;
      const productData = req.body;
      const result = await productModel.findByIdAndUpdate(productId, productData, { new: true });

      if (result) {
          res.status(200).json({
              status: "Success",
              data: result
          });
      } else {
          res.status(404).json({
              status: "Fail",
              data: "Product not found"
          });
      }
  } catch (error) {
      res.status(404).json({
          status: "Fail",
          data: error.toString()
      });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
      const productId = req.params.id;
      const result = await productModel.findByIdAndRemove(productId);

      if (result) {
          res.status(200).json({
              status: "Success",
              data: "Product deleted successfully"
          });
      } else {
          res.status(404).json({
              status: "Fail",
              data: "Product not found"
          });
      }
  } catch (error) {
      res.status(404).json({
          status: "Fail",
          data: error.toString()
      });
  }
};
