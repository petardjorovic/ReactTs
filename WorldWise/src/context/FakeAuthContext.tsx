import { createContext, useContext, useReducer } from 'react';

type AuthCtxType = {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => void;
    logout: () => void;
};

type User = {
    name: string;
    email: string;
    password: string;
    avatar: string;
};

type InitState = {
    user: User | null;
    isAuthenticated: boolean;
};

type ActionType = { type: 'login'; payload: User } | { type: 'logout' };

const AuthContext = createContext<AuthCtxType | undefined>(undefined);

const initialState: InitState = {
    user: null,
    isAuthenticated: false,
};

function reducer(state: InitState, action: ActionType) {
    switch (action.type) {
        case 'login':
            return { ...state, isAuthenticated: true, user: action.payload };
        case 'logout':
            return { ...state, isAuthenticated: false, user: null };
        default:
            throw new Error('Unknown type');
    }
}

const FAKE_USER = {
    name: 'Jack',
    email: 'jack@example.com',
    password: 'qwerty',
    avatar: 'https://i.pravatar.cc/100?u=zz',
};

function AuthProvider({ children }: { children: React.ReactNode }) {
    const [{ user, isAuthenticated }, dispatch] = useReducer(reducer, initialState);

    function login(email: string, password: string) {
        if (email === FAKE_USER.email && password === FAKE_USER.password) {
            dispatch({ type: 'login', payload: FAKE_USER });
        }
    }

    function logout() {
        dispatch({ type: 'logout' });
    }

    return <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>{children}</AuthContext.Provider>;
}

function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error('CitiesContext must be used with the FakeAuthProvider');
    return context;
}

export { AuthProvider, useAuth };
