import express from "express";

import * as CustomersController from "../controllers/customersRoutes";
const router = express.Router();

//READ
router.get("/", CustomersController.getCustomers);

//CREATE
router.post("/", CustomersController.createCustomer);

//GET ONE

router.get("/:id", CustomersController.getCustomer);

//UPDATE
router.patch("/:id", CustomersController.updateCustomer);
//DELETE

router.delete("/:id", CustomersController.deteleCustomer);

router.get("/:calculate/:id", CustomersController.calculate);
export default router;
