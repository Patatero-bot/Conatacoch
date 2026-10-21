import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Pantalla from '../../components/Pantalla';
import CampoTexto from '../../components/CampoTexto';
import Boton from '../../components/Boton';
import { useAuth } from '../../context/AuthContext';
import { colores, texto } from '../../theme';

export default function SegundoFactorScreen() {
  const navigation = useNavigation();
  const { verificarCodigo, cerrarSesion } = useAuth();
  const [codigo, setCodigo] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const verificar = async () => {
    setCargando(true);
    const ok = await verificarCodigo(codigo);
    setCargando(false);
    if (!ok) setError('Código incorrecto. Inténtalo de nuevo.');
  };

  const cancelar = () => {
    cerrarSesion();
    navigation.goBack();
  };

  return (
    <Pantalla>
      <Text style={estilos.etiqueta}>VERIFICACIÓN EN DOS PASOS</Text>
      <Text style={estilos.titulo}>Ingresa tu código</Text>
      <Text style={estilos.descripcion}>
        Las cuentas de administración requieren el código de 6 dígitos de tu aplicación
        autenticadora.
      </Text>

      <CampoTexto
        etiqueta="Código"
        value={codigo}
        onChangeText={setCodigo}
        keyboardType="number-pad"
        maxLength={6}
        placeholder="000000"
      />
      {error !== '' && <Text style={estilos.error}>{error}</Text>}

      <Boton titulo="Verificar" onPress={verificar} cargando={cargando} />
      <View style={{ height: 12 }} />
      <Boton titulo="Cancelar" variante="secundario" onPress={cancelar} />
    </Pantalla>
  );
}

const estilos = StyleSheet.create({
  etiqueta: { ...texto.etiqueta, color: colores.verdeClaro, marginBottom: 14 },
  titulo: { ...texto.titulo, color: colores.texto, marginBottom: 10 },
  descripcion: {
    ...texto.cuerpo,
    color: colores.textoSec,
    lineHeight: 23,
    marginBottom: 28,
  },
  error: { ...texto.cuerpo, color: colores.alerta, marginBottom: 14 },
});