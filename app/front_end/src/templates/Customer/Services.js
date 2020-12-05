import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../api';
import AlertComponent from '../../components/AlertComponent';

export const Checklist = () => {
    const { id } = useParams();
    const [alert, setAlert] = useState({});
    const [items, setItems] = useState([]);

    useEffect(() => {
        (async () => {
            const response = await api.get(`/service/order/${id}/item`);
            setItems(response.data);
        })();
    }, [])


    return (<>

        <AlertComponent msg={alert.msg} status={alert.status} />
        <div className="row">
            <h3>Nota de serviço</h3>
        </div>
        <div className="row">
            <ul class="collection">
                <li className="collection-item">
                    <span className="badge">
                        R${items.reduce((total, item) => total + item.price, 0).toFixed(2)}
                    </span>Total
            </li>
                {items.map((item, index) => (
                    <div>
                        <li key={index} className="collection-item">
                            <span className="badge">R${item.price.toFixed(2)}</span>{item.description}
                        </li>
                    </div>
                ))}
            </ul>
        </div>
    </>)
}

export const Services = () => {

    const [orders, setOrders] = useState([]);


    useEffect(() => {
        (async () => {
            try {
                const response = await api.get('/user/services');
                setOrders(response.data)
            } catch (err) {
                console.log(err)
            }
        })()
    }, [])

    return (

        <>
            <div class="row">
                <ul className="collection">
                    {
                        orders ? (
                            <div>
                                <h5 class="center-align">Serviços</h5>
                                {orders.map((order, i) =>
                                    <Link  to={`/customer/checklist/${order.id}`}>
                                        <a disabled={order.status !== 'finished'} class={`collection-item `}>
                                            <span class="badge">{order.status}
                                            </span>{`${order.vehicle.model.brand.name} - ${order.vehicle.model.name}`}</a>
                                    </Link>
                                )}
                            </div>

                        )
                            :
                            <h5 class="center-align">Não há serviços agendados</h5>
                    }

                </ul>
            </div>
        </>
    )
}