import axios from './axios';

export const getOrdersRequest = () => axios.get('/pedidos');
export const getOrderRequest = (id) =>axios.put('/pedidos/'+id);

export const createOrderRequest = (order) => axios.post('/pedidos',order);

export const deleteOrderRequest = (id) =>axios.delete('/pedidos/' + id);
export const updateOrderRequest = (id,order) =>axios.put('/pedidos/' + id, order);