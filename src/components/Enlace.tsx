import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colores, espacio } from '../theme';

export default function Enlace({ titulo, onPress }: { titulo: string; onPress: () => void }) {
  return (
    <TouchableOpacity
      style={estilos.base}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={titulo}
    >
      <Text style={estilos.texto}>{titulo}</Text>
    </TouchableOpacity>
  );
}

const estilos = StyleSheet.create({
  base: { minHeight: espacio.areaTactil, justifyContent: 'center', paddingHorizontal: 4 },
  texto: { color: colores.verdeClaro, fontSize: 15, fontWeight: '600' },
});