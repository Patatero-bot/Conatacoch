import { Recorrido } from '../types';

// DATOS DE EJEMPLO: las coordenadas son aproximadas, solo para probar el mapa.
// El RNT entrega el trazado como nombres de calles, no como coordenadas.
// En el Sprint 3 la API devolverá el trazado y los paraderos (PostGIS) como GeoJSON.
const RECORRIDOS: Recorrido[] = [
  {
    id: 'r-236023',
    folio: '236023',
    nombre: 'Folio 236023 · Maipú',
    sentido: 'IDA',
    puntos: [
      { latitude: -33.511, longitude: -70.758 },
      { latitude: -33.5075, longitude: -70.761 },
      { latitude: -33.504, longitude: -70.765 },
      { latitude: -33.5, longitude: -70.769 },
    ],
    paraderos: [
      { id: 'p1', nombre: 'Paradero 1', coordenada: { latitude: -33.511, longitude: -70.758 } },
      { id: 'p2', nombre: 'Paradero 2', coordenada: { latitude: -33.504, longitude: -70.765 } },
      { id: 'p3', nombre: 'Paradero 3', coordenada: { latitude: -33.5, longitude: -70.769 } },
    ],
  },
  {
    id: 'r-demo-2',
    folio: 'DEMO',
    nombre: 'Servicio de ejemplo',
    sentido: 'IDA',
    puntos: [
      { latitude: -33.515, longitude: -70.752 },
      { latitude: -33.519, longitude: -70.747 },
      { latitude: -33.523, longitude: -70.742 },
    ],
    paraderos: [
      { id: 'p4', nombre: 'Paradero A', coordenada: { latitude: -33.515, longitude: -70.752 } },
      { id: 'p5', nombre: 'Paradero B', coordenada: { latitude: -33.523, longitude: -70.742 } },
    ],
  },
];

export async function obtenerRecorridos(): Promise<Recorrido[]> {
  return RECORRIDOS;
}

export async function obtenerRecorrido(id: string): Promise<Recorrido | null> {
  return RECORRIDOS.find((r) => r.id === id) ?? null;
}