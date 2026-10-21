import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colores, espacio } from '../theme';

interface Props {
  titulo: string;
  onPress: () => void;
  variante?: 'principal' | 'secundario';
  cargando?: boolean;
}

export default function Boton({ titulo, onPress, variante = 'principal', cargando }: Props) {
  const principal = variante === 'principal';
  return (
    <TouchableOpacity
      style={[estilos.base, principal ? estilos.principal : estilos.secundario]}
      onPress={onPress}
      disabled={cargando}
      accessibilityRole="button"
      accessibilityLabel={titulo}
    >
      {cargando ? (
        <ActivityIndicator color={colores.texto} />
      ) : (
        <Text style={[estilos.texto, !principal && { color: colores.verdeClaro }]}>
          {titulo}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const estilos = StyleSheet.create({
  base: {
    minHeight: espacio.areaTactil + 4,
    borderRadius: espacio.radioMin,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    width: '100%',
  },
  principal: { backgroundColor: colores.verdeOscuro },
  secundario: { borderWidth: 1, borderColor: colores.verde },
  texto: { color: '#FFFFFF', fontSize: 15, fontWeight: '600' },
});