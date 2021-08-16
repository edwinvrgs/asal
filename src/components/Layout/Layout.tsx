import React, {useState} from 'react';
import { useLocation } from 'react-router-dom'
import {Icon, Menu} from 'semantic-ui-react'
import {AsalLogo} from "../../assets";
import {updateUser, useUserDispatch} from "../../contexts/user";
import {logout} from "../../services";
import {useHistory} from "react-router-dom";

const Layout = () => {
    const location = useLocation();

    const [activeItem, setActiveItem] = useState(location.pathname.split('/').slice(-1)[0]);

    const dispatch = useUserDispatch();
    const history = useHistory();

    const handleItemClick = (e, { name = 'dashboard' }) => {
        setActiveItem(name);
        history.push(name)
    }

    const onLogout = async (e, props) => {
        try {
            await logout();

            dispatch(updateUser(null));

            handleItemClick(e, props);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Menu stackable>
            <Menu.Item>
                <img src={AsalLogo}  alt="Logo de ASAL"/>
            </Menu.Item>

            <Menu.Item
                name='dashboard'
                active={activeItem === 'dashboard'}
                onClick={handleItemClick}
            >
                Dashboard
            </Menu.Item>

            <Menu.Item
                name='comidas'
                active={activeItem === 'comidas'}
                onClick={handleItemClick}
            >
                Admin Comidas
            </Menu.Item>

            <Menu.Menu position='right'>
                <Menu.Item
                    name='perfil'
                    position='right'
                    active={activeItem === 'perfil'}
                    onClick={handleItemClick}
                >
                    <Icon name='user' />
                </Menu.Item>

                <Menu.Item
                    name='sign-in'
                    position='right'
                    active={activeItem === 'sign-in'}
                    onClick={onLogout}
                >
                    Sign out
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    );
};

export default Layout;
