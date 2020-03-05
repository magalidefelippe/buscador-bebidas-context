import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';


export const ModalContext = createContext();

const ModalProvider = (props) => {

    const [idreceta, guardarId] = useState(null);
    const [inforeceta, guardarReceta] = useState({});

    useEffect(() => {
        const obtenerReceta = async () => {
            if (!idreceta) return;
            const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idreceta}`;
            const respuesta = await axios.get(url);
            guardarReceta(respuesta.data.drinks[0])
        }
        obtenerReceta();
    }, [idreceta]);


    return (
        <ModalContext.Provider
            value={{
                inforeceta,
                guardarId,
                guardarReceta
            }}>
            {props.children}
        </ModalContext.Provider>
    );
}

export default ModalProvider;

