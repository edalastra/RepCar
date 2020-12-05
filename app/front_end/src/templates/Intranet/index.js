import React, { useEffect, useState } from 'react';
import { Link, useParams, useLocation, useHistory } from 'react-router-dom';
import SidenavComponent from '../../components/SidenavComponent';
import AlertComponent from '../../components/AlertComponent';
import api, { apiworker } from '../../api';
import Checklist from './Checklist';
import Services from './Services';
import Workers from './Workers';

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
    }, []);
    
    const routes = [
        {
            path: "/intranet",
            exact: true,
            sidebar: () => <div>Serviços</div>,
            main: () => <Services />
        },
        {
            path: "/intranet/workers",
            sidebar: () => <div>bubblegum!</div>,
            main: Workers
        },
        {
            path: "/intranet/checklist/:id",
            sidebar: () => <div>Checklist</div>,
            main: Checklist
        },
    ];

    const links = [
        {
            to: '/intranet',
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
                user={user}
            />
        </>
    );
}

export default Intranet;