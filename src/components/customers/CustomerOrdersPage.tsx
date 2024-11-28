import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ordersApi from '../../apis/ordersApi';
import productsApi from '../../apis/productsApi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Order {
  customerId: number;
  orderId: number;
  orderDate: string;
  totalAmount: number;
  status: string;
  orderItems: OrderItem[];
  shopId: number;
}

interface Product {
    productId: number;
    productName: string;
    price: number;
  }
  
  interface OrderItem {
    orderId: number;
    orderItemId: number;
    pricePerUnit: number;
    productId: number;
    lineTotal: number;
    quantity: number;
    product?: Product;
  }

const CustomerOrdersPage: React.FC = () => {
  const { customerId } = useParams<{ customerId: string }>();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalSales, setTotalSales] = useState<number>(0);

  const fetchProductsByIds = async (productIds: number[]): Promise<Product[]> => {
    try {
      const productsData = await productsApi.getProductsByIds(productIds);
      return productsData;
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const numericCustomerId = Number(customerId);
        const ordersData = await ordersApi.getOrdersForCustomer(numericCustomerId);
        const normalizedOrders = Array.isArray(ordersData) ? ordersData : [ordersData];
        const productIds = new Set<number>();

        for (let order of normalizedOrders) {
          for (let orderItem of order.orderItems) {
            productIds.add(orderItem.productId);
          }
        }
        const products = await fetchProductsByIds(Array.from(productIds));
        const productsMap = new Map<number, Product>();
        products.forEach((product) => {
          productsMap.set(product.productId, product);
        });

        for (let order of normalizedOrders) {
          for (let orderItem of order.orderItems) {
            orderItem.product = productsMap.get(orderItem.productId) || null;
          }
        }

        const totalSalesAmount = await ordersApi.getTotalSalesForCustomer(numericCustomerId);
        setOrders(normalizedOrders);
        setTotalSales(totalSalesAmount);
      } catch (error) {
        console.error(error);
        toast.error('Failed to load orders. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [customerId]);

  return (
    <div className="container">
      <h2>Orders for Customer ID: {customerId}</h2>
      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders found for this customer.</p>
      ) : (
        <>
          <h3>Total Sales: ${totalSales.toFixed(2)}</h3>

          <table className="table table-striped">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Order Date</th>
                <th>Total Amount</th>
                <th>Status</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <React.Fragment key={order.orderId}>
                  {order.orderItems.map((orderItem) => (
                    <tr key={orderItem.orderItemId}>
                      <td>{order.orderId}</td>
                      <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                      <td>${order.totalAmount.toFixed(2)}</td>
                      <td>{order.status}</td>
                      <td>{orderItem.product?.productName || 'Loading product...'}</td>
                      <td>${orderItem.pricePerUnit.toFixed(2)}</td>
                      <td>{orderItem.quantity}</td>
                      <td>{orderItem.lineTotal.toFixed(2)}</td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default CustomerOrdersPage;