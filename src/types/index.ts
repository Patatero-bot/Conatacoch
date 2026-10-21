export type Rol = 'PASAJERO' | 'CONDUCTOR' | 'ADMINISTRADOR';

export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  rol: Rol;
  recorridoId?: string; // solo conductores: su recorrido asignado
}

export interface Coordenada {
  latitude: number;
  longitude: number;
}

export interface Paradero {
  id: string;
  nombre: string;
  coordenada: Coordenada;
}

export interface Recorrido {
  id: string;
  folio: string;
  nombre: string;
  sentido: 'IDA' | 'REGRESO';
  puntos: Coordenada[];
  paraderos: Paradero[];
}