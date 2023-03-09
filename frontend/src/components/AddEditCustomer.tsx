import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import { CustomerInput } from "../network/customer_api";
import * as CustomerApi from "../network/customer_api";
import { Customer } from "../models/customer";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80vw",
  height: "90%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 7,
};

interface AddEditCustomerProps {
  customerToEdit?: Customer;
  onDismiss: () => void;
  onCustomerSaved: (customer: Customer) => void;
}

const AddEditCustomer = ({
  customerToEdit,
  onDismiss,
  onCustomerSaved,
}: AddEditCustomerProps) => {
  const { register, handleSubmit } = useForm<CustomerInput>({
    defaultValues: {
      name: customerToEdit?.name || "",
      surname: customerToEdit?.surname || "",
      email: customerToEdit?.email || "",
      city: customerToEdit?.city || "",
      dob: customerToEdit?.dob,
    },
  });

  async function onSubmit(input: CustomerInput) {
    try {
      let customerResponse: Customer;
      if (customerToEdit) {
        customerResponse = await CustomerApi.updateCustomer(
          customerToEdit._id,
          input
        );
      } else {
        customerResponse = await CustomerApi.createCustomer(input);
      }
      onCustomerSaved(customerResponse);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Box sx={style}>
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
      <Typography style={{ fontSize: "140%" }}>
        {customerToEdit ? "Edit customer" : "Add customer"}
      </Typography>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          width: "100%",
          height: "85%",
          marginTop: 2,
          flexDirection: "column",
        }}
      >
        <form
          className="myForm"
          id="addEditCustomerForm"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label>
            Name:
            <input
              type="text"
              {...register("name", { required: "Required" })}
            />
          </label>

          <label>
            Last Name:
            <input
              type="text"
              {...register("surname", { required: "Required" })}
            />
          </label>

          <label>
            Email:
            <input
              type="text"
              {...register("email", { required: "Required" })}
            />
          </label>

          <label>
            City:
            <input
              type="text"
              {...register("city", { required: "Required" })}
            />
          </label>

          <label>
            Date of birth:
            <input
              type="date"
              min="1917-04-01"
              max={new Date().toISOString().slice(0, -14)}
              {...register("dob", { required: "Required" })}
            />
          </label>
        </form>

        <Box>
          <Button
            style={{
              color: "black",
              backgroundColor: "#83adc9",
              padding: 10,
              width: 100,
              marginTop: 10,
              fontSize: "1rem",
            }}
            type="submit"
            form="addEditCustomerForm"
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AddEditCustomer;
