import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({
    token: null as string | null,
    isAuthenticated: false,
    isInitializing: true,
    authenticate: (_token: string) => {},
    logout: () => {}
});

export default function AuthContextProvider({ children }: { children: React.ReactNode }) {
    const [authToken, setAuthToken] = useState<string | null>(null);
    const [isInitializing, setIsInitializing] = useState<boolean>(true);

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                setAuthToken(token);
            } catch (error) {
                console.error('Failed to read auth token from storage', error);
            } finally {
                setIsInitializing(false);
            }
        };
        fetchToken();
    }, []);

    async function authenticate(token: string) {
        setAuthToken(token);
        try {
            await AsyncStorage.setItem('token', token);
        } catch (error) {
            console.error('Failed to persist auth token', error);
        }
    }

    async function logout() {
        setAuthToken(null);
        try {
            await AsyncStorage.removeItem('token');
        } catch (error) {
            console.error('Failed to remove auth token', error);
        }
    }

    const value = {
        token: authToken,
        isAuthenticated: !!authToken,
        isInitializing,
        authenticate,
        logout
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthContextProvider');
    }
    return context;
};