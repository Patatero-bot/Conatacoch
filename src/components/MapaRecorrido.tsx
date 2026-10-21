import React, { useEffect, useRef } from 'react';
import { Platform, StyleSheet } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { Coordenada, Recorrido } from '../types';
import { colores } from '../theme';
import { mapaOscuro } from '../theme/mapaOscuro';

// Ponlo en true cuando confirmes que el mapa se ve bien
const USAR_ESTILO_OSCURO = false;

interface Props {
  recorrido: Recorrido | null;
  usuario: Coordenada | null; // para centrar cuando no hay recorrido elegido
  mostrarUbicacion: boolean;
}

const REGION_INICIAL = {
  latitude: -33.51,
  longitude: -70.76,
  latitudeDelta: 0.08,
  longitudeDelta: 0.08,
};

export default function MapaRecorrido({ recorrido, usuario, mostrarUbicacion }: Props) {
  const mapa = useRef<MapView>(null);

  const ajustar = () => {
    if (recorrido && recorrido.puntos.length > 1) {
      mapa.current?.fitToCoordinates(recorrido.puntos, {
        edgePadding: { top: 60, right: 40, bottom: 60, left: 40 },
        animated: true,
      });
    }
  };

  useEffect(() => {
    ajustar();
  }, [recorrido]);

  useEffect(() => {
    if (!recorrido && usuario) {
      mapa.current?.animateCamera({
        center: { latitude: usuario.latitude, longitude: usuario.longitude },
        zoom: 14,
      });
    }
  }, [usuario, recorrido]);

  return (
    <MapView
      ref={mapa}
      style={estilos.mapa}
      provider={undefined}
      initialRegion={REGION_INICIAL}
      customMapStyle={USAR_ESTILO_OSCURO ? mapaOscuro : undefined}
      showsUserLocation={mostrarUbicacion}
      showsMyLocationButton={false}
      onMapReady={ajustar}
    >
      {recorrido && (
        <>
          <Polyline
            coordinates={recorrido.puntos}
            strokeColor={colores.verdeClaro}
            strokeWidth={4}
          />
          {recorrido.paraderos.map((p) => (
            <Marker
              key={p.id}
              coordinate={p.coordenada}
              title={p.nombre}
              pinColor={colores.verde}
            />
          ))}
        </>
      )}
    </MapView>
  );
}

const estilos = StyleSheet.create({
  mapa: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});