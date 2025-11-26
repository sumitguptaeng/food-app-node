import express from "express";

import authMiddleware from "../middlewares/authMiddleware.js";
import foodController from "../controllers/foodController.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

const router = express.Router();

//routes
//Create FOOD || POST
router.post('/create', authMiddleware, foodController.createFood);

//GET ALL FOOD
router.get("/getAll", foodController.getAllFoods);

// GET SINGLE FOOD
router.get("/get/:id", foodController.getSingleFood);

// GET  FOOD by rest
router.get("/getByResturant/:id", foodController.getFoodByResturant);

// UPDATE FOOD
router.put("/update/:id", authMiddleware, foodController.updateFood);

// DELETE FOOD
router.delete("/delete/:id", authMiddleware, foodController.deleteFood);

// PLACE ORDER
router.post("/placeorder", authMiddleware, foodController.placeOrder);

// ORDER STATUS
router.post('/orderStatus/:id', authMiddleware, adminMiddleware, foodController.orderStatus)
export default router;