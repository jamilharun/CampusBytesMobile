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



export default function App() {
  return (
    // <Auth0Provider domain={config.domain} clientId={config.clientId}>
    //  <AuthProvider>
        <QueryClientProvider client={new QueryClient()}>
          <AppNavigation />
        </QueryClientProvider>
    //  </AuthProvider>
    // </Auth0Provider>
  );
}

