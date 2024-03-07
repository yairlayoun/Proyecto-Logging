// auth.router.js
import express from "express";
import * as authController from "../dao/fileSystem/controllers/auth/authController.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  await authController.registerUser(req, res);
});

router.post("/login", async (req, res) => {
  await authController.loginUser(req, res);
});

router.get("/logout", async (req, res) => {
  await authController.logOutUser(req, res);
});

router.post("/recovery", async (req, res) => {
  await authController.recoveryPassword(req, res);
});

export default router;
