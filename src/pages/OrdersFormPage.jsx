import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { IoBagAdd } from 'react-icons/io5';
import { useOrders } from '../context/OrdersContext';

const OrdersFormPage = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  {
    defaultValues: {
      Product: String
    }
  };
  const { createOrder, getOrderById, editOrder } = useOrders();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadOrder() {
      if (id) {
        const orderData = await getOrderById(id);
        setValue('Product', orderData.Product);
        setValue('DateOrder', orderData.DateOrder);
        setValue('Status', orderData.Status);
      }
    }
    loadOrder();
  }, [id, getOrderById, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (id) {
        await editOrder(id, data);
      } else {
        await createOrder(data);
      }
      navigate('/orders');
    } catch (error) {
      console.error('Error al actualizar el pedido:', error);
      // Manejar el error, mostrar un mensaje al usuario, etc.
    }
  });

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <form onSubmit={onSubmit}>
          <h1 className="text-3xl font-bold my-2">Pedidos</h1>
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Nombre del pedido"
            {...register('name', { required: true })}
            autoFocus
          />
          {errors.name && <div className="text-red-500">Nombre del pedido es requerido</div>}

          <label htmlFor="DateOrder">Fecha</label>
          <input
            type="number"
            step="0.10"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="fecha del pedido"
            {...register('DateOrder', {
              required: true,
              min: 0.0,
              valueAsNumber: true,
            })}
          />
          {errors.DateOrder && <div className="text-red-500">Fecha del pedido es requerido</div>}
          {errors.DateOrder?.type === 'min' && <div className="text-red-500">La fecha minima es 20</div>}

          <label htmlFor="Status">Estado</label>
          <input
            type="text"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Estado del pedido"
            {...register('Status', { required: true })}
          />
          {errors.Status && <div className="text-red-500">El estado es requerido cancelado/entregado</div>}


          <button className="bg-zinc-700 px-3 py-3 rounded-md" type="submit">
            <IoBagAdd size={30} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrdersFormPage;
