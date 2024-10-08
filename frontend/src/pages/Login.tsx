// src/pages/Login.tsx

import React, { useState } from 'react';
import './Login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expressão regular para validação de email
    return emailPattern.test(email);
  };

  const validatePassword = (password: string) => {
    // Verifica se a senha tem pelo menos uma letra maiúscula
    return /[A-Z]/.test(password);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let isValid = true;

    // Validação de e-mail
    if (!validateEmail(email)) {
      setEmailError('O e-mail deve ter o formato nome@dominio.com');
      isValid = false;
    } else {
      setEmailError('');
    }

    // Validação de senha
    if (!validatePassword(password)) {
      setPasswordError('A senha deve ter pelo menos uma letra maiúscula');
      isValid = false;
    } else {
      setPasswordError('');
    }

    // Se tudo estiver válido, você pode continuar com o login
    if (isValid) {
      console.log('Login realizado com sucesso!');
      // Aqui você pode adicionar a lógica para autenticação
    }
  };

  // Funções de validação ao perder foco
  const handleEmailBlur = () => {
    if (!validateEmail(email)) {
      setEmailError('O e-mail deve ter o formato nome@dominio.com');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordBlur = () => {
    if (!validatePassword(password)) {
      setPasswordError('A senha deve ter pelo menos uma letra maiúscula');
    } else {
      setPasswordError('');
    }
  };

  // Verifica se todos os campos estão válidos
  const isFormValid = validateEmail(email) && validatePassword(password);

  return (
    <div id="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          id='email'
          type="text"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={handleEmailBlur} // Adiciona a função de validação no blur
        />
        {emailError && <p className="error">{emailError}</p>} {/* Mensagem de erro */}

        <input
          id='password'
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={handlePasswordBlur} // Adiciona a função de validação no blur
        />
        {passwordError && <p className="error">{passwordError}</p>} {/* Mensagem de erro */}

        <button type="submit" disabled={!isFormValid}>Entrar</button> {/* Botão desabilitado se o formulário não for válido */}

        {/* Links abaixo do botão */}
        <div className="links">
          <a href="/forgot-password" className="link">Esqueceu a Senha?</a>
          <span> | </span> {/* Separador */}
          <a href="/signup" className="link">Cadastre-se</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
