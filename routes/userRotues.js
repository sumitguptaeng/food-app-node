import express from "express";

import userController from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

//routes
// GET User || GET
router.get('/getUser', authMiddleware, userController.getUser);

// Update user 
router.put('/updateUser', authMiddleware, userController.updateUser);

router.post('/updatePassword', authMiddleware, userController.updatePassword);

router.post('/resetPassword', authMiddleware, userController.resetPassword);

router.delete('/deleteUser/:id', authMiddleware, userController.deleteProfile);

export default router;