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
        errorLog: error,
      });
    }

    const result = await ProductServices.createProductIntoDB(value);

    return res.status(200).json({
      success: true,
      message: "Product created successfully!",
      data: result,
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
    const result = await ProductServices.getProductFromDB();
    return res.status(200).json({
      success: true,
      message: "Products fetched successfully!",
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

const fetchSingleProductFromDB = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.getSingleProductFromDB(productId);
    return res.status(200).json({
      success: true,
      message: "Products fetched successfully!",
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

export const ProductControllers = {
  postProductIntoDB,
  fetchProductFromDB,
  fetchSingleProductFromDB,
};
