import express from "express";
import { OrderController } from "./order.controller";

const router = express.Router();

router.post("/orders", OrderController.postOrderIntoDB);

router.get("/orders", OrderController.getOrderFromDB);

export const OrderRoutes = router;
