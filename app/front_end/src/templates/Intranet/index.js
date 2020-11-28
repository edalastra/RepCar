import React, { useEffect, useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import * as format from 'date-format';
import { useForm } from "react-hook-form";
import InputComponent from '../../components/InputComponent';
import SidenavComponent from '../../components/SidenavComponent';
import CardComponent from '../../components/CardComponent';
import AlertComponent from '../../components/AlertComponent';
import api, { apiworker } from '../../api';

const Checklist = () => {
    const { id } = useParams();
    const { handleSubmit, register, errors, watch } = useForm();
    const [alert, setAlert] = useState({});
    const [items, setItems] = useState([]);

    useEffect(() => {
        loadItems()
    }, [])

    const submit = async values => {
        const response = await apiworker.post(`/service/order/${id}/item/register`, values);
        loadItems();
        console.log(items)
        setAlert({
            status: 'success',
            msg: 'Item adicionado com sucesso'
        });
    }

    const loadItems = async () => {
        const response = await apiworker.get(`/service/order/${id}/item`);
        setItems(response.data);
    }

    const deleteItem = async itemId => {
        const response = await apiworker.delete(`/service/order/${id}/item/${itemId}/delete`);
        setAlert({
            status: 'success',
            msg: 'Item deletado com sucesso'
        });
        loadItems();
    }

    return (<>

        <AlertComponent msg={alert.msg} status={alert.status} />
        <div className="row">
            <form onSubmit={handleSubmit(submit)}>
                <div className="col m6">
                    <InputComponent
                        type="text"
                        label="Descrição"
                        name="description"
                        reference={register({ required: 'Digite uma descrição' })}
                    />
                </div>
                <div className="col m2">
                    <InputComponent
                        type="text"
                        label="Preço"
                        name="price"
                        reference={register({ required: 'Digite um valor' })}
                    />
                </div>
                <div className="col m2">
                    <button type="submit">Adicionar</button>
                </div>
            </form>
        </div>
        <div className="row">
            <ul class="collection">
                {items.map((item, index) => (
                    <div>
                        <a onClick={() => deleteItem(item.id)} ><span>&#10006;</span></a>
                        <li key={index} href="#!" className="collection-item">
                            <span className="badge">R${item.price}</span>{item.description}
                        </li>
                    </div>

                ))}
            </ul>
        </div>
    </>)
}

const Services = () => {

    const [orders, setOrders] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const response = await apiworker.get('/services/worker/');
                console.log(response.data)
                setOrders(response.data)
            } catch (err) {
                console.log(err)
            }
        })()
    }, [])


    return (

        <>

            <div class="row">
                {orders.map((order, i) =>
                    <div class="col s12 m4 ">
                        <CardComponent key={i}
                            title={`${format('dd/MM', new Date(order.date))} - ${order.shift}`}
                            text={order.service.description}
                            notes={order.service.notes}
                            action={<Link to={`/intranet/service/checklist/${order.id}`}>Concluir</Link>}
                            status={order.status}
                        />
                    </div>
                )}
            </div>
        </>
    )
}


const Intranet = () => {
    const [user, setUser] = useState({})
    useEffect(() => {
        (async () => {
            try {
                const response = await apiworker.get('/user/worker/me');
                console.log(response.data)
                setUser(response.data);
            } catch (err) {
                console.log(err)
            }
        })()
    }, [])
    const { name, email } = user


    const routes = [
        {
            path: "/intranet/services",
            exact: true,
            sidebar: () => <div>Serviços</div>,
            main: () => <Services />
        },
        {
            path: "/intranet/workers",
            sidebar: () => <div>bubblegum!</div>,
            main: () => <h2>Bubblegum</h2>
        },
        {
            path: "/intranet/service/checklist/:id",
            sidebar: () => <div>Checklist</div>,
            main: Checklist
        },
    ];

    const links = [
        {
            to: '/intranet/services',
            label: 'Serviços'
        },
        {
            to: '/intranet/workers',
            label: 'Funcionários'
        }
    ]


    return (
        <>
            <SidenavComponent
                routes={routes}
                links={links}
            />
        </>
    );
}

export default Intranet;