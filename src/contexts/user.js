import React, { useReducer, useContext } from 'react';

const StateContext = React.createContext();
const DispatchContext = React.createContext();

const initialState = {
    logged: false,
};
const userReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_USER_LOGIN':
            const { payload: { logged, user: userInfo } } = action;

            return {
                ...state,
                logged,
                ...userInfo,
            };
        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
};

export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, { ...initialState });
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

export const updateUser = (user) => (
    {
        type: 'UPDATE_USER_LOGIN',
        payload: { logged: true, user },
    }
);
