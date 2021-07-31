import React, { useReducer, useContext } from 'react';
const StateContext = React.createContext();
const DispatchContext = React.createContext();

const initialState = {
    logged: false,
};
const reducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_USER':
            const { payload: { user: userInfo } } = action;

            return {
                ...state,
                ...userInfo,
            };
        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
};

export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, { ...initialState });
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
