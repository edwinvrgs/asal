import React, {useEffect, useState} from "react";
import {getFoods} from "../../../services";
import {Tab} from "semantic-ui-react";

type Comida = {
    nombre: string;
    id: number;
    pivot: {
        fecha: string;
        tipo: string;
    }
}

const groupBy = key => array =>
    array.reduce((objectsByKeyValue, obj) => {
        const value = obj[key];
        objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
        return objectsByKeyValue;
    }, {});

function groupFoods(foods) {
    const groupByDate = groupBy('fecha');
    const groupByType = groupBy('tipo');

    const foodsGroupedByDate = groupByDate(foods)

    return Object.keys(foodsGroupedByDate).reduce((accum, key) => {
        return {
            ...accum,
            [key]: groupByType(foodsGroupedByDate[key])
        }
    }, foodsGroupedByDate);
}

function useComidas() {
    const [data, setData] = useState<Comida[] | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await getFoods();
                // Flatten the array, removing the 'pivot' property
                setData(response.data.data.map(({pivot, ...rest}) => ({...rest, ...pivot})));
            } catch (e) {
                console.log(e);
            }
        }

        fetchData();
    }, [])

    return data;
}

const ResumenTab = () => {
    const foods = useComidas();

    // We are sorting the foods by date and type
    const groupedFoods = foods ? groupFoods(foods) : foods;

    console.log({ groupedFoods })

    const dates = groupedFoods ? Object.keys(groupedFoods) : [];

    return (
        <Tab.Pane loading={groupedFoods === null}>
            {groupedFoods ? (
                <ul>
                    {dates.map(date => (
                        <li>{date}
                            <ul>
                                {Object.keys(groupedFoods[date]).map(type => (
                                    <li>
                                        {type}
                                        <ol>
                                            {groupedFoods[date][type].map(food => (
                                                <li>{food.nombre}</li>
                                            ))}
                                        </ol>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            ) : (
                <div>No hay comidas para mostrar</div>
            )}
        </Tab.Pane>
    );
};

export default ResumenTab;
