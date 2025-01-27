import { Router } from 'express'
import auth from '../middleware/auth.js'
import {  CashOnDeliveryOrderController, deleteOrderController, getAllOrdersController, getOrderDetailsController, getOrderStatus, paymentController, updateOrderStatus, webhookStripe } from '../controllers/order.controller.js'

const orderRouter = Router()

orderRouter.post("/cash-on-delivery",auth,CashOnDeliveryOrderController)
orderRouter.post('/checkout',auth,paymentController)
orderRouter.post('/webhook',webhookStripe)
orderRouter.get("/order-list",auth,getOrderDetailsController)
orderRouter.get("/admin/all-orders", auth, getAllOrdersController)
orderRouter.delete("/admin/delete-order/:id", auth, deleteOrderController);
orderRouter.put("/update-status", auth, updateOrderStatus); // Admin updates status
orderRouter.get("/status/:orderId", auth, getOrderStatus);  // User views status



export default orderRouter