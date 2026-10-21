import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Pantalla from '../../components/Pantalla';
import MapaRecorrido from '../../components/MapaRecorrido';
import Enlace from '../../components/Enlace';
import { useAuth } from '../../context/AuthContext';
import { useUbicacion } from '../../hooks/useUbicacion';
import { obtenerRecorridos } from '../../services/recorridoService';
import { RootStackParamList } from '../../navigation/tipos';
import { Recorrido } from '../../types';
import { colores, espacio, texto } from '../../theme';

export default function SeguimientoScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { usuario, cerrarSesion } = useAuth();
  const { posicion, permiso } = useUbicacion(false);
  const [recorridos, setRecorridos] = useState<Recorrido[]>([]);
  const [elegido, setElegido] = useState<Recorrido | null>(null);

  useEffect(() => {
    obtenerRecorridos().then(setRecorridos);
  }, []);

  return (
    <Pantalla scroll={false}>
      <View style={estilos.cabecera}>
        <View>
          <Text style={estilos.etiqueta}>CONATACOCH</Text>
          <Text style={estilos.titulo}>Recorridos</Text>
        </View>
        {usuario ? (
          <Enlace titulo="Cerrar sesión" onPress={cerrarSesion} />
        ) : (
          <Enlace titulo="Ingresar" onPress={() => navigation.navigate('Login')} />
        )}
      </View>

      <View style={estilos.contenedorMapa}>
        <MapaRecorrido
          recorrido={elegido}
          usuario={posicion}
          mostrarUbicacion={permiso === 'concedido'}
        />
      </View>

      {permiso === 'denegado' && (
        <Text style={estilos.aviso}>
          Activa el permiso de ubicación para ver tu posición en el mapa.
        </Text>
      )}

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={estilos.chips}>
        {recorridos.map((r) => {
          const activo = elegido?.id === r.id;
          return (
            <TouchableOpacity
              key={r.id}
              style={[estilos.chip, activo && estilos.chipActivo]}
              onPress={() => setElegido(activo ? null : r)}
              accessibilityRole="button"
              accessibilityLabel={`Ver recorrido ${r.nombre}`}
            >
              <Text style={[estilos.chipTexto, activo && { color: colores.verdeClaro }]}>
                {r.nombre}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={estilos.tarjeta}>
        {elegido ? (
          <>
            <Text style={estilos.etiquetaSec}>{elegido.nombre.toUpperCase()}</Text>
            <Text style={estilos.destacado}>2 de 4 asientos libres</Text>
            <Text style={estilos.nota}>Dato de ejemplo hasta conectar el tiempo real.</Text>
          </>
        ) : (
          <Text style={estilos.nota}>Elige un recorrido para verlo en el mapa.</Text>
        )}
        {!usuario && (
          <Text style={estilos.nota}>Inicia sesión para pagar tu pasaje desde la app.</Text>
        )}
      </View>
    </Pantalla>
  );
}

const estilos = StyleSheet.create({
  cabecera: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  etiqueta: { ...texto.etiqueta, color: colores.verdeClaro },
  titulo: { ...texto.titulo, color: colores.texto },
  contenedorMapa: {
    flex: 1,
    minHeight: 220,
    borderRadius: espacio.radioMax,
    borderWidth: 1,
    borderColor: colores.borde,
    backgroundColor: colores.tarjeta,
  },
  aviso: { ...texto.cuerpo, color: colores.alerta, marginTop: 10 },
  chips: { flexGrow: 0, marginTop: 12 },
  chip: {
    minHeight: espacio.areaTactil,
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderRadius: espacio.radioMin,
    borderWidth: 1,
    borderColor: colores.borde,
    backgroundColor: colores.tarjeta,
    marginRight: 10,
  },
  chipActivo: { borderColor: colores.verdeClaro },
  chipTexto: { ...texto.cuerpo, color: colores.texto },
  tarjeta: {
    backgroundColor: colores.tarjeta,
    borderWidth: 1,
    borderColor: colores.borde,
    borderRadius: espacio.radioMax,
    padding: 16,
    marginTop: 12,
  },
  etiquetaSec: { ...texto.etiqueta, color: colores.textoSec, marginBottom: 6 },
  destacado: { ...texto.subtitulo, color: colores.verdeClaro },
  nota: { ...texto.cuerpo, color: colores.textoSec, marginTop: 4 },
});