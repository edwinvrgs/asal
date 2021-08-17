import React from 'react';
import {Tab} from "semantic-ui-react";
import {ConsumirTab, ResumenTab} from './components'

// Se debe tener un pestaña con lista de los ingredientes existentes. Y esta lista debe ser actualizada cada vez que se ingrese una nueva receta
// Se debe poder seleccionar multiples recetas
// Al seleccionarse los items de la lista, se debe poder ver la información nutricional de los elemento seleccionado
// Se debe poder ver otra pestaña con una lista con las comidas consumidas (con su información nutricional por día)

const panes = [
    { menuItem: 'Consumir', render: () => <ConsumirTab /> },
    { menuItem: 'Resumen diario', render: () => <ResumenTab /> },
]

const Dashboard = () => {
    return (
        <Tab panes={panes} />
    );
};

export default Dashboard;
