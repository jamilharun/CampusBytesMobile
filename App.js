import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Auth0Provider } from 'react-native-auth0';
import { AuthProvider } from './context/AuthContext';
import AppNavigation from './navigation/AppNavigation';
import config from './apis/auth0_config';

export default function App() {
  return (
    <Auth0Provider domain={config.domain} clientId={config.clientId}>
      <AuthProvider>
        <AppNavigation/>
      </AuthProvider> 
    </Auth0Provider>
  );
}


