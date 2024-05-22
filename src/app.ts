import express, { Request, Response } from "express";
import cors from "cors";
import { ProductRoutes } from "./app/modules/product/product.route";
import { OrderRoutes } from "./app/modules/order/order.route";

const app = express();

//parsers
app.use(express.json());
app.use(cors());

//application routes
app.use("/api", ProductRoutes, OrderRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send(
    "Hello! This is a backend of ecommerce type website consisting of express, typescript & mongoose\n Go to '/api/products' for products, '/api/orders' for orders"
  );
});
app.all("*", (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default app;
