import React, {useEffect, useState} from "react";
import {getFoods} from "../../../services";
import {Container, Header, Item, Segment, Tab} from "semantic-ui-react";

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

const style = {
    h1: {
        marginTop: '3em',
    },
    h2: {
        margin: '4em 0em 2em',
    },
    h3: {
        marginTop: '2em',
        padding: '2em 0em',
        textTransform: 'capitalize'
    },
    last: {
        marginBottom: '300px',
    },
}

const getPanes = (groupedFoods) => {
    console.log({ groupedFoods })

    const dates = groupedFoods ? Object.keys(groupedFoods) : [];

    return dates.map(date => {
        return {
            menuItem: date,
            render: () => (
                <Container>
                    {Object.keys(groupedFoods[date]).map(type => (
                        <>
                            <Header as='h4' textAlign='center' style={style.h3} content={type} />
                            <Segment.Group>
                                {groupedFoods[date][type].map(food => (
                                    <Segment>{food.nombre}</Segment>
                                ))}
                            </Segment.Group>
                        </>
                    ))}
                </Container>
            )
        }
    })
};

const ResumenTab = () => {
    const foods = useComidas();

    // We are sorting the foods by date and type
    const groupedFoods = foods ? groupFoods(foods) : foods;

    const panes = getPanes(groupedFoods);

    return (
        <Tab.Pane loading={groupedFoods === null}>
            {groupedFoods ? (
                <Tab panes={panes} />
            ) : (
                <div>No hay comidas para mostrar</div>
            )}
        </Tab.Pane>
    );
};

export default ResumenTab;
