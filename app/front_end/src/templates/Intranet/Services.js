import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as format from 'date-format';
import CardComponent from '../../components/CardComponent';
import AlertComponent from '../../components/AlertComponent';
import { apiworker } from '../../api';

const Services = () => {

    const [orders, setOrders] = useState([]);
    const [alert, setAlert] = useState({});


    useEffect(() => {
        (async () => {
            try {
                const response = await apiworker.get('/services/worker/');
                setOrders(response.data)
            } catch (err) {
                setAlert({
                    msg: 'Erro ao carregar dados',
                    status: 'danger'
                })
            }
        })()
    }, [])

    return (

        <>
            <AlertComponent msg={alert.msg} status={alert.status} />
            <div class="row">
                <ul className="collection">
                    {
                        orders.length > 0 ? (
                            <div class="row">
                                {orders.map((order, i) =>
                                    <div class="col s12 m4 ">
                                        <CardComponent key={i}
                                            title={format('dd/MM', new Date(order.date))}
                                            text={order.service.description}
                                            notes={order.service.notes}
                                            action={<Link to={`/intranet/checklist/${order.id}`}>Lista de itens</Link>}
                                            status={order.status}
                                        />
                                    </div>
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

export default Services;