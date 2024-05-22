import { Request, Response } from "express";
import { OrderServices } from "./order.service";
import orderValidationSchema from "./order.validation";

const postOrderIntoDB = async (req: Request, res: Response) => {
  try {
    const { error, value } = orderValidationSchema.validate(req.body);
    if (error) {
      return res.status(404).json({
        status: false,
        message: "error occured from validation,postOrderIntoDB",
        data: error.details,
      });
    }
    const result = await OrderServices.createOrderIntoDB(value);
    return res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: value,
    });
  } catch (err) {
    return res.status(404).json({
      success: true,
      message: "error from postOrderIntoDB",
      error: err,
    });
  }
};

const getOrderFromDB = async (req: Request, res: Response) => {
  try {
    if (req.query) {
      const result = await OrderServices.getOrderFromDB(req.query.email);
      return res.status(200).json({
        success: true,
        message: "Order fetched successfully!",
        data: result,
      });
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
