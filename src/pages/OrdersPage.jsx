import { useEffect } from 'react';
import { useOrders } from '../context/OrdersContext';
import { useNavigate } from 'react-router-dom';
import OrderCard from '../components/OrderCard';

function OrdersForm(){
    const {register, handleSubmit} = useForm();
    const {createOrder} = useOrders();
    const navigate = useNavigate();
    
    const onSubmit = handleSubmit((data)=>{
        createOrder(data);
        navigate('/orders');

    })
}

function OrdersPage() {
    const { getOrders, orders } = useOrders();

    useEffect(() => {
        getOrders();
    }, []);

    if(orders.length === 0) {
        return <h1>No hay pedidos para listar</h1>;
    }

    return (
        <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-2'>
            {
                orders.map((order) => (
                <OrderCard order={order} 
                key={order._id} 
                />
            ))}
        </div>
    );
}

export default OrdersPage;
