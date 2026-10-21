// Por ahora solo registra en consola. En el Sprint 4 emite por WebSocket
// (evento emitirPosicion de la Figura 4), con cola local si no hay señal.
export async function enviarPosicion(
  recorridoId: string,
  latitude: number,
  longitude: number,
  asientosOcupados: number
) {
  console.log('[posición]', { recorridoId, latitude, longitude, asientosOcupados });
}