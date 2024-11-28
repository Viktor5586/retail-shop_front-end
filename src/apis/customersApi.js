import axios from "axios";

const apiUrl = "http://localhost:5220/api/v1/Customers";

const getCustomers = async () => {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching customers", error);
    throw error;
  }
};

const getCustomer = async (id) => {
  try {
    const response = await axios.get(`${apiUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching customers", error);
    throw error;
  }
};

const addCustomer = async (url, customerData) => {
  try {
    const payload = {
      firstName: customerData.firstName,
      lastName: customerData.lastName,
      email: customerData.email,
      phoneNumber: customerData.phoneNumber,
    };
    const response = await axios.post(`${apiUrl}/${url}`, payload);
    return response.data;
  } catch (error) {
    console.error("Error adding customer", error);
    throw error;
  }
};

const editCustomer = async (url, customerData) => {
  try {
    const payload = {
      customerId: customerData.customerId,
      firstName: customerData.firstName,
      lastName: customerData.lastName,
      email: customerData.email,
      phoneNumber: customerData.phoneNumber,
    };
    console.log("to api:" + customerData.phoneNumber);
    const response = await axios.put(`${apiUrl}/${url}`, payload);
    return response.data;
  } catch (error) {
    console.error("Error editing customer", error);
    throw error;
  }
};

const deleteCustomer = async (customerId) => {
  try {
    const response = await axios.delete(`${apiUrl}/${customerId}`, customerId);
    return response.data;
  } catch (error) {
    console.error("Error deleting customer", error);
    throw error;
  }
};

export default {
  getCustomers,
  getCustomer,
  addCustomer,
  editCustomer,
  deleteCustomer,
};
