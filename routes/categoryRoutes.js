import express from "express";

import authMiddleware from "../middlewares/authMiddleware.js";
import categoryController from "../controllers/categoryController.js";

const router = express.Router();

//routes
// CREATE Category || POST
router.post('/create', authMiddleware, categoryController.createCat);

//GET ALL CAT
router.get("/getAll", categoryController.getAllCat);

// UPDATE CAT
router.put("/update/:id", authMiddleware, categoryController.updateCat);

// DLEETE CAT
router.delete("/delete/:id", authMiddleware, categoryController.deleteCat);


export default router;