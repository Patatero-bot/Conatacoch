import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Pantalla from '../../components/Pantalla';
import CampoTexto from '../../components/CampoTexto';
import Boton from '../../components/Boton';
import { useAuth } from '../../context/AuthContext';
import { RootStackParamList } from '../../navigation/tipos';
import { colores, texto } from '../../theme';

export default function LoginScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { iniciarSesion, pendiente2FA } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  // Si es administrador, tras validar la clave pasa al segundo factor
  useEffect(() => {
    if (pendiente2FA) navigation.navigate('SegundoFactor');
  }, [pendiente2FA]);

  const entrar = async () => {
    if (!email || !password) {
      setError('Ingresa tu correo y contraseña.');
      return;
    }
    setError('');
    setCargando(true);
    try {
      await iniciarSesion(email, password);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'No se pudo iniciar sesión.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <Pantalla>
      <View style={estilos.encabezado}>
        <View style={estilos.logo}>
          <Text style={estilos.logoTexto}>C</Text>
        </View>
        <View>
          <Text style={estilos.marca}>CONATACOCH</Text>
          <Text style={estilos.submarca}>Taxis colectivos de Chile</Text>
        </View>
      </View>

      <Text style={estilos.titulo}>Inicia sesión</Text>
      <Text style={estilos.descripcion}>
        Ingresa para pagar tu pasaje o iniciar tu turno.
      </Text>

      <CampoTexto
        etiqueta="Correo"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        placeholder="correo@ejemplo.cl"
      />
      <CampoTexto
        etiqueta="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        placeholder="••••••••"
      />

      {error !== '' && <Text style={estilos.error}>{error}</Text>}

      <Boton titulo="Ingresar" onPress={entrar} cargando={cargando} />

      {__DEV__ && (
        <Text style={estilos.demo}>
          Demo: pasajero@demo.cl · conductor@demo.cl · conductor2@demo.cl · admin@demo.cl
          {'\n'}
          Contraseña: Demo1234
        </Text>
      )}
    </Pantalla>
  );
}

const estilos = StyleSheet.create({
  encabezado: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 40,
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: colores.verdeOscuro,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoTexto: { color: colores.texto, fontSize: 27, fontWeight: 'bold' },
  marca: {
    color: colores.texto,
    fontSize: 19,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  submarca: { color: colores.textoSec, fontSize: 13, marginTop: 3 },
  titulo: { ...texto.titulo, color: colores.texto, marginBottom: 10 },
  descripcion: {
    ...texto.cuerpo,
    color: colores.textoSec,
    lineHeight: 23,
    marginBottom: 28,
  },
  error: { ...texto.cuerpo, color: colores.alerta, marginBottom: 14 },
  demo: {
    color: colores.textoSec,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 28,
    lineHeight: 18,
  },
});