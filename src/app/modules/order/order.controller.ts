import { Request, Response } from "express";
import { OrderServices } from "./order.service";
import orderValidationSchema from "./order.validation";
import { ProductModel } from "../product/product.model";

const postOrderIntoDB = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const { error, value } = orderValidationSchema.validate(orderData);
    if (error) {
      return res.status(404).json({
        status: false,
        message: "error occured from validation,postOrderIntoDB",
        data: error.details,
      });
    }
    const result = await OrderServices.createOrderIntoDB(value);

    const product = await ProductModel.findById(orderData.productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    if (product.inventory.quantity < orderData.quantity) {
      return res.status(404).json({
        success: false,
        message: "Insufficient quantity available in inventory",
      });
    }

    product.inventory.quantity -= orderData.quantity;

    product.inventory.inStock = product.inventory.quantity > 0;

    await product.save();

    return res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: value,
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: "error from postOrderIntoDB",
      error: err,
    });
  }
};

const getOrderFromDB = async (req: Request, res: Response) => {
  try {
    if (req.query) {
      const result = await OrderServices.getOrderFromDB(req.query.email);
      if (result.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      } else {
        return res.status(200).json({
          success: true,
          message: "Order fetched successfully!",
          data: result,
        });
      }
    } else {
      const result = await OrderServices.getOrderFromDB();
      return res.status(200).json({
        success: true,
        message: "Order fetched successfully!",
        data: result,
      });
    }
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: "error from getOrderFromDB",
      errorLog: err,
    });
  }
};

export const OrderController = {
  postOrderIntoDB,
  getOrderFromDB,
};
