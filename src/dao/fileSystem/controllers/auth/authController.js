import * as authService from "../../../../services/authService.js";
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/auth.log' })
  ],
});

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await authService.registerUser(name, email, password);
    req.session.user = user;
    res.redirect("/profile");
    logger.info(`Usuario registrado: ${email}`);
  } catch (error) {
    logger.error(`Error al registrar usuario: ${error.message}`);
    console.log(error);
    res.redirect("/");
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authService.loginUser(email, password);
    req.session.user = user;
    res.redirect("/profile");
    logger.info(`Inicio de sesión exitoso: ${email}`);
  } catch (error) {
    logger.error(`Error al iniciar sesión: ${error.message}`);
    console.log("Error, credenciales inválidas", error);
    res.redirect("/error");
  }
};

export const logOutUser = async (req, res) => {
  try {
    await authService.logOutUser(req);
    res.redirect("/login");
    logger.info('Usuario cerró sesión');
  } catch (error) {
    logger.error(`Error al cerrar la sesión: ${error.message}`);
    console.error("Error al cerrar la sesión", error);
    res.status(500).send("Error al cerrar la sesión");
  }
};

export const recoveryPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    await authService.recoveryPassword(email, password);
    res.redirect("/login");
    logger.info(`Contraseña recuperada para el usuario: ${email}`);
  } catch (error) {
    logger.error(`Error al recuperar contraseña: ${error.message}`);
    console.error("Error al recuperar contraseña", error);
    res.status(500).send("Error al recuperar contraseña");
  }
};
