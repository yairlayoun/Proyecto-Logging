// routes/user.router.js
import express from 'express';
import * as userController from '../controllers/userController.js';

const router = express.Router();

router.get('/current', userController.getCurrentUser);

export default router;
