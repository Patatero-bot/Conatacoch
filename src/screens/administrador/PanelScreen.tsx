import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Pantalla from '../../components/Pantalla';
import Boton from '../../components/Boton';
import { useAuth } from '../../context/AuthContext';
import { colores, espacio, texto } from '../../theme';

export default function PanelScreen() {
  const { usuario, cerrarSesion } = useAuth();
  const hoy = new Date().toLocaleDateString('es-CL', {
    weekday: 'long', day: 'numeric', month: 'long',
  }); // ajuste de la versión 3: fecha actual, no fija

  return (
    <Pantalla>
      <Text style={estilos.etiqueta}>ADMINISTRACIÓN · PANEL</Text>
      <Text style={estilos.titulo}>Hola, {usuario?.nombre}</Text>
      <Text style={estilos.fecha}>{hoy}</Text>

      <View style={estilos.tarjeta}>
        <Text style={estilos.etiquetaSec}>VIAJES HOY</Text>
        <Text style={estilos.cifra}>—</Text>
        <Text style={estilos.nota}>Se conectará a los reportes (HU-005).</Text>
      </View>

      <Boton titulo="Cerrar sesión" variante="secundario" onPress={cerrarSesion} />
    </Pantalla>
  );
}

const estilos = StyleSheet.create({
  etiqueta: { ...texto.etiqueta, color: colores.verdeClaro, marginBottom: 14 },
  etiquetaSec: { ...texto.etiqueta, color: colores.textoSec, marginBottom: 8 },
  titulo: { ...texto.titulo, color: colores.texto, marginBottom: 6 },
  fecha: { ...texto.cuerpo, color: colores.textoSec, marginBottom: 24 },
  tarjeta: {
    backgroundColor: colores.tarjeta, borderWidth: 1, borderColor: colores.borde,
    borderRadius: espacio.radioMax, padding: 20, marginBottom: 20,
  },
  cifra: { ...texto.cifra, color: colores.texto },
  nota: { ...texto.cuerpo, color: colores.textoSec, marginTop: 6 },
});