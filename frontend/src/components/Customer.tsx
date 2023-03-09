import React, { useState } from "react";

import { Customer as CustomerModel } from "../models/customer";

import moment from "moment";
import * as CustomersApi from "../network/customer_api";
import { Box, Button, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
export interface CustomerProps {
  customer: CustomerModel;
  onDeleteCustomerClicked: (customer: CustomerModel) => void;
  onCustomerClicked: (customer: CustomerModel) => void;
  onDismiss: () => void;
}
const newStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "85vw",
  height: "90%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
};
const style1 = {
  marginBottom: 10,
};

const Customer = ({
  customer,
  onDeleteCustomerClicked,
  onCustomerClicked,
  onDismiss,
}: CustomerProps) => {
  const { name, surname, email, city, dob, _id } = customer;
 const [message, setMessage] = useState("")
  const [price, setPrice] = useState<number | undefined>(0);
  const handleCalculate = async () => {
    try {
      const calculation = await CustomersApi.calculateDiscount(_id);
      setPrice(calculation);
      console.log("customers", price);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={newStyle}>
      <Button
        style={{
          position: "absolute",
          backgroundColor: "#83adc9",
          borderRadius: 40,
          padding: 17,
          right: "3%",
          top: "3%",
          color: "black",
        }}
        onClick={onDismiss}
      >
        <CloseIcon />
      </Button>
     
      <Typography style={{ marginTop: 70, marginBottom: 50, fontSize: "180%" }}>
        Details
      </Typography>
      <Box>
        <h3 style={style1}>Name: {name}</h3>
        <h3 style={style1}>Last Name: {surname}</h3>

        <h3 style={style1}>Email: {email}</h3>
        <h3 style={style1}>City: {city}</h3>
        <h3 style={style1}>
          Date of birth: {moment(dob).format("DD-MM-YYYY")}
        </h3>

        <h3 style={style1}>Price: {price ? price : null}</h3>

        <Button
          style={{
            marginTop: 20,
            backgroundColor: "#83adc9",
            padding: 5,
            color: "black",
            width: 200,
          }}
          onClick={handleCalculate}
        >
          Calculate price
        </Button>

        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 10,
          }}
        >
          <button
            onClick={(e) => {
              setMessage("Customer has been deleted!")
              onDeleteCustomerClicked(customer);
              e.stopPropagation();
            }}
            style={{
              padding: 20,
              margin: 10,
              width: 100,
              borderRadius: 20,
              backgroundColor: "#83adc9",
            }}
          >
            DELETE
          </button>
          <button
            style={{
              padding: 20,
              margin: 10,
              width: 100,
              borderRadius: 20,
              backgroundColor: "#83adc9",
            }}
            onClick={() => {
              onCustomerClicked(customer);
            }}
          >
            EDIT
          </button>

        
        </Box>
        {message}
      </Box>
    </Box>
  );
};

export default Customer;
