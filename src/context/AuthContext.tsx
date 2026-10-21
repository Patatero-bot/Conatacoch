import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Usuario } from '../types';
import * as authService from '../services/authService';

interface AuthContextValue {
  usuario: Usuario | null;       // sesión completa
  pendiente2FA: Usuario | null;  // admin que ya puso su clave y falta el código
  iniciarSesion: (email: string, password: string) => Promise<void>;
  verificarCodigo: (codigo: string) => Promise<boolean>;
  cerrarSesion: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [pendiente2FA, setPendiente2FA] = useState<Usuario | null>(null);

  const iniciarSesion = async (email: string, password: string) => {
    const u = await authService.login(email, password);
    if (u.rol === 'ADMINISTRADOR') setPendiente2FA(u); // RNF02: doble factor
    else setUsuario(u);
  };

  const verificarCodigo = async (codigo: string) => {
    const ok = await authService.verificarSegundoFactor(codigo);
    if (ok && pendiente2FA) {
      setUsuario(pendiente2FA);
      setPendiente2FA(null);
    }
    return ok;
  };

  const cerrarSesion = () => {
    setUsuario(null);
    setPendiente2FA(null);
  };

  return (
    <AuthContext.Provider
      value={{ usuario, pendiente2FA, iniciarSesion, verificarCodigo, cerrarSesion }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return ctx;
}