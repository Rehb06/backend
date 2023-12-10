import { createContext, useContext, useState } from "react";
import {
  createOrderRequest,
  getOrdersRequest,
  deleteOrderRequest,
  getOrderRequest,
  updateOrderRequest
} from '../api/orders';

const OrdersContext = createContext();

export const useOrders = () => {
  const context = useContext(OrdersContext);

  if (!context) {
    throw new Error("useOrders debe estar dentro de un OrdersProvider");
  }

  return context;
};

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState([]);

  const createOrder = async (order) => {
    try {
      await createOrderRequest(order);
      getOrders(); // Llama a la función getoders después de crear un pedido
    } catch (error) {
    }
  };


  
  const getOrders = async () => {
    try {
      const res = await getOrdersRequest();
      setOrders(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteOrder = async (id) => {
    try {
      await deleteOrderRequest(id);
      setOrders(orders.filter(order => order._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const getOrderById = async (id) => {
    try {
      const res = await getOrderRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const editOrder = async (id, order) => {
    try {
      await updateOrderRequest(id, order);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <OrdersContext.Provider
      value={{
        orders,
        createOrder,
        getOrders,
        deleteOrder,
        getOrderById,
        editOrder
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
}
