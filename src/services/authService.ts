import { Usuario } from '../types';

interface CuentaDemo extends Usuario {
  password: string;
}

// SOLO DEMO: en producción esto lo valida el backend (Argon2id + JWT).
const CUENTAS: CuentaDemo[] = [
  { id: '1', nombre: 'Pasajero Demo', email: 'pasajero@demo.cl', password: 'Demo1234', rol: 'PASAJERO' },
  { id: '2', nombre: 'Conductor Demo', email: 'conductor@demo.cl', password: 'Demo1234', rol: 'CONDUCTOR', recorridoId: 'r-236023' },
  { id: '4', nombre: 'Conductor Demo 2', email: 'conductor2@demo.cl', password: 'Demo1234', rol: 'CONDUCTOR', recorridoId: 'r-demo-2' },
  { id: '3', nombre: 'Dirigente Demo', email: 'admin@demo.cl', password: 'Demo1234', rol: 'ADMINISTRADOR' },
];

const CODIGO_2FA_DEMO = '123456';
const esperar = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function login(email: string, password: string): Promise<Usuario> {
  await esperar(500);
  const cuenta = CUENTAS.find(
    (c) => c.email === email.trim().toLowerCase() && c.password === password
  );
  if (!cuenta) throw new Error('Correo o contraseña incorrectos.');
  const { password: _omitida, ...usuario } = cuenta;
  return usuario;
}

export async function verificarSegundoFactor(codigo: string): Promise<boolean> {
  await esperar(400);
  return codigo === CODIGO_2FA_DEMO;
}