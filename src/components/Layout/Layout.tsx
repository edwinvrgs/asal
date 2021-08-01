import React, {useState} from 'react';
import {Icon, Menu} from 'semantic-ui-react'
import {AsalLogo} from "../../assets";
import {updateUser, useUserDispatch} from "../../contexts/user";
import {logout} from "../../services";

const Layout = () => {
    const [activeItem, setActiveItem] = useState('dashboard');
    const dispatch = useUserDispatch();

    const handleItemClick = (e, { name = 'dashboard' }) => setActiveItem(name);

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
                active={activeItem === 'admin comidas'}
                onClick={handleItemClick}
            >
                Admin Comidas
            </Menu.Item>

            <Menu.Menu position='right'>
                <Menu.Item
                    name='user icon'
                    position='right'
                    active={activeItem === 'user icon'}
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
