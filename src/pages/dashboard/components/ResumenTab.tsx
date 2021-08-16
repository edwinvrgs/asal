import React, {useEffect, useState} from "react";
import {getFoods} from "../../../services";
import {Tab} from "semantic-ui-react";

type Comida = {
    name: string;
}

function useComidas() {
    const [data, setData] = useState<null | Array<Comida>>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await getFoods();
                setData(response.data);
            } catch (e) {
                console.log(e);
            }
        }

        fetchData();
    }, [])

    return data;
}

const ResumenTab = () => {
    const comidas = useComidas();

    return (
        <Tab.Pane loading={comidas === null}>
            {comidas && comidas.length > 0 ? (
                comidas.map(comida => (
                    <div>
                        {comida.name}
                    </div>
                ))) : (
                <div>No hay comidas para mostrar</div>
            )}
        </Tab.Pane>
    );
};

export default ResumenTab;
