import * as productsService from "../../../../services/productsService.js";
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/productsController.log' })
  ],
});

export const getProducts = async (req, res) => {
  try {
    const products = await productsService.getProducts();
    res.json(products);
    logger.info('Obtenidos todos los productos');
  } catch (error) {
    console.error("Error en getProducts controller", error);
    res.status(500).json({ error: "Error al obtener productos", message: error.message });
    logger.error(`Error al obtener productos: ${error.message}`);
  }
};

export const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await productsService.getProductById(productId);
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json(product);
    logger.info(`Obtenido producto por ID: ${productId}`);
  } catch (error) {
    console.error("Error en getProductById controller", error);
    res.status(500).json({ error: "Error al obtener el producto", message: error.message });
    logger.error(`Error al obtener producto por ID: ${error.message}`);
  }
};

export const addProduct = async (req, res) => {
  try {
    const newProduct = req.body;
    const createdProduct = await productsService.addProduct(newProduct);
    res.status(201).json(createdProduct);
    logger.info('Creado un nuevo producto');
  } catch (error) {
    console.error("Error en addProduct controller", error);
    res.status(500).json({ error: "Error al agregar el producto", message: error.message });
    logger.error(`Error al agregar un nuevo producto: ${error.message}`);
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const updatedProductData = req.body;
    const updatedProduct = await productsService.updateProduct(productId, updatedProductData);
    if (!updatedProduct) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json(updatedProduct);
    logger.info(`Producto actualizado - ID: ${productId}`);
  } catch (error) {
    console.error("Error en updateProduct controller", error);
    res.status(500).json({ error: "Error al actualizar el producto", message: error.message });
    logger.error(`Error al actualizar producto - ID: ${error.message}`);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const result = await productsService.deleteProduct(productId);
    if (!result) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json({ message: "Producto eliminado exitosamente" });
    logger.info(`Producto eliminado - ID: ${productId}`);
  } catch (error) {
    console.error("Error en deleteProduct controller", error);
    res.status(500).json({ error: "Error al eliminar el producto", message: error.message });
    logger.error(`Error al eliminar producto - ID: ${error.message}`);
  }
};
