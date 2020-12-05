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
            price: price.replace(',', '.')
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
        <h5 class="center-align">Lista de reparos efetuados</h5>
        <div className="container">
            <div className="row">
                <form onSubmit={handleSubmit(submit)}>
                    <div className="col m6">
                        <InputComponent
                            type="text"
                            label="Descrição"
                            name="description"
                            reference={register({ required: 'Digite uma descrição' })}
                            errorMessages={errors.description && errors.description.message}

                        />
                    </div>
                    <div className="col m2">
                        <InputComponent
                            label="Preço R$"
                            name="price"
                            reference={register({ required: 'Digite um valor' })}
                            type="number" min="1" step="any"
                            errorMessages={errors.price && errors.price.message}

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
                            <li key={index} className="collection-item">
                                <a className="waves-effect waves-light" onClick={() => deleteItem(item.id)} ><i class="material-icons left">close</i></a>
                                <span className="badge">R${item.price.toFixed(2)}</span>{item.description}

                            </li>
                        </div>
                    ))}
                </ul>
                <a class="waves-effect waves-light btn green darken-3" onClick={setFinished}>Marcar como concluido</a>
            </div>
        </div>

    </>)
}

export default Checklist;