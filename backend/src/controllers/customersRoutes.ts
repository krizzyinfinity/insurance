import { RequestHandler } from "express";
import createHttpError from "http-errors";
import moment from "moment";
import mongoose from "mongoose";

import CustomerModel from "../models/customer";

//READ
export const getCustomers: RequestHandler = async (req, res, next) => {
  try {
    const customer = await CustomerModel.find().exec();
    res.status(200).json(customer);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
//CREATE

interface CreateCustomerBody {
  name?: string;
  surname?: string;
  email?: string;
  city?: string;
  dob?: Date;
}
export const createCustomer: RequestHandler<
  unknown,
  unknown,
  CreateCustomerBody,
  unknown
> = async (req, res, next) => {
  const name = req.body.name;
  const surname = req.body.surname;
  const email = req.body.email;
  const city = req.body.city;
  const dob = req.body.dob;

  try {
    if (!name || !surname || !email || !city || !dob) {
      throw createHttpError(400, "Some fields are missing");
    }
    const savedCustomer = await CustomerModel.create({
      name: name,
      surname: surname,
      city: city,
      email: email,
      dob: moment(dob).format("DD-MM-YYYY"),
    });
    res.status(200).json(savedCustomer);
  } catch (error) {
    next(error);
  }
};

//UPDATE

interface UpdateCustomerParams {
  id: string;
}

interface UpdateCustomerBody {
  name?: string;
  surname?: string;
  email?: string;
  city?: string;
  dob?: Date;
}

export const updateCustomer: RequestHandler<
  UpdateCustomerParams,
  unknown,
  UpdateCustomerBody,
  unknown
> = async (req, res, next) => {
  const customerId = req.params.id;
  const name = req.body.name;
  const surname = req.body.surname;
  const email = req.body.email;

  const city = req.body.city;
  const dob = req.body.dob;
  try {
    if (!mongoose.isValidObjectId(customerId)) {
      throw createHttpError(400, "Invalid customer id");
    }
    if (!name || !surname || !email || !city || !dob) {
      throw createHttpError(400, "Some fields are missing");
    }
    const customer = await CustomerModel.findById(customerId).exec();
    res.status(200).json(customer);
    if (!customer) {
      throw createHttpError(404, "Customer is not found");
    }
    customer.name = name;
    customer.surname = surname;
    customer.city = city;
    customer.email = email;
    customer.dob = dob;

    const updatedCustomer = await customer.save();
    res.status(200).json(updatedCustomer);
  } catch (error) {
    next(error);
  }
};

//GET ONE

export const getCustomer: RequestHandler = async (req, res, next) => {
  const customerId = req.params.id;
  try {
    if (!mongoose.isValidObjectId(customerId)) {
      throw createHttpError(400, "Invalid customer id");
    }
    const customer = await CustomerModel.findById(customerId).exec();
    if (!customer) {
      throw createHttpError(404, "Customer is not found");
    }
    res.status(200).json(customer);
  } catch (error) {
    next(error);
  }
};

//DELETE

export const deteleCustomer: RequestHandler = async (req, res, next) => {
  const customerId = req.params.id;
  try {
    if (!mongoose.isValidObjectId(customerId)) {
      throw createHttpError(400, "Invalid customer id");
    }
    const customer = await CustomerModel.findByIdAndDelete(customerId);
    if (!customer) {
      throw createHttpError(400, "Customer not found");
    }
    res.status(200).json("Customer has been deleted");
  } catch (error) {
    next(error);
  }
};
// calculation
export const calculate: RequestHandler = async (req, res, next) => {
  const customerId = req.params.id;

  try {
    const customer = await CustomerModel.findById(customerId).exec();

    const age = Math.round(
      moment
        .duration(moment(moment(), "DD-MM-YYYY").diff(customer?.dob))
        .asYears()
    );
    const city = customer?.city;
    let amount = 700;
    switch (city) {
      case "zagreb":
        amount = 1000;
        break;
      case "split":
        amount = 950;
        break;
      case "rijeka":
        amount = 900;
        break;
      case "osijek":
        amount = 900;
        break;
      case "zadar":
        amount = 800;
        break;
      default:
        amount = 700;
    }

    let discount = 0;

    switch (true) {
      case age < 20:
        discount = 0.2;
        break;
      case age >= 20 && age < 30:
        discount = 0.1;
        break;
      case age >= 30 && age < 40:
        discount = 0.05;
        break;
      case age >= 40 && age < 60:
        discount = 0.02;
        break;
      default:
        discount = 0;
    }
    const total = amount - amount * discount;

    res.status(200).json(total);
  } catch (error) {
    next(error);
  }
};
