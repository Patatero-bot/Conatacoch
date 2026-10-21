export const colores = {
  superficie: '#1A1D1E',
  tarjeta: '#222624',
  borde: '#353A37',
  texto: '#FFFDFA',
  textoSec: '#9F9F9F',
  verdeClaro: '#80F192',
  verde: '#32A241',
  verdeOscuro: '#207B2E',
  alerta: '#DAA81E', // siempre acompañado de texto
};

export const espacio = {
  base: 4,
  margenLateral: 22,
  radioMin: 14,
  radioMax: 18,
  areaTactil: 48, // dp mínimos
};

export const texto = {
  cifra: { fontSize: 40, fontWeight: '700' as const },
  titulo: { fontSize: 30, fontWeight: '700' as const },
  subtitulo: { fontSize: 17, fontWeight: '600' as const },
  cuerpo: { fontSize: 15 },
  etiqueta: {
    fontSize: 12,
    fontWeight: '700' as const,
    letterSpacing: 1.5,
    textTransform: 'uppercase' as const,
  },
};
