import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Pantalla from '../../components/Pantalla';
import Boton from '../../components/Boton';
import Enlace from '../../components/Enlace';
import MapaRecorrido from '../../components/MapaRecorrido';
import { useAuth } from '../../context/AuthContext';
import { useUbicacion } from '../../hooks/useUbicacion';
import { obtenerRecorrido } from '../../services/recorridoService';
import { enviarPosicion } from '../../services/posicionService';
import { Recorrido } from '../../types';
import { colores, espacio, texto } from '../../theme';

const CAPACIDAD = 4;

export default function RecorridoActivoScreen() {
  const { usuario, cerrarSesion } = useAuth();
  const [recorrido, setRecorrido] = useState<Recorrido | null>(null);
  const [turnoActivo, setTurnoActivo] = useState(false);
  const [ocupados, setOcupados] = useState(0);
  const { posicion, permiso } = useUbicacion(turnoActivo);

  useEffect(() => {
    if (usuario?.recorridoId) {
      obtenerRecorrido(usuario.recorridoId).then(setRecorrido);
    }
  }, [usuario?.recorridoId]);

  // Cada posición nueva (cada ~5 s) se envía mientras dure el turno
  useEffect(() => {
    if (turnoActivo && posicion && recorrido) {
      enviarPosicion(recorrido.id, posicion.latitude, posicion.longitude, ocupados);
    }
  }, [posicion]);

  const terminarTurno = () => {
    setTurnoActivo(false);
    setOcupados(0);
  };

  return (
    <Pantalla scroll={false}>
      <View style={estilos.cabecera}>
        <View>
          <Text style={estilos.etiqueta}>CONDUCTOR · RECORRIDO ACTIVO</Text>
          <Text style={estilos.titulo}>{usuario?.nombre}</Text>
        </View>
        <Enlace titulo="Cerrar sesión" onPress={cerrarSesion} />
      </View>

      <View style={estilos.contenedorMapa}>
        <MapaRecorrido
          recorrido={recorrido}
          usuario={posicion}
          mostrarUbicacion={permiso === 'concedido'}
        />
      </View>

      {permiso === 'denegado' && (
        <Text style={estilos.aviso}>
          Sin permiso de ubicación no se puede informar tu posición a los pasajeros.
        </Text>
      )}

      <View style={estilos.tarjeta}>
        <Text style={estilos.etiquetaSec}>
          {recorrido ? recorrido.nombre.toUpperCase() : 'SIN RECORRIDO ASIGNADO'}
        </Text>
        <Text style={estilos.cifra}>
          {ocupados} / {CAPACIDAD}
        </Text>
        <Text style={estilos.alerta}>
          {ocupados >= CAPACIDAD ? 'Colectivo lleno' : 'Asientos ocupados'}
        </Text>
      </View>

      {turnoActivo ? (
        <>
          <View style={estilos.fila}>
            <View style={estilos.mitad}>
              <Boton
                titulo="Sube pasajero"
                onPress={() => setOcupados((n) => Math.min(CAPACIDAD, n + 1))}
              />
            </View>
            <View style={estilos.mitad}>
              <Boton
                titulo="Baja pasajero"
                variante="secundario"
                onPress={() => setOcupados((n) => Math.max(0, n - 1))}
              />
            </View>
          </View>
          <Boton titulo="Terminar turno" variante="secundario" onPress={terminarTurno} />
        </>
      ) : (
        <Boton titulo="Iniciar turno" onPress={() => setTurnoActivo(true)} />
      )}
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
  etiqueta: { ...texto.etiqueta, color: colores.verdeClaro, marginBottom: 4 },
  titulo: { ...texto.subtitulo, color: colores.texto },
  contenedorMapa: {
    flex: 1,
    minHeight: 200,
    borderRadius: espacio.radioMax,
    borderWidth: 1,
    borderColor: colores.borde,
    backgroundColor: colores.tarjeta,
  },
  aviso: { ...texto.cuerpo, color: colores.alerta, marginTop: 10 },
  tarjeta: {
    backgroundColor: colores.tarjeta,
    borderWidth: 1,
    borderColor: colores.borde,
    borderRadius: espacio.radioMax,
    padding: 16,
    marginVertical: 12,
  },
  etiquetaSec: { ...texto.etiqueta, color: colores.textoSec, marginBottom: 6 },
  cifra: { ...texto.cifra, color: colores.texto },
  alerta: { ...texto.cuerpo, color: colores.alerta, marginTop: 4 },
  fila: { flexDirection: 'row', gap: 12, marginBottom: 12 },
  mitad: { flex: 1 },
});