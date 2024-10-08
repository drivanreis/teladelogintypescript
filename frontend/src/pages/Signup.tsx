import React, { useState } from 'react';
import './Signup.css';
import { geraCodigo } from '../utils/geraCodigo';
import { sendVerificationEmail } from '../utils/sendEmail';
import { formatPhone, validateEmail, validatePassword, validatePhone } from '../utils/validateFilds';

const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [verificationSent, setVerificationSent] = useState(false); // Controle de envio do e-mail
  const [verificationCode, setVerificationCode] = useState(''); // Código de verificação enviado
  const [inputCode, setInputCode] = useState(''); // Código inserido pelo usuário
  const [isVerified, setIsVerified] = useState(false); // Controle se o e-mail foi verificado

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let isValid = true;

    if (!validateEmail(email)) {
      setEmailError('O e-mail deve ter o formato nome@dominio.com');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!validatePhone(phone)) {
      setPhoneError('O telefone deve ter o formato (dd) nnnnn-nnnn e conter apenas números');
      isValid = false;
    } else {
      setPhoneError('');
    }

    if (!validatePassword(password)) {
      setPasswordError('A senha deve ter pelo menos uma letra maiúscula');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (isValid) {
      // Gerar e enviar o código de verificação por e-mail
      const code = geraCodigo().toString();
      setVerificationCode(code);

      try {
        await sendVerificationEmail(email, code);
        setVerificationSent(true); // Atualiza o estado para indicar que o e-mail foi enviado
        console.log('Código de verificação enviado com sucesso!');
      } catch (error) {
        console.error('Erro ao enviar o e-mail de verificação:', error);
      }
    }
  };

  const handleCodeVerification = () => {
    if (inputCode === verificationCode) {
      setIsVerified(true);
      console.log('E-mail verificado com sucesso!');
    } else {
      console.error('Código de verificação incorreto.');
    }
  };

  const handleBlurEmail = () => {
    if (!validateEmail(email)) {
      setEmailError('O e-mail deve ter o formato nome@dominio.com');
    } else {
      setEmailError('');
    }
  };

  const handleBlurPhone = () => {
    if (!validatePhone(phone)) {
      setPhoneError('O telefone deve ter o formato (dd) nnnnn-nnnn e conter apenas números');
    } else {
      setPhoneError('');
    }
  };

  const handleBlurPassword = () => {
    if (!validatePassword(password)) {
      setPasswordError('A senha deve ter pelo menos uma letra maiúscula');
    } else {
      setPasswordError('');
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = formatPhone(e.target.value);
    setPhone(formattedPhone);
  };

  const isFormValid = () => {
    return (
      validateEmail(email) &&
      validatePhone(phone) &&
      validatePassword(password)
    );
  };

  return (
    <div id="signup-container">
      <h2>Cadastro</h2>
      {!isVerified ? (
        <form onSubmit={handleSubmit}>
          <input
            id='email'
            type="text"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={handleBlurEmail}
          />
          {emailError && <p className="error">{emailError}</p>}

          <input
            id='phone'
            type="text"
            placeholder="Telefone (dd) nnnnn-nnnn"
            value={phone}
            onChange={handlePhoneChange}
            onBlur={handleBlurPhone}
          />
          {phoneError && <p className="error">{phoneError}</p>}

          <input
            id='password'
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={handleBlurPassword}
          />
          {passwordError && <p className="error">{passwordError}</p>}

          <button type="submit" disabled={!isFormValid()}>Registrar</button>
        </form>
      ) : (
        <>
          <p>Digite o código de verificação enviado para o e-mail {email}.</p>
          <input
            type="text"
            placeholder="Código de verificação"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
          />
          <button onClick={handleCodeVerification}>Verificar</button>
        </>
      )}

      {verificationSent && !isVerified && (
        <p>Código de verificação enviado para o e-mail {email}. Verifique sua caixa de entrada.</p>
      )}

      {isVerified && (
        <p>Seu e-mail foi verificado com sucesso! Agora você pode prosseguir com o cadastro.</p>
      )}

      <p>Já tem uma conta? <a href="/">Faça login</a></p>
    </div>
  );
};

export default Signup;
