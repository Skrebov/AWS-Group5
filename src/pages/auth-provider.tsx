// auth-context.js
import { createContext, useContext } from 'react';
import { AuthEventData } from '@aws-amplify/ui'

// Define the default value
const defaultAuthContext = {
    signOut: (data?: AuthEventData | undefined) => {
        console.warn('signOut function is not provided');
    },
};

const AuthContext = createContext(defaultAuthContext);

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({
                                 children, signOut
                             }: {
    children: React.ReactNode;
    signOut: (data?: AuthEventData | undefined) => void;
})  => {
    return (
        <AuthContext.Provider value={{ signOut }}>
            {children}
        </AuthContext.Provider>
    );
};