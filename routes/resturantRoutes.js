import express from "express";

import resturant from "../controllers/resturantController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

//routes
// CREATE RESTURANT || POST
router.post('/create', authMiddleware, resturant.createResturant);

// getAll Resturant || GET 
router.get('/getAll', resturant.getAllResturant);

// GET Resturant by ID || GET
router.get('/get/:id', resturant.getResturantById);

// Delete Resturant || DELETE
router.delete('/delete/:id', authMiddleware, resturant.deleteResturant);
export default router;