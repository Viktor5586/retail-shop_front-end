import axios from "axios";

const apiUrl = "https://localhost:7262/api/v1/Product";

const getProductsByIds = async (productIds) => {
  try {
    const queryString = productIds.map((id) => `productIds=${id}`).join("&");
    const response = await axios.get(
      `${apiUrl}/productsFromOrder?${queryString}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching products by IDs", error);
    throw error;
  }
};

export default {
  getProductsByIds,
};
