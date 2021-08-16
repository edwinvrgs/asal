import React, {useEffect, useState} from 'react';
import {Tab} from "semantic-ui-react";
import {getFoodsFetch} from "../../services";

// Se debe tener un pestaña con lista de los ingredientes existentes. Y esta lista debe ser actualizada cada vez que se ingrese una nueva receta
// Se debe poder seleccionar multiples recetas
// Al seleccionarse los items de la lista, se debe poder ver la información nutricional de los elemento seleccionado
// Se debe poder ver otra pestaña con una lista con las comidas consumidas (con su información nutricional por día)

type Receta = {
    name: string;
}

const ConsumirTab = () => {
    const [recetas, setRecetas] = useState<null | Array<Receta>>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await getFoodsFetch();
                setRecetas(response.data);
            } catch (e) {
                console.log(e);
            }
        }

        fetchData();
    }, [])

    return (
        <Tab.Pane loading={recetas === null}>
            {recetas && recetas.length > 0 ? (
                recetas.map(receta => (
                <div>
                    {receta.name}
                </div>
            ))) : (
                <div>No hay recetas para mostrar</div>
            )}
        </Tab.Pane>
    );
};

const ResumenTab = () => {


    return (
        <Tab.Pane>Resumen</Tab.Pane>
    );
};

const panes = [
    { menuItem: 'Consumir', render: () => <ConsumirTab /> },
    { menuItem: 'Resumen diario', render: () => <ResumenTab /> },
]

const Dashboard = () => {
    const [data, setData] = useState(null);

    return (
        <Tab panes={panes} />
    );
};

export default Dashboard;
