import React, { ReactNode } from 'react';
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colores, espacio } from '../theme';

interface Props {
  children: ReactNode;
  scroll?: boolean;
}

export default function Pantalla({ children, scroll = true }: Props) {
  return (
    <SafeAreaView style={estilos.raiz}>
      <StatusBar barStyle="light-content" backgroundColor={colores.superficie} />
      {scroll ? (
        <ScrollView
          contentContainerStyle={estilos.contenido}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </ScrollView>
      ) : (
        <View style={estilos.fijo}>{children}</View>
      )}
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  raiz: { flex: 1, backgroundColor: colores.superficie },
  contenido: {
    flexGrow: 1,
    paddingHorizontal: espacio.margenLateral,
    paddingVertical: 32,
  },
  fijo: {
    flex: 1,
    paddingHorizontal: espacio.margenLateral,
    paddingTop: 12,
    paddingBottom: 16,
  },
});