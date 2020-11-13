import React, { createContext, Children, useState } from 'react';
import api from '../api';

const Context = createContext();


const AuthProvider = ({ children }) => {


    return(
        <Context.Provider value={{ authenticated: false, }}>
            {children}
        </Context.Provider>
    )
};

export { Context, AuthProvider };