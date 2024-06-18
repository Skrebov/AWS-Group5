import { createContext, useContext, ReactNode } from 'react';
import { AuthEventData } from '@aws-amplify/ui';

// Define the default value
const defaultAuthContext = {
    signOut: (data?: AuthEventData | undefined) => {
        console.warn('signOut function is not provided', data);
    },
};

const AuthContext = createContext(defaultAuthContext);

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({
                                 children,
                                 signOut = defaultAuthContext.signOut,  // Provide default value here
                             }: {
    children: ReactNode;
    signOut?: (data?: AuthEventData | undefined) => void;
}) => {
    return (
        <AuthContext.Provider value={{ signOut }}>
            {children}
        </AuthContext.Provider>
    );
};