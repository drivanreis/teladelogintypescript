// src/pages/Login.tsx

import React from 'react';
import './Login.css'; // Importando estilos da página de login

const Login: React.FC = () => {
  return (
    <div className="login-container">
      <h2>Login</h2>
      <form>
        <input type="text" placeholder="Usuário" />
        <input type="password" placeholder="Senha" />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
