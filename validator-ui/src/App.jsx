import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './AuthProvider';
import { Router } from './routes/Router';
import { AxiosInterceptors } from './services/AxiosInterceptors';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            staleTime: 0,
            refetchOnMount: true,
            refetchOnWindowFocus: false,
            refetchOnReconnect: 'always',
            suspense: false,
        },
        mutations: {
            retry: 0,
        },
    },
});

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <AxiosInterceptors>
                    <Router />
                </AxiosInterceptors>
            </AuthProvider>
        </QueryClientProvider>
    );
}

export default App;
