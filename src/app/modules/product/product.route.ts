import express from 'express'
import { ProductControllers } from './product.controller'

const router = express.Router()

//calling controller function

router.post('/products',ProductControllers.postProductIntoDB)

router.get('/products',ProductControllers.fetchProductFromDB)

router.get('/products/:productId',ProductControllers.fetchSingleProductFromDB)

export const ProductRoutes = router