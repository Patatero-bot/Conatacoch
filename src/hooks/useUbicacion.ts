import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

export type EstadoPermiso = 'pendiente' | 'concedido' | 'denegado';

// seguir = false: una lectura puntual (pasajero)
// seguir = true: actualización continua cada 5 s (conductor en turno)
export function useUbicacion(seguir = false) {
  const [posicion, setPosicion] = useState<Location.LocationObjectCoords | null>(null);
  const [permiso, setPermiso] = useState<EstadoPermiso>('pendiente');

  useEffect(() => {
    let activo = true;
    let suscripcion: Location.LocationSubscription | null = null;

    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (!activo) return;
      if (status !== 'granted') {
        setPermiso('denegado');
        return;
      }
      setPermiso('concedido');

      if (seguir) {
        const s = await Location.watchPositionAsync(
          { accuracy: Location.Accuracy.High, timeInterval: 5000, distanceInterval: 10 },
          (loc) => setPosicion(loc.coords)
        );
        if (activo) suscripcion = s;
        else s.remove();
      } else {
        const loc = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
        if (activo) setPosicion(loc.coords);
      }
    })();

    return () => {
      activo = false;
      suscripcion?.remove();
    };
  }, [seguir]);

  return { posicion, permiso };
}