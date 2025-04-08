import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const storedUsers = JSON.parse(localStorage.getItem('users') || '{}');

    if (isRegistering) {
      if (storedUsers[username]) {
        setError('El usuario ya existe');
        return;
      }
      storedUsers[username] = password;
      localStorage.setItem('users', JSON.stringify(storedUsers));
      alert('Usuario registrado correctamente');
      setIsRegistering(false);
    } else {
      if (storedUsers[username] === password) {
        localStorage.setItem('token', 'fake-jwt-token-' + username);
        navigate('/carros');
      } else {
        setError('Usuario o contraseña incorrectos');
      }
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>{isRegistering ? 'Registrarse' : 'Iniciar Sesión'}</h2>

        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          {isRegistering ? 'Registrarse' : 'Entrar'}
        </button>

        <p style={styles.toggleText}>
          {isRegistering ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}{' '}
          <span
            onClick={() => {
              setIsRegistering(!isRegistering);
              setError('');
            }}
            style={styles.link}
          >
            {isRegistering ? 'Inicia sesión' : 'Regístrate'}
          </span>
        </p>

        {error && <p style={styles.error}>{error}</p>}
      </form>
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    backgroundColor: '#121212',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    backgroundColor: '#1f1f1f',
    padding: '30px',
    borderRadius: '10px',
    width: '300px',
    boxShadow: '0px 0px 10px rgba(0,0,0,0.5)',
    display: 'flex',
    flexDirection: 'column' as const,
  },
  title: {
    color: '#fff',
    marginBottom: '20px',
    textAlign: 'center' as const,
  },
  input: {
    marginBottom: '15px',
    padding: '10px',
    border: '1px solid #444',
    borderRadius: '5px',
    backgroundColor: '#2a2a2a',
    color: '#fff',
    fontSize: '16px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  error: {
    marginTop: '10px',
    color: '#ff4d4f',
    textAlign: 'center' as const,
  },
  toggleText: {
    color: '#ccc',
    textAlign: 'center' as const,
    marginTop: '10px',
  },
  link: {
    color: '#1e90ff',
    cursor: 'pointer',
  },
};
