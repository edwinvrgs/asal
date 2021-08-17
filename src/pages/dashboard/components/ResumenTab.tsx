import React, {useEffect, useState} from "react";
import {getFoods} from "../../../services";
import {Container, Header, Segment, Tab} from "semantic-ui-react";

type Comida = {
    nombre: string;
    id: number;
    pivot: {
        fecha: string;
        tipo: string;
    }
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

function useComidas() {
    const [data, setData] = useState<Comida[] | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await getFoods();
                setData(response.data.data);
            } catch (e) {
                console.log(e);
            }
        }

        fetchData();
    }, [])

    return data;
}

const getPanes = (foods) => {
    console.log({ foods })

    if (!foods) {
        return null;
    }

    const dates = foods ? Object.keys(foods) : [];

    return dates.map(date => {
        return {
            menuItem: date,
            render: () => (
                <Container>
                    {Object.keys(foods[date]).map(type => {
                        const { calorias, carbohidratos, grasas, proteinas, recetas } = foods[date][type];

                        return (
                            <>
                                <Header as='h4' textAlign='center' style={style.h3} content={type} />
                                <Segment.Group>
                                    <Segment>
                                        <b>Carbohidratos:</b> {carbohidratos}
                                        {' - '}
                                        <b>Calorias:</b> {calorias}
                                        {' - '}
                                        <b>Grasas:</b> {grasas}
                                        {' - '}
                                        <b>Proteinas:</b> {proteinas}
                                    </Segment>
                                </Segment.Group>
                                <Segment.Group>
                                    {recetas.map(recipe => (
                                        <Segment>{recipe.nombre}</Segment>
                                    ))}
                                </Segment.Group>
                            </>
                        )
                    })}
                </Container>
            )
        }
    })
};

const ResumenTab = () => {
    const foods = useComidas();

    const panes = getPanes(foods);

    return (
        <Tab.Pane loading={foods === null}>
            {panes ? (
                <Tab panes={panes} />
            ) : (
                <div>No hay comidas para mostrar</div>
            )}
        </Tab.Pane>
    );
};

export default ResumenTab;
