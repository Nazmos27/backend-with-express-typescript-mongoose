import express, { Request, Response } from "express";
import cors from "cors";
import { ProductRoutes } from "./app/modules/product/product.route";
import { OrderRoutes } from "./app/modules/order/order.route";

const app = express();

//parsers
app.use(express.json());
app.use(cors());

//application routes
app.use('/api', ProductRoutes, OrderRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("hello world!");
});

export default app;
