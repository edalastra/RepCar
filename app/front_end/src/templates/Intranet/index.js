import React, { useEffect, useState } from 'react';
import { Link, useParams, useLocation, useHistory } from 'react-router-dom';
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
        const { description, price } = values;
        const response = await apiworker.post(`/service/order/${id}/item/register`, {
            description,
            price: price.replace(',','.')
        });
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

    const setFinished = async () => {
        const response = await apiworker.get(`/service/order/${id}/finished`);
        setAlert({
            status: 'success',
            msg: 'Serviço concluido'
        });
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
                        label="Preço"
                        name="price"
                        reference={register({ required: 'Digite um valor' })}
                        type="number" min="1" step="any"
                    />
                </div>
                <div className="col m2">
                    <button class="waves-effect waves-light btn red darken-1" type="submit">
                    <i class="material-icons">add</i></button>
                </div>
            </form>
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
                        <li key={index}  className="collection-item">
                            <a className="waves-effect waves-light" onClick={() => deleteItem(item.id)} ><i class="material-icons left">close</i></a>
                            <span className="badge">R${item.price.toFixed(2)}</span>{item.description}
                            
                        </li>
                    </div>
                ))}
            </ul>
            <a class="waves-effect waves-light btn green darken-3" onClick={setFinished}>Concluir</a>
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
                            action={<Link to={`/intranet/service/checklist/${order.id}`}>Lista de itens</Link>}
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