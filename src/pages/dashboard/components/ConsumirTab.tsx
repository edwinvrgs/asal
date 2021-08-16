import React, {useEffect, useState} from "react";
import {getRecipes} from "../../../services";
import {Tab} from "semantic-ui-react";

type Receta = {
    name: string;
}

function useRecetas() {
    const [data, setData] = useState<null | Array<Receta>>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await getRecipes();
                setData(response.data);
            } catch (e) {
                console.log(e);
            }
        }

        fetchData();
    }, [])

    return data;
}

const ConsumirTab = () => {
    const recetas = useRecetas();

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

export default ConsumirTab;
