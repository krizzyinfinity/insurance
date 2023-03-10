import React, { useEffect, useState } from "react";
import moment from "moment";

import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import AddEditCustomer from "../components/AddEditCustomer";
import Customer from "../components/Customer";

import { Customer as CustomerModel } from "../models/customer";
import * as CustomersApi from "../network/customer_api";
import { Box, Typography } from "@mui/material";

const Home = () => {
  const [customerToEdit, setCustomerToEdit] = useState<CustomerModel | null>(
    null
  );
  const [customerNew, setCustomerNew] = useState<CustomerModel | any>();
  const [customers, setCustomers] = useState<CustomerModel[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  async function deleteCustomer(customer: CustomerModel) {
    try {
      await CustomersApi.deleteCustomer(customer._id);
      setCustomers(
        customers.filter(
          (existingCustomer) => existingCustomer._id !== customer._id
        )
      );
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customers = await CustomersApi.fetchCustomers();
        setCustomers(customers);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <Box>
      <Typography variant="h3" style={{ marginTop: 30, marginBottom: 40 }}>
        My insurance
      </Typography>
      <button
          style={{
            marginTop: 20,
            padding: 20,
            fontSize: "120%",
            borderRadius: 20,
          }}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          Add new user
        </button>
      <Box style={{ margin: 20 }}>
        <Table>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Last Name</Th>
              <Th>E-mail</Th>
              <Th>City</Th>
              <Th>Birthdate</Th>

              <Th>Details</Th>
            </Tr>
          </Thead>
          {customers.map((customer) => {
            return (
              <>
                <Tbody>
                  <Tr key={customer._id}>
                    <Td>{customer.name}</Td>
                    <Td>{customer.surname}</Td>
                    <Td>{customer.email}</Td>
                    <Td>{customer.city}</Td>
                    <Td>{moment(customer.dob).format("DD-MM-YYYY")}</Td>

                    <Td>
                      <button
                        style={{
                          marginTop: 20,
                          padding: 10,
                          fontSize: "100%",
                        }}
                        onClick={() => {
                          setCustomerNew(customer);
                          console.log("button", customer);
                          setIsOpen2(!isOpen2);
                        }}
                      >
                        Details
                      </button>
                    </Td>
                  </Tr>
                </Tbody>
              </>
            );
          })}
        </Table>
        {isOpen2 && (
          <Customer
            onDismiss={() => setIsOpen2(false)}
            customer={customerNew}
            onDeleteCustomerClicked={deleteCustomer}
            onCustomerClicked={setCustomerToEdit}
          />
        )}
        

        {isOpen && (
          <AddEditCustomer
            onDismiss={() => setIsOpen(false)}
            onCustomerSaved={(newCustomer) => {
              setCustomers([...customers, newCustomer]);
              setIsOpen(false);
            }}
          />
        )}
        {customerToEdit && (
          <AddEditCustomer
            customerToEdit={customerToEdit}
            onDismiss={() => setCustomerToEdit(null)}
            onCustomerSaved={(updatedCustomer) => {
              setCustomers(
                customers.map((existingCustomer) =>
                  existingCustomer._id === updatedCustomer._id
                    ? updatedCustomer
                    : existingCustomer
                )
              );
              setCustomerToEdit(null);
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default Home;
