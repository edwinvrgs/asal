import React, {useReducer, useContext, Dispatch} from 'react';

const initialState = (user) => ({
    user: user ?? null,
    spinner: 0,
});

const StateContext = React.createContext(initialState(null));
const DispatchContext = React.createContext<Dispatch<any>>((args) => null);

const userReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_USER':
            const { payload: { user } } = action;

            return {
                ...state,
                user,
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
    const user = localStorage.getItem('user');

    const [state, dispatch] = useReducer(userReducer, initialState(user));

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
    return context;
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
        type: 'UPDATE_USER',
        payload: { user },
    }
);

export const setSpinner = (spinner) => (
    {
        type: 'UPDATE_SPINNER',
        payload: { spinner },
    }
);
