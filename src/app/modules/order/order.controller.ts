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

export const OrderController = {
  postOrderIntoDB,
};
