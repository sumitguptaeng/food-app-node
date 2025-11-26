import express from "express";

import authControllers from "../controllers/authControllers.js";

const router = express.Router();

//routes
// REGISTER | POST
router.post('/register', authControllers.register);

// LOGIN | POST
router.post('/login', authControllers.login);

export default router;