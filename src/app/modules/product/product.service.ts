import { Product } from "./product.interface";
import { ProductModel } from "./product.model";

const createProductIntoDB = async (product: Product) => {
  const result = await ProductModel.create(product);
  return result;
};

const getProductFromDB = async (searchTerm?: unknown) => {
  if (searchTerm) {
    const result = await ProductModel.find(
      {
        $or: [
          { name: { $regex: searchTerm, $options: "i" } },
          { description: { $regex: searchTerm, $options: "i" } },
          { category: { $regex: searchTerm, $options: "i" } },
          { tags: { $elemMatch: { $regex: searchTerm, $options: "i" } } },
        ],
      },
      { _id: 0 }
    );
    return result;
  } else {
    const result = await ProductModel.find(
      {},
      { _id: 0, __v: 0, "variants._id": 0, "inventory._id": 0 }
    );
    return result;
  }
};

const getSingleProductFromDB = async (id: string) => {
  const result = await ProductModel.findOne({ _id: id }, { _id: 0, __v: 0, "variants._id": 0, "inventory._id": 0 });
  return result;
};

const putProductFromDB = async (id: string, body: object) => {
  const result = await ProductModel.updateOne(
    { _id: id },
    { $set: body },
    { upsert: true }
  );
  return result;
};

const deleteProductFromDB = async (id: string) => {
  const result = await ProductModel.deleteOne({ _id: id });
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getProductFromDB,
  getSingleProductFromDB,
  putProductFromDB,
  deleteProductFromDB,
};
