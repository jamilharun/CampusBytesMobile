import { Auth0Provider } from "react-native-auth0";
import { AuthProvider } from "./context/AuthContext";
import AppNavigation from "./navigation/AppNavigation";
import config from "./apis/auth0_config";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Provider } from 'react-redux'
import { store } from "./store";



export default function App() {

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 2,
        refetchOnWindowFocus: false,
      },
    },
  })

  return (
    //<Auth0Provider domain={config.domain} clientId={config.clientId}>
    // <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <AppNavigation />
          </Provider>
        </QueryClientProvider>
    //  </AuthProvider>
    // </Auth0Provider>
  );
}

