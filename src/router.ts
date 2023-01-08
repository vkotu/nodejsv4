import { Router } from "express";
import { body, oneOf } from 'express-validator';
import { createProduct, updateProduct, getProduct, deleteProduct, getOneProduct} from './handlers/product';
import { createUpdate, deleteUpdate, getOneUpdate, getUpdates, updateUpdate } from "./handlers/update";
import { handleInputError } from './modules/middleware';

const router = Router();
/*
 * Product
*/
router.get("/product", getProduct)

router.get("/product/:id", getOneProduct);

router.post("/product",body('name').isString(),handleInputError, createProduct);

router.put("/product/:id",  body('name').isString(),handleInputError,  updateProduct);

router.delete("/product/:id", deleteProduct);

/**
 * Update
 */

router.get("/update", getUpdates);

router.get("/update/:id", getOneUpdate);

router.post("/update",
    body('title').exists().isString(),
    body('body').exists().isString(),
    body('productId').exists().isString(),
   createUpdate
);

router.put("/update/:id",
    body('title').optional(),
    body('body').optional(),
    body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']).optional(),
    body('version').optional, 
   updateUpdate
);

router.delete("/update/:id", deleteUpdate);

/**
 * UpdatePoint
 */

router.get("/updatepoint", (req, res) => {});

router.get("/updatepoint/:id", (req, res) => {});

router.put("/updatepoint/:id", 
body('name').optional().isString(),
body('description').optional().isString(),
(req, res) => {});

router.post("/updatepoint",
body('name').exists().isString(),
body('description').exists().isString(),
(req, res) => {});

router.delete("/updatepoint/:id", (req, res) => {});

router.use((err, req, res, next) => {

        res.status(400).json({message: 'invalid input router'})

})

export default router;