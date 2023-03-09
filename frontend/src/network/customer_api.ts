import { Customer } from "../models/customer";

async function fetchData(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init);
  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json();
    const errorMessage = errorBody.error;
    throw Error(errorMessage);
  }
}

export async function fetchCustomers(): Promise<Customer[]> {
  const response = await fetchData("/api/customers", { method: "GET" });
  return response.json();
}

export async function fetchCustomer(customerId: string): Promise<Customer[]> {
  const response = await fetchData("/api/customers/" + customerId, {
    method: "GET",
  });
  return response.json();
}

export async function calculateDiscount(customerId: string): Promise<number> {
  const response = await fetchData("/api/customers/calculate/" + customerId, {
    method: "GET",
  });
  return response.json();
}
export interface CustomerInput {
  name: string;
  surname: string;
  email: string;
  city: string;
  dob: Date;
}
export async function createCustomer(
  customer: CustomerInput
): Promise<Customer> {
  const response = await fetchData("/api/customers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customer),
  });
  return response.json();
}

export async function updateCustomer(
  customerId: string,
  customer: CustomerInput
): Promise<Customer> {
  const response = await fetchData("/api/customers/" + customerId, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customer),
  });
  return response.json();
}

export async function deleteCustomer(customerId: string) {
  await fetchData("/api/customers/" + customerId, { method: "DELETE" });
}
