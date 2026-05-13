import React, { useState } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase/client';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Nuevos estados para la UI
  const [isRegistering, setIsRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Manejo de Auth por Correo
  const handleAuth = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      if (isRegistering) {
        // Registro
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        // Login
        await signInWithEmailAndPassword(auth, email, password);
      }
      window.location.href = '/portfolio';
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        setError("El correo ya está registrado.");
      } else if (err.code === 'auth/weak-password') {
        setError("La contraseña debe tener al menos 6 caracteres.");
      } else if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError("Credenciales incorrectas. Por favor verifica.");
      } else {
        setError("Ocurrió un error. Verifica tu conexión o intenta de nuevo.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Manejo de Auth con Google
  const handleGoogleAuth = async () => {
    setError(null);
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      window.location.href = '/portfolio';
    } catch (err) {
      console.error(err);
      setError("Error al iniciar sesión con Google.");
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="login-container">
        <form onSubmit={handleAuth} className="login-form">
          <h2>{isRegistering ? "Crear Cuenta" : "Bienvenido"}</h2>
          <p>{isRegistering ? "Regístrate para ver el setup 3D" : "Inicia sesión para ver mi setup 3D"}</p>
          
          {error && <div className="error-message">{error}</div>}

          <div className="input-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input 
              id="email"
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              placeholder="ejemplo@correo.com"
              disabled={loading}
            />
          </div>

          <div className="input-group password-group">
            <label htmlFor="password">Contraseña</label>
            <div className="password-input-wrapper">
              <input 
                id="password"
                type={showPassword ? "text" : "password"} 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                placeholder="••••••••"
                disabled={loading}
              />
              <button 
                type="button" 
                className="toggle-password-btn"
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? "Ocultar contraseña" : "Ver contraseña"}
              >
                {showPassword ? "👁️‍🗨️" : "👁️"}
              </button>
            </div>
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Cargando..." : (isRegistering ? "Registrarse" : "Entrar al Portafolio")}
          </button>

          <div className="divider">
            <span>O</span>
          </div>

          <button 
            type="button" 
            className="google-btn" 
            onClick={handleGoogleAuth}
            disabled={loading}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continuar con Google
          </button>

          <p className="toggle-auth-text">
            {isRegistering ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}
            <button 
              type="button" 
              className="toggle-auth-link"
              onClick={() => setIsRegistering(!isRegistering)}
            >
              {isRegistering ? " Inicia Sesión" : " Regístrate aquí"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
