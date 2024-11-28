import axios from "axios";

const apiUrl = "https://localhost:7198/api/v1/Orders/customer";

const getOrdersForCustomer = async (customerId) => {
  try {
    const response = await axios.get(`${apiUrl}/${customerId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders for customer", error);
    throw error;
  }
};

const getTotalSalesForCustomer = async (customerId) => {
  try {
    const response = await axios.get(`${apiUrl}/totalSales/${customerId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders for customer", error);
    throw error;
  }
};

const deleteOrdersForCustomer = async (customerId) => {
  try {
    const response = await axios.delete(`${apiUrl}/${customerId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting orders for customer", error);
    throw error;
  }
};

export default {
  getOrdersForCustomer,
  getTotalSalesForCustomer,
  deleteOrdersForCustomer,
};
