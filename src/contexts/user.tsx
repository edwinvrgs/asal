import React, { useReducer, useContext } from 'react';

const initialState = {
    logged: false,
    spinner: false,
};

const StateContext = React.createContext(initialState);
const DispatchContext = React.createContext((args) => null);

const userReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_USER_LOGIN':
            const { payload: { logged, user: userInfo } } = action;

            return {
                ...state,
                logged,
                ...userInfo,
            };
        case 'UPDATE_SPINNER':
            const { payload: { spinner } } = action;

            return {
                ...state,
                spinner,
            };
        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
};

export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, initialState);
    return (
        <StateContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>
                {children}
            </DispatchContext.Provider>
        </StateContext.Provider>
    );
};

export const useUserState = () => {
    const context = useContext(StateContext);
    if (context === undefined) {
        throw new Error('useUserState must be used within a UserProvider');
    }
    return {
        ...context,
    };
};

export const useUserDispatch = () => {
    const context = useContext(DispatchContext);
    if (context === undefined) {
        throw new Error('useUserDispatch must be used within a UserProvider');
    }
    return context;
};

export const updateUser = (user) => (
    {
        type: 'UPDATE_USER_LOGIN',
        payload: { logged: true, user },
    }
);

export const setSpinner = (spinner) => (
    {
        type: 'UPDATE_SPINNER',
        payload: { spinner },
    }
);
