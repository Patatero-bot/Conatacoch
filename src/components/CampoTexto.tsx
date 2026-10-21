import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { colores, espacio, texto } from '../theme';

interface Props extends TextInputProps {
  etiqueta: string;
}

export default function CampoTexto({ etiqueta, ...resto }: Props) {
  return (
    <View style={estilos.grupo}>
      <Text style={estilos.etiqueta}>{etiqueta}</Text>
      <TextInput
        style={estilos.campo}
        placeholderTextColor={colores.textoSec}
        accessibilityLabel={etiqueta}
        {...resto}
      />
    </View>
  );
}

const estilos = StyleSheet.create({
  grupo: { marginBottom: 16 },
  etiqueta: { ...texto.etiqueta, color: colores.textoSec, marginBottom: 8 },
  campo: {
    backgroundColor: colores.tarjeta,
    borderWidth: 1,
    borderColor: colores.borde,
    borderRadius: espacio.radioMin,
    minHeight: espacio.areaTactil + 4,
    paddingHorizontal: 16,
    color: colores.texto,
    fontSize: 15,
  },
});