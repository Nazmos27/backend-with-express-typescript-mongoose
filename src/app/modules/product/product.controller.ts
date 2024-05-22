import { Request, Response } from "express";
import productValidationSchema from "./product.validation";
import { ProductServices } from "./product.service";

const postProductIntoDB = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    const { error, value } = productValidationSchema.validate(productData);
    if (error) {
      return res.status(404).json({
        success: false,
        message: "An error occured from validation part, postProductIntoDB",
        errorLog: error.details,
      });
    }

    const result = await ProductServices.createProductIntoDB(value);

    return res.status(200).json({
      success: true,
      message: "Product created successfully!",
      data: productData,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "An error occured from postProductIntoDB",
      errorLog: err,
    });
  }
};

const fetchProductFromDB = async (req: Request, res: Response) => {
  try {
    if (req.query.searchTerm) {
      const result = await ProductServices.getProductFromDB(
        req.query.searchTerm
      );
      return res.status(200).json({
        success: true,
        message: `Products matching search term '${req.query.searcTerm}' fetched successfully!`,
        data: result,
      });
    } else {
      const result = await ProductServices.getProductFromDB();
      return res.status(200).json({
        success: true,
        message: "Products fetched successfully!",
        data: result,
      });
    }
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: "An error occured from fetchProductFromDB",
      errorLog: err,
    });
  }
};

const fetchSingleProductFromDB = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.getSingleProductFromDB(productId);
    return res.status(200).json({
      success: true,
      message: "Product fetched successfully!",
      data: result,
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: "An error occured from fetchProductFromDB",
      errorLog: err,
    });
  }
};

const updateSingleProduct = async (req: Request, res: Response) => {
  try {
    const updatedData = req.body;
    const { error, value } = productValidationSchema.validate(updatedData);
    if (error) {
      return res.status(404).json({
        success: false,
        message: "An error occured from updateSingleProduct",
        errorLog: error.details,
      });
    }
    const result = await ProductServices.putProductFromDB(
      req.params.productId,
      value
    );
    return res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      data: value,
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: "An error occured from updateSingleProduct",
      errorLog: err,
    });
  }
};

const deleteSingleProduct = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.deleteProductFromDB(
      req.params.productId
    );
    if (result.deletedCount === 1) {
      return res.status(200).json({
        success: true,
        message: "Product deleted successfully!",
        data: null,
      });
    }
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: "An error occured from deleteSingleProduct",
      errorLog: err,
    });
  }
};

export const ProductControllers = {
  postProductIntoDB,
  fetchProductFromDB,
  fetchSingleProductFromDB,
  updateSingleProduct,
  deleteSingleProduct,
};
