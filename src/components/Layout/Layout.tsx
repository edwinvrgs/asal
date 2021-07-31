import React, {useState} from 'react';
import {Icon, Menu} from 'semantic-ui-react'
import {AsalLogo} from "../../assets";
import {updateUser, useUserDispatch} from "../../contexts/user";

const Layout = props => {
    const [activeItem, setActiveItem] = useState('dashboard');
    const dispatch = useUserDispatch();
    const handleItemClick = (e, { name = 'dashboard' }) => setActiveItem(name)
    return (
        <Menu stackable>
            <Menu.Item>
                <img src={AsalLogo} />
            </Menu.Item>

            <Menu.Item
                name='dashboard'
                active={activeItem === 'dashboard'}
                onClick={handleItemClick}
            >
                Dashboard
            </Menu.Item>

            <Menu.Item
                name='admin comidas'
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
                    onClick={(e, props) => {
                        dispatch(updateUser(false, {}));
                        handleItemClick(e, props);
                    }}
                >
                    Sign out
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    );
};

export default Layout;
