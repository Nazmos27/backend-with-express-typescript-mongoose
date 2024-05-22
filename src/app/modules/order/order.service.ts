import { Order } from "./order.interface";
import { OrderModel } from "./order.model";

const createOrderIntoDB = async (order: Order) => {
  const result = await OrderModel.create(order);
  return result;
};

const getOrderFromDB = async (email?: unknown) => {
  if (email) {
    const result = await OrderModel.find({ email }, { _id: 0, __v: 0 });
    return result;
  } else {
    const result = await OrderModel.find({}, { _id: 0, __v: 0 });
    return result;
  }
};

export const OrderServices = {
  createOrderIntoDB,
  getOrderFromDB,
};
