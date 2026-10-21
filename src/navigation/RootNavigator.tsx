import React from 'react';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import { colores } from '../theme';
import { RootStackParamList } from './tipos';

import LoginScreen from '../screens/auth/LoginScreen';
import SegundoFactorScreen from '../screens/auth/SegundoFactorScreen';
import SeguimientoScreen from '../screens/pasajero/SeguimientoScreen';
import RecorridoActivoScreen from '../screens/conductor/RecorridoActivoScreen';
import PanelScreen from '../screens/administrador/PanelScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const tema = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: colores.superficie,
    card: colores.superficie,
    text: colores.texto,
  },
};

export default function RootNavigator() {
  const { usuario } = useAuth();

  return (
    <NavigationContainer theme={tema}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {usuario?.rol === 'CONDUCTOR' ? (
          <Stack.Screen name="RecorridoActivo" component={RecorridoActivoScreen} />
        ) : usuario?.rol === 'ADMINISTRADOR' ? (
          <Stack.Screen name="Panel" component={PanelScreen} />
        ) : (
          <>
            {/* Mapa público: visible sin sesión y para el pasajero con sesión */}
            <Stack.Screen name="Seguimiento" component={SeguimientoScreen} />
            {!usuario && (
              <>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="SegundoFactor" component={SegundoFactorScreen} />
              </>
            )}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}